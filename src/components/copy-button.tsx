import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const CopyButton = ({ url }: { url: string }) => {
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
    <button onClick={handleCopy} className={cn("bg-gray-400 flex cursor-pointer items-center gap-2 text-black px-2 py-1 rounded-md", greenLight && "bg-green-500")}>
      <span className="w-full">{isCopied ? "Copied" : "Copy URL"}</span>
      {isCopied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
    </button>
  );
};
