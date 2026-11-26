"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchStaticRegions,
  staticCatalogQueryOptions,
} from "../lib/static-catalog";
import type { Region } from "../types/api";

export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const data = await fetchStaticRegions<Region>();
      return Array.isArray(data) ? data : [];
    },
    ...staticCatalogQueryOptions,
  });
}
