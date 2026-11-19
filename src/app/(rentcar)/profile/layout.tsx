import Navbar from "@/src/components/Navbar";
import SidebarProfile from "@/src/features/profile/components/SidebarProfile";
import type { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f5]">
      <Navbar />

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
        <SidebarProfile />

        <main className="min-w-0 flex-1 px-3 pb-6 pt-3 sm:px-5 sm:pb-8 sm:pt-4 lg:ml-72 lg:px-7 lg:py-7">
          {children}
        </main>
      </div>
    </div>
  );
}
