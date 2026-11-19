import { cookies } from "next/headers";
import { getFolders } from "@/lib/db-folders";
import { createClient } from "@/utils/supabase/server";
import Sidebar from "./sidebar";

/** DB에서 폴더와 링크 개수를 불러와 사이드바를 렌더링 (요청 시점 데이터라 Suspense 안에서 사용) */
export default async function SidebarLoader() {
  const supabase = createClient(await cookies());
  const [folders, { data: links, error }] = await Promise.all([
    getFolders(),
    supabase.from("link").select("folder_id"),
  ]);
  if (error) throw new Error(`링크 개수 조회 실패: ${error.message}`);

  const countByFolder: Record<number, number> = {};
  for (const { folder_id } of links) {
    if (folder_id !== null) {
      countByFolder[folder_id] = (countByFolder[folder_id] ?? 0) + 1;
    }
  }

  return (
    <Sidebar
      folders={folders}
      totalCount={links.length}
      countByFolder={countByFolder}
    />
  );
}
