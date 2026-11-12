export default function LinkUrlInput() {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-700">링크</span>
      <input
        type="url"
        name="url"
        required
        placeholder="https://example.com"
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900"
      />
    </label>
  );
}
