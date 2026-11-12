import LinkGrid from "@/components/link/link-grid";
import PageTitle from "@/components/common/page-title";
import { bookmarks } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <PageTitle>All</PageTitle>
      <LinkGrid bookmarks={bookmarks} />
    </>
  );
}
