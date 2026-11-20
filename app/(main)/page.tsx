import { Suspense } from "react";
import LinkGrid from "@/components/link/link-grid";
import PageTitle from "@/components/common/page-title";
import { getFolders } from "@/lib/db-folders";
import { getLinks } from "@/lib/db-links";

async function AllLinks() {
  const [links, folders] = await Promise.all([getLinks(), getFolders()]);
  return <LinkGrid bookmarks={links} folders={folders} />;
}

export default function Home() {
  return (
    <>
      <PageTitle>All</PageTitle>
      <Suspense>
        <AllLinks />
      </Suspense>
    </>
  );
}
