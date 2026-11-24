import type { Metadata } from "next";

export const SITE_NAME = "한입 링크";
export const SITE_DESCRIPTION = "나만의 북마크를 폴더별로 관리하세요";

/** 링크 미리보기(오픈그래프/트위터)에 쓰는 썸네일. public/thumbnail.png */
const THUMBNAIL = {
  url: "/thumbnail.png",
  width: 2400,
  height: 1260,
  alt: `${SITE_NAME} - ${SITE_DESCRIPTION}`,
};

/** 절대 주소가 필요한 메타 태그(og:image 등)의 기준 URL */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(
    explicit ?? (vercel ? `https://${vercel}` : "http://localhost:3000"),
  );
}

/**
 * 페이지별 메타데이터. 제목은 루트 레이아웃의 템플릿("%s | 한입 링크")이 붙는다.
 * openGraph/twitter는 자식 세그먼트에서 정의하면 부모 값을 통째로 대체하므로
 * 썸네일 이미지까지 여기서 함께 채운다.
 */
export function pageMetadata(
  title: string,
  description: string = SITE_DESCRIPTION,
): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [THUMBNAIL],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [THUMBNAIL.url],
    },
  };
}

/** 사이트 기본(홈) 메타데이터 */
export const defaultMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // app/favicon.ico는 파일 규칙으로 자동 연결되지만 명시해 둔다
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [THUMBNAIL],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [THUMBNAIL.url],
  },
};
