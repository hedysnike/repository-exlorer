// "use client";

// import { useCallback, useState } from "react";
// import { PlaceholdersAndVanishInput } from "../components/placeholders-and-vanish-input";
// import { ArrowUpRightIcon, CopyIcon, Eye, Github, Star, StarsIcon } from "lucide-react";
// import { CopyButton } from "@/components/copy-button";
// import { useQueryState } from "nuqs";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { GithubRepository, ResultData } from "@/lib/types";
// import { Pagination } from "@/components/pagination";
// import { RepositoryTable } from "@/components/repository-table";

// const debounceEffect = (func: Function, delay: number) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), delay);
//   };
// };

// const placeholders = [
//   "What's the first rule of Fight Club?",
//   "Who is Tyler Durden?",
//   "Where is Andrew Laeddis Hiding?",
//   "Write a Javascript method to reverse a string",
//   "How to assemble your own PC?",
// ];

// const fetchData = async (query: string, sort: string, page: string): Promise<ResultData> => {
//   const result = await fetch(`/api/github-search`, {
//     method: "POST",
//     body: JSON.stringify({ query: query, sort: sort, page: page }),
//   });
//   return result.json();
// };

// export function Client({ query_param, results, total, currentPage }: { query_param?: string; results: GithubRepository[]; total: number; currentPage: number }) {
//   const [query, setQuery] = useQueryState("query", {
//     defaultValue: query_param ?? "",
//   });
//   const [page, setPage] = useQueryState("page", {
//     defaultValue: currentPage.toString(),
//   });
//   const [repositories, setRepositories] = useState<GithubRepository[]>(results ?? []);
//   const [count, setCount] = useState<number>(total ?? 0);
//   const [sorting, setSorting] = useState<string>("asc");

//   const debouncedFetch = useCallback(
//     debounceEffect(async (currentQuery: string, currentSort: string) => {
//       if (currentQuery.trim() === "") {
//         setRepositories([]);
//         return;
//       }
//       const data = await fetchData(currentQuery, currentSort, page);
//       setRepositories(data.items || []);
//       setCount(data.total_count || 0);
//     }, 500),
//     [sorting, page, query]
//   );

//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//     debouncedFetch(e.target.value, sorting);
//   };

//   return (
//     <div className="h-full px-4 w-full flex flex-col justify-center">
//       <div className="w-full flex items-center justify-center pb-14 pt-5 min-h-5 sticky top-0 bg-[#111111]">
//         <div className="relative max-w-7xl w-full flex mx-auto">
//           <motion.h2
//             className={`absolute dark:text-white w-max font-semibold text-black`}
//             initial={false}
//             animate={{
//               top: repositories.length > 0 ? 0 : 80,
//               left: repositories.length > 0 ? 0 : "50%",
//               x: repositories.length > 0 ? 0 : "-50%",
//               fontSize: repositories.length > 0 ? "1.25rem" : "3.00rem",
//             }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//           >
//             Your Favorite Github Search
//           </motion.h2>

//           <motion.div
//             className="absolute"
//             initial={false}
//             animate={{
//               top: repositories.length > 0 ? 0 : 150,
//               left: repositories.length > 0 ? "80%" : "50%",
//               x: repositories.length > 0 ? 0 : "-50%",
//             }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//           >
//             <PlaceholdersAndVanishInput setValue={setQuery} value={query} placeholders={placeholders} onChange={handleChange} onSubmit={() => {}} />
//           </motion.div>
//         </div>
//       </div>

//       <div className="relative max-w-7xl w-full flex mx-auto mt-20 z-0">
//         <span className="text-gray-200 text-sm">
//           {count} results found for <span className="font-bold">{query}</span>
//         </span>
//       </div>

//       <div className="w-full min-h-[101vh] h-full max-w-7xl flex mx-auto pt-20 pb-10 text-gray-200">
//         {repositories.length > 0 ? <RepositoryTable repositories={repositories} /> : <div className="flex items-center justify-center h-full">No results found</div>}
//       </div>

//       <section className="pb-96 text-white">
//         <Pagination
//           currentPage={Number(page)}
//           totalPages={Math.ceil(total / 100)}
//           onPageChange={(page) => {
//             setPage(page.toString());
//             debouncedFetch(query, sorting);
//           }}
//         />
//       </section>
//     </div>
//   );
// }
