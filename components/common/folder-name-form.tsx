"use client";

import { useActionState, useEffect } from "react";
import {
  createFolder,
  updateFolder,
  type FolderFormState,
} from "@/app/actions";
import type { Folder } from "@/lib/types";

type Props = {
  /** 전달하면 수정 모드, 없으면 새 폴더 생성 모드 */
  folder?: Folder;
  titleId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const initialState: FolderFormState = { status: "idle" };

export default function FolderNameForm({
  folder,
  titleId,
  onCancel,
  onSuccess,
}: Props) {
  const isEdit = folder !== undefined;
  const [state, formAction, pending] = useActionState(
    isEdit ? updateFolder : createFolder,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  const hasError = state.status === "error";
  const errorId = `${titleId}-error`;

  return (
    <form action={formAction} className="flex flex-col gap-5 p-6">
      {isEdit && <input type="hidden" name="id" value={folder.id} />}

      <h2
        id={titleId}
        className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
      >
        {isEdit ? "폴더 이름 수정" : "새 폴더 만들기"}
      </h2>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-bold text-[var(--text-sub)]">
          폴더 이름
        </span>
        <input
          type="text"
          name="name"
          required
          maxLength={20}
          autoFocus
          autoComplete="off"
          defaultValue={folder?.name}
          // 수정 모드에서는 기존 이름을 전체 선택해 바로 덮어쓸 수 있게
          onFocus={isEdit ? (e) => e.currentTarget.select() : undefined}
          placeholder="예) 공부, 맛집"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)]"
        />
        {hasError && (
          <p
            id={errorId}
            role="alert"
            className="text-[14px] leading-[1.4] text-[var(--error)]"
          >
            {state.message}
          </p>
        )}
      </label>

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
