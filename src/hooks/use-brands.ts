"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchStaticBrandModels,
  fetchStaticBrands,
  staticCatalogQueryOptions,
  type StaticBrand,
  type StaticCarModel,
} from "../lib/static-catalog";

export type ApiBrand = StaticBrand;
export type ApiCarModel = StaticCarModel;

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
    queryFn: async (): Promise<Paginated<ApiBrand>> => {
      const data = await fetchStaticBrands({
        page: params?.page ?? 1,
        limit: params?.limit ?? 500,
        search: params?.search,
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 500, total: 0, totalPages: 0 },
      };
    },
    ...staticCatalogQueryOptions,
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
    queryFn: async (): Promise<Paginated<ApiCarModel>> => {
      const data = await fetchStaticBrandModels(brandId!, {
        limit: params?.limit ?? 1000,
        search: params?.search,
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 1000, total: 0, totalPages: 0 },
      };
    },
    ...staticCatalogQueryOptions,
  });
}

/** Orqa moslik: eski mashinalar/markalar/batafsil o‘rniga yangi katalog */
export function useBrandsDetailed() {
  const brandsQuery = useBrands({ limit: 500 });

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
    ...staticCatalogQueryOptions,
  });
}
