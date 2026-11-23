"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { CarCard } from "@/src/components/Cars";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useHome } from "@/src/hooks/use-home";
import { mapApiCarToUi } from "@/src/lib/map-car";
import HomeCarousel from "./HomeCarousel";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "mb-1.5 block text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e]";

const sectionTitle =
  "m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[26px]";

export default function PopularCars() {
  const { data, isLoading, isError } = useHome();
  const cars = useMemo(
    () => (data?.topCars ?? []).slice(0, 4).map(mapApiCarToUi),
    [data?.topCars],
  );

  return (
    <section
      id="popular"
      className={`${shell} scroll-mt-24 py-[clamp(24px,3vw,44px)]`}
    >
      <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
        <div>
          <p className={eyebrow}>Top ijaralar</p>
          <h2 className={sectionTitle}>Eng ko‘p tanlanayotgan mashinalar</h2>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#00863e] no-underline hover:underline"
          href="/top-mashinalar"
        >
          Hammasi
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {isLoading && (
        <p className="text-sm text-[#6d7a73]">Mashinalar yuklanmoqda...</p>
      )}
      {isError && (
        <p className="text-sm text-red-600">Mashinalarni yuklashda xatolik.</p>
      )}
      {!isLoading && !isError && cars.length === 0 && (
        <p className="rounded-2xl border border-dashed border-[#d7e8dd] bg-[#f6faf7] px-4 py-6 text-sm text-[#6d7a73]">
          Hozircha mashinalar yo‘q.
        </p>
      )}

      <UseWishlistContext>
        <HomeCarousel itemCount={cars.length}>
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              className="w-[min(100%,300px)] shrink-0 sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
            />
          ))}
        </HomeCarousel>
      </UseWishlistContext>
    </section>
  );
}
