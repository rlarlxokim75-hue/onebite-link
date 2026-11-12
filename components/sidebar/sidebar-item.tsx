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
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active
          ? "bg-zinc-900 font-semibold text-white"
          : "text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span
          className={`ml-2 text-xs tabular-nums ${
            active ? "text-zinc-300" : "text-zinc-400"
          }`}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
