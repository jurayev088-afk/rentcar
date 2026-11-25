"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Input = dynamic(() => import("antd").then((mod) => mod.Input), {
  ssr: false,
});

export default function NavbarSearch({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const goSearch = () => {
    const q = value.trim();
    if (!q) {
      router.push("/cars");
      return;
    }
    // Oddiy matn: brand sifatida yuboramiz (katalog filteri brand/model bilan ishlaydi)
    router.push(`/cars?brand=${encodeURIComponent(q)}`);
  };

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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={goSearch}
        className="!border-none !bg-transparent !p-0 !text-[13px] !font-medium !text-[#1c2a22] !shadow-none !outline-none placeholder:!text-[#8d9892] [&_input]:!bg-transparent"
        placeholder="Brend yozing va Enter..."
        variant="borderless"
      />
      <button
        type="button"
        onClick={goSearch}
        className="inline-flex h-7 shrink-0 items-center rounded-full bg-[#00863e] px-2.5 text-[11px] font-bold text-white transition hover:bg-[#006f35]"
      >
        Topish
      </button>
    </label>
  );
}
