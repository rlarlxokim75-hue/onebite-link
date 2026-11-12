"use client";

import { useRef, useState } from "react";
import FolderNameForm from "@/components/common/folder-name-form";
import Modal from "@/components/common/modal";
import type { Folder } from "@/lib/types";

type Props = {
  folder: Folder;
};

export default function EditFolderButton({ folder }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);
  const titleId = `edit-folder-title-${folder.id}`;

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
        aria-label={`${folder.name} 폴더 이름 수정`}
        title="폴더 이름 수정"
        className="folder-action folder-action-edit flex size-8 items-center justify-center rounded-lg text-[var(--text-sub)]"
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
          <path d="M13.5 3.5a1.77 1.77 0 0 1 2.5 2.5L7 15l-3.5 1 1-3.5 9-9Z" />
          <path d="M12 5l3 3" />
        </svg>
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <FolderNameForm
          key={formKey}
          folder={folder}
          titleId={titleId}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
