"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useBrands } from "@/src/hooks/use-brands";
import { brandLabel } from "@/src/lib/media";
import BrandMark from "@/src/components/BrandMark";

export default function BrandsPage() {
  const [q, setQ] = useState("");
  const { data, isLoading, isError } = useBrands({ limit: 500 });

  const allBrands = useMemo(() => data?.items ?? [], [data?.items]);

  const brands = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return allBrands;
    return allBrands.filter((b) => {
      const name = b.name.toLowerCase();
      const country = (b.country || "").toLowerCase();
      return name.includes(query) || country.includes(query);
    });
  }, [allBrands, q]);

  const showLoading = isLoading && allBrands.length === 0;

  return (
    <div className="min-h-screen bg-[#f3f5f4]">
      <div className="mx-auto w-full max-w-[1100px] px-3 py-5 sm:px-5 sm:py-7 lg:px-6">
        <header className="mb-5 rounded-2xl border border-[#e5e9e7] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#1f2d25] sm:text-2xl">
                Brandlar
              </h1>
              <p className="mt-0.5 text-sm text-[#6d7a73]">
                Brand tanlang — mashinalar ochiladi
                {!showLoading && allBrands.length > 0 ? (
                  <span className="text-[#8a9690]"> · {allBrands.length} ta</span>
                ) : null}
              </p>
            </div>
            <div className="relative w-full sm:max-w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a9690]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Qidirish..."
                className="h-11 w-full rounded-xl border border-[#e5e9e7] bg-[#f6faf7] pl-9 pr-3 text-sm font-medium text-[#1f2d25] outline-none transition placeholder:text-[#8a9690] focus:border-[#00863e] focus:bg-white focus:ring-2 focus:ring-[#00863e]/12"
              />
            </div>
          </div>
        </header>

        {showLoading && (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="h-[112px] animate-pulse rounded-2xl bg-[#e8ecea]"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            Brandlarni yuklashda xatolik.
          </p>
        )}

        {!showLoading && !isError && brands.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#d7e8dd] bg-white px-4 py-10 text-center text-sm text-[#6d7a73]">
            «{q}» bo‘yicha brand topilmadi.
          </p>
        )}

        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
          {brands.map((item) => {
            const label = brandLabel(item.name);
            return (
              <Link
                key={item.id || item.slug || item.name.toLowerCase()}
                href={`/cars?brand=${encodeURIComponent(item.name)}`}
                className="group flex cursor-pointer flex-col items-center rounded-2xl border border-[#e8ecea] bg-white p-3 no-underline shadow-[0_4px_14px_rgba(16,37,26,0.04)] transition hover:-translate-y-0.5 hover:border-[#b9dfc6] hover:shadow-[0_10px_24px_rgba(0,134,62,0.1)] active:scale-[0.98]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f4f7f5] ring-1 ring-[#eef2f0] transition group-hover:ring-[#c6e5d1] sm:h-16 sm:w-16">
                  <BrandMark
                    brand={item.name}
                    logoUrl={item.logo}
                    size={48}
                  />
                </div>

                <h2 className="mt-2.5 w-full truncate text-center text-[12px] font-bold leading-tight text-[#1f2d25] transition group-hover:text-[#00863e] sm:text-[13px]">
                  {label}
                </h2>

                {item.country ? (
                  <p className="mt-0.5 w-full truncate text-center text-[10px] text-[#8a9690]">
                    {item.country}
                  </p>
                ) : null}

                <span className="mt-2 inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#00863e] opacity-0 transition group-hover:opacity-100">
                  Ko‘rish
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
