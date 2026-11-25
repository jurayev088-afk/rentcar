"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../services/api";

export type ApiBrand = {
  id: string;
  name: string;
  slug: string;
  country?: string | null;
  logo?: string | null;
  isActive?: boolean;
  modelsCount?: number;
};

export type ApiCarModel = {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  isActive?: boolean;
  brand?: ApiBrand;
};

type Paginated<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/** Eski HeaderSearch mosligi */
export type BrandDetailed = {
  brand: string;
  brandId: string;
  models: string[];
  carsCount: number;
  imageUrl: string;
};

export function useBrands(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["brands-catalog", params],
    queryFn: async () => {
      const { data } = await api.get<Paginated<ApiBrand>>("/brands", {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 200,
          search: params?.search || undefined,
        },
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 200, total: 0, totalPages: 0 },
      };
    },
    staleTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });
}

export function useBrandModels(
  brandId?: string,
  params?: { search?: string; limit?: number },
) {
  return useQuery({
    queryKey: ["brand-models", brandId, params],
    enabled: Boolean(brandId),
    queryFn: async () => {
      const { data } = await api.get<Paginated<ApiCarModel>>(
        `/brands/${brandId}/models`,
        {
          params: {
            page: 1,
            limit: params?.limit ?? 200,
            search: params?.search || undefined,
          },
        },
      );
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 200, total: 0, totalPages: 0 },
      };
    },
    staleTime: 5 * 60_000,
  });
}

/** Orqa moslik: eski mashinalar/markalar/batafsil o‘rniga yangi katalog */
export function useBrandsDetailed() {
  const brandsQuery = useBrands({ limit: 200 });

  return useQuery({
    queryKey: ["brands-detailed-compat", brandsQuery.dataUpdatedAt],
    enabled: Boolean(brandsQuery.data),
    queryFn: async (): Promise<BrandDetailed[]> => {
      const brands = brandsQuery.data?.items ?? [];
      return brands.map((b) => ({
        brand: b.name,
        brandId: b.id,
        models: [],
        carsCount: b.modelsCount ?? 0,
        imageUrl: b.logo || "",
      }));
    },
    staleTime: 5 * 60_000,
  });
}
