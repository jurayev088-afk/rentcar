import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MobileSnapRow, { SnapPage } from "@/src/components/MobileSnapRow";
import { brandLabel, brandLogo } from "@/src/lib/media";
import BrandMark from "@/src/components/BrandMark";
import type { HomeData } from "@/src/types/api";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[25px]";

function BrandCard({
  brand,
  imageUrl,
}: {
  brand: string;
  imageUrl?: string;
}) {
  return (
    <Link
      href={`/cars?brand=${encodeURIComponent(brand)}`}
      prefetch
      className="group flex h-full cursor-pointer flex-col items-center gap-1.5 rounded-[16px] border border-[#e5e9e7] bg-white px-2.5 py-3 no-underline shadow-[0_6px_18px_rgba(16,37,26,0.04)] active:opacity-95 sm:px-3 sm:py-3.5 sm:transition sm:hover:border-[#b9dfc6]"
    >
      <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#f6faf7] ring-1 ring-[#eaf6ef] transition group-hover:bg-[#eaf6ef] sm:h-14">
        <BrandMark brand={brand} logoUrl={imageUrl} size={36} />
      </div>
      <div className="w-full text-center">
        <p className="m-0 truncate text-[12px] font-bold text-[#1f2d25] sm:text-sm">
          {brandLabel(brand)}
        </p>
        <p className="m-0 mt-0.5 text-[10px] font-medium text-[#00863e]">
          Ko‘rish
        </p>
      </div>
    </Link>
  );
}

function chunkPairs<T>(items: T[]): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pages.push(items.slice(i, i + 2));
  }
  return pages;
}

export default function HomeBrands({ data }: { data: HomeData }) {
  const fromApi = data.brandCards ?? [];
  const brandCards = (() => {
    if (fromApi.length >= 10) return fromApi.slice(0, 10);

    const seen = new Set(fromApi.map((b) => b.brand.toLowerCase()));
    const filled = [...fromApi];
    for (const brand of data.brands ?? []) {
      if (filled.length >= 10) break;
      if (seen.has(brand.toLowerCase())) continue;
      seen.add(brand.toLowerCase());
      filled.push({ brand, imageUrl: brandLogo(brand) || "" });
    }
    return filled.slice(0, 10);
  })();

  const pages = chunkPairs(brandCards);

  return (
    <section
      id="brands"
      className={`${shell} scroll-mt-24 py-[clamp(24px,3vw,44px)]`}
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

      {brandCards.length > 0 && (
        <>
          {/* Mobile: 2 tadan snap */}
          <div className="sm:hidden">
            <MobileSnapRow>
              {pages.map((pair, pageIndex) => (
                <SnapPage key={`brands-${pageIndex}`}>
                  {pair.map((item) => (
                    <div key={item.brand} className="min-w-0 flex-1">
                      <BrandCard
                        brand={item.brand}
                        imageUrl={item.imageUrl}
                      />
                    </div>
                  ))}
                  {pair.length === 1 && <div className="min-w-0 flex-1" />}
                </SnapPage>
              ))}
            </MobileSnapRow>
          </div>

          {/* Desktop */}
          <div className="hidden grid-cols-2 gap-2.5 sm:grid sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {brandCards.map((item) => (
              <BrandCard
                key={item.brand}
                brand={item.brand}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
