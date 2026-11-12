"use client";

import { useRef, useState } from "react";
import FolderNameForm from "@/components/common/folder-name-form";
import Modal from "@/components/common/modal";

const TITLE_ID = "new-folder-title";

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

      <Modal ref={dialogRef} labelledBy={TITLE_ID} onClose={close}>
        <FolderNameForm
          key={formKey}
          titleId={TITLE_ID}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
