import type { Metadata } from "next";
import PageTitle from "@/components/common/page-title";
import NewLinkForm from "@/components/new-link/new-link-form";
import { folders } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "새 링크 | 한입 링크",
};

export default function NewLinkPage() {
  return (
    <>
      <PageTitle>새 링크</PageTitle>
      <NewLinkForm folders={folders} />
    </>
  );
}
