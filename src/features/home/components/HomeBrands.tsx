"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHome } from "@/src/hooks/use-home";
import { brandLabel, brandLogo } from "@/src/lib/media";
import BrandMark from "@/src/components/BrandMark";
import HomeCarousel from "./HomeCarousel";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "m-0 text-[25px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] ";

const sectionTitle =
  "m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[26px]";

export default function HomeBrands() {
  const { data, isLoading } = useHome();
  const brandCards = (
    data?.brandCards?.length
      ? data.brandCards
      : (data?.brands ?? []).map((brand) => ({
          brand,
          imageUrl: brandLogo(brand) || "",
        }))
  ).slice(0, 12);

  return (
    <section
      id="brands"
      className={`${shell} scroll-mt-24 py-[clamp(24px,3vw,44px)]`}
    >
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <div>
          <p className={eyebrow}>Top Brandlar</p>
        </div>
        <Link
          href="/brands"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#00863e] no-underline hover:underline"
        >
          Hammasi
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {isLoading && brandCards.length === 0 && (
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-[140px] w-[160px] shrink-0 animate-pulse rounded-[18px] bg-[#eef2f0]"
            />
          ))}
        </div>
      )}

      <HomeCarousel itemCount={brandCards.length}>
        {brandCards.map((item) => (
          <Link
            key={item.brand}
            href={`/cars?brand=${encodeURIComponent(item.brand)}`}
            prefetch
            className="group flex w-[min(100%,180px)] shrink-0 cursor-pointer flex-col items-center gap-2.5 rounded-[18px] border border-[#e5e9e7] bg-white px-3 py-4 no-underline shadow-[0_8px_24px_rgba(16,37,26,0.04)] transition hover:border-[#b9dfc6] hover:shadow-[0_12px_28px_rgba(0,134,62,0.08)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]"
          >
            <div className="flex h-[64px] w-full items-center justify-center rounded-2xl bg-[#f6faf7] ring-1 ring-[#eaf6ef] transition group-hover:bg-[#eaf6ef]">
              <BrandMark
                brand={item.brand}
                logoUrl={item.imageUrl}
                size={48}
              />
            </div>
            <div className="w-full text-center">
              <p className="m-0 truncate text-sm font-bold text-[#1f2d25]">
                {brandLabel(item.brand)}
              </p>
              <p className="m-0 mt-0.5 text-[11px] font-medium text-[#00863e]">
                Mashinalarni ko‘rish
              </p>
            </div>
          </Link>
        ))}
      </HomeCarousel>
    </section>
  );
}
