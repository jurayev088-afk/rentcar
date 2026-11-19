"use client";

import Cars from "@/src/components/Cars";
import AppProvider from "@/src/provider/AppProvider";
import Filter from "../components/Filter";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useEffect, useState } from "react";
import { Car } from "@/src/types";
import UseCarBrands from "@/src/constants/UseCarBrands";
import UseAllCarsContext, { UseAllCars } from "@/src/constants/UseAllCars";

export default function CarsPage() {
  const { allCars } = UseAllCars();
  const [filteredCars, setFilteredCars] = useState<Car[]>(allCars);
  const displayedCars = filteredCars ?? allCars ?? [];

  useEffect(() => {
    setFilteredCars(allCars);
  }, [allCars]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
      <div className="mb-6 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
          Katalog
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1f2d25] sm:text-3xl">
              Avtomobillar katalogi
            </h1>
            <p className="mt-1 text-sm text-[#6d7a73]">
              Sayohatingiz uchun qulay va ishonchli avtomobilni tanlang
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e8dd] bg-[#f6faf7] px-4 py-2 text-sm font-medium text-[#3f4b44]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00863e]" />
            Jami:{" "}
            <span className="font-bold text-[#00863e]">
              {displayedCars.length} ta
            </span>{" "}
            avtomobil
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-7">
        <UseCarBrands>
          <Filter cars={allCars} setFilteredCars={setFilteredCars} />
        </UseCarBrands>

        <div className="min-w-0 flex-1">
          <AppProvider>
            <UseWishlistContext>
              <UseAllCarsContext>
                <Cars cars={allCars} filteredCars={filteredCars} />
              </UseAllCarsContext>
            </UseWishlistContext>
          </AppProvider>
        </div>
      </div>
    </div>
  );
}
