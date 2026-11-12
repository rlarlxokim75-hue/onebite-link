"use client";

import { usePathname } from "next/navigation";
import type { Folder } from "@/lib/types";
import SidebarItem from "./sidebar-item";
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
      <DeleteFolderButton folder={folder} count={count} isActive={isActive} />
    </div>
  );
}
