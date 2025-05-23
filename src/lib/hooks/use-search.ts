"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GithubRepository, ResultData } from "@/lib/types";
import { useQueryState } from "nuqs";

function debounceEffect<F extends (...args: any[]) => void>(func: F, delay: number): F {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as F;
}

const fetchData = async (query: string, sort: string, page: string): Promise<ResultData> => {
  const response = await fetch(`/api/github-search`, {
    method: "POST",
    body: JSON.stringify({ query, sort, page }),
  });

  if (!response.ok) throw new Error("Failed to fetch");

  return response.json();
};

export function useRepositorySearch({
  initialQuery = "",
  initialSort = "asc",
  initialPage = "1",
  initialTotal = 0,
  initialColumns = "table",
}: {
  initialQuery?: string;
  initialSort?: string;
  initialPage?: string;
  initialTotal?: number;
  initialColumns?: "grid" | "table";
}) {
  const [query, setQuery] = useQueryState("query", {
    defaultValue: initialQuery,
  });
  const [page, setPage] = useQueryState("page", {
    defaultValue: initialPage,
  });
  const [sort, setSort] = useState(initialSort);
  const [columns, setColumns] = useQueryState("columns", {
    defaultValue: initialColumns,
  });

  const [repositories, setRepositories] = useState<GithubRepository[]>([]);
  const [count, setCount] = useState<number>(initialTotal);
  const [loading, setLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const search = useCallback(
    debounceEffect(async (q: string, s: string, p: string) => {
      if (q.trim() === "") {
        setRepositories([]);
        setCount(0);
        return;
      }

      setLoading(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const data = await fetchData(q, s, p);
        setRepositories(data.items || []);
        setCount(data.total_count || 0);
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          console.error("Search failed:", error);
        }
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    search(query, sort, page);
  }, [query, sort, page, search]);

  useEffect(() => {
    setPage(initialPage);
  }, [query]);

  return {
    query,
    setQuery,
    sort,
    setSort,
    page,
    setPage,
    columns,
    setColumns,
    repositories,
    count,
    loading,
    refetch: () => search(query, sort, page),
  };
}
