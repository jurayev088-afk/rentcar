"use client";

import { useCars } from "./use-cars";

/** Eski nom bilan moslik */
export const useGetCars = () => {
  const { data, isLoading } = useCars({ limit: 24, sort: "newest" });
  return { data: data?.items, isLoading };
};
