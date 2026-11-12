import type { Folder } from "@/lib/types";
import SidebarItem from "./sidebar-item";
import FolderList from "./folder-list";

type Props = {
  folders: Folder[];
  totalCount: number;
  countByFolder: Record<number, number>;
};

export default function Sidebar({ folders, totalCount, countByFolder }: Props) {
  return (
    <aside className="w-60 shrink-0 border-r border-zinc-200 bg-zinc-50 p-4">
      <nav className="flex flex-col gap-6">
        <SidebarItem label="All" count={totalCount} href="/" />
        <FolderList folders={folders} countByFolder={countByFolder} />
      </nav>
    </aside>
  );
}
