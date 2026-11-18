import Navbar from "@/src/components/Navbar";
import SidebarProfile from "@/src/features/profile/components/SidebarProfile";
import React, { ReactNode } from "react";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 mt-19">
        <SidebarProfile />

        <main className="flex-1 min-w-0 p-6 ml-65">
          {children}
        </main>
      </div>
    </div>
  );
}