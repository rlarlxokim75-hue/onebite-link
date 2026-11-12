"use client";

import { useActionState } from "react";
import { createBookmark, type BookmarkFormState } from "@/app/actions";
import type { Folder } from "@/lib/types";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

type Props = {
  folders: Folder[];
};

const initialState: BookmarkFormState = { status: "idle" };

export default function NewLinkForm({ folders }: Props) {
  const [state, formAction] = useActionState(createBookmark, initialState);
  const error = state.status === "error" ? state.message : undefined;

  return (
    <form
      action={formAction}
      className="flex max-w-[640px] flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[var(--shadow-card)]"
    >
      {/* 에러 후 폼이 리셋되어도 입력값이 유지되도록, 결과가 바뀔 때마다 기본값과 함께 다시 마운트 */}
      <LinkUrlInput key={`url-${state.url}`} defaultValue={state.url} error={error} />
      <FolderSelect
        key={`folder-${state.folderId}`}
        folders={folders}
        defaultValue={state.folderId}
      />
      <SaveButton />
    </form>
  );
}
