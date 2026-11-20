import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import AuthField from "@/components/auth/auth-field";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default function LoginPage() {
  // UI만 구현: 로그인 기능은 아직 연결하지 않음
  return (
    <AuthCard
      title="로그인"
      footer={{ text: "아직 계정이 없나요?", linkLabel: "회원가입", href: "/signup" }}
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
          autoComplete="current-password"
          placeholder="비밀번호"
        />
        <button
          type="submit"
          className="btn-primary mt-2 w-full rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[17px] font-bold text-white"
        >
          로그인
        </button>
      </form>
    </AuthCard>
  );
}
