import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      extraLink={{ label: "비밀번호를 잊으셨나요?", href: "/forgot-password" }}
      footer={{ text: "아직 계정이 없나요?", linkLabel: "회원가입", href: "/signup" }}
    >
      <LoginForm />
    </AuthCard>
  );
}
