import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Kompaniyalar | RENTO",
  description: "Eng yaxshi baholangan avtomobil ijarasi kompaniyalari",
};

export default function KompaniyalarLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f6f5]">
      <Navbar home />
      <main>{children}</main>
    </div>
  );
}
