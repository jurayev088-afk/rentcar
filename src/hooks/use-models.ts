"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

type ModelRow = { model: string; brand: string };

export function useModels(brand?: string) {
  return useQuery({
    queryKey: ["models", brand ?? "ALL"],
    enabled: Boolean(brand),
    queryFn: async () => {
      const { data } = await api.get<ModelRow[]>("/mashinalar/modellar", {
        params: { brand },
      });
      return Array.isArray(data) ? data : [];
    },
    staleTime: 5 * 60_000,
  });
}
