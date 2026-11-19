"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CarsTable from "./components/CarsTable";
import UseAllCarsContext from "@/src/constants/UseAllCars";

export default function Moshinalarim() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Egasi kabineti
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">
            Mening mashinalarim
          </h1>
          <p className="mt-1 text-sm text-[#6d7a73]">
            Avtomobil e’lonlaringizni boshqaring va yangilarini qo‘shing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/profile/owner/moshinalarim/qoshish")}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00863e] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(0,134,62,0.22)] transition hover:bg-[#006f35]"
        >
          <Plus size={18} />
          Mashina qo‘shish
        </button>
      </div>

      <UseAllCarsContext>
        <CarsTable />
      </UseAllCarsContext>
    </div>
  );
}
