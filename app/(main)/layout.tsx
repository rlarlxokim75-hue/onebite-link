import type { Metadata } from "next";
import { Suspense } from "react";
import AuthListener from "@/components/common/auth-listener";
import Header from "@/components/header/header";
import SidebarLoader from "@/components/sidebar/sidebar-loader";

// 로그인한 사용자 전용 페이지라 검색 노출 제외
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** 헤더와 사이드바가 있는 기본 레이아웃 (로그인/회원가입 페이지는 제외) */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthListener />
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 md:flex-row px-5 pt-9 pb-12">
        <Suspense
          fallback={<aside className="w-full shrink-0 md:w-60" aria-hidden />}
        >
          <SidebarLoader />
        </Suspense>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
