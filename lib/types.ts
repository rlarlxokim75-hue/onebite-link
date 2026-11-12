export type Folder = {
  id: number;
  name: string;
};

export type Bookmark = {
  id: number;
  title: string;
  url: string;
  description: string;
  folderId: number | null;
  createdAt: string;
};
