import { Suspense } from "react";
import CarsPage2 from "@/src/features/mashinalar/page/CarsPage2";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-[#6d7a73]">
          Yuklanmoqda...
        </div>
      }
    >
      <CarsPage2 />
    </Suspense>
  );
}
