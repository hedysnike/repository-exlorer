"use client";

import { Copy, Check, Code, ExternalLink, Eye, GitFork, Star, User } from "lucide-react";
import { GithubRepository } from "./types";
import { useState, useEffect } from "react";
import { CopyButton } from "@/components/copy-button";
import { formatNumber } from "@/lib/utils";
import { Tag } from "@/components/tag";

export function Client({ repository }: { repository: GithubRepository }) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <div className={`relative z-10 container mx-auto px-4 py-12`}>
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-6">
            <img src={repository.owner?.avatar_url} alt={repository.owner?.login} className="w-16 h-16 rounded border" />
            <div>
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <User size={16} />
                <span>{repository.owner?.login}</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">{repository.name}</h1>
            </div>
          </div>

          {repository.description && <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">{repository.description}</p>}

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-indigo-600  hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform"
            >
              <ExternalLink size={18} />
              View on GitHub
            </a>

            {repository.homepage && (
              <a
                href={repository.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-gray-800/50 border border-gray-600 hover:bg-gray-700/50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}

            <CopyButton label="Clone" url={repository.clone_url} />
          </div>

          <div className="flex items-center gap-2 justify-start py-3 rounded-lg font-semibold transition-all duration-300 transform">
            <span className="flex-1">git clone {repository.clone_url}</span>
            <button onClick={() => copyToClipboard(repository.clone_url)} className="hover:text-white transition-colors">
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Star className="text-green-500" size={24} />
                <span className="text-2xl font-bold">{formatNumber(repository.stargazers_count || 0)}</span>
              </div>
              <p className="text-gray-400 text-sm">Stars</p>
            </div>

            <div className="backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <GitFork className="text-blue-500" size={24} />
                <span className="text-2xl font-bold">{formatNumber(repository.forks_count || 0)}</span>
              </div>
              <p className="text-gray-400 text-sm">Forks</p>
            </div>

            <div className="backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="text-yellow-500" size={24} />
                <span className="text-2xl font-bold">{formatNumber(repository.watchers_count || 0)}</span>
              </div>
              <p className="text-gray-400 text-sm">Watchers</p>
            </div>

            <div className="backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Code className="text-orange-500" size={24} />
                <span className="text-lg font-bold">{repository.language}</span>
              </div>
              <p className="text-gray-400 text-sm">Language</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className=" backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">Repository Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400">Created</span>
                <span>{formatDate(repository.created_at)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                <span className="text-gray-400">Last Updated</span>
                <span>{formatDate(repository.updated_at)}</span>
              </div>
              {repository.license && (
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400">License</span>
                  <span>{repository.license.name}</span>
                </div>
              )}
            </div>
          </div>

          {repository.topics && repository.topics.length > 0 && (
            <div className=" backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Topics</h3>
              <div className="flex flex-wrap gap-3">
                {repository.topics.map((topic, index) => (
                  <Tag key={index}>#{topic}</Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
