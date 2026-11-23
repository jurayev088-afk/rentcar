"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Company, Paginated } from "../types/api";

export function useCompanies(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ["companies", params?.page ?? 1, params?.limit ?? 20],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Company>>("/kompaniyalar", {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
        },
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 20, total: 0, totalPages: 0 },
      };
    },
    staleTime: 30_000,
  });
}

export function useCompany(id?: string) {
  return useQuery({
    queryKey: ["company", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await api.get<Company>(`/kompaniyalar/${id}`);
      return data;
    },
  });
}
