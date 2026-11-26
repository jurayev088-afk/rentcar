"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchStaticDistricts,
  staticCatalogQueryOptions,
} from "../lib/static-catalog";
import type { District } from "../types/api";

export function useDistricts(regionId?: string) {
  return useQuery({
    queryKey: ["districts", regionId],
    enabled: Boolean(regionId),
    queryFn: async () => {
      const data = await fetchStaticDistricts<District>(regionId!);
      return Array.isArray(data) ? data : [];
    },
    ...staticCatalogQueryOptions,
  });
}
