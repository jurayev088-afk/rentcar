"use client";

import { UseCarBrand } from "@/src/constants/UseCarBrands";
import { Car } from "@/src/types";
import { Button, Checkbox, Slider } from "antd";
import { useState } from "react";

export const carCategory = [
  { label: "Byudjetli", value: "BYUDJETLI" },
  { label: "Sedan", value: "SEDAN" },
  { label: "Krossover", value: "KROSSOVER" },
  { label: "Miniven", value: "MINIVEN" },
  { label: "Coupe", value: "COUPE" },
];

const defaultMaxPrice = 3_000_000;

export default function Filter({
  cars,
  setFilteredCars,
}: {
  cars: Car[];
  setFilteredCars: (cars: Car[]) => void;
}) {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("ru-RU").format(value);

  const [selectCarCategory, setSelectCarCategory] = useState<string[]>([]);
  const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const [price, setPrice] = useState(defaultMaxPrice);

  const { carBrands } = UseCarBrand();

  const resetFilters = () => {
    setSelectCarCategory([]);
    setSelectBrand([]);
    setPrice(defaultMaxPrice);
    setFilteredCars(cars);
  };

  const applyFilters = () => {
    const filtered = cars.filter((item) => {
      const matchCategory =
        selectCarCategory.length === 0 ||
        selectCarCategory.some(
          (value) => value.toUpperCase() === item.category?.toUpperCase(),
        );

      const matchBrand =
        selectBrand.length === 0 ||
        selectBrand.some((value) =>
          item.brand?.toUpperCase().includes(value.toUpperCase()),
        );

      const matchPrice = Number(item.price) <= price;

      return matchCategory && matchBrand && matchPrice;
    });

    setFilteredCars(filtered);
  };

  return (
    <aside className="w-full shrink-0 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] md:sticky md:top-24 md:max-w-[280px]">
      <div className="flex items-center justify-between border-b border-[#eef2f0] pb-4">
        <h2 className="text-base font-bold text-[#1f2d25]">Filtrlar</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer text-xs font-semibold text-[#00863e] transition hover:text-[#006f35]"
        >
          Tozalash
        </button>
      </div>

      <section className="border-b border-[#eef2f0] py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#6d7a73]">
          Mashina turi
        </h3>
        <div className="max-h-48 overflow-y-auto">
          <Checkbox.Group
            className="flex flex-col gap-3"
            options={carCategory}
            value={selectCarCategory}
            onChange={setSelectCarCategory}
          />
        </div>
      </section>

      <section className="border-b border-[#eef2f0] py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#6d7a73]">
          Marka
        </h3>
        <div className="max-h-48 overflow-y-auto">
          <Checkbox.Group
            className="flex flex-col gap-3"
            options={carBrands}
            value={selectBrand}
            onChange={setSelectBrand}
          />
        </div>
      </section>

      <section className="py-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6d7a73]">
            Kunlik narx
          </h3>
        </div>
        <Slider
          min={100_000}
          max={3_000_000}
          step={50_000}
          value={price}
          onChange={(value) => setPrice(value)}
          tooltip={{
            formatter: (value) => `${formatPrice(value ?? 0)} so‘m`,
          }}
          styles={{
            track: { background: "#00863e" },
            rail: { background: "#e5e9e7" },
          }}
        />
        <div className="mt-2 flex justify-between text-[11px] text-[#8d9892]">
          <span>100 000</span>
          <span>3 000 000 so‘m</span>
        </div>
        <p className="mt-2 text-sm font-semibold text-[#00863e]">
          Narx: {formatPrice(price)} so‘m
        </p>
      </section>

      <Button
        type="primary"
        block
        onClick={applyFilters}
        className="!h-11 !rounded-full !border-0 !bg-[#00863e] !font-bold hover:!bg-[#006f35]"
      >
        Filtrlash
      </Button>
    </aside>
  );
}
