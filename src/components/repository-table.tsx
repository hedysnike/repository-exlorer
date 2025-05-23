"use client";
import { GithubRepository } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { ArrowUpRightIcon, Eye, Github, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Tag } from "./tag";

export function RepositoryTable({ repositories }: { repositories: GithubRepository[] }) {
  const searchParams = useSearchParams();

  return (
    <table className="w-full border-collapse border rounded border-gray-700/50">
      <thead>
        <tr>
          <th className="border-x border-t border-gray-700/50 p-2">Name</th>
          <th className="border-x border-t border-gray-700/50 p-2">Description</th>
          <th className="border-x border-t border-gray-700/50 p-2">Actions</th>
        </tr>
      </thead>
      {repositories.map((item: GithubRepository) => {
        return (
          <tr key={item.name} className="text-xs hover:bg-gray-800/30 transition-all duration-300">
            <td className="border-t border-r border-l border-gray-700/50 py-1.5 px-4 font-medium text-gray-100">
              <img src={item.owner.avatar_url} alt={item.owner.login} className="w-10 h-10" />
              <div className="flex items-center gap-2 w-max font-semibold truncate text-white text-lg">{item.name}</div>
              <div className="font-light text-gray-400 text-sm">[{item.language}]</div>
            </td>
            <td className="border-t border-gray-700/50 p-2 text-gray-300 flex-1 text-ellipsis line-clamp-3 ">{item.description}</td>
            <td className="flex-shrink-0 p-2 text-gray-300 flex gap-2 h-max">
              <div className="flex items-center gap-2 overflow-x-hidden">
                <Tag>
                  <a target="_blank" href={item.url} className="flex items-center gap-1">
                    <span>Visit</span>
                    <Github className="w-4 h-4" />
                  </a>
                </Tag>
                <Tag>
                  <div className="flex items-center gap-1">
                    ({formatNumber(item.stargazers_count)}) <Star className="w-4 h-4 text-green-500 mr-1" />
                  </div>
                </Tag>

                <div className="flex max-w-prose items-center gap-2 overflow-x-hidden">
                  {item.topics.map((topic) => (
                    <Tag key={topic}>{topic}</Tag>
                  ))}
                </div>
              </div>
            </td>
            <td className="border border-gray-700/50 p-2 text-gray-300 ">
              <button className="bg-indigo-500 brightness-75 hover:brightness-100  transition-all duration-200 py-2 mb-5 text-black w-full rounded-md">
                <Link href={`/repository/${item.owner.login}/${item.name}?${searchParams}`} className="flex items-center gap-2 px-4 w-full">
                  <span>View</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </Link>
              </button>
            </td>
          </tr>
        );
      })}
    </table>
  );
}
