"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { signUp, type SignupState } from "@/app/actions";
import Toast from "@/components/common/toast";
import AuthField from "./auth-field";

const initialState: SignupState = { status: "idle" };

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // 닫은 토스트의 key를 기억해, 같은 응답으로는 다시 뜨지 않게 한다
  const [dismissedKey, setDismissedKey] = useState<number>();

  const canSubmit =
    email.trim() !== "" && password !== "" && passwordConfirm !== "";
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
          autoComplete="new-password"
          placeholder="비밀번호"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 한 번 더 입력"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <button
          type="submit"
          disabled={!canSubmit || pending}
          className="btn-primary mt-2 w-full rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          {pending ? "가입 중…" : "회원가입"}
        </button>
        <p className="text-center text-[13px] text-[var(--text-sub)]">
          회원가입 시{" "}
          <Link href="/privacy" className="link-hover underline">
            개인정보 처리방침
          </Link>
          을 확인한 것으로 봅니다.
        </p>
      </form>
    </>
  );
}
