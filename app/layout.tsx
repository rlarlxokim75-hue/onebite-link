import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 북마크를 폴더별로 관리하세요",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
