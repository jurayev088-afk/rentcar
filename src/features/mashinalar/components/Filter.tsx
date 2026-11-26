"use client";

import { Checkbox, Slider } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListFilter, X } from "lucide-react";
import { useBrands } from "@/src/hooks/use-brands";
import { useCategories } from "@/src/hooks/use-categories";
import { brandLabel } from "@/src/lib/media";

/** Eski importlar uchun */
export const carCategory = [
  { label: "Byudjetli", value: "BYUDJETLI" },
  { label: "Sedan", value: "SEDAN" },
  { label: "Krossover", value: "KROSSOVER" },
  { label: "Miniven", value: "MINIVEN" },
  { label: "Coupe", value: "COUPE" },
  { label: "Elektromobil", value: "ELEKTROMOBIL" },
  { label: "Gibrid", value: "GIBRID" },
  { label: "Premium", value: "PREMIUM" },
];

const PRICE_MIN = 100_000;
const PRICE_MAX = 15_000_000;
const PRICE_STEP = 50_000;

export type AppliedFilters = {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
};

const EMPTY: AppliedFilters = {
  categories: [],
  brands: [],
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
};

function sameList(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].map((x) => x.toLowerCase()).sort();
  const sb = [...b].map((x) => x.toLowerCase()).sort();
  return sa.every((v, i) => v === sb[i]);
}

function activeCount(applied: AppliedFilters) {
  let n = 0;
  n += applied.categories.length;
  n += applied.brands.length;
  if (applied.minPrice !== PRICE_MIN || applied.maxPrice !== PRICE_MAX) n += 1;
  return n;
}

type CategoryRow = { id: string; label: string };

/** Filtr → /cars URL (server pagination uchun) */
function buildCarsUrl(
  next: AppliedFilters,
  categoryRows: CategoryRow[],
) {
  const params = new URLSearchParams();

  if (next.brands.length === 1) {
    params.set("brand", next.brands[0]);
  } else if (next.brands.length > 1) {
    // Ko‘p brand: API bitta brand oladi — birinchisini yuboramiz, qolgani clientda emas
    // Barcha brandlar uchun alohida emas; bitta tanlangan bo‘lmasa hammasi
    params.set("brand", next.brands[0]);
  }

  if (next.categories.length >= 1) {
    const hit = categoryRows.find(
      (c) =>
        c.label.toLowerCase() === next.categories[0].toLowerCase(),
    );
    if (hit) params.set("categoryId", hit.id);
  }

  if (next.minPrice > PRICE_MIN) params.set("minPrice", String(next.minPrice));
  if (next.maxPrice < PRICE_MAX) params.set("maxPrice", String(next.maxPrice));

  const qs = params.toString();
  return qs ? `/cars?${qs}` : "/cars";
}

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlBrand = searchParams.get("brand") || undefined;
  const urlMin = searchParams.get("minPrice");
  const urlMax = searchParams.get("maxPrice");
  const urlCategoryId = searchParams.get("categoryId") || undefined;
  const [open, setOpen] = useState(false);
  const filterDrivenRef = useRef(false);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ru-RU").format(value);

  const { data: brandsPage } = useBrands({ limit: 500 });
  const { data: categoriesData = [] } = useCategories();

  const categoryRows: CategoryRow[] = useMemo(
    () =>
      (Array.isArray(categoriesData) ? categoriesData : []).map((c) => ({
        id: c.id,
        label: c.nameUz || c.name,
      })),
    [categoriesData],
  );

  const brandOptions = useMemo(
    () =>
      (brandsPage?.items ?? []).map((brand) => ({
        label: brandLabel(brand.name),
        value: brand.name,
      })),
    [brandsPage?.items],
  );

  const categoryOptions = useMemo(
    () =>
      categoryRows.length
        ? categoryRows.map((c) => ({ label: c.label, value: c.label }))
        : carCategory,
    [categoryRows],
  );

  const urlCategoryLabel = useMemo(() => {
    if (!urlCategoryId) return undefined;
    return categoryRows.find((c) => c.id === urlCategoryId)?.label;
  }, [categoryRows, urlCategoryId]);

  const initialFromUrl = useMemo((): AppliedFilters => {
    return {
      categories: urlCategoryLabel ? [urlCategoryLabel] : [],
      brands: urlBrand ? [urlBrand] : [],
      minPrice: urlMin ? Number(urlMin) || PRICE_MIN : PRICE_MIN,
      maxPrice: urlMax ? Number(urlMax) || PRICE_MAX : PRICE_MAX,
    };
  }, [urlBrand, urlCategoryLabel, urlMax, urlMin]);

  const [draftCategories, setDraftCategories] = useState<string[]>(
    initialFromUrl.categories,
  );
  const [draftBrands, setDraftBrands] = useState<string[]>(
    initialFromUrl.brands,
  );
  const [draftPrice, setDraftPrice] = useState<[number, number]>([
    initialFromUrl.minPrice,
    initialFromUrl.maxPrice,
  ]);
  const [applied, setApplied] = useState<AppliedFilters>(initialFromUrl);

  const isDirty =
    !sameList(draftCategories, applied.categories) ||
    !sameList(draftBrands, applied.brands) ||
    draftPrice[0] !== applied.minPrice ||
    draftPrice[1] !== applied.maxPrice;

  const appliedCount = activeCount(applied);

  const applyAll = useCallback(() => {
    const next: AppliedFilters = {
      categories: [...draftCategories],
      brands: [...draftBrands],
      minPrice: draftPrice[0],
      maxPrice: draftPrice[1],
    };
    filterDrivenRef.current = true;
    setApplied(next);
    router.replace(buildCarsUrl(next, categoryRows));
    setOpen(false);
  }, [categoryRows, draftBrands, draftCategories, draftPrice, router]);

  // Home / tashqi URL o‘zgarsa filtrni sync
  useEffect(() => {
    if (filterDrivenRef.current) {
      filterDrivenRef.current = false;
      return;
    }
    setDraftCategories(initialFromUrl.categories);
    setDraftBrands(initialFromUrl.brands);
    setDraftPrice([initialFromUrl.minPrice, initialFromUrl.maxPrice]);
    setApplied(initialFromUrl);
  }, [initialFromUrl]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const resetFilters = () => {
    filterDrivenRef.current = true;
    setDraftCategories([]);
    setDraftBrands([]);
    setDraftPrice([PRICE_MIN, PRICE_MAX]);
    setApplied(EMPTY);
    router.replace("/cars");
  };

  const panel = (
    <>
      <div className="flex items-center justify-between border-b border-[#eef2f0] pb-2.5">
        <h2 className="text-sm font-bold text-[#1f2d25]">Filtrlar</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetFilters}
            className="cursor-pointer text-xs font-semibold text-[#00863e] transition hover:text-[#006f35]"
          >
            Tozalash
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#e5e9e7] bg-[#f6faf7] text-[#3f4b44] transition hover:border-[#b9dfc6] hover:text-[#00863e] lg:hidden"
            aria-label="Filtrni yopish"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <section className="border-b border-[#eef2f0] py-3">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6d7a73]">
          Mashina turi
        </h3>
        <div className="max-h-40 overflow-y-auto pr-0.5">
          <Checkbox.Group
            className="flex flex-col gap-1.5 text-[13px]"
            options={categoryOptions}
            value={draftCategories}
            onChange={(vals) => setDraftCategories(vals as string[])}
          />
        </div>
      </section>

      <section className="border-b border-[#eef2f0] py-3">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6d7a73]">
          Marka
        </h3>
        <div className="max-h-40 overflow-y-auto pr-0.5">
          <Checkbox.Group
            className="flex flex-col gap-1.5 text-[13px]"
            options={brandOptions}
            value={draftBrands}
            onChange={(vals) => setDraftBrands(vals as string[])}
          />
        </div>
      </section>

      <section className="relative py-3">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6d7a73]">
          Kunlik narx
        </h3>

        <div className="mb-2 grid grid-cols-2 gap-1.5">
          <label className="block">
            <span className="mb-0.5 block text-[10px] text-[#8d9892]">Ot</span>
            <input
              type="number"
              min={PRICE_MIN}
              max={draftPrice[1]}
              step={PRICE_STEP}
              value={draftPrice[0]}
              onChange={(e) => {
                const v = Number(e.target.value) || PRICE_MIN;
                setDraftPrice([
                  Math.min(Math.max(v, PRICE_MIN), draftPrice[1]),
                  draftPrice[1],
                ]);
              }}
              className="h-9 w-full rounded-lg border border-[#e5e9e7] px-2 text-xs text-[#1f2d25] outline-none focus:border-[#00863e]"
            />
          </label>
          <label className="block">
            <span className="mb-0.5 block text-[10px] text-[#8d9892]">Do</span>
            <input
              type="number"
              min={draftPrice[0]}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={draftPrice[1]}
              onChange={(e) => {
                const v = Number(e.target.value) || PRICE_MAX;
                setDraftPrice([
                  draftPrice[0],
                  Math.max(Math.min(v, PRICE_MAX), draftPrice[0]),
                ]);
              }}
              className="h-9 w-full rounded-lg border border-[#e5e9e7] px-2 text-xs text-[#1f2d25] outline-none focus:border-[#00863e]"
            />
          </label>
        </div>

        <Slider
          range
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={draftPrice}
          onChange={(value) => {
            if (Array.isArray(value)) setDraftPrice([value[0], value[1]]);
          }}
          tooltip={{
            formatter: (value) => `${formatPrice(value ?? 0)} so‘m`,
          }}
          styles={{
            track: { background: "#00863e" },
            rail: { background: "#e5e9e7" },
          }}
        />
        <div className="mt-2 flex justify-between text-[11px] text-[#8d9892]">
          <span>{formatPrice(PRICE_MIN)}</span>
          <span>{formatPrice(PRICE_MAX)} so‘m</span>
        </div>
        <p className="mt-1.5 text-xs font-semibold text-[#00863e]">
          {formatPrice(draftPrice[0])} – {formatPrice(draftPrice[1])} so‘m
        </p>

        {isDirty && (
          <button
            type="button"
            onClick={applyAll}
            className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#00863e] px-3 py-2 text-xs font-bold text-white shadow-[0_6px_14px_rgba(0,134,62,0.24)] transition hover:bg-[#006f35] lg:absolute lg:right-0 lg:top-7 lg:z-30 lg:mt-0 lg:w-auto lg:translate-x-[calc(100%+10px)] lg:px-3 lg:py-1.5"
          >
            O‘tish
          </button>
        )}
      </section>

      <div className="sticky bottom-0 -mx-4 mt-2 border-t border-[#eef2f0] bg-white px-4 pt-3 pb-1 lg:hidden">
        <button
          type="button"
          onClick={applyAll}
          className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#00863e] px-4 py-3 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(0,134,62,0.28)]"
        >
          Filtrlarni qo‘llash
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="mb-1 flex w-full items-center justify-between gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#e5e9e7] bg-white py-2 pl-2.5 pr-4 text-sm font-bold text-[#1f2d25] shadow-[0_4px_14px_rgba(16,37,26,0.06)] transition hover:border-[#b9dfc6] hover:bg-[#f6faf7]"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e9e7] bg-[#f6faf7] text-[#26352d]">
            <ListFilter size={16} />
          </span>
          Filter
          {appliedCount > 0 && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00863e] px-1.5 text-[11px] font-bold text-white">
              {appliedCount}
            </span>
          )}
        </button>
      </div>

      <aside className="relative z-20 hidden w-[220px] shrink-0 overflow-visible rounded-2xl border border-[#e5e9e7] bg-white p-3 shadow-[0_8px_24px_rgba(16,37,26,0.03)] lg:sticky lg:top-24 lg:block xl:w-[240px]">
        {panel}
      </aside>

      {open && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Yopish"
            className="absolute inset-0 cursor-pointer bg-[#10251a]/35 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[24px] border border-[#e5e9e7] bg-white p-4 shadow-[0_-16px_40px_rgba(16,37,26,0.18)] sm:inset-y-0 sm:left-0 sm:right-auto sm:max-h-none sm:w-[min(100%,360px)] sm:rounded-none sm:rounded-r-[24px] sm:p-5">
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
