import type { Bookmark } from "@/lib/types";
import LinkCard from "./link-card";

type Props = {
  bookmarks: Bookmark[];
};

export default function LinkGrid({ bookmarks }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-400">
        아직 등록된 링크가 없습니다.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <LinkCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
}
