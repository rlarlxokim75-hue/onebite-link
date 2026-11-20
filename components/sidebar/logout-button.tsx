"use client";

import { useFormStatus } from "react-dom";
import { signOut } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="nav-item flex w-full items-center rounded-xl px-3 py-2.5 text-left text-[16px] text-[var(--text-sub)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "로그아웃 중…" : "로그아웃"}
    </button>
  );
}

export default function LogoutButton() {
  return (
    <form action={signOut} className="mt-5 border-t border-[var(--hover-bg)] pt-3">
      <SubmitButton />
    </form>
  );
}
