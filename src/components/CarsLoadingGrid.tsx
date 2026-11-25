export default function CarsLoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[22px] border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.04)]"
        >
          <div className="h-44 animate-pulse bg-[#eef2f0] sm:h-52" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-[#eef2f0]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[#eef2f0]" />
            <div className="flex gap-2 pt-1">
              <div className="h-8 flex-1 animate-pulse rounded-full bg-[#eef2f0]" />
              <div className="h-8 w-24 animate-pulse rounded-full bg-[#eef2f0]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
