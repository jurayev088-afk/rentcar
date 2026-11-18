"use client";
import Cars from "@/src/components/Cars";
import AppProvider from "@/src/provider/AppProvider";
import Filter from "../components/Filter";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useEffect, useState } from "react";
import { Car } from "@/src/types";
import UseCarBrands, { UseCarBrand } from "@/src/constants/UseCarBrands";
import UseAllCarsContext, { UseAllCars } from "@/src/constants/UseAllCars";

export default function CarsPage() {
  const { allCars } = UseAllCars();
  console.log(allCars,'allCars');
  
  const [filteredCars, setFilteredCars] = useState<Car[]>(allCars);
  console.log(filteredCars,'dwdwdwwdwd');
  const displayedCars = filteredCars ?? allCars ?? [];
  useEffect(() => {
    setFilteredCars(allCars)
  },[allCars])
  return (
    <div className="mx-auto flex w-full max-w-360 flex-col items-start gap-6 px-4 py-8 md:flex-row md:gap-8 md:px-8">

      <UseCarBrands>
        <Filter cars={allCars} setFilteredCars={setFilteredCars} />
      </UseCarBrands>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-wrap mt-10 items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Avtomobillar katalogi
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Sayohatingiz uchun qulay va ishonchli avtomobilni tanlang
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            Jami:{" "}
            <span className="font-bold text-slate-900">
              {displayedCars.length} ta
            </span>{" "}
            avtomobil
          </div>
        </div>

        <AppProvider>
          <UseWishlistContext>
            <UseAllCarsContext>
              <Cars cars={allCars} filteredCars={filteredCars} />
            </UseAllCarsContext>
          </UseWishlistContext>
        </AppProvider>
      </div>
    </div>
  );
}
