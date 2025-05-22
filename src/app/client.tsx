"use client";

import { useCallback, useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/placeholders-and-vanish-input";
import { ArrowUpRightIcon, CopyIcon, Eye, Github, Star, StarsIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useQueryState } from "nuqs";
import { motion } from "framer-motion";
import Link from "next/link";
import { GithubRepository, ResultData } from "@/lib/types";

const debounceEffect = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const placeholders = [
  "What's the first rule of Fight Club?",
  "Who is Tyler Durden?",
  "Where is Andrew Laeddis Hiding?",
  "Write a Javascript method to reverse a string",
  "How to assemble your own PC?",
];

const fetchData = async (query: string, sort: string): Promise<ResultData> => {
  const result = await fetch(`/api/github-search`, {
    method: "POST",
    body: JSON.stringify({ query: query, sort: sort }),
  });
  return result.json();
};

export function Client({ results, total }: { results: GithubRepository[]; total: number }) {
  const [query, setQuery] = useQueryState("query", {
    defaultValue: "",
  });
  const [repositories, setRepositories] = useState<GithubRepository[]>(results ?? []);
  const [count, setCount] = useState<number>(total ?? 0);
  const [sorting, setSorting] = useState<string>("asc");

  const debouncedFetch = useCallback(
    debounceEffect(async (currentQuery: string, currentSort: string) => {
      if (currentQuery.trim() === "") {
        setRepositories([]);
        return;
      }
      const data = await fetchData(currentQuery, currentSort);
      setRepositories(data.items || []);
      setCount(data.total_count || 0);
    }, 500),
    [sorting]
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedFetch(e.target.value, sorting);
  };

  //  ${repositories.length > 0 ? "text-sm" : "text-5xl"}
  return (
    <div className="h-full px-4 w-full flex flex-col justify-center">
      <div className="w-full flex items-center justify-center pb-14 pt-5 min-h-5 sticky top-0 bg-[#111111]">
        <div className="relative max-w-7xl w-full flex mx-auto">
          <motion.h2
            className={`absolute dark:text-white w-max font-semibold text-black`}
            initial={false}
            animate={{
              top: repositories.length > 0 ? 0 : 80,
              left: repositories.length > 0 ? 0 : "50%",
              x: repositories.length > 0 ? 0 : "-50%",
              fontSize: repositories.length > 0 ? "1.25rem" : "3.00rem",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            Your Favorite Github Search
          </motion.h2>

          <motion.div
            className="absolute"
            initial={false}
            animate={{
              top: repositories.length > 0 ? 0 : 150,
              left: repositories.length > 0 ? "80%" : "50%",
              x: repositories.length > 0 ? 0 : "-50%",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <PlaceholdersAndVanishInput setValue={setQuery} value={query} placeholders={placeholders} onChange={handleChange} onSubmit={() => {}} />
          </motion.div>
        </div>
      </div>

      <div className="w-full min-h-[101vh] h-full max-w-7xl flex mx-auto pt-40 pb-10 text-gray-200">
        {repositories.length > 0 && (
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
                    <Link href={`/repository/${item.owner.login}/${item.name}`} className="bg-gray-400 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                      <span>Analyze</span>
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}
