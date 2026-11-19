import { getCountByFolder } from "@/lib/folder-counts";
import { getFolders } from "@/lib/db-folders";
import { bookmarks } from "@/lib/mock-data";
import Sidebar from "./sidebar";

/** DB에서 폴더를 불러와 사이드바를 렌더링 (요청 시점 데이터라 Suspense 안에서 사용) */
export default async function SidebarLoader() {
  const folders = await getFolders();
  return (
    <Sidebar
      folders={folders}
      totalCount={bookmarks.length}
      countByFolder={getCountByFolder(bookmarks)}
    />
  );
}
