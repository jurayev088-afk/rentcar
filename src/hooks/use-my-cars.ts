"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { ApiCar, CarsQuery, Paginated } from "../types/api";

export function useMyCars(params?: CarsQuery) {
  return useQuery({
    queryKey: ["my-cars", params],
    queryFn: async () => {
      const { data } = await api.get<Paginated<ApiCar>>("/mashinalar/mening", {
        params,
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 24, total: 0, totalPages: 0 },
      };
    },
    staleTime: 15_000,
  });
}

/** Owner tahrirlash — PENDING/INACTIVE ham keladi */
export function useMyCar(id?: string) {
  return useQuery({
    queryKey: ["my-car", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await api.get<ApiCar>(`/mashinalar/mening/${id}`);
      return data;
    },
  });
}

export function useCreateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const { data } = await api.post<ApiCar>("/mashinalar", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-cars"] });
      qc.invalidateQueries({ queryKey: ["cars"] });
      qc.invalidateQueries({ queryKey: ["home"] });
    },
  });
}

export function useUpdateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, unknown>;
    }) => {
      const { data } = await api.patch<ApiCar>(`/mashinalar/${id}`, payload);
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["my-cars"] });
      qc.invalidateQueries({ queryKey: ["my-car", vars.id] });
      qc.invalidateQueries({ queryKey: ["cars"] });
      qc.invalidateQueries({ queryKey: ["car"] });
    },
  });
}

export function useHideCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/mashinalar/${id}/yashirish`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-cars"] });
    },
  });
}
