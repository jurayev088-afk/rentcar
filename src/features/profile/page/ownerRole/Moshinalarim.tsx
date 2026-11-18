"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import CarsTable from "./components/CarsTable";
import UseAllCarsContext from "@/src/constants/UseAllCars";

export default function Moshinalarim() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2>Moshinalar</h2>

        <button
          onClick={() => router.push("/profile/owner/moshinalarim/qoshish")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#163A5A]"
        >
          <Plus size={18} />
          Mashina qo'shish
        </button>
      </div>
      <UseAllCarsContext>
        <CarsTable />
      </UseAllCarsContext>
    </div>
  );
}
