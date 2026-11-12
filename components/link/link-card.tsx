import type { Bookmark } from "@/lib/types";

type Props = {
  bookmark: Bookmark;
};

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ bookmark }: Props) {
  const hostname = getHostname(bookmark.url);

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-sm font-bold uppercase text-zinc-600"
        >
          {hostname.charAt(0)}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-zinc-900">
            {bookmark.title}
          </h3>
          <p className="truncate text-xs text-zinc-400">{hostname}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-zinc-600">
        {bookmark.description}
      </p>
      <time
        dateTime={bookmark.createdAt}
        className="mt-auto text-xs text-zinc-400"
      >
        {bookmark.createdAt}
      </time>
    </a>
  );
}
