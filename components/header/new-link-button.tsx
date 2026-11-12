import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary flex items-center gap-1 rounded-xl bg-[var(--accent)] px-4 py-2 text-[15px] font-bold text-white"
    >
      <span aria-hidden className="text-lg leading-none">
        +
      </span>
      새 링크
    </Link>
  );
}
