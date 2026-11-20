type Props = {
  label: string;
  name: string;
  type: "email" | "password";
  autoComplete: string;
  placeholder?: string;
  autoFocus?: boolean;
  /** 둘 다 전달하면 제어 컴포넌트로 동작 */
  value?: string;
  onChange?: (value: string) => void;
};

export default function AuthField({
  label,
  name,
  type,
  autoComplete,
  placeholder,
  autoFocus,
  value,
  onChange,
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
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="field rounded-xl bg-[var(--input-bg)] px-4 py-3.5 text-[17px] text-[var(--text)]"
      />
    </label>
  );
}
