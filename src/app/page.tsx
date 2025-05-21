import { Client, ResultData } from "@/app/client";
import { Spotlight } from "@/components/spotlight-new";

interface Props {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function Home({ searchParams }: Props) {
  const { query, sort } = await searchParams;

  let data: ResultData = { repos: [], total: 0 };

  console.log(query, sort);

  if (!!query) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query.toString())}&sort=${sort}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    data = await response.json();
  }

  return (
    <div className="bg-[#111111] flex justify-center relative h-screen overflow-x-hidden">
      <Client results={data} />
      <Spotlight />
    </div>
  );
}
