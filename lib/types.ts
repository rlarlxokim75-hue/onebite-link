export type Folder = {
  id: number;
  name: string;
};

export type Bookmark = {
  id: number;
  title: string;
  url: string;
  description: string;
  /** 오픈 그래프 썸네일 이미지 주소 (없으면 null/미지정) */
  thumbnail?: string | null;
  folderId: number | null;
  createdAt: string;
};
