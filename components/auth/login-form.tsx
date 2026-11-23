"use client";

import { useActionState, useState } from "react";
import { signIn, type LoginState } from "@/app/actions";
import Toast from "@/components/common/toast";
import AuthField from "./auth-field";
import KakaoLoginButton from "./kakao-login-button";

const initialState: LoginState = { status: "idle" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 닫은 토스트의 key를 기억해, 같은 응답으로는 다시 뜨지 않게 한다
  const [dismissedKey, setDismissedKey] = useState<number>();

  const canSubmit = email.trim() !== "" && password !== "";
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
          label="이메일"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          autoFocus
          value={email}
          onChange={setEmail}
        />
        <AuthField
          label="비밀번호"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          value={password}
          onChange={setPassword}
        />
        <button
          type="submit"
          disabled={!canSubmit || pending}
          className="btn-primary mt-2 w-full rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {pending ? "로그인 중…" : "로그인"}
        </button>
      </form>
      <div className="mt-3">
        <KakaoLoginButton />
      </div>
    </>
  );
}
