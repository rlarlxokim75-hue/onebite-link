import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/header/header";
import SidebarLoader from "@/components/sidebar/sidebar-loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 북마크를 폴더별로 관리하세요",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[var(--bg)] text-[var(--text)]">
        <Header />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 md:flex-row px-5 pt-9 pb-12">
          <Suspense
            fallback={<aside className="w-full shrink-0 md:w-60" aria-hidden />}
          >
            <SidebarLoader />
          </Suspense>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
