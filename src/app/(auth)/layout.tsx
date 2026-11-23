import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import QueryProvider from "@/src/provider/QueryProvider";
import UseMeContext from "@/src/constants/UseMeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kirish | RENTO",
  description: "RENTO hisobiga kirish",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-[#F4F6F9]! antialiased`}
      >
        <QueryProvider>
          <UseMeContext>{children}</UseMeContext>
        </QueryProvider>
      </body>
    </html>
  );
}
