export default function LinkUrlInput() {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-bold text-[var(--text-sub)]">링크</span>
      <input
        type="url"
        name="url"
        required
        placeholder="https://example.com"
        className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)]"
      />
    </label>
  );
}
