"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";

const Input = dynamic(() => import("antd").then((mod) => mod.Input), {
  ssr: false,
});

export default function NavbarSearch({
  className = "",
}: {
  className?: string;
}) {
  return (
    <label
      className={`group flex w-full min-w-0 cursor-text items-center gap-2.5 rounded-full border border-[#e2e7e4] bg-[#f5f7f6] px-3.5 py-2.5 transition-all focus-within:border-[#00863e]/45 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,134,62,0.1)] hover:border-[#c9d4ce] ${className}`}
    >
      <Search
        className="h-4 w-4 shrink-0 text-[#7a8780] transition-colors group-focus-within:text-[#00863e]"
        aria-hidden
      />
      <Input
        aria-label="Brend, model, joy"
        className="!border-none !bg-transparent !p-0 !text-[13px] !font-medium !text-[#1c2a22] !shadow-none !outline-none placeholder:!text-[#8d9892] [&_input]:!bg-transparent"
        placeholder="Brend, model, joy..."
        variant="borderless"
      />
    </label>
  );
}
