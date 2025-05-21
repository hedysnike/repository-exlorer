"use client";

import { useCallback, useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/placeholders-and-vanish-input";
import { ArrowUpRightIcon, CopyIcon, Star, StarsIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useQueryState } from "nuqs";

interface Repo {
  description: string;
  language: string;
  name: string;
  stars: number;
  url: string;
}

export interface ResultData {
  total: number;
  repos: Repo[];
}

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

export function Client({ results }: { results: ResultData }) {
  const [query, setQuery] = useQueryState("query", {
    defaultValue: "",
  });
  const [repositories, setRepositories] = useState<Repo[]>(results.repos ?? []);
  const [count, setCount] = useState<number>(results.total ?? 0);
  const [sorting, setSorting] = useState<string>("asc");

  const debouncedFetch = useCallback(
    debounceEffect(async (currentQuery: string, currentSort: string) => {
      if (currentQuery.trim() === "") {
        setRepositories([]);
        return;
      }
      const data = await fetchData(currentQuery, currentSort);
      setRepositories(data.repos || []);
      setCount(count + 1);
    }, 500),
    [sorting]
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedFetch(e.target.value, sorting);
  };

  return (
    <div className="h-auto items-center px-4">
      <div className="w-full flex flex-col pb-5 pt-10 sticky top-0 bg-[#111111]">
        <h2 className="mb-6 text-xl text-center sm:text-6xl w-full dark:text-white text-black">Your Favorite Github Search</h2>
        <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={() => {}} />
      </div>

      <div className="w-full h-[250vh] max-w-5xl pb-40 text-gray-200">
        {repositories.length > 0 && (
          <table className="w-full border-collapse border rounded border-gray-600">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Name</th>
                <th className="border border-gray-600 p-2">Description</th>
                <th className="border border-gray-600 p-2">view</th>
              </tr>
            </thead>
            {repositories.map((item: Repo) => (
              <tr key={item.name} className="text-xs">
                <td className="border border-gray-600 py-1.5 px-4 font-medium text-gray-100">
                  <div className="flex items-center gap-2">
                    {item.name}
                    <div className="flex items-center">
                      ({item.stars}) <Star className="w-4 h-4 text-green-500 mr-1" />
                    </div>
                  </div>
                  <div className="font-light text-gray-400">[{item.language}]</div>
                </td>
                <td className="border border-gray-400 p-2 text-gray-300 flex-1 text-ellipsis line-clamp-3 ">{item.description}</td>
                <td className="border border-gray-600  flex-shrink-0 p-2 text-gray-300 flex gap-2 h-full">
                  <CopyButton url={item.url} />
                  <a target="_blank" href={item.url} className="bg-gray-400 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                    <span>Github</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </a>
                </td>
                <td className="border border-gray-600 p-2 text-gray-300 ">
                  <button className="bg-gray-400 flex items-center gap-2 text-black px-2 py-1 rounded-md">
                    <span>Open</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  );
}
