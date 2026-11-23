import { Suspense } from "react";
import TopCarsPage from "@/src/features/mashinalar/page/TopCarsPage";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-sm text-[#6d7a73]">Yuklanmoqda...</div>
      }
    >
      <TopCarsPage />
    </Suspense>
  );
}
