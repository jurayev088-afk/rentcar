/**
 * Kam o‘zgaradigan kataloglar: brand, model, manzil.
 * Next Data Cache — force-cache + kunlik revalidate.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3000/api/v1";

/** 24 soat — brand/manzil deyarli o‘zgarmaydi */
export const STATIC_CATALOG_STALE_MS = 24 * 60 * 60_000;
export const STATIC_CATALOG_GC_MS = 7 * 24 * 60 * 60_000;

export const staticCatalogQueryOptions = {
  staleTime: STATIC_CATALOG_STALE_MS,
  gcTime: STATIC_CATALOG_GC_MS,
  refetchOnMount: false as const,
  refetchOnWindowFocus: false as const,
  refetchOnReconnect: false as const,
};

function unwrap<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    "data" in payload
  ) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

async function staticGet<T>(path: string, searchParams?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(`${API_BASE}${path.startsWith("/") ? path : `/${path}`}`);
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    cache: "force-cache",
    next: { revalidate: 86_400 },
  });

  if (!res.ok) {
    throw new Error(`Catalog fetch failed: ${res.status} ${path}`);
  }

  const json: unknown = await res.json();
  return unwrap<T>(json);
}

export type StaticBrand = {
  id: string;
  name: string;
  slug: string;
  country?: string | null;
  logo?: string | null;
  isActive?: boolean;
  modelsCount?: number;
};

export type StaticCarModel = {
  id: string;
  brandId: string;
  name: string;
  slug: string;
  isActive?: boolean;
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

export async function fetchStaticBrands(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return staticGet<Paginated<StaticBrand>>("/brands", {
    page: params?.page ?? 1,
    limit: params?.limit ?? 500,
    search: params?.search || undefined,
  });
}

export async function fetchStaticBrandModels(
  brandId: string,
  params?: { limit?: number; search?: string },
) {
  return staticGet<Paginated<StaticCarModel>>(`/brands/${brandId}/models`, {
    page: 1,
    limit: params?.limit ?? 1000,
    search: params?.search || undefined,
  });
}

export async function fetchStaticRegions<T = unknown>() {
  return staticGet<T[]>("/lokatsiyalar/viloyatlar");
}

export async function fetchStaticDistricts<T = unknown>(regionId: string) {
  return staticGet<T[]>(`/lokatsiyalar/viloyatlar/${regionId}/tumanlar`);
}

export async function fetchStaticCategories<T = unknown>() {
  return staticGet<T[]>("/lokatsiyalar/kategoriyalar");
}
