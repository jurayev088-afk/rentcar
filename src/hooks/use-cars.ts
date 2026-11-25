"use client";

import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import api from "../services/api";
import type { ApiCar, CarsQuery, Paginated } from "../types/api";

const PAGE_SIZE = 12;

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
    placeholderData: keepPreviousData,
  });
}

export type InfiniteCarsFilters = Omit<CarsQuery, "page" | "limit">;

/** /cars — har safar 12 ta, scroll bilan keyingi sahifa */
export function useInfiniteCars(filters: InfiniteCarsFilters) {
  return useInfiniteQuery({
    queryKey: ["cars-infinite", filters],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get<Paginated<ApiCar>>("/mashinalar", {
        params: {
          ...filters,
          page: pageParam,
          limit: PAGE_SIZE,
        },
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? {
          page: pageParam,
          limit: PAGE_SIZE,
          total: 0,
          totalPages: 0,
        },
      };
    },
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      if (!totalPages || page >= totalPages) return undefined;
      return page + 1;
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

export { PAGE_SIZE as CARS_PAGE_SIZE };
