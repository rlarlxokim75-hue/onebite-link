export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-6 text-[26px] leading-[1.3] font-bold text-[var(--text)]">
      {children}
    </h1>
  );
}
