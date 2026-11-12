"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bookmarks, folders } from "@/lib/mock-data";

export type CreateFolderState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MAX_NAME_LENGTH = 20;

export async function createFolder(
  _prev: CreateFolderState,
  formData: FormData,
): Promise<CreateFolderState> {
  const raw = formData.get("name");
  const name = typeof raw === "string" ? raw.trim() : "";

  if (!name) {
    return { status: "error", message: "폴더 이름을 입력해 주세요" };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return {
      status: "error",
      message: `폴더 이름은 ${MAX_NAME_LENGTH}자 이하로 입력해 주세요`,
    };
  }
  if (folders.some((folder) => folder.name === name)) {
    return { status: "error", message: "이미 같은 이름의 폴더가 있어요" };
  }

  // 목업 단계: 서버 메모리의 배열에 추가 (서버 재시작 시 초기화됨)
  const nextId = Math.max(0, ...folders.map((folder) => folder.id)) + 1;
  folders.push({ id: nextId, name });

  // 사이드바(레이아웃)와 새 링크 폼의 폴더 목록을 갱신
  revalidatePath("/", "layout");

  return { status: "success" };
}

export type DeleteFolderState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function deleteFolder(
  _prev: DeleteFolderState,
  formData: FormData,
): Promise<DeleteFolderState> {
  const id = Number(formData.get("id"));
  const index = folders.findIndex((folder) => folder.id === id);

  if (index === -1) {
    return { status: "error", message: "이미 삭제되었거나 없는 폴더예요" };
  }

  // 목업 단계: 서버 메모리에서 제거하고, 속해 있던 링크는 '폴더 없음'으로 이동
  folders.splice(index, 1);
  for (const bookmark of bookmarks) {
    if (bookmark.folderId === id) bookmark.folderId = null;
  }

  revalidatePath("/", "layout");

  // 삭제한 폴더 페이지를 보고 있었다면 전체 목록으로 이동
  if (formData.get("redirectHome") === "true") redirect("/");

  return { status: "success" };
}
