import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import AuthField from "@/components/auth/auth-field";

export const metadata: Metadata = {
  title: "회원가입 | 한입 링크",
};

export default function SignupPage() {
  // UI만 구현: 회원가입 기능은 아직 연결하지 않음
  return (
    <AuthCard
      title="회원가입"
      footer={{ text: "이미 계정이 있나요?", linkLabel: "로그인", href: "/login" }}
    >
      <form className="flex flex-col gap-5">
        <AuthField
          label="이메일"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          autoFocus
        />
        <AuthField
          label="비밀번호"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호"
        />
        <AuthField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호를 한 번 더 입력"
        />
        <button
          type="submit"
          className="btn-primary mt-2 w-full rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          회원가입
        </button>
      </form>
    </AuthCard>
  );
}
