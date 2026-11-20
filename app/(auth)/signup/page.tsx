import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import SignupForm from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "회원가입 | 한입 링크",
};

export default function SignupPage() {
  return (
    <AuthCard
      title="회원가입"
      footer={{ text: "이미 계정이 있나요?", linkLabel: "로그인", href: "/login" }}
    >
      <SignupForm />
    </AuthCard>
  );
}
