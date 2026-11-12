import "server-only";

export type OpenGraph = {
  /** 리다이렉트를 따라간 뒤의 최종(정규) 주소 */
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
};

export class OpenGraphError extends Error {}

const TIMEOUT_MS = 5000;
const MAX_BYTES = 1024 * 1024; // HTML은 앞부분 1MB까지만 읽음 (메타 태그는 <head>에 있음)

/** 사용자가 입력한 문자열을 http(s) URL로 정규화. 스킴이 없으면 https:// 를 붙인다 */
export function normalizeUrl(input: string): URL {
  const trimmed = input.trim();
  if (!trimmed) throw new OpenGraphError("링크를 입력해 주세요");

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new OpenGraphError("올바른 링크 형식이 아니에요");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new OpenGraphError("http 또는 https 링크만 저장할 수 있어요");
  }
  if (isPrivateHost(url.hostname)) {
    // 서버가 내부망 주소를 대신 요청하지 않도록 차단 (SSRF 방지, 기본 수준)
    throw new OpenGraphError("내부 네트워크 주소는 저장할 수 없어요");
  }
  return url;
}

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return true;
  }
  if (host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) {
    return host.includes(":");
  }
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!ipv4) return false;
  const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

/** 주어진 링크의 HTML을 받아 오픈 그래프(+일반 메타) 정보를 추출 */
export async function fetchOpenGraph(input: string): Promise<OpenGraph> {
  const url = normalizeUrl(input);

  let res: Response;
  try {
    res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        // 일부 사이트는 브라우저가 아닌 요청에 OG 태그를 주지 않으므로 일반적인 UA 사용
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://example.com/bot)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "ko,en;q=0.8",
      },
    });
  } catch {
    throw new OpenGraphError("링크에 접속할 수 없어요. 주소를 확인해 주세요");
  }

  const finalUrl = new URL(res.url || url.href);
  if (isPrivateHost(finalUrl.hostname)) {
    throw new OpenGraphError("내부 네트워크 주소는 저장할 수 없어요");
  }

  // 응답이 HTML이 아니거나(이미지, PDF 등) 오류 응답이면 주소 정보만으로 저장
  const contentType = res.headers.get("content-type") ?? "";
  if (!res.ok || !contentType.includes("html")) {
    return fallback(finalUrl);
  }

  const html = await readHtml(res, contentType);
  const meta = parseMetaTags(html);

  const title =
    meta["og:title"] ??
    meta["twitter:title"] ??
    matchTitleTag(html) ??
    finalUrl.hostname.replace(/^www\./, "");
  const description =
    meta["og:description"] ??
    meta["twitter:description"] ??
    meta["description"] ??
    "";
  const image =
    meta["og:image"] ??
    meta["og:image:url"] ??
    meta["og:image:secure_url"] ??
    meta["twitter:image"] ??
    meta["twitter:image:src"];

  return {
    url: resolveUrl(meta["og:url"], finalUrl) ?? finalUrl.href,
    title: clean(title).slice(0, 200),
    description: clean(description).slice(0, 500),
    thumbnail: resolveUrl(image, finalUrl),
  };
}

function fallback(url: URL): OpenGraph {
  return {
    url: url.href,
    title: url.hostname.replace(/^www\./, ""),
    description: "",
    thumbnail: null,
  };
}

/** 응답 바이트를 charset(헤더 → <meta charset> 순)에 맞게 디코딩. EUC-KR 사이트 대응 */
async function readHtml(res: Response, contentType: string) {
  const buffer = new Uint8Array(await res.arrayBuffer()).slice(0, MAX_BYTES);

  let charset = contentType.match(/charset=["']?([\w-]+)/i)?.[1];
  if (!charset) {
    const head = new TextDecoder("latin1").decode(buffer.slice(0, 4096));
    charset = head.match(/<meta[^>]+charset=["']?([\w-]+)/i)?.[1];
  }

  try {
    return new TextDecoder(charset ?? "utf-8").decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

/** <meta property|name="..." content="..."> 를 { key: content } 로 수집 (먼저 나온 값 우선) */
function parseMetaTags(html: string) {
  const result: Record<string, string> = {};
  const head = html.split(/<\/head>/i)[0];

  for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs: Record<string, string> = {};
    for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
      attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
    }
    const key = (attrs.property ?? attrs.name ?? attrs.itemprop)?.toLowerCase();
    const content = attrs.content;
    if (key && content && !(key in result)) {
      result[key] = decodeEntities(content);
    }
  }
  return result;
}

function matchTitleTag(html: string) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  return title ? decodeEntities(title) : undefined;
}

function resolveUrl(value: string | undefined, base: URL) {
  if (!value) return null;
  try {
    const resolved = new URL(value, base);
    return resolved.protocol === "http:" || resolved.protocol === "https:"
      ? resolved.href
      : null;
  } catch {
    return null;
  }
}

function clean(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function decodeEntities(text: string) {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    middot: "·",
  };
  return text.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const n =
        code[1].toLowerCase() === "x"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : entity;
    }
    return named[code.toLowerCase()] ?? entity;
  });
}
