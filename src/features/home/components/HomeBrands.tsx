"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHome } from "@/src/hooks/use-home";
import { brandLabel, brandLogo } from "@/src/lib/media";
import BrandMark from "@/src/components/BrandMark";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[25px]";

export default function HomeBrands() {
  const { data, isLoading } = useHome();
  // API brandCards kam bo‘lsa — brands ro‘yxatidan 10 tagacha to‘ldiramiz
  const brandCards = (() => {
    const fromApi = data?.brandCards ?? [];
    if (fromApi.length >= 10) return fromApi.slice(0, 10);

    const seen = new Set(fromApi.map((b) => b.brand.toLowerCase()));
    const filled = [...fromApi];
    for (const brand of data?.brands ?? []) {
      if (filled.length >= 10) break;
      if (seen.has(brand.toLowerCase())) continue;
      seen.add(brand.toLowerCase());
      filled.push({ brand, imageUrl: brandLogo(brand) || "" });
    }
    return filled.slice(0, 10);
  })();

  return (
    <section
      id="brands"
      className={`${shell} scroll-mt-24 overflow-x-hidden py-[clamp(24px,3vw,44px)]`}
    >
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
        <p className={eyebrow}>Top Brandlar</p>
        <Link
          href="/brands"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#00863e] no-underline hover:underline"
        >
          Hammasi
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {isLoading && brandCards.length === 0 && (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[112px] animate-pulse rounded-[16px] bg-[#eef2f0]"
            />
          ))}
        </div>
      )}

      {brandCards.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brandCards.map((item) => (
            <Link
              key={item.brand}
              href={`/cars?brand=${encodeURIComponent(item.brand)}`}
              prefetch
              className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-[16px] border border-[#e5e9e7] bg-white px-2.5 py-3 no-underline shadow-[0_6px_18px_rgba(16,37,26,0.04)] transition hover:border-[#b9dfc6] hover:shadow-[0_10px_24px_rgba(0,134,62,0.08)] sm:px-3 sm:py-3.5"
            >
              <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#f6faf7] ring-1 ring-[#eaf6ef] transition group-hover:bg-[#eaf6ef] sm:h-14">
                <BrandMark
                  brand={item.brand}
                  logoUrl={item.imageUrl}
                  size={36}
                />
              </div>
              <div className="w-full text-center">
                <p className="m-0 truncate text-[12px] font-bold text-[#1f2d25] sm:text-sm">
                  {brandLabel(item.brand)}
                </p>
                <p className="m-0 mt-0.5 text-[10px] font-medium text-[#00863e]">
                  Ko‘rish
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
