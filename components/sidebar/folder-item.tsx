"use client";

import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import SidebarItem from "./sidebar-item";
import EditFolderButton from "./edit-folder-button";
import DeleteFolderButton from "./delete-folder-button";

type Props = {
  folder: Folder;
  count: number;
};

export default function FolderItem({ folder, count }: Props) {
  const href = `/folder/${folder.id}`;
  const isActive = usePathname() === href;

  return (
    <div className="folder-row relative">
      <SidebarItem label={folder.name} count={count} href={href} />
      {/* 마우스를 올렸을 때 링크 개수 자리에 나타나는 [수정][삭제] 버튼 */}
      <div className="folder-actions absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-0.5">
        <EditFolderButton folder={folder} />
        <DeleteFolderButton folder={folder} count={count} isActive={isActive} />
      </div>
    </div>
  );
}
