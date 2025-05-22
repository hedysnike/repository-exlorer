import { Client } from "@/app/client";
import { Spotlight } from "@/components/spotlight-new";
import { ResultData } from "@/lib/types";

interface Props {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function Home({ searchParams }: Props) {
  const { query, sort } = await searchParams;

  let data: ResultData = { items: [], total_count: 0 };

  if (!!query) {
    console.log(query);
    const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query.toString())}&sort=${sort}&per_page=100`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    data = await response.json();
  }

  return (
    <div className="bg-[#111111] flex flex-col justify-center relative h-screen overflow-x-hidden">
      <Client results={data.items} total={data.total_count} />
      <Spotlight />
    </div>
  );
}
