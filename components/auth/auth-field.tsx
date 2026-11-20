type Props = {
  label: string;
  name: string;
  type: "email" | "password";
  autoComplete: string;
  placeholder?: string;
  autoFocus?: boolean;
};

export default function AuthField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  autoFocus,
}: Props) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[14px] font-bold text-[var(--text-sub)]">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)]"
      />
    </label>
  );
}
