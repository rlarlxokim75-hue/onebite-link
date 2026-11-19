import { cookies } from "next/headers";
import type { Folder } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

/** folder 테이블의 폴더를 생성 순서(id 오름차순)로 가져온다 */
export async function getFolders(): Promise<Folder[]> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folder")
    .select("id, name")
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록 조회 실패: ${error.message}`);
  return data;
}
