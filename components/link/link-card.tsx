import type { Bookmark } from "@/lib/types";
import LinkThumbnail from "./link-thumbnail";

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
      className="card-hover flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--card)] shadow-[var(--shadow-card)]"
    >
      {bookmark.thumbnail && <LinkThumbnail src={bookmark.thumbnail} />}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[17px] font-bold uppercase text-[var(--accent)]"
          >
            {hostname.charAt(0)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[17px] leading-[1.4] font-bold text-[var(--text)]">
              {bookmark.title}
            </h3>
            <p className="truncate text-[14px] leading-[1.4] text-[var(--text-sub)]">
              {hostname}
            </p>
          </div>
        </div>
        {bookmark.description && (
          <p className="line-clamp-2 text-[15px] leading-[1.6] text-[var(--text-sub)]">
            {bookmark.description}
          </p>
        )}
        <time
          dateTime={bookmark.createdAt}
          className="mt-auto text-[14px] leading-[1.4] text-[var(--text-sub)]"
        >
          {bookmark.createdAt}
        </time>
      </div>
    </a>
  );
}
