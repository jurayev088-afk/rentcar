export default function CarsLoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[16px] border border-[#e8ecea] bg-white shadow-[0_6px_18px_rgba(16,37,26,0.06)]"
        >
          {/* Mobile skeleton */}
          <div className="flex gap-2.5 p-2.5 sm:hidden">
            <div className="w-[42%] shrink-0">
              <div className="aspect-[4/3] animate-pulse rounded-[12px] bg-[#eef2f0]" />
              <div className="mt-1.5 h-3 w-24 animate-pulse rounded bg-[#eef2f0]" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-3.5 w-4/5 animate-pulse rounded bg-[#eef2f0]" />
              <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#f3f5f4]" />
              <div className="mt-1 h-3 w-full animate-pulse rounded bg-[#f3f5f4]" />
              <div className="h-3 w-full animate-pulse rounded bg-[#f3f5f4]" />
              <div className="mt-auto flex justify-end gap-1.5 pt-2">
                <div className="h-9 w-9 animate-pulse rounded-full bg-[#eaf6ef]" />
                <div className="h-9 w-24 animate-pulse rounded-full bg-[#d8f0e2]" />
              </div>
            </div>
          </div>

          {/* Desktop skeleton */}
          <div className="hidden sm:block">
            <div className="aspect-[16/10] animate-pulse bg-[#eef2f0]" />
            <div className="space-y-2.5 px-3.5 py-3">
              <div className="h-3.5 w-4/5 animate-pulse rounded bg-[#eef2f0]" />
              <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#f3f5f4]" />
              <div className="flex gap-2 border-b border-[#eef2f0] pb-2">
                <div className="h-3 flex-1 animate-pulse rounded bg-[#f3f5f4]" />
                <div className="h-3 flex-1 animate-pulse rounded bg-[#f3f5f4]" />
                <div className="h-3 flex-1 animate-pulse rounded bg-[#f3f5f4]" />
              </div>
              <div className="flex justify-between gap-2">
                <div className="h-8 w-1/2 animate-pulse rounded bg-[#eef2f0]" />
                <div className="h-8 w-1/2 animate-pulse rounded bg-[#eef2f0]" />
              </div>
              <div className="flex gap-2 pt-0.5">
                <div className="h-10 w-10 animate-pulse rounded-full bg-[#eaf6ef]" />
                <div className="h-10 flex-1 animate-pulse rounded-[12px] bg-[#d8f0e2]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
