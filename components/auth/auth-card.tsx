import Link from "next/link";

type Props = {
  title: string;
  children: React.ReactNode;
  footer: { text: string; linkLabel: string; href: string };
};

/** 로그인/회원가입 공통 카드: 로고 텍스트 + 폼 + 하단 이동 링크 */
export default function AuthCard({ title, children, footer }: Props) {
  return (
    <div className="w-full max-w-[400px] rounded-2xl bg-[var(--card)] p-8 shadow-[var(--shadow-card)]">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-[24px] font-bold text-[var(--text)]">
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-lg bg-[var(--accent)] text-[16px] font-bold text-white"
          >
            한
          </span>
          한입 링크
        </div>
        <h1 className="text-[17px] leading-[1.4] text-[var(--text-sub)]">
          {title}
        </h1>
      </div>

      {children}

      <p className="mt-6 text-center text-[15px] text-[var(--text-sub)]">
        {footer.text}{" "}
        <Link
          href={footer.href}
          className="link-hover font-bold text-[var(--accent)]"
        >
          {footer.linkLabel}
        </Link>
      </p>
    </div>
  );
}
