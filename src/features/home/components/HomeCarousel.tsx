"use client";

import { ReactNode } from "react";

/** Faqat foydalanuvchi scroll qilganda siljiydi — avtomatik aylanish yo‘q, silliq */
export default function HomeCarousel({
  children,
  itemCount,
}: {
  children: ReactNode;
  itemCount: number;
}) {
  if (itemCount <= 0) return null;

  return (
    <div className="relative">
      <div className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
