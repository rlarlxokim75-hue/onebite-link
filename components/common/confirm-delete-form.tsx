"use client";

import { useActionState, useEffect } from "react";
import type { DeleteState } from "@/app/actions";

type Props = {
  action: (prev: DeleteState, formData: FormData) => Promise<DeleteState>;
  /** 액션에 함께 보낼 값 (id 등) */
  fields: Record<string, string | number>;
  title: React.ReactNode;
  description: React.ReactNode;
  titleId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const initialState: DeleteState = { status: "idle" };

/** 삭제 확인 모달 본문: 제목 + 안내 + [취소][삭제] */
export default function ConfirmDeleteForm({
  action,
  fields,
  title,
  description,
  titleId,
  onCancel,
  onSuccess,
}: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.status === "success") onSuccess();
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-5 p-6">
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div className="flex flex-col gap-2">
        <h2
          id={titleId}
          className="text-[20px] leading-[1.4] font-bold text-[var(--text)]"
        >
          {title}
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--text-sub)]">
          {description}
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
          // 실수로 삭제하지 않도록 취소에 기본 포커스
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
