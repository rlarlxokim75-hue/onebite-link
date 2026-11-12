"use client";

import { useRef, useState } from "react";
import Modal from "@/components/common/modal";
import NewFolderForm from "./new-folder-form";

export default function NewFolderButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // 열 때마다 폼을 새로 마운트해서 이전 입력값/에러를 초기화
  const [formKey, setFormKey] = useState(0);

  const open = () => {
    setFormKey((key) => key + 1);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="btn-secondary flex items-center gap-1 rounded-xl bg-[var(--accent-soft)] px-4 py-2 text-[15px] font-bold text-[var(--accent)]"
      >
        <span aria-hidden className="text-lg leading-none">
          +
        </span>
        새 폴더
      </button>

      <Modal ref={dialogRef} labelledBy="new-folder-title" onClose={close}>
        <NewFolderForm key={formKey} onCancel={close} onSuccess={close} />
      </Modal>
    </>
  );
}
