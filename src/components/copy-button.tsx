import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const CopyButton = ({ url, label }: { url: string; label: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [greenLight, setGreenLight] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setGreenLight(true);

    setTimeout(() => {
      setGreenLight(false);
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 bg-gray-800/50 border border-gray-600 hover:bg-gray-700/50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform"
    >
      {isCopied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
      <span className="w-full">{isCopied ? "Copied" : label}</span>
    </button>
  );
};
