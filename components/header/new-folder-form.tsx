"use client";

import { useActionState, useEffect } from "react";
import { createFolder, type CreateFolderState } from "@/app/actions";

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
};

const initialState: CreateFolderState = { status: "idle" };

export default function NewFolderForm({ onCancel, onSuccess }: Props) {
  const [state, formAction, pending] = useActionState(
    createFolder,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  const hasError = state.status === "error";

  return (
    <form action={formAction} className="flex flex-col gap-5 p-6">
      <h2
        id="new-folder-title"
        className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
      >
        새 폴더 만들기
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
          placeholder="예) 공부, 맛집"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? "new-folder-error" : undefined}
          className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)]"
        />
        {hasError && (
          <p
            id="new-folder-error"
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
