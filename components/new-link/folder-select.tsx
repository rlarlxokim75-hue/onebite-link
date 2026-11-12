import type { Folder } from "@/lib/types";

type Props = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: Props) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-bold text-[var(--text-sub)]">폴더</span>
      <div className="relative">
        <select
          name="folderId"
          defaultValue=""
          className="field w-full appearance-none rounded-xl bg-[var(--input-bg)] py-3.5 pr-11 pl-4 text-[17px] text-[var(--text)]"
        >
          <option value="">폴더 없음</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-[var(--text-sub)]"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </label>
  );
}
