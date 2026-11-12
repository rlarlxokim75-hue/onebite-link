"use client";

import { useRef, useState } from "react";
import { deleteFolder } from "@/app/actions";
import ConfirmDeleteForm from "@/components/common/confirm-delete-form";
import { TrashIcon } from "@/components/common/icons";
import Modal from "@/components/common/modal";
import type { Folder } from "@/lib/types";

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
        className="folder-action folder-action-delete flex size-8 items-center justify-center rounded-lg text-[var(--text-sub)]"
      >
        <TrashIcon />
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <ConfirmDeleteForm
          key={formKey}
          action={deleteFolder}
          // 삭제한 폴더 페이지를 보고 있었다면 서버에서 전체 목록으로 이동
          fields={{ id: folder.id, redirectHome: String(isActive) }}
          title={`‘${folder.name}’ 폴더를 삭제할까요?`}
          description={
            count > 0
              ? `폴더 안의 링크 ${count}개는 삭제되지 않고 ‘폴더 없음’으로 옮겨져요.`
              : "삭제한 폴더는 되돌릴 수 없어요."
          }
          titleId={titleId}
          onCancel={close}
          onSuccess={close}
        />
      </Modal>
    </>
  );
}
