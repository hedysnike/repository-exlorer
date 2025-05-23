"use client";
import { GithubRepository } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { ArrowUpRightIcon, Star, User } from "lucide-react";
import Link from "next/link";

export function RepositoryGrid({ repositories }: { repositories: GithubRepository[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {repositories.map((item) => (
        <div key={item.id || item.name} className="relative backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={item.owner.avatar_url} alt={item.owner.login} className="w-10 h-10" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <User size={12} />
                <span className="truncate">{item.owner?.login}</span>
              </div>
              <h3 className="font-semibold text-white text-lg truncate transition-colors">{item.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Star size={12} />
                <span className="text-gray-300 text-sm">{formatNumber(item.stargazers_count)}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed min-h-20">{item.description}</p>

          <button className="bg-indigo-500 cursor-pointer brightness-75 hover:brightness-100 transition-all duration-200 py-2 mb-5 text-black w-full rounded-md">
            <Link href={`/repository/${item.owner.login}/${item.name}`} className="flex items-center justify-center gap-2 px-4 w-full h-full text-center">
              View
            </Link>
          </button>

          {item.topics && item.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.topics.map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-600">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}