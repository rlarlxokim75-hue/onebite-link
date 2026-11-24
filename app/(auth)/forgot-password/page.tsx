import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import AuthCard from "@/components/auth/auth-card";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export const metadata: Metadata = pageMetadata(
  "비밀번호 찾기",
  "가입한 이메일로 비밀번호 재설정 링크를 받아보세요",
);

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
