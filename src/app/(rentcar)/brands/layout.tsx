import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Brandlar | RENTO",
  description: "Barcha avtomobil brandlari — Chevrolet, BMW, Toyota va boshqalar",
};

export default function BrandsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f6f5]">
      <Navbar home />
      <main>{children}</main>
      <Footer home />
    </div>
  );
}
