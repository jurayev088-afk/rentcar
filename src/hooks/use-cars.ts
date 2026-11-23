"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { ApiCar, CarsQuery, Paginated } from "../types/api";

export function useCars(params?: CarsQuery) {
  return useQuery({
    queryKey: ["cars", params],
    queryFn: async () => {
      const { data } = await api.get<Paginated<ApiCar>>("/mashinalar", {
        params,
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 24, total: 0, totalPages: 0 },
      };
    },
    staleTime: 20_000,
  });
}

export function useCar(id?: string) {
  return useQuery({
    queryKey: ["car", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await api.get<ApiCar>(`/mashinalar/${id}`);
      return data;
    },
  });
}
