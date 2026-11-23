"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Car, Search, Sparkles } from "lucide-react";
import { useBrands } from "@/src/hooks/use-brands";
import { brandLabel, brandLogo } from "@/src/lib/media";

function BrandMark({ brand, size = 56 }: { brand: string; size?: number }) {
  const logo = brandLogo(brand);
  const label = brandLabel(brand);
  const initial = label.charAt(0).toUpperCase();

  if (logo) {
    return (
      <Image
        src={logo}
        alt={label}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
        unoptimized
      />
    );
  }

  return (
    <span
      className="flex items-center justify-center rounded-2xl bg-[#00863e] font-extrabold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </span>
  );
}

export default function BrandsPage() {
  const [q, setQ] = useState("");
  const { data, isLoading, isError } = useBrands({
    limit: 200,
    search: q.trim() || undefined,
  });

  const brands = useMemo(() => data?.items ?? [], [data?.items]);
  const total = data?.meta?.total ?? brands.length;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#eef2f0_40%,#f4f6f5_100%)]">
      <div className="mx-auto w-full max-w-[1240px] px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
        <section className="relative mb-7 overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_16px_40px_rgba(16,37,26,0.07)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,134,62,0.12),_transparent_55%)]" />
          <div className="relative p-5 sm:p-7 lg:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9dfc6] bg-[#eaf6ef] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e]">
              <Sparkles className="h-3.5 w-3.5" />
              Brandlar katalogi
            </span>

            <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#1f2d25] sm:text-4xl">
                  Barcha avtomobil brandlari
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-[#6d7a73]">
                  Global katalog — brand tanlang va mashinalarni ko‘ring.
                </p>
              </div>

              <div className="rounded-2xl bg-[#eaf6ef] px-4 py-3 ring-1 ring-[#b9dfc6]">
                <p className="m-0 text-[10px] font-bold uppercase tracking-wide text-[#00863e]">
                  Brandlar
                </p>
                <p className="m-0 text-xl font-extrabold text-[#1f2d25]">
                  {total}
                </p>
              </div>
            </div>

            <div className="relative mt-5 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a9690]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Brand qidirish..."
                className="h-12 w-full rounded-full border border-[#e5e9e7] bg-[#f6faf7] pl-10 pr-4 text-sm font-medium text-[#1f2d25] outline-none transition placeholder:text-[#8a9690] focus:border-[#00863e] focus:bg-white focus:ring-2 focus:ring-[#00863e]/15"
              />
            </div>
          </div>
        </section>

        {isLoading && (
          <p className="text-sm text-[#6d7a73]">Brandlar yuklanmoqda...</p>
        )}
        {isError && (
          <p className="text-sm text-red-600">Brandlarni yuklashda xatolik.</p>
        )}
        {!isLoading && !isError && brands.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#d7e8dd] bg-white/70 px-4 py-8 text-center text-sm text-[#6d7a73]">
            Qidiruv bo‘yicha brand topilmadi.
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5">
          {brands.map((item) => {
            const label = brandLabel(item.name);
            return (
              <Link
                key={item.id}
                href={`/cars?brand=${encodeURIComponent(item.name)}`}
                className="group relative flex flex-col overflow-hidden rounded-[22px] border border-white/80 bg-white p-4 no-underline shadow-[0_10px_28px_rgba(16,37,26,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#b9dfc6] hover:shadow-[0_18px_40px_rgba(0,134,62,0.12)] sm:p-5"
              >
                <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#f6faf7_0%,#eaf6ef_100%)] ring-1 ring-[#eaf6ef] transition group-hover:ring-[#b9dfc6]">
                  <BrandMark brand={item.name} size={64} />
                </div>

                <h2 className="m-0 truncate text-base font-extrabold text-[#1f2d25] transition group-hover:text-[#00863e] sm:text-lg">
                  {label}
                </h2>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.country && (
                    <span className="rounded-full bg-[#f3f5f4] px-2 py-0.5 text-[10px] font-bold text-[#5a675f]">
                      {item.country}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf6ef] px-2 py-0.5 text-[10px] font-bold text-[#00863e]">
                    <Car className="h-3 w-3" />
                    {item.modelsCount ?? 0} model
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#eef2f0] pt-3">
                  <span className="text-[11px] font-semibold text-[#8a9690]">
                    Ko‘rish
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#00863e] text-white shadow-[0_6px_12px_rgba(0,134,62,0.25)] transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
