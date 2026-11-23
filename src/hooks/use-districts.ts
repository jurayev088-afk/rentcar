"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { District } from "../types/api";

export function useDistricts(regionId?: string) {
  return useQuery({
    queryKey: ["districts", regionId],
    enabled: Boolean(regionId),
    queryFn: async () => {
      const { data } = await api.get<District[]>(
        `/lokatsiyalar/viloyatlar/${regionId}/tumanlar`,
      );
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60_000,
  });
}
