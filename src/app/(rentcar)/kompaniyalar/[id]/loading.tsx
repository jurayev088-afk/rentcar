export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#f4f6f5] px-3 py-6 sm:px-5">
      <div className="mx-auto max-w-[1240px]">
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-2xl bg-[#dde5e1]"
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <span className="inline-flex h-10 w-10 animate-spin rounded-full border-[3px] border-[#c5d9cc] border-t-[#00863e]" />
        </div>
      </div>
    </div>
  );
}
