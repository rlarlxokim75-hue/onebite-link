import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import AuthCard from "@/components/auth/auth-card";
import SignupForm from "@/components/auth/signup-form";

export const metadata: Metadata = pageMetadata(
  "회원가입",
  "한입 링크에 가입하고 북마크를 폴더별로 관리하세요",
);

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
