"use client";

export function Tag({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-600">{children}</div>;
}
