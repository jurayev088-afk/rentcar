import type { HomeData } from "../types/api";
import { toMoneyNumber } from "./format";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3000/api/v1";

/** Home ISR — 60 soniyada bir regeneratsiya */
export const HOME_REVALIDATE_SECONDS = 60;

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

function emptyHome(): HomeData {
  return {
    topCars: [],
    newestCars: [],
    categories: [],
    brands: [],
    brandCards: [],
    topCompanies: [],
    regions: [],
    stats: { companiesCount: 0, carsCount: 0 },
  };
}

function normalizeHome(data: HomeData | null | undefined): HomeData {
  const topCompanies = Array.isArray(data?.topCompanies)
    ? data.topCompanies.map((c) => ({
        ...c,
        ratingAvg: toMoneyNumber(c.ratingAvg, 0),
      }))
    : [];

  return {
    topCars: Array.isArray(data?.topCars) ? data.topCars : [],
    newestCars: Array.isArray(data?.newestCars) ? data.newestCars : [],
    categories: Array.isArray(data?.categories) ? data.categories : [],
    brands: Array.isArray(data?.brands) ? data.brands : [],
    brandCards: Array.isArray(data?.brandCards) ? data.brandCards : [],
    topCompanies,
    regions: Array.isArray(data?.regions) ? data.regions : [],
    stats: data?.stats ?? { companiesCount: 0, carsCount: 0 },
  };
}

/** Server Component / ISR uchun bosh sahifa ma’lumoti */
export async function fetchHomeData(): Promise<HomeData> {
  try {
    const res = await fetch(`${API_BASE}/bosh-sahifa`, {
      next: { revalidate: HOME_REVALIDATE_SECONDS },
    });
    if (!res.ok) return emptyHome();
    const json: unknown = await res.json();
    return normalizeHome(unwrap<HomeData>(json));
  } catch {
    return emptyHome();
  }
}
