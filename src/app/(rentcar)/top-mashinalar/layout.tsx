import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Top mashinalar | RENTO",
  description: "Eng ko‘p ijaraga berilgan avtomobillar",
};

export default function TopCarsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f6f5]">
      <Navbar home />
      <main>{children}</main>
      <Footer home />
    </div>
  );
}
