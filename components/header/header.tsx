import Logo from "./logo";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 h-14 shrink-0 bg-[var(--card)] shadow-[var(--shadow-nav)]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
        <Logo />
        <NewLinkButton />
      </div>
    </header>
  );
}
