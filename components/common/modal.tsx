"use client";

type Props = {
  ref: React.Ref<HTMLDialogElement>;
  labelledBy: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** 네이티브 <dialog> 기반 모달: 화면 중앙 배치, ESC 닫기, 포커스 트랩 기본 제공 */
export default function Modal({ ref, labelledBy, onClose, children }: Props) {
  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      // 바깥(배경) 클릭 시 닫기
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="modal m-auto w-[calc(100%-40px)] max-w-[400px] rounded-2xl bg-[var(--card)] p-0 text-[var(--text)] shadow-[var(--shadow-modal)]"
    >
      {children}
    </dialog>
  );
}
