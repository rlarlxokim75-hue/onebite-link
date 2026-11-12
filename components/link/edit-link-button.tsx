"use client";

import { useRef, useState } from "react";
import { PencilIcon } from "@/components/common/icons";
import Modal from "@/components/common/modal";
import type { Bookmark, Folder } from "@/lib/types";
import EditLinkForm from "./edit-link-form";

type Props = {
  bookmark: Bookmark;
  folders: Folder[];
};

export default function EditLinkButton({ bookmark, folders }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // 열 때마다 폼을 새로 마운트해서 최신 링크 정보로 초기화
  const [formKey, setFormKey] = useState(0);
  const titleId = `edit-link-title-${bookmark.id}`;

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
        aria-label={`${bookmark.title} 링크 수정`}
        title="링크 수정"
        className="link-action link-action-edit flex size-9 items-center justify-center rounded-xl bg-[var(--card)] text-[var(--text-sub)] shadow-[var(--shadow-card)]"
      >
        <PencilIcon />
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <EditLinkForm
          key={formKey}
          bookmark={bookmark}
          folders={folders}
          titleId={titleId}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
