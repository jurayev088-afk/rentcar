"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Region } from "../types/api";

export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const { data } = await api.get<Region[]>("/lokatsiyalar/viloyatlar");
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60_000,
  });
}
