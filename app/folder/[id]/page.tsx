import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/common/page-title";
import LinkGrid from "@/components/link/link-grid";
import { getBookmarksByFolder, getFolder } from "@/lib/folders";
import { folders } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: String(folder.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/folder/[id]">): Promise<Metadata> {
  const { id } = await params;
  const folder = getFolder(id);
  return { title: folder ? `${folder.name} | 한입 링크` : "한입 링크" };
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folder = getFolder(id);

  if (!folder) notFound();

  return (
    <>
      <PageTitle>{folder.name}</PageTitle>
      <LinkGrid bookmarks={getBookmarksByFolder(folder.id)} />
    </>
  );
}
