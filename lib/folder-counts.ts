import type { Bookmark } from "./types";

export function getCountByFolder(bookmarks: Bookmark[]) {
  return bookmarks.reduce<Record<number, number>>((acc, bookmark) => {
    if (bookmark.folderId !== null) {
      acc[bookmark.folderId] = (acc[bookmark.folderId] ?? 0) + 1;
    }
    return acc;
  }, {});
}
