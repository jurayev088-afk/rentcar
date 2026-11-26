"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchHomeData,
  HOME_REVALIDATE_SECONDS,
} from "../lib/home-data";
import type { HomeData } from "../types/api";

export function useHome(initialData?: HomeData) {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
    initialData,
    staleTime: HOME_REVALIDATE_SECONDS * 1000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
