"use client";

import { useMemo } from "react";
import Cars from "@/src/components/Cars";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useHome } from "@/src/hooks/use-home";
import { mapApiCarToUi } from "@/src/lib/map-car";

export default function TopCarsPage() {
  const { data, isLoading, isFetching, isError } = useHome();
  const cars = useMemo(
    () => (data?.topCars ?? []).map(mapApiCarToUi),
    [data?.topCars],
  );
  const showLoading = (isLoading || isFetching) && cars.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
      <div className="mb-6 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
          Top ijaralar
          {isFetching && cars.length > 0 && (
            <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#00863e] align-middle" />
          )}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#1f2d25] sm:text-3xl">
          Eng ko‘p ijaraga berilgan mashinalar
        </h1>
        <p className="mt-1 text-sm text-[#6d7a73]">
          Eng mashhur avtomobillar ro‘yxati
        </p>
      </div>

      {isError && cars.length === 0 && (
        <p className="mb-4 text-sm text-red-600">Yuklashda xatolik.</p>
      )}

      <UseWishlistContext>
        <Cars
          cars={cars}
          filteredCars={cars}
          isLoading={showLoading}
          forceEmpty={!showLoading && !isFetching && cars.length === 0}
        />
      </UseWishlistContext>
    </div>
  );
}
