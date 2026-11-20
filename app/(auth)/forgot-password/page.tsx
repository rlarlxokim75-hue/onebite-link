import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "비밀번호 찾기 | 한입 링크",
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string }>;
}) {
  const { expired } = await searchParams;
  return (
    <AuthCard
      title="비밀번호 찾기"
      footer={{ text: "비밀번호가 기억나나요?", linkLabel: "로그인", href: "/login" }}
    >
      <ForgotPasswordForm expired={expired === "1"} />
    </AuthCard>
  );
}
