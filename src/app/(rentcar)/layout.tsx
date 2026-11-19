import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
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
  title: "Avto Bozor",
  description: "Avtomobil bozori",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body  className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col !bg-[#F4F6F9] antialiased`}>
        <UseMeContext>
          {children}
        </UseMeContext>
      </body>
    </html>
  );
}