"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
};

/** 화면 상단 중앙에 잠깐 나타났다 사라지는 토스트 */
export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-5">
      <div
        role="alert"
        className="pointer-events-auto flex max-w-[400px] items-center gap-3 rounded-xl bg-[var(--text)] px-5 py-3.5 text-[15px] font-bold text-white shadow-[var(--shadow-modal)]"
      >
        <span>{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="text-[18px] leading-none text-white/70 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
