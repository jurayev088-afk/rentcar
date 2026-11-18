"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { renterSidebar } from "../config/renterSidebar";
import { ownerSidebar } from "../config/ownerSidebar";
import { useUser } from "@/src/constants/UseMeContext";

export default function SidebarProfile() {
  const pathname = usePathname();
  const { user, logOut } = useUser();

  const menu = user?.role === "RENTER" ? renterSidebar : ownerSidebar;


  return (
    <aside className="w-65 shrink-0 border-r p-4 fixed h-screen">
      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          if (item?.title == "Chiqish") {
            return (
              <Link
                onClick={() => logOut()}
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                  active
                    ? "bg-[#0B1F33] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                active
                  ? "bg-[#0B1F33] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
