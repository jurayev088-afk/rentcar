"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchStaticCategories,
  staticCatalogQueryOptions,
} from "../lib/static-catalog";
import type { Category } from "../types/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await fetchStaticCategories<Category>();
      return Array.isArray(data) ? data : [];
    },
    ...staticCatalogQueryOptions,
  });
}
