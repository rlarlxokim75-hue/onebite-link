"use client";

import { useRef, useState } from "react";
import { deleteBookmark } from "@/app/actions";
import ConfirmDeleteForm from "@/components/common/confirm-delete-form";
import { TrashIcon } from "@/components/common/icons";
import Modal from "@/components/common/modal";
import type { Bookmark } from "@/lib/types";

type Props = {
  bookmark: Bookmark;
};

export default function DeleteLinkButton({ bookmark }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formKey, setFormKey] = useState(0);
  const titleId = `delete-link-title-${bookmark.id}`;

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
        aria-label={`${bookmark.title} 링크 삭제`}
        title="링크 삭제"
        className="link-delete absolute top-3 right-3 z-[1] flex size-9 items-center justify-center rounded-xl bg-[var(--card)] text-[var(--text-sub)] shadow-[var(--shadow-card)]"
      >
        <TrashIcon />
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <ConfirmDeleteForm
          key={formKey}
          action={deleteBookmark}
          fields={{ id: bookmark.id }}
          title="이 링크를 삭제할까요?"
          description={
            <>
              <span className="font-bold text-[var(--text)]">
                {bookmark.title}
              </span>
              <br />
              삭제한 링크는 되돌릴 수 없어요.
            </>
          }
          titleId={titleId}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
