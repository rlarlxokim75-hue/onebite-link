"use client";

import { useActionState, useEffect } from "react";
import { updateBookmark, type UpdateBookmarkState } from "@/app/actions";
import FolderSelect from "@/components/new-link/folder-select";
import type { Bookmark, Folder } from "@/lib/types";

type Props = {
  bookmark: Bookmark;
  folders: Folder[];
  titleId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const initialState: UpdateBookmarkState = { status: "idle" };

/** 링크 수정 모달 본문: 폴더 / 제목 / 설명만 수정 가능 */
export default function EditLinkForm({
  bookmark,
  folders,
  titleId,
  onCancel,
  onSuccess,
}: Props) {
  const [state, formAction, pending] = useActionState(
    updateBookmark,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  const errorId = `${titleId}-error`;

  return (
    <form action={formAction} className="flex flex-col gap-5 p-6">
      <input type="hidden" name="id" value={bookmark.id} />

      <h2
        id={titleId}
        className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
      >
        링크 수정
      </h2>

      <FolderSelect
        folders={folders}
        defaultValue={bookmark.folderId === null ? "" : String(bookmark.folderId)}
      />

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-bold text-[var(--text-sub)]">
          제목
        </span>
        <input
          type="text"
          name="title"
          required
          maxLength={200}
          autoFocus
          autoComplete="off"
          defaultValue={bookmark.title}
          placeholder="링크 제목"
          className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)]"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-bold text-[var(--text-sub)]">
          설명
        </span>
        <textarea
          name="description"
          rows={3}
          maxLength={500}
          defaultValue={bookmark.description}
          placeholder="링크에 대한 설명 (선택)"
          className="field resize-none rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] leading-[1.6] text-[var(--text)]"
        />
      </label>

      {state.status === "error" && (
        <p
          id={errorId}
          role="alert"
          className="-mt-2 text-[14px] leading-[1.4] text-[var(--error)]"
        >
          {state.message}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn-neutral flex-1 rounded-xl bg-[var(--bg)] px-5 py-3.5 text-[17px] font-bold text-[var(--text-sub)]"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary flex-1 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
