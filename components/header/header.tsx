import Logo from "./logo";
import NewLinkButton from "./new-link-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white/90 px-6 backdrop-blur">
      <Logo />
      <NewLinkButton />
    </header>
  );
}
