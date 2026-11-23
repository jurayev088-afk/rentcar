"use client";

import { Suspense } from "react";
import CarsPage from "./CarsPage";

export default function CarsPage2() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-sm text-[#6d7a73]">Yuklanmoqda...</div>
      }
    >
      <CarsPage />
    </Suspense>
  );
}
