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
    <aside className="w-full shrink-0 self-start rounded-2xl bg-[var(--card)] p-3 shadow-[var(--shadow-card)] md:sticky md:top-[92px] md:w-60">
      <nav className="flex flex-col gap-5">
        <SidebarItem label="전체" count={totalCount} href="/" />
        <FolderList folders={folders} countByFolder={countByFolder} />
      </nav>
    </aside>
  );
}
