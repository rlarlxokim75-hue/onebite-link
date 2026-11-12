"use client";

import type { Folder } from "@/lib/types";
import LinkUrlInput from "./link-url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

type Props = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: Props) {
  return (
    <form
      // UI 단계: 저장 로직은 아직 연결하지 않음
      onSubmit={(e) => e.preventDefault()}
      className="flex max-w-[640px] flex-col gap-5 rounded-2xl bg-[var(--card)] p-6 shadow-[var(--shadow-card)]"
    >
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <SaveButton />
    </form>
  );
}
