export default function Loading() {
  return (
    <div className="min-h-[70vh] bg-[#f4f6f5] px-3 py-6 sm:px-5">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-24 animate-pulse rounded-full bg-[#dde5e1]" />
          <p className="text-sm font-semibold text-[#00863e]">Yuklanmoqda...</p>
        </div>
        <div className="mb-4 h-8 w-48 animate-pulse rounded-xl bg-[#dde5e1] sm:w-72" />
        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="space-y-3">
            <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-[#dde5e1]" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-[#dde5e1]"
                />
              ))}
            </div>
          </div>
          <div className="h-[360px] animate-pulse rounded-2xl bg-[#dde5e1]" />
        </div>
        <div className="mt-8 flex justify-center">
          <span className="inline-flex h-10 w-10 animate-spin rounded-full border-[3px] border-[#c5d9cc] border-t-[#00863e]" />
        </div>
      </div>
    </div>
  );
}
