"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { bookmarks, folders } from "@/lib/mock-data";
import { fetchOpenGraph, OpenGraphError } from "@/lib/og";

export type BookmarkFormState = {
  status: "idle" | "error";
  message?: string;
  /** 에러 시 입력값 복원용 */
  url?: string;
  folderId?: string;
};

export async function createBookmark(
  _prev: BookmarkFormState,
  formData: FormData,
): Promise<BookmarkFormState> {
  const rawUrl = String(formData.get("url") ?? "");
  const rawFolderId = String(formData.get("folderId") ?? "");
  const keep = { url: rawUrl, folderId: rawFolderId };

  let folderId: number | null = null;
  if (rawFolderId) {
    folderId = Number(rawFolderId);
    if (!folders.some((folder) => folder.id === folderId)) {
      return { status: "error", message: "선택한 폴더가 없어요", ...keep };
    }
  }

  let og;
  try {
    og = await fetchOpenGraph(rawUrl);
  } catch (error) {
    const message =
      error instanceof OpenGraphError
        ? error.message
        : "링크 정보를 가져오지 못했어요";
    return { status: "error", message, ...keep };
  }

  // 목업 단계: 서버 메모리의 배열 맨 앞에 추가 (최신순)
  const nextId = Math.max(0, ...bookmarks.map((bookmark) => bookmark.id)) + 1;
  bookmarks.unshift({
    id: nextId,
    title: og.title,
    url: og.url,
    description: og.description,
    thumbnail: og.thumbnail,
    folderId,
    createdAt: new Date().toLocaleDateString("sv-SE", {
      timeZone: "Asia/Seoul",
    }), // YYYY-MM-DD
  });

  revalidatePath("/", "layout");
  redirect(folderId ? `/folder/${folderId}` : "/");
}

export type FolderFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MAX_NAME_LENGTH = 20;

/** 폴더 이름 검증. 통과하면 다듬은 이름을, 실패하면 에러 상태를 반환 */
function validateFolderName(
  formData: FormData,
  excludeId?: number,
): { name: string } | FolderFormState {
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
  if (
    folders.some((folder) => folder.name === name && folder.id !== excludeId)
  ) {
    return { status: "error", message: "이미 같은 이름의 폴더가 있어요" };
  }
  return { name };
}

export async function createFolder(
  _prev: FolderFormState,
  formData: FormData,
): Promise<FolderFormState> {
  const result = validateFolderName(formData);
  if (!("name" in result)) return result;

  // 목업 단계: 서버 메모리의 배열에 추가 (서버 재시작 시 초기화됨)
  const nextId = Math.max(0, ...folders.map((folder) => folder.id)) + 1;
  folders.push({ id: nextId, name: result.name });

  // 사이드바(레이아웃)와 새 링크 폼의 폴더 목록을 갱신
  revalidatePath("/", "layout");

  return { status: "success" };
}

export async function updateFolder(
  _prev: FolderFormState,
  formData: FormData,
): Promise<FolderFormState> {
  const id = Number(formData.get("id"));
  const folder = folders.find((item) => item.id === id);
  if (!folder) {
    return { status: "error", message: "이미 삭제되었거나 없는 폴더예요" };
  }

  const result = validateFolderName(formData, id);
  if (!("name" in result)) return result;

  folder.name = result.name;

  // 사이드바, 폴더 페이지 제목, 새 링크 폼의 폴더 목록을 갱신
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
