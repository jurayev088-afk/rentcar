"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHome } from "@/src/hooks/use-home";
import { brandLabel, brandLogo } from "@/src/lib/media";
import SafeImage from "@/src/components/SafeImage";
import HomeCarousel from "./HomeCarousel";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "mb-1.5 block text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e]";

const sectionTitle =
  "m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[26px]";

function BrandMark({ brand }: { brand: string }) {
  const logo = brandLogo(brand);
  const label = brandLabel(brand);
  const initial = label.charAt(0).toUpperCase();

  if (logo) {
    return (
      <SafeImage
        src={logo}
        alt={label}
        width={56}
        height={56}
        className="h-12 w-12 object-contain sm:h-14 sm:w-14"
      />
    );
  }

  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00863e] text-xl font-extrabold text-white sm:h-14 sm:w-14">
      {initial}
    </span>
  );
}

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
      <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
        <div>
          <p className={eyebrow}>Brandlar</p>
          <h2 className={sectionTitle}>
            Mashhur
            avtomobil brandlari.
          </h2>
        </div>
        <Link
          href="/brands"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#00863e] no-underline hover:underline"
        >
          Hammasi
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-[#6d7a73]">Brandlar yuklanmoqda...</p>
      )}

      <HomeCarousel itemCount={brandCards.length}>
        {brandCards.map((item) => (
          <Link
            key={item.brand}
            href={`/cars?brand=${encodeURIComponent(item.brand)}`}
            prefetch
            className="group flex w-[min(100%,200px)] shrink-0 cursor-pointer flex-col items-center gap-3 rounded-[18px] border border-[#e5e9e7] bg-white px-4 py-5 no-underline shadow-[0_8px_24px_rgba(16,37,26,0.04)] transition hover:border-[#b9dfc6] hover:shadow-[0_12px_28px_rgba(0,134,62,0.08)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)]"
          >
            <div className="flex h-[72px] w-full items-center justify-center rounded-2xl bg-[#f6faf7] ring-1 ring-[#eaf6ef] transition group-hover:bg-[#eaf6ef]">
              <BrandMark brand={item.brand} />
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
