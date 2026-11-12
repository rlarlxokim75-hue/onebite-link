import type { Bookmark, Folder } from "./types";

export const folders: Folder[] = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "읽을거리" },
  { id: 4, name: "도구" },
];

export const bookmarks: Bookmark[] = [
  {
    id: 1,
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "App Router, 캐싱, 렌더링 전략 등 Next.js의 모든 것",
    folderId: 1,
    createdAt: "2026-11-10",
  },
  {
    id: 2,
    title: "React",
    url: "https://react.dev",
    description: "UI를 만들기 위한 라이브러리, React 공식 문서",
    folderId: 1,
    createdAt: "2026-11-09",
  },
  {
    id: 3,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 퍼스트 CSS 프레임워크",
    folderId: 2,
    createdAt: "2026-11-08",
  },
  {
    id: 4,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 기술에 대한 레퍼런스와 가이드",
    folderId: 3,
    createdAt: "2026-11-05",
  },
  {
    id: 5,
    title: "Figma",
    url: "https://www.figma.com",
    description: "협업형 인터페이스 디자인 도구",
    folderId: 2,
    createdAt: "2026-11-03",
  },
  {
    id: 6,
    title: "GitHub",
    url: "https://github.com",
    description: "코드 호스팅과 협업을 위한 플랫폼",
    folderId: 4,
    createdAt: "2026-11-01",
  },
];
