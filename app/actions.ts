"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchOpenGraph, OpenGraphError } from "@/lib/og";
import { createClient } from "@/utils/supabase/server";

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

  const supabase = createClient(await cookies());

  let folderId: number | null = null;
  if (rawFolderId) {
    folderId = Number(rawFolderId);
    const { data: folder } = await supabase
      .from("folder")
      .select("id")
      .eq("id", folderId)
      .maybeSingle();
    if (!folder) {
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

  const { error } = await supabase.from("link").insert({
    url: og.url,
    title: og.title,
    description: og.description,
    thumbnail_url: og.thumbnail,
    folder_id: folderId,
  });
  if (error) {
    return { status: "error", message: "링크를 저장하지 못했어요", ...keep };
  }

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
  return { name };
}

export async function createFolder(
  _prev: FolderFormState,
  formData: FormData,
): Promise<FolderFormState> {
  const result = validateFolderName(formData);
  if (!("name" in result)) return result;

  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("folder")
    .insert({ name: result.name });
  if (error) {
    return { status: "error", message: "폴더를 추가하지 못했어요" };
  }

  // 사이드바(레이아웃)와 새 링크 폼의 폴더 목록을 갱신
  revalidatePath("/", "layout");

  return { status: "success" };
}

export async function updateFolder(
  _prev: FolderFormState,
  formData: FormData,
): Promise<FolderFormState> {
  const id = Number(formData.get("id"));

  const result = validateFolderName(formData);
  if (!("name" in result)) return result;

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folder")
    .update({ name: result.name })
    .eq("id", id)
    .select("id");
  if (error) {
    return { status: "error", message: "폴더 이름을 수정하지 못했어요" };
  }
  if (data.length === 0) {
    return { status: "error", message: "이미 삭제되었거나 없는 폴더예요" };
  }

  // 사이드바, 폴더 페이지 제목, 새 링크 폼의 폴더 목록을 갱신
  revalidatePath("/", "layout");

  return { status: "success" };
}

export type UpdateBookmarkState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const MAX_TITLE_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 500;

export async function updateBookmark(
  _prev: UpdateBookmarkState,
  formData: FormData,
): Promise<UpdateBookmarkState> {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const rawFolderId = String(formData.get("folderId") ?? "");

  if (!title) {
    return { status: "error", message: "제목을 입력해 주세요" };
  }
  if (title.length > MAX_TITLE_LENGTH) {
    return {
      status: "error",
      message: `제목은 ${MAX_TITLE_LENGTH}자 이하로 입력해 주세요`,
    };
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return {
      status: "error",
      message: `설명은 ${MAX_DESCRIPTION_LENGTH}자 이하로 입력해 주세요`,
    };
  }

  const supabase = createClient(await cookies());

  let folderId: number | null = null;
  if (rawFolderId) {
    folderId = Number(rawFolderId);
    const { data: folder } = await supabase
      .from("folder")
      .select("id")
      .eq("id", folderId)
      .maybeSingle();
    if (!folder) {
      return { status: "error", message: "선택한 폴더가 없어요" };
    }
  }

  // 주소·썸네일·등록일은 유지하고 폴더 / 제목 / 설명만 갱신
  const { data, error } = await supabase
    .from("link")
    .update({ title, description, folder_id: folderId })
    .eq("id", id)
    .select("id");
  if (error) {
    return { status: "error", message: "링크를 수정하지 못했어요" };
  }
  if (data.length === 0) {
    return { status: "error", message: "이미 삭제되었거나 없는 링크예요" };
  }

  // 카드 목록과 사이드바의 폴더별 개수를 갱신
  revalidatePath("/", "layout");

  return { status: "success" };
}

export type DeleteState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function deleteBookmark(
  _prev: DeleteState,
  formData: FormData,
): Promise<DeleteState> {
  const id = Number(formData.get("id"));

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("link")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) {
    return { status: "error", message: "링크를 삭제하지 못했어요" };
  }
  if (data.length === 0) {
    return { status: "error", message: "이미 삭제되었거나 없는 링크예요" };
  }

  // 링크 목록과 사이드바의 폴더별 개수를 갱신
  revalidatePath("/", "layout");

  return { status: "success" };
}

export async function deleteFolder(
  _prev: DeleteState,
  formData: FormData,
): Promise<DeleteState> {
  const id = Number(formData.get("id"));

  // link.folder_id는 ON DELETE SET NULL이라 속한 링크는 DB가 '폴더 없음'으로 바꿔 준다
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folder")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) {
    return { status: "error", message: "폴더를 삭제하지 못했어요" };
  }
  if (data.length === 0) {
    return { status: "error", message: "이미 삭제되었거나 없는 폴더예요" };
  }

  revalidatePath("/", "layout");

  // 삭제한 폴더 페이지를 보고 있었다면 전체 목록으로 이동
  if (formData.get("redirectHome") === "true") redirect("/");

  return { status: "success" };
}

export type SignupState = {
  status: "idle" | "error";
  message?: string;
  /** 같은 메시지가 반복돼도 토스트가 다시 뜨도록 매 응답마다 달라지는 값 */
  key?: number;
  email?: string;
};

const MIN_PASSWORD_LENGTH = 6;

/** Supabase Auth 오류를 한국어 메시지로 변환 */
function signupErrorMessage(error: { code?: string; message: string }): string {
  switch (error.code) {
    case "user_already_exists":
    case "email_exists":
      return "이미 가입된 이메일이에요";
    case "weak_password":
      return `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 해요`;
    case "email_address_invalid":
    case "validation_failed":
      return "올바른 이메일 주소를 입력해 주세요";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "요청이 너무 많아요. 잠시 후 다시 시도해 주세요";
    case "signup_disabled":
      return "현재 회원가입을 할 수 없어요";
    default:
      return "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요";
  }
}

export async function signUp(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  const fail = (message: string): SignupState => ({
    status: "error",
    message,
    key: Date.now(),
    email,
  });

  if (!email || !password || !passwordConfirm) {
    return fail("이메일과 비밀번호를 모두 입력해 주세요");
  }
  if (password !== passwordConfirm) {
    return fail("비밀번호가 일치하지 않아요");
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return fail(`비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 해요`);
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return fail(signupErrorMessage(error));

  revalidatePath("/", "layout");
  redirect("/");
}

export type LoginState = {
  status: "idle" | "error";
  message?: string;
  /** 같은 메시지가 반복돼도 토스트가 다시 뜨도록 매 응답마다 달라지는 값 */
  key?: number;
};

/** Supabase Auth 로그인 오류를 한국어 메시지로 변환 */
function loginErrorMessage(error: { code?: string }): string {
  switch (error.code) {
    case "invalid_credentials":
      return "이메일 또는 비밀번호가 올바르지 않아요";
    case "email_not_confirmed":
      return "이메일 인증이 완료되지 않았어요. 메일함을 확인해 주세요";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "요청이 너무 많아요. 잠시 후 다시 시도해 주세요";
    case "user_banned":
      return "이용이 제한된 계정이에요";
    default:
      return "로그인에 실패했어요. 잠시 후 다시 시도해 주세요";
  }
}

export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fail = (message: string): LoginState => ({
    status: "error",
    message,
    key: Date.now(),
  });

  if (!email || !password) {
    return fail("이메일과 비밀번호를 모두 입력해 주세요");
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return fail(loginErrorMessage(error));

  revalidatePath("/", "layout");
  redirect("/");
}
