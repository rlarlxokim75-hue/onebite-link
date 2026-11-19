import type { Metadata } from "next";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title";
import NewLinkForm from "@/components/new-link/new-link-form";
import { getFolders } from "@/lib/db-folders";

export const metadata: Metadata = {
  title: "새 링크 | 한입 링크",
};

async function NewLinkFormLoader() {
  return <NewLinkForm folders={await getFolders()} />;
}

export default function NewLinkPage() {
  return (
    <>
      <PageTitle>새 링크</PageTitle>
      <Suspense>
        <NewLinkFormLoader />
      </Suspense>
    </>
  );
}
