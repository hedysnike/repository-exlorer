import { Client } from "./client";
import { GithubRepository } from "./types";

interface Props {
  params: Promise<{
    owner: string;
    repository: string;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function Home({ params }: Props) {
  const { owner, repository } = await params;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`, {
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
    <div className="bg-[#111111] flex flex-col justify-center relative h-screen overflow-x-hidden">
      <Client repository={data} />
    </div>
  );
}
