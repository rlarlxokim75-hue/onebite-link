import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** 헤더·사이드바 없이 카드만 가운데에 놓는 인증 페이지 레이아웃 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      {children}
    </main>
  );
}
