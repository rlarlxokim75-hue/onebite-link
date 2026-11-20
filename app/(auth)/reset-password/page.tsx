import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "비밀번호 재설정 | 한입 링크",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="비밀번호 재설정"
      footer={{ text: "다시 로그인하려면", linkLabel: "로그인", href: "/login" }}
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
