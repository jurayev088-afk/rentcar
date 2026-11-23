"use client";

import Link from "next/link";
import { useHome } from "@/src/hooks/use-home";

/**
 * Matnli kategoriya qatori — to‘liq ekran kengligida, oldingi ko‘rinish.
 */
export default function CategoryNavStrip() {
  const { data, isLoading } = useHome();
  const categories = data?.categories ?? [];

  if (isLoading && categories.length === 0) {
    return (
      <div className="w-full border-y border-[#e5e9e7] bg-white py-3.5">
        <p className="text-center text-sm text-[#8a9690]">
          Kategoriyalar yuklanmoqda...
        </p>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <nav
      id="categories"
      aria-label="Kategoriyalar"
      className="w-full scroll-mt-24 border-y border-[#e5e9e7] bg-white"
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-2 overflow-x-auto scroll-smooth px-4 py-3.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-6 md:px-8 lg:px-[4vw] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/cars?categoryId=${category.id}`}
            className="shrink-0 whitespace-nowrap px-2 text-[14px] font-medium text-[#3f4b44] no-underline transition hover:text-[#00863e] sm:px-3 sm:text-[15px] md:flex-1 md:px-1 md:text-center"
          >
            {category.nameUz || category.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
