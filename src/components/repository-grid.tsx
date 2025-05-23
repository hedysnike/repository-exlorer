"use client";
import { GithubRepository } from "@/lib/types";
import { ArrowUpRightIcon, Github } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function RepositoryGrid({ repositories }: { repositories: GithubRepository[] }) {
  const searchParams = useSearchParams();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {repositories.map((item: GithubRepository) => {
        return (
          <div key={item.name} className="text-xs hover:bg-gray-800/30 divansition-all duration-300 border">
            <div></div>

            <button className="bg-gray-800/50 flex items-center gap-2 text-white  border-gray-600 border-[0.5px] px-2 py-1 rounded-md">
              <span>Visit</span>
              <Github className="w-4 h-4" />
            </button>

            <button className="bg-gray-800/50 flex items-center gap-2 text-white  border-gray-600 border-[0.5px] px-2 py-1 rounded-md">
              <span>Analyze</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
