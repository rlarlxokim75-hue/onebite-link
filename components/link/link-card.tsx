import type { Bookmark, Folder } from "@/lib/types";
import DeleteLinkButton from "./delete-link-button";
import EditLinkButton from "./edit-link-button";
import LinkThumbnail from "./link-thumbnail";

type Props = {
  bookmark: Bookmark;
  /** 수정 모달의 폴더 선택 목록 */
  folders: Folder[];
};

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function LinkCard({ bookmark, folders }: Props) {
  const hostname = getHostname(bookmark.url);

  // <a> 안에 <button>을 넣을 수 없으므로, 카드 링크와 액션 버튼을 형제로 두고 wrapper로 감싼다
  return (
    <div className="link-card relative h-full">
      {/* 마우스를 올렸을 때 우측 상단에 나타나는 [수정][삭제] 버튼 */}
      <div className="link-actions pointer-events-none absolute top-3 right-3 z-[1] flex gap-1.5">
        <EditLinkButton bookmark={bookmark} folders={folders} />
        <DeleteLinkButton bookmark={bookmark} />
      </div>
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
    </div>
  );
}
