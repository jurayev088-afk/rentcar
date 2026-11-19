import type { ReactNode } from "react";
import Navbar from "@/src/components/Navbar";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 bg-[#eff0f2] font-[family-name:var(--font-geist-sans)] text-[#121516]">
      <Navbar home />
      <Header />
      <main>{children}</main>
      <Footer home />
    </div>
  );
}
