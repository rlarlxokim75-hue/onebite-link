import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="link-hover flex items-center gap-2 text-[20px] font-bold text-[var(--text)]"
    >
      <span
        aria-hidden
        className="flex size-7 items-center justify-center rounded-lg bg-[var(--accent)] text-[14px] font-bold text-white"
      >
        한
      </span>
      한입 링크
    </Link>
  );
}
