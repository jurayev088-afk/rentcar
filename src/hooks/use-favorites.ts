"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { ApiCar, Paginated } from "../types/api";
import { useUser } from "../constants/UseMeContext";
import { getAccessToken } from "../lib/auth-storage";

export function useFavorites() {
  const { user } = useUser();
  // Sevimlilar faqat ijarachi (USER → RENTER)
  const canUse =
    Boolean(getAccessToken()) && Boolean(user) && user?.role === "RENTER";

  return useQuery({
    queryKey: ["favorites", user?.id ?? "anon"],
    enabled: canUse,
    queryFn: async () => {
      const { data } = await api.get<Paginated<{ car: ApiCar }>>("/sevimlilar", {
        params: { page: 1, limit: 100 },
      });
      const items = Array.isArray(data?.items) ? data.items : [];
      return items.map((row) => row.car).filter(Boolean) as ApiCar[];
    },
    staleTime: 20_000,
    placeholderData: (prev) => prev,
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      carId,
      isFavorite,
    }: {
      carId: string;
      isFavorite: boolean;
    }) => {
      if (user?.role !== "RENTER") {
        throw new Error("Sevimlilar faqat ijarachi hisobi uchun");
      }
      if (isFavorite) {
        await api.delete(`/sevimlilar/${carId}`);
      } else {
        await api.post(`/sevimlilar/${carId}`);
      }
    },
    onMutate: async ({ carId, isFavorite }) => {
      const key = ["favorites", user?.id ?? "anon"] as const;
      await qc.cancelQueries({ queryKey: ["favorites"] });
      const prev = qc.getQueryData<ApiCar[]>(key);

      if (prev) {
        if (isFavorite) {
          qc.setQueryData<ApiCar[]>(
            key,
            prev.filter((c) => c.id !== carId),
          );
        }
      }

      return { prev, key };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev && ctx.key) {
        qc.setQueryData(ctx.key, ctx.prev);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
