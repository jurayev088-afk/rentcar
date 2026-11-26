export default function CarsLoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[14px] border border-[#e8ecf0] bg-white shadow-[0_6px_16px_rgba(15,23,42,0.06)] sm:rounded-[18px]"
        >
          <div className="aspect-[16/10] animate-pulse bg-[#eef2f6] sm:aspect-[5/3.4]" />
          <div className="space-y-1.5 p-1.5 sm:space-y-2 sm:p-3">
            <div className="h-3 w-3/4 animate-pulse rounded bg-[#eef2f6] sm:h-3.5" />
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((__, i) => (
                <div
                  key={i}
                  className="h-8 animate-pulse rounded-lg bg-[#f3f6fa] sm:h-10"
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-1 pt-0.5">
              <div className="h-3.5 w-14 animate-pulse rounded bg-[#eef2f6]" />
              <div className="h-6 w-6 animate-pulse rounded-full bg-[#eef2f6] sm:h-7 sm:w-16 sm:rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
