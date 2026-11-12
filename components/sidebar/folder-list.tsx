import type { Folder } from "@/lib/types";
import SidebarItem from "./sidebar-item";

type Props = {
  folders: Folder[];
  countByFolder: Record<number, number>;
};

export default function FolderList({ folders, countByFolder }: Props) {
  return (
    <section>
      <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        폴더
      </h2>
      {folders.length === 0 ? (
        <p className="px-3 text-sm text-zinc-400">폴더가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {folders.map((folder) => (
            <li key={folder.id}>
              <SidebarItem
                label={folder.name}
                count={countByFolder[folder.id] ?? 0}
                href={`/folder/${folder.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
