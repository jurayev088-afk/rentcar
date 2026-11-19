"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  MapPin,
  Users,
  Fuel,
  Settings2,
  ArrowUpRight,
  Star,
  CarFront,
  Wind,
  Gauge,
  Phone,
} from "lucide-react";

import { UseWishlist } from "../constants/UseWishlist";
import { carStatus, type Car } from "../types";
import { useUser } from "../constants/UseMeContext";
import { useMemo } from "react";

interface CarsProps {
  cars: Car[];
  filteredCars: Car[];
}

export default function Cars({ cars, filteredCars }: CarsProps) {
  const router = useRouter();
  const { wishlist, toggleWishlist } = UseWishlist();
  const { user } = useUser();

  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const location = searchParams.get("location");

  const displayedCars = useMemo(() => {
    const sourceCars = filteredCars ?? cars ?? [];

    if (!location) return sourceCars;

    return sourceCars.filter(
      (car) => {
        const searchLocation = location?.toLowerCase().trim();

        return (
          car?.region?.toLowerCase()?.includes(searchLocation) ||
          car?.district?.toLowerCase()?.includes(searchLocation) ||
          car?.address?.toLowerCase()?.includes(searchLocation)
        );
      },
      [filteredCars, cars, location],
    );
  });

  const formatPrice = (price: Car["price"]) => {
    const number = Number(String(price).replace(/\D/g, ""));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const availableCars = displayedCars.filter((car) => car?.status == "MAVJUD");

  return (
    <section className="mt-6 w-full min-w-0">
      {availableCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
          {availableCars.map((car) => {
            const isFavorite = wishlist.some((item) => item.id === car.id);

            const carName = `${car.brand} ${car.model}`;
            const carLocation = `${car.region}, ${car.district}`;
            const carImage = car.images?.[0]?.url || car.images?.[0]?.thumbUrl;

            const hasDiscount = car.oldPrice > car.price;

            return (
              <article
                key={car.id}
                onClick={() => router.push(`/cars/${car.id}`)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[26px] border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b9dfc6] hover:shadow-[0_16px_36px_rgba(0,134,62,0.12)]"
              >
                {/* Car image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={carImage}
                    alt={carName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-115"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    {hasDiscount && (
                      <span className="rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                        Chegirma
                      </span>
                    )}

                    <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                      {car.year}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(car);
                    }}
                    aria-label="Sevimlilarga qo‘shish"
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-white"
                  >
                    <Heart
                      size={20}
                      className={
                        isFavorite && user
                          ? "fill-rose-500 text-rose-500"
                          : "text-slate-600"
                      }
                    />
                  </button>

                  {/* Location on image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <MapPin size={15} />
                    <span className="text-xs font-semibold">{carLocation}</span>
                  </div>
                </div>

                {/* Car details */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Name and condition */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400">
                        {car.brand} <span className="mx-1">/</span>{" "}
                        {car.category}
                      </p>

                      <h2 className="mt-1 truncate text-xl font-extrabold tracking-tight text-[#1f2d25]">
                        {carName}
                      </h2>
                    </div>

                    <div className="flex shrink-0 items-end gap-2">
                      {(() => {
                        const status = carStatus.find(
                          (item) => item.value === car.status,
                        );

                        const statusStyles: Record<string, string> = {
                          MAVJUD:
                            "bg-[#eaf6ef] text-[#00863e] ring-[#b9dfc6]",
                          IJARADA: "bg-[#e7f3ff] text-[#1d6fb8] ring-[#b7d7f0]",
                          BRON_QILINGAN:
                            "bg-[#fff4e5] text-[#c47a10] ring-[#f0d4a8]",
                        };

                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ring-inset ${
                              statusStyles[car.status] ||
                              "bg-[#eef2f0] text-[#5a675f] ring-[#d7ddd9]"
                            }`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {status?.label || car.status}
                          </span>
                        );
                      })()}

                      <div
                        className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2 ${
                          car.condition === "A'lo"
                            ? "bg-emerald-50 text-emerald-700"
                            : car.condition === "Yaxshi"
                              ? "bg-blue-50 text-blue-700"
                              : car.condition === "O'rtacha"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-slate-50 text-slate-600"
                        }`}
                      >
                        <Star
                          size={14}
                          className={
                            car.condition === "A'lo"
                              ? "fill-emerald-500 text-emerald-500"
                              : car.condition === "Yaxshi"
                                ? "fill-blue-500 text-blue-500"
                                : car.condition === "O'rtacha"
                                  ? "fill-orange-500 text-orange-500"
                                  : "text-slate-400"
                          }
                        />

                        <span className="text-xs font-bold">
                          {car.condition || "Belgilanmagan"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Full address */}
                  <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#eef2f0] bg-[#f6faf7] p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#00863e] shadow-sm">
                      <MapPin size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8d9892]">
                        Avtomobil manzili
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[#1f2d25]">
                        {[car.region, car.district, car.address]
                          .filter(Boolean)
                          .join(", ") || "Manzil ko‘rsatilmagan"}
                      </p>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="mt-4 grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                      <Users size={17} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">
                        {car.seats} o‘rin
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                      <Settings2 size={17} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">
                        {car?.transmission}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                      <Fuel size={17} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">
                        {car?.fuel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                      <Gauge size={17} className="text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600">
                        {car.engine} L
                      </span>
                    </div>
                  </div>

                  {/* Air condition */}
                  {car?.airCondition && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Wind size={15} />
                      Konditsioner mavjud
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-5">
                    <div className="min-w-0">
                      {hasDiscount && (
                        <p className="mb-1 text-xs font-medium text-slate-400 line-through">
                          {formatPrice(car.oldPrice)} so‘m
                        </p>
                      )}

                      <div className="flex flex-wrap items-baseline gap-1.5">
                        <span className="text-xl font-extrabold tracking-tight text-[#00863e]">
                          {formatPrice(car.price)}
                        </span>

                        <span className="text-[11px] font-medium text-[#8d9892]">
                          so‘m / kun
                        </span>
                      </div>
                    </div>

                    {car?.phone && (
                      <a
                        type="button"
                        href={`tel:${car?.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00863e] px-4 py-3 text-xs font-bold text-white shadow-[0_6px_14px_rgba(0,134,62,0.22)] transition-all hover:bg-[#006f35] hover:shadow-lg active:scale-95"
                      >
                        <Phone size={16} />
                        <span>Qo'ngiroq qilish</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7e8dd] bg-white px-6 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf6ef]">
            <CarFront size={30} className="text-[#00863e]" />
          </div>

          <h3 className="text-lg font-bold text-[#1f2d25]">
            Avtomobillar topilmadi
          </h3>

          <p className="mt-2 max-w-sm text-sm text-[#6d7a73]">
            Hozircha ushbu parametrlar bo‘yicha avtomobillar mavjud emas.
          </p>
        </div>
      )}
    </section>
  );
}
