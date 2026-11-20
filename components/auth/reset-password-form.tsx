"use client";

import { useActionState, useState } from "react";
import { resetPassword, type ResetPasswordState } from "@/app/actions";
import Toast from "@/components/common/toast";
import AuthField from "./auth-field";

const initialState: ResetPasswordState = { status: "idle" };

export default function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(
    resetPassword,
    initialState,
  );
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [dismissedKey, setDismissedKey] = useState<number>();

  const showToast =
    state.status === "error" && state.key !== dismissedKey && !!state.message;

  return (
    <>
      {showToast && (
        <Toast
          message={state.message!}
          onClose={() => setDismissedKey(state.key)}
        />
      )}
      <form action={formAction} className="flex flex-col gap-5">
        <AuthField
          label="새 비밀번호"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="새 비밀번호"
          autoFocus
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="새 비밀번호 확인"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="새 비밀번호를 한 번 더 입력"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <button
          type="submit"
          disabled={password === "" || passwordConfirm === "" || pending}
          className="btn-primary mt-2 w-full rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {pending ? "변경 중…" : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
