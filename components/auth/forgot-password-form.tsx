"use client";

import { useActionState, useState } from "react";
import { sendPasswordReset, type ForgotPasswordState } from "@/app/actions";
import Toast from "@/components/common/toast";
import AuthField from "./auth-field";

const initialState: ForgotPasswordState = { status: "idle" };

export default function ForgotPasswordForm({ expired }: { expired: boolean }) {
  const [state, formAction, pending] = useActionState(
    sendPasswordReset,
    initialState,
  );
  const [email, setEmail] = useState("");
  const [dismissedKey, setDismissedKey] = useState<number>();
  const [dismissedExpired, setDismissedExpired] = useState(false);

  // 만료된 링크로 돌아온 경우의 안내
  const expiredMessage =
    expired && state.status === "idle" && !dismissedExpired
      ? "링크가 만료되었거나 올바르지 않아요. 다시 요청해 주세요"
      : undefined;
  const message =
    state.status !== "idle" && state.key !== dismissedKey
      ? state.message
      : expiredMessage;

  return (
    <>
      {message && (
        <Toast
          message={message}
          onClose={() =>
            state.status === "idle"
              ? setDismissedExpired(true)
              : setDismissedKey(state.key)
          }
        />
      )}
      <form action={formAction} className="flex flex-col gap-5">
        <AuthField
          label="이메일"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          autoFocus
          value={email}
          onChange={setEmail}
        />
        <button
          type="submit"
          disabled={email.trim() === "" || pending}
          className="btn-primary mt-2 w-full rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {pending ? "발송 중…" : "비밀번호 리셋 링크 발송"}
        </button>
      </form>
    </>
  );
}
