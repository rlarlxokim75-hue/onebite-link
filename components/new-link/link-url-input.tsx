type Props = {
  defaultValue?: string;
  error?: string;
};

export default function LinkUrlInput({ defaultValue, error }: Props) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-bold text-[var(--text-sub)]">링크</span>
      <input
        type="text"
        inputMode="url"
        name="url"
        required
        autoFocus
        autoComplete="url"
        defaultValue={defaultValue}
        placeholder="https://example.com"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "link-url-error" : undefined}
        className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)] aria-[invalid=true]:shadow-[0_0_0_2px_var(--error)]"
      />
      {error ? (
        <p
          id="link-url-error"
          role="alert"
          className="text-[14px] leading-[1.4] text-[var(--error)]"
        >
          {error}
        </p>
      ) : (
        <p className="text-[14px] leading-[1.4] text-[var(--text-sub)]">
          저장하면 제목, 설명, 썸네일을 자동으로 가져와요
        </p>
      )}
    </label>
  );
}
