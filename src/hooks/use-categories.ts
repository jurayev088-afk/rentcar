"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Category } from "../types/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await api.get<Category[]>("/lokatsiyalar/kategoriyalar");
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60_000,
  });
}
