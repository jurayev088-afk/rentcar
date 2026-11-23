"use client";

import { Car } from "@/src/types";
import { Checkbox, Slider } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
const PRICE_MAX = 3_000_000;
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

function filterCars(cars: Car[], next: AppliedFilters) {
  return cars.filter((item) => {
    const matchCategory =
      next.categories.length === 0 ||
      next.categories.some((value) => {
        const v = value.toLowerCase();
        return (
          item.category?.toLowerCase().includes(v) ||
          item.category?.toLowerCase() === v
        );
      });

    const matchBrand =
      next.brands.length === 0 ||
      next.brands.some(
        (value) => item.brand?.toLowerCase() === value.toLowerCase(),
      );

    const price = Number(item.price) || 0;
    const matchPrice = price >= next.minPrice && price <= next.maxPrice;

    return matchCategory && matchBrand && matchPrice;
  });
}

export default function Filter({
  cars,
  setFilteredCars,
}: {
  cars: Car[];
  setFilteredCars: (cars: Car[]) => void;
}) {
  const searchParams = useSearchParams();
  const urlBrand = searchParams.get("brand") || undefined;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ru-RU").format(value);

  const initialBrands = useMemo(
    () => (urlBrand ? [urlBrand] : []),
    [urlBrand],
  );

  const [draftCategories, setDraftCategories] = useState<string[]>([]);
  const [draftBrands, setDraftBrands] = useState<string[]>(initialBrands);
  const [draftPrice, setDraftPrice] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [applied, setApplied] = useState<AppliedFilters>(() => ({
    ...EMPTY,
    brands: initialBrands,
  }));

  const { data: brandsPage } = useBrands({ limit: 200 });
  const { data: categoriesData = [] } = useCategories();

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
      (Array.isArray(categoriesData) ? categoriesData : []).map((c) => ({
        label: c.nameUz || c.name,
        value: c.nameUz || c.name,
      })),
    [categoriesData],
  );

  const isDirty =
    !sameList(draftCategories, applied.categories) ||
    !sameList(draftBrands, applied.brands) ||
    draftPrice[0] !== applied.minPrice ||
    draftPrice[1] !== applied.maxPrice;

  const applyAll = useCallback(() => {
    const next: AppliedFilters = {
      categories: [...draftCategories],
      brands: [...draftBrands],
      minPrice: draftPrice[0],
      maxPrice: draftPrice[1],
    };
    setApplied(next);
    setFilteredCars(filterCars(cars, next));
  }, [cars, draftBrands, draftCategories, draftPrice, setFilteredCars]);

  // Ro‘yxat yangilanganda qo‘llangan filtrni saqlab qolamiz (faqat cars o‘zgaganda)
  useEffect(() => {
    setFilteredCars(filterCars(cars, applied));
    // applied ni dep qilmaymiz — O‘tish/Tozalash o‘zi set qiladi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars, setFilteredCars]);

  const resetFilters = () => {
    setDraftCategories([]);
    setDraftBrands([]);
    setDraftPrice([PRICE_MIN, PRICE_MAX]);
    setApplied(EMPTY);
    setFilteredCars(cars);
  };

  return (
    <aside className="relative z-20 w-full shrink-0 overflow-visible rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] md:sticky md:top-24 md:max-w-[280px]">
      <div className="flex items-center justify-between border-b border-[#eef2f0] pb-4">
        <h2 className="text-base font-bold text-[#1f2d25]">Filtrlar</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer text-xs font-semibold text-[#00863e] transition hover:text-[#006f35]"
        >
          Tozalash
        </button>
      </div>

      <section className="border-b border-[#eef2f0] py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#6d7a73]">
          Mashina turi
        </h3>
        <div className="max-h-48 overflow-y-auto pr-1">
          <Checkbox.Group
            className="flex flex-col gap-3"
            options={categoryOptions.length ? categoryOptions : carCategory}
            value={draftCategories}
            onChange={(vals) => setDraftCategories(vals as string[])}
          />
        </div>
      </section>

      <section className="border-b border-[#eef2f0] py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#6d7a73]">
          Marka
        </h3>
        <div className="max-h-48 overflow-y-auto pr-1">
          <Checkbox.Group
            className="flex flex-col gap-3"
            options={brandOptions}
            value={draftBrands}
            onChange={(vals) => setDraftBrands(vals as string[])}
          />
        </div>
      </section>

      <section className="relative py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#6d7a73]">
          Kunlik narx
        </h3>

        <div className="mb-3 grid grid-cols-2 gap-2">
          <label className="block">
            <span className="mb-1 block text-[11px] text-[#8d9892]">Ot</span>
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
              className="h-10 w-full rounded-xl border border-[#e5e9e7] px-3 text-sm text-[#1f2d25] outline-none focus:border-[#00863e]"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] text-[#8d9892]">Do</span>
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
              className="h-10 w-full rounded-xl border border-[#e5e9e7] px-3 text-sm text-[#1f2d25] outline-none focus:border-[#00863e]"
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
        <p className="mt-2 text-sm font-semibold text-[#00863e]">
          Narx: {formatPrice(draftPrice[0])} – {formatPrice(draftPrice[1])} so‘m
        </p>

        {isDirty && (
          <button
            type="button"
            onClick={applyAll}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#00863e] px-4 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,134,62,0.28)] transition hover:bg-[#006f35] md:absolute md:right-0 md:top-8 md:z-30 md:mt-0 md:w-auto md:translate-x-[calc(100%+12px)] md:rounded-lg md:px-3.5 md:py-2"
          >
            O‘tish
          </button>
        )}
      </section>
    </aside>
  );
}
