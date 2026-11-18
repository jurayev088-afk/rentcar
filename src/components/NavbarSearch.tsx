'use client'
import dynamic from "next/dynamic";
import { Search } from "lucide-react";

const Input = dynamic(
  () => import("antd").then((mod) => mod.Input),
  { ssr: false }
);

export default function NavbarSearch() {
  return (
    <div className="p-[5px_12px] rounded-lg border border-gray-400 flex items-center gap-2">
        <Search/>
        <Input className="outline-0! border-none! hover:none! bg-transparent!" placeholder="Brend, model, joy..."/>
    </div>
  )
}
