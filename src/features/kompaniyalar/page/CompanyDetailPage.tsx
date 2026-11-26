"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Car,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Cars from "@/src/components/Cars";
import CarsLoadingGrid from "@/src/components/CarsLoadingGrid";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useCompany } from "@/src/hooks/use-companies";
import {
  COMPANY_PAGE_SIZE,
  useInfiniteCars,
} from "@/src/hooks/use-cars";
import { toMoneyNumber } from "@/src/lib/format";
import { companyLogo } from "@/src/lib/media";
import { mapApiCarToUi } from "@/src/lib/map-car";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(value);
        return (
          <Star
            key={index}
            className={`h-4 w-4 ${
              filled
                ? "fill-[#f5b301] text-[#f5b301] drop-shadow-[0_1px_2px_rgba(245,179,1,0.35)]"
                : "text-[#e2e6e3]"
            }`}
          />
        );
      })}
    </div>
  );
}

function CompanyDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#eef2f0_45%,#f4f6f5_100%)]">
      <div className="mx-auto w-full max-w-[1240px] px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
        <div className="mb-5 flex items-center gap-2">
          <div className="h-9 w-44 animate-pulse rounded-full bg-[#dde5e1]" />
          <p className="text-sm font-semibold text-[#00863e]">Yuklanmoqda...</p>
        </div>

        <div className="mb-7 overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(16,37,26,0.1)]">
          <div className="h-[140px] animate-pulse bg-[#dde5e1] sm:h-[168px]" />
          <div className="relative px-4 pb-5 sm:px-6 sm:pb-6">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">
              <div className="h-[96px] w-[96px] animate-pulse rounded-[22px] bg-[#dde5e1] sm:h-[112px] sm:w-[112px]" />
              <div className="flex-1 space-y-2 pb-1">
                <div className="h-3 w-24 animate-pulse rounded bg-[#dde5e1]" />
                <div className="h-8 w-56 animate-pulse rounded-xl bg-[#dde5e1] sm:w-72" />
                <div className="h-4 w-40 animate-pulse rounded bg-[#dde5e1]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 h-7 w-56 animate-pulse rounded-xl bg-[#dde5e1]" />
        <CarsLoadingGrid count={8} />
        <div className="mt-8 flex justify-center">
          <span className="inline-flex h-10 w-10 animate-spin rounded-full border-[3px] border-[#c5d9cc] border-t-[#00863e]" />
        </div>
      </div>
    </div>
  );
}

export default function CompanyDetailPage() {
  const params = useParams();
  const id = String(params.id || "");
  const { data: company, isLoading, isError } = useCompany(id);

  const {
    data: carsPages,
    isPending: carsPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteCars({
    companyId: id || undefined,
    pageSize: COMPANY_PAGE_SIZE,
    sort: "newest",
  });

  const cars = useMemo(
    () =>
      (carsPages?.pages ?? []).flatMap((p) => p.items).map(mapApiCarToUi),
    [carsPages?.pages],
  );

  const totalCars =
    carsPages?.pages?.[0]?.meta?.total ??
    company?._count?.cars ??
    cars.length;

  const carsInitialLoading =
    (carsPending || (isFetching && !isFetchingNextPage)) && cars.length === 0;

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    void fetchNextPage().finally(() => {
      loadingMoreRef.current = false;
    });
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore();
      },
      { root: null, rootMargin: "280px 0px", threshold: 0 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [loadMore, cars.length]);

  if (isLoading) {
    return <CompanyDetailSkeleton />;
  }

  if (isError || !company) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eef2f0]">
          <Building2 className="h-7 w-7 text-[#b0bbb5]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1f2d25]">
          Kompaniya topilmadi
        </h1>
        <Link
          href="/kompaniyalar"
          className="mt-4 inline-flex items-center gap-2 font-bold text-[#00863e] no-underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Orqaga
        </Link>
      </div>
    );
  }

  const rating = toMoneyNumber(company.ratingAvg, 0);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#eef2f0_45%,#f4f6f5_100%)]">
      <div className="mx-auto w-full max-w-[1240px] px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
        <Link
          href="/kompaniyalar"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e5e9e7] bg-white px-3.5 py-2 text-sm font-semibold text-[#5a675f] no-underline shadow-sm transition hover:border-[#b9dfc6] hover:text-[#00863e]"
        >
          <ArrowLeft className="h-4 w-4" />
          Barcha kompaniyalar
        </Link>

        <section className="mb-7 overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(16,37,26,0.1)]">
          <div className="relative h-[140px] overflow-hidden bg-[#0f1f16] sm:h-[168px]">
            <Image
              src={companyLogo(company.logoUrl)}
              alt=""
              fill
              className="object-cover opacity-50 blur-[1.5px]"
              sizes="1240px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f16] via-[#0f1f16]/55 to-[#00863e]/30" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 85% 20%, rgba(255,255,255,0.28), transparent 42%)",
              }}
            />

            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/25 sm:left-5 sm:top-5">
              <BadgeCheck className="h-3.5 w-3.5 text-[#7ddea3]" />
              Tasdiqlangan kompaniya
            </span>
          </div>

          <div className="relative px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-[22px] bg-white p-1.5 shadow-[0_14px_32px_rgba(16,37,26,0.22)] ring-2 ring-white sm:h-[112px] sm:w-[112px]">
                  <div className="relative h-full w-full overflow-hidden rounded-[16px] bg-[#eef2f0]">
                    <Image
                      src={companyLogo(company.logoUrl)}
                      alt={company.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1 pb-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e]">
                    Kompaniya
                  </p>
                  <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#1f2d25] sm:text-3xl">
                    {company.name}
                  </h1>
                  {company.description && (
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#6d7a73]">
                      {company.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f6faf7] px-3 py-1.5 ring-1 ring-[#eaf6ef]">
                      <Stars value={rating} />
                      <span className="text-sm font-extrabold text-[#1f2d25]">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-[#8a9690]">
                        ({company.ratingCount} baho)
                      </span>
                    </div>

                    {company.address && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f5f4] px-3 py-1.5 text-xs font-semibold text-[#5a675f]">
                        <MapPin className="h-3.5 w-3.5 text-[#00863e]" />
                        {company.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:pb-1">
                <div className="rounded-2xl bg-[#eaf6ef] px-4 py-3 text-center ring-1 ring-[#b9dfc6]">
                  <p className="m-0 text-[10px] font-bold uppercase tracking-wide text-[#00863e]">
                    Park
                  </p>
                  <p className="m-0 inline-flex items-center gap-1.5 text-lg font-extrabold text-[#1f2d25]">
                    <Car className="h-4 w-4 text-[#00863e]" />
                    {totalCars} ta
                  </p>
                </div>

                {company.phone && (
                  <a
                    href={`tel:${company.phone}`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#00863e] px-5 py-3.5 text-sm font-extrabold text-white no-underline shadow-[0_10px_24px_rgba(0,134,62,0.28)] transition hover:bg-[#006f35]"
                  >
                    <Phone className="h-4 w-4" />
                    Qo‘ng‘iroq
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e]">
              Avtopark
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[#1f2d25] sm:text-2xl">
              Kompaniya mashinalari
            </h2>
            <p className="mt-1 text-sm text-[#6d7a73]">
              Shu kompaniyaga tegishli barcha e’lon qilingan avtomobillar
            </p>
          </div>
          <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#00863e] shadow-sm ring-1 ring-[#d7e8dd]">
            {totalCars} ta e’lon
          </span>
        </div>

        <UseWishlistContext>
          {carsInitialLoading ? (
            <CarsLoadingGrid count={8} />
          ) : (
            <>
              <Cars
                cars={cars}
                filteredCars={cars}
                showWishlist={false}
                isLoading={false}
                forceEmpty={!carsPending && !isFetching && cars.length === 0}
              />

              <div ref={sentinelRef} className="h-8 w-full" aria-hidden />

              {isFetchingNextPage && (
                <div className="mt-2 flex justify-center py-4">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#00863e]">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#d7e8dd] border-t-[#00863e]" />
                    Yana yuklanmoqda...
                  </span>
                </div>
              )}

              {!hasNextPage && cars.length > 0 && (
                <p className="mt-2 pb-4 text-center text-xs text-[#8a9690]">
                  Barcha mashinalar ko‘rsatildi
                </p>
              )}
            </>
          )}
        </UseWishlistContext>
      </div>
    </div>
  );
}
