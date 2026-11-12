"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  count?: number;
};

export default function SidebarItem({ label, href, count }: Props) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`nav-item flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[16px] ${
        active ? "font-bold text-[var(--accent)]" : "text-[var(--text)]"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span
          className={`ml-2 rounded-lg px-2 py-0.5 text-[13px] font-bold tabular-nums ${
            active
              ? "bg-[var(--card)] text-[var(--accent)]"
              : "bg-[var(--bg)] text-[var(--text-sub)]"
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
