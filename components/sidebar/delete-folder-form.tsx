"use client";

import { useActionState, useEffect } from "react";
import { deleteFolder, type DeleteFolderState } from "@/app/actions";
import type { Folder } from "@/lib/types";

type Props = {
  folder: Folder;
  count: number;
  isActive: boolean;
  titleId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const initialState: DeleteFolderState = { status: "idle" };

export default function DeleteFolderForm({
  folder,
  count,
  isActive,
  titleId,
  onCancel,
  onSuccess,
}: Props) {
  const [state, formAction, pending] = useActionState(
    deleteFolder,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-5 p-6">
      <input type="hidden" name="id" value={folder.id} />
      <input type="hidden" name="redirectHome" value={String(isActive)} />

      <div className="flex flex-col gap-2">
        <h2
          id={titleId}
          className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
        >
          ‘{folder.name}’ 폴더를 삭제할까요?
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--text-sub)]">
          {count > 0
            ? `폴더 안의 링크 ${count}개는 삭제되지 않고 ‘폴더 없음’으로 옮겨져요.`
            : "삭제한 폴더는 되돌릴 수 없어요."}
        </p>
        {state.status === "error" && (
          <p role="alert" className="text-[14px] text-[var(--error)]">
            {state.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          autoFocus
          className="btn-neutral flex-1 rounded-xl bg-[var(--bg)] px-5 py-3.5 text-[17px] font-bold text-[var(--text-sub)]"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={pending}
          className="btn-danger flex-1 rounded-xl bg-[var(--error)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {pending ? "삭제 중…" : "삭제"}
        </button>
      </div>
    </form>
  );
}
