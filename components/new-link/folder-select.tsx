import type { Folder } from "@/lib/types";

type Props = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: Props) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700">폴더</span>
      <select
        name="folderId"
        defaultValue=""
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-900"
      >
        <option value="">폴더 없음</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}
