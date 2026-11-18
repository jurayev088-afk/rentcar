"use client";
import { UseCarBrand } from "@/src/constants/UseCarBrands";
import api from "@/src/services/api";
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



export type CarFilters = {
  types: string[];
  capacities: number[];
  maxPrice: number;
};

const defaultMaxPrice = 3_000_000;

export default function Filter({ cars, setFilteredCars }: { cars: Car[] }) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };

  const [selectCarCategory, setSelectCarCategory] = useState<string[]>([]);
  const [selectBrand, setSelectBrand] = useState<string[]>([]);
  const [price, setPrice] = useState(defaultMaxPrice);
  const [loading, setLoading] = useState(false);
  console.log(selectCarCategory);
  console.log(selectBrand);

  const {carBrands} = UseCarBrand()

  const resetFilters = () => {
    setSelectCarCategory([]);
    setSelectBrand([]);
    setPrice(defaultMaxPrice);
    setFilteredCars(cars)
  };

  const applyFilters = () => {
    const filteredCars = cars.filter((item) => {
      const matchCategory =
        selectCarCategory.length === 0 ||
        selectCarCategory.some(
          (value) => value.toUpperCase() === item.category.toUpperCase(),
        );

      const matchBrand =
        selectBrand.length === 0 ||
        selectBrand.some((value) =>
          item.brand.toUpperCase().includes(value.toUpperCase()),
        );

      const matchPrice = item.price <= price
        

      return matchCategory && matchBrand && matchPrice;
    });

    console.log(filteredCars);
    setFilteredCars(filteredCars);
  };

  return (
    <aside className="min-w-[250px] max-w-[300px] rounded-lg mt-7 border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-base font-semibold text-slate-900">Filtrlar</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-medium cursor-pointer text-blue-700 transition hover:text-blue-900"
        >
          Tozalash
        </button>
      </div>

      <section className="border-b border-slate-100 py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Mashina turi
        </h3>
        <div className="max-h-50 overflow-y-auto">
          <Checkbox.Group
            className="flex flex-col gap-4"
            options={carCategory}
            value={selectCarCategory}
            onChange={setSelectCarCategory}
          />
        </div>
      </section>

      <section className="border-b border-slate-100 py-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          O‘rindiqlar soni
        </h3>
        <div className="max-h-50 overflow-y-auto">
          <Checkbox.Group
            className="flex flex-col gap-4"
            options={carBrands}
            value={selectBrand}
            onChange={setSelectBrand}
          />
        </div>
      </section>

      <Button onClick={() => applyFilters()}>Otish</Button>

      <section className="pt-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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
        />
        <div className="mt-2 flex justify-between text-[11px] text-slate-400">
          <span>100 000</span>
          <span>3 000 000 so‘m</span>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Narx: {formatPrice(price)} so‘m
        </p>
      </section>
    </aside>
  );
}
