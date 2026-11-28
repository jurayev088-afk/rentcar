"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/src/hooks/use-categories";

/** Mobile kategoriya chip’lari — /cars */
export default function MobileCategoryChips() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categoriesData = [] } = useCategories();
  const activeId = searchParams.get("categoryId") || "";

  const chips = useMemo(() => {
    const rows = Array.isArray(categoriesData) ? categoriesData : [];
    return rows.map((c) => ({
      id: c.id,
      label: c.nameUz || c.name,
    }));
  }, [categoriesData]);

  const setCategory = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!id) params.delete("categoryId");
    else params.set("categoryId", id);
    const q = params.toString();
    router.replace(q ? `/cars?${q}` : "/cars");
  };

  if (chips.length === 0) return null;

  return (
    <div className="mb-3 -mx-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2 px-0.5 pb-0.5">
        <button
          type="button"
          onClick={() => setCategory("")}
          className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-bold transition ${
            !activeId
              ? "bg-[#00863e] text-white shadow-[0_4px_12px_rgba(0,134,62,0.25)]"
              : "border border-[#dde4e0] bg-white text-[#1f2d25]"
          }`}
        >
          Hammasi
        </button>
        {chips.map((chip) => {
          const active = activeId === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setCategory(chip.id)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-bold transition ${
                active
                  ? "bg-[#00863e] text-white shadow-[0_4px_12px_rgba(0,134,62,0.25)]"
                  : "border border-[#dde4e0] bg-white text-[#1f2d25]"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
