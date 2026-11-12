"use client";

import { useRef, useState } from "react";
import Modal from "@/components/common/modal";
import type { Folder } from "@/lib/types";
import DeleteFolderForm from "./delete-folder-form";

type Props = {
  folder: Folder;
  count: number;
  isActive: boolean;
};

export default function DeleteFolderButton({ folder, count, isActive }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);
  const titleId = `delete-folder-title-${folder.id}`;

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
        aria-label={`${folder.name} 폴더 삭제`}
        title="폴더 삭제"
        className="folder-delete absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-sub)]"
      >
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[18px]"
        >
          <path d="M3.5 5.5h13" />
          <path d="M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" />
          <path d="M5 5.5l.8 10.1a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L15 5.5" />
          <path d="M8.5 9v4.5M11.5 9v4.5" />
        </svg>
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <DeleteFolderForm
          key={formKey}
          folder={folder}
          count={count}
          isActive={isActive}
          titleId={titleId}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
