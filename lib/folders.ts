import { bookmarks, folders } from "./mock-data";

export function getFolder(id: string) {
  return folders.find((folder) => String(folder.id) === id);
}

export function getBookmarksByFolder(folderId: number) {
  return bookmarks.filter((bookmark) => bookmark.folderId === folderId);
}
