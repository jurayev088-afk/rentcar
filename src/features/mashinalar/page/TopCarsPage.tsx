"use client";

import { useMemo, useState } from "react";
import Cars from "@/src/components/Cars";
import Filter from "../components/Filter";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useHome } from "@/src/hooks/use-home";
import { mapApiCarToUi } from "@/src/lib/map-car";
import type { Car } from "@/src/types";

export default function TopCarsPage() {
  const { data, isLoading, isError } = useHome();
  const cars = useMemo(
    () => (data?.topCars ?? []).map(mapApiCarToUi),
    [data?.topCars],
  );
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
      <div className="mb-6 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
          Top ijaralar
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#1f2d25] sm:text-3xl">
          Eng ko‘p ijaraga berilgan mashinalar
        </h1>
        <p className="mt-1 text-sm text-[#6d7a73]">
          Eng mashhur avtomobillar ro‘yxati
        </p>
      </div>

      {isLoading && (
        <p className="mb-4 text-sm text-[#6d7a73]">Yuklanmoqda...</p>
      )}
      {isError && (
        <p className="mb-4 text-sm text-red-600">Yuklashda xatolik.</p>
      )}

      <div className="flex w-full flex-col items-start gap-6 overflow-visible md:flex-row md:gap-16">
        <Filter cars={cars} setFilteredCars={setFilteredCars} />
        <div className="min-w-0 flex-1">
          <UseWishlistContext>
            <Cars cars={cars} filteredCars={filteredCars} />
          </UseWishlistContext>
        </div>
      </div>
    </div>
  );
}
