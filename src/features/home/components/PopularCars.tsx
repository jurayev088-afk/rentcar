"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { CarCard } from "@/src/components/Cars";
import CarsLoadingGrid from "@/src/components/CarsLoadingGrid";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useHome } from "@/src/hooks/use-home";
import { mapApiCarToUi } from "@/src/lib/map-car";
import HomeCarousel from "./HomeCarousel";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "m-0 text-[25px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] ";

export default function PopularCars() {
  const { data, isLoading, isFetching, isError } = useHome();
  const cars = useMemo(
    () => (data?.topCars ?? []).slice(0, 8).map(mapApiCarToUi),
    [data?.topCars],
  );

  const showSkeleton = (isLoading || isFetching) && cars.length === 0;
  const showEmpty = !isLoading && !isFetching && !isError && cars.length === 0;

  return (
    <section
      id="popular"
      className={`${shell} scroll-mt-24 py-[clamp(24px,3vw,44px)]`}
    >
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <p className={eyebrow}>
          Top ijaralar
          {/* {isFetching && cars.length > 0 && (
            <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#00863e] align-middle" />
          )} */}
        </p>
        <Link
          className="inline-flex cursor-pointer shrink-0 items-center gap-1.5 text-sm font-bold text-[#00863e] no-underline hover:underline"
          href="/top-mashinalar"
        >
          Hammasi
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {isError && cars.length === 0 && (
        <p className="text-sm text-red-600">Mashinalarni yuklashda xatolik.</p>
      )}

      {showSkeleton && (
        <div className="overflow-hidden">
          <CarsLoadingGrid count={4} />
        </div>
      )}

      {showEmpty && (
        <p className="rounded-2xl border border-dashed border-[#d7e8dd] bg-[#f6faf7] px-4 py-6 text-sm text-[#6d7a73]">
          Hozircha mashinalar yo‘q.
        </p>
      )}

      {cars.length > 0 && (
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
      )}
    </section>
  );
}
