import { cookies } from "next/headers";
import type { Bookmark, Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};

const COLUMNS = "id, url, title, description, thumbnail_url, folder_id, created_at";

function toBookmark(row: LinkRow): Bookmark {
  return {
    id: row.id,
    url: row.url,
    title: row.title ?? row.url,
    description: row.description ?? "",
    thumbnail: row.thumbnail_url,
    folderId: row.folder_id,
    createdAt: new Date(row.created_at).toLocaleDateString("sv-SE", {
      timeZone: "Asia/Seoul",
    }), // YYYY-MM-DD
  };
}

/** link 테이블의 링크를 최신순으로 가져온다. folderId를 주면 해당 폴더의 링크만 */
export async function getLinks(folderId?: number): Promise<Bookmark[]> {
  const supabase = createClient(await cookies());
  let query = supabase
    .from("link")
    .select(COLUMNS)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });
  if (folderId !== undefined) query = query.eq("folder_id", folderId);

  const { data, error } = await query;
  if (error) throw new Error(`링크 목록 조회 실패: ${error.message}`);
  return (data as LinkRow[]).map(toBookmark);
}

/** 단일 폴더 조회 (없으면 undefined) */
export async function getFolderById(id: string): Promise<Folder | undefined> {
  if (!/^\d+$/.test(id)) return undefined;
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folder")
    .select("id, name")
    .eq("id", Number(id))
    .maybeSingle();
  if (error) throw new Error(`폴더 조회 실패: ${error.message}`);
  return data ?? undefined;
}
