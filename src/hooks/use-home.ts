"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { HomeData } from "../types/api";

export function useHome() {
  return useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const { data } = await api.get<HomeData>("/bosh-sahifa");
      return {
        topCars: Array.isArray(data?.topCars) ? data.topCars : [],
        newestCars: Array.isArray(data?.newestCars) ? data.newestCars : [],
        categories: Array.isArray(data?.categories) ? data.categories : [],
        brands: Array.isArray(data?.brands) ? data.brands : [],
        brandCards: Array.isArray(data?.brandCards) ? data.brandCards : [],
        topCompanies: Array.isArray(data?.topCompanies)
          ? data.topCompanies
          : [],
        regions: Array.isArray(data?.regions) ? data.regions : [],
        stats: data?.stats ?? { companiesCount: 0, carsCount: 0 },
      } satisfies HomeData;
    },
    staleTime: 30_000,
    placeholderData: keepPreviousData,
  });
}
