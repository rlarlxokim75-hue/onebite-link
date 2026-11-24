import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageTitle from "@/components/common/page-title";
import LinkGrid from "@/components/link/link-grid";
import { pageMetadata } from "@/lib/metadata";
import { getFolders } from "@/lib/db-folders";
import { getFolderById, getLinks } from "@/lib/db-links";

export async function generateMetadata({
  params,
}: PageProps<"/folder/[id]">): Promise<Metadata> {
  const { id } = await params;
  const folder = await getFolderById(id);
  return folder
    ? pageMetadata(folder.name, `${folder.name} 폴더에 저장한 링크 모음`)
    : pageMetadata("폴더");
}

async function FolderContent({ id }: { id: string }) {
  const folder = await getFolderById(id);
  if (!folder) notFound();

  const [links, folders] = await Promise.all([getLinks(folder.id), getFolders()]);
  return (
    <>
      <PageTitle>{folder.name}</PageTitle>
      <LinkGrid bookmarks={links} folders={folders} />
    </>
  );
}

export default function FolderPage({ params }: PageProps<"/folder/[id]">) {
  return (
    <Suspense>
      <FolderPageBody params={params} />
    </Suspense>
  );
}

async function FolderPageBody({
  params,
}: {
  params: PageProps<"/folder/[id]">["params"];
}) {
  const { id } = await params;
  return <FolderContent id={id} />;
}
