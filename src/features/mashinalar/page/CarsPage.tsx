"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Cars from "@/src/components/Cars";
import CarsLoadingGrid from "@/src/components/CarsLoadingGrid";
import Filter from "../components/Filter";
import MobileCategoryChips from "../components/MobileCategoryChips";
import UseWishlistContext from "@/src/constants/UseWishlist";
import { useInfiniteCars } from "@/src/hooks/use-cars";
import { mapApiCarToUi } from "@/src/lib/map-car";

export default function CarsPage() {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    return {
      regionId: searchParams.get("regionId") || undefined,
      brand: searchParams.get("brand") || undefined,
      model: searchParams.get("model") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      companyId: searchParams.get("companyId") || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort: searchParams.get("sort") || "newest",
    };
  }, [searchParams]);

  const {
    data,
    isPending,
    isFetching,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteCars(filters);

  const cars = useMemo(
    () => (data?.pages ?? []).flatMap((p) => p.items).map(mapApiCarToUi),
    [data?.pages],
  );

  // Filtr/search o‘zgarganda (yangi query) — skeleton; scroll load emas
  const isFilterLoading =
    (isPending || (isFetching && !isFetchingNextPage)) && cars.length === 0;

  const showEmpty =
    !isPending && !isFetching && !isError && cars.length === 0;

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

  return (
    <div className="mx-auto w-full max-w-[1440px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

      {isError && cars.length === 0 && (
        <p className="mb-4 text-sm text-red-600">
          Mashinalarni yuklashda xatolik. Backendni tekshiring.
        </p>
      )}

      <div className="flex w-full flex-col items-start gap-3 overflow-visible lg:flex-row lg:gap-4 xl:gap-5">
        <Filter />
        <div className="min-w-0 w-full flex-1 lg:min-w-0">
          <MobileCategoryChips />
          <UseWishlistContext>
            {isFilterLoading ? (
              <CarsLoadingGrid count={8} />
            ) : (
              <>
                <Cars
                  cars={cars}
                  filteredCars={cars}
                  isLoading={false}
                  forceEmpty={showEmpty}
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
    </div>
  );
}
