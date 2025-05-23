import { Client } from "@/app/repository/[owner]/[repository]/client";
import { GithubRepository } from "@/app/repository/[owner]/[repository]/types";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/animated-modal";
import { RepositoryModal } from "./modal";

interface Props {
  params: Promise<{
    owner: string;
    repository: string;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function Home({ params }: Props) {
  const { owner, repository } = await params;

  const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    return <div>Error: {response.statusText}</div>;
  }

  const data: GithubRepository = await response.json();

  return (
    <RepositoryModal>
      <Client repository={data} />
    </RepositoryModal>
  );
}
