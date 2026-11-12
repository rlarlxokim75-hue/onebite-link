import type { Bookmark } from "@/lib/types";
import LinkCard from "./link-card";

type Props = {
  bookmarks: Bookmark[];
};

export default function LinkGrid({ bookmarks }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--card)] shadow-[var(--shadow-card)]">
        <span aria-hidden className="text-[32px]">
          📭
        </span>
        <p className="text-[17px] text-[var(--text-sub)]">
          아직 등록된 링크가 없어요
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <LinkCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
}
