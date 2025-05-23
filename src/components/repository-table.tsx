"use client";
import { GithubRepository } from "@/lib/types";
import { ArrowUpRightIcon, Eye, Github, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function RepositoryTable({ repositories }: { repositories: GithubRepository[] }) {
  const searchParams = useSearchParams();

  return (
    <table className="w-full border-collapse border rounded border-gray-600">
      <thead>
        <tr>
          <th className="border border-gray-600 p-2">Name</th>
          <th className="border border-gray-600 p-2">Description</th>
          <th className="border border-gray-600 p-2">Actions</th>
        </tr>
      </thead>
      {repositories.map((item: GithubRepository) => {
        return (
          <tr key={item.name} className="text-xs">
            <td className="border border-gray-600 py-1.5 px-4 font-medium text-gray-100">
              <img src={item.owner.avatar_url} alt={item.owner.login} className="w-10 h-10" />
              <div className="flex text-base items-center gap-2 w-max">{item.name}</div>
              <div className="font-light text-gray-400 text-sm">[{item.language}]</div>
            </td>
            <td className="border border-gray-400 p-2 text-gray-300 flex-1 text-ellipsis line-clamp-3 ">{item.description}</td>
            <td className="border border-gray-600  flex-shrink-0 p-2 text-gray-300 flex gap-2 h-full">
              {/* <CopyButton url={item.url} /> */}
              <div className="flex items-center gap-2 overflow-x-hidden">
                <a target="_blank" href={item.url} className="bg-gray-400 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                  <span>Visit</span>
                  <Github className="w-4 h-4" />
                </a>
                <div className="bg-gray-600 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                  ({item.stargazers_count}) <Star className="w-4 h-4 text-green-500 mr-1" />
                </div>

                <div className="bg-gray-600 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                  ({item.watchers_count}) <Eye className="w-4 h-4 text-green-500 mr-1" />
                </div>

                <div className="flex max-w-prose items-center gap-2 overflow-x-hidden">
                  {item.topics.map((topic) => (
                    <div key={topic} className="bg-gray-400 text-black px-2 py-1 rounded-md">
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </td>
            <td className="border border-gray-600 p-2 text-gray-300 ">
              <Link href={`/repository/${item.owner.login}/${item.name}?${searchParams}`} className="bg-gray-400 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                <span>Analyze</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
            </td>
          </tr>
        );
      })}
    </table>
  );
}
