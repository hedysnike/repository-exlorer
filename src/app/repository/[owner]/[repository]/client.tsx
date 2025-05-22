"use client";

import { GithubRepository } from "./types";

export function Client({ repository }: { repository: GithubRepository }) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">{repository.name}</h1>
        <p className="text-lg">{repository.description}</p>
      </div>
    </div>
  );
}
