import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import { getCountByFolder } from "@/lib/folder-counts";
import { bookmarks, folders } from "@/lib/mock-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 북마크를 폴더별로 관리하세요",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            folders={folders}
            totalCount={bookmarks.length}
            countByFolder={getCountByFolder(bookmarks)}
          />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
