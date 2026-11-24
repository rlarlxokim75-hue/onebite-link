import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title";
import NewLinkForm from "@/components/new-link/new-link-form";
import { getFolders } from "@/lib/db-folders";

export const metadata: Metadata = pageMetadata(
  "새 링크",
  "저장할 링크를 추가하고 폴더에 정리하세요",
);

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
