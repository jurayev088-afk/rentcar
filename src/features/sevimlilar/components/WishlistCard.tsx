"use client";

import SafeImage from "@/src/components/SafeImage";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Star,
  ArrowUpRight,
  Users,
  Settings2,
  Fuel,
  Gauge,
  Wind,
} from "lucide-react";
import { UseWishlist } from "@/src/constants/UseWishlist";
import { useUser } from "@/src/constants/UseMeContext";
import { Car } from "@/src/types";

export default function WishlistCard() {
  const router = useRouter();
  const { wishlist, toggleWishlist, isLoading, isToggling, pendingCarId } =
    UseWishlist();
  const { user } = useUser();

  const formatPrice = (price: Car["price"]) => {
    const number = Number(String(price).replace(/\D/g, ""));
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const getTransmission = (value?: Car["transmission"]) => {
    if (!value) return "Avtomat";

    const values: Record<string, string> = {
      automatic: "Avtomat",
      manual: "Mexanika",
    };

    return values[value.toLowerCase()] ?? value;
  };

    const getFuel = (fuel?: Car["fuel"]) => {
    if (!fuel) return "Benzin";

    const values: Record<string, string> = {
      propane: "Propan",
      methane: "Metan",
      petrol: "Benzin",
      gasoline: "Benzin",
      diesel: "Dizel",
      electric: "Elektro",
      hybrid: "Gibrid",
    };

    return values[fuel.toLowerCase()] ?? fuel;
  };

  return (
    <div className="min-h-screen py-10 bg-[#f7f8fa]">
      <div className="max-w-[1250px] mx-auto px-5">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <span>Bosh sahifa</span>
              <span>/</span>
              <span className="text-[#0B1F33]">Sevimlilar</span>
            </div>

            <h1 className="text-3xl font-bold text-[#0B1F33]">Sevimlilar ❤️</h1>

            <p className="text-gray-500 mt-2">
              Siz yoqtirgan avtomobillar bir joyda
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <Heart size={21} className="text-red-500 fill-red-500" />
            </div>

            <div>
              <p className="text-xl font-bold text-[#0B1F33]">
                {wishlist?.length} ta
              </p>
              <p className="text-xs text-gray-400">Sevimli mashinalar</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[16px] border border-gray-100 bg-white sm:rounded-[22px]"
              >
                <div className="h-28 animate-pulse bg-[#eef2f0] sm:h-44" />
                <div className="space-y-2 p-2.5 sm:space-y-3 sm:p-4">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-[#eef2f0] sm:h-4" />
                  <div className="h-2.5 w-1/2 animate-pulse rounded bg-[#eef2f0] sm:h-3" />
                </div>
              </div>
            ))}
          </div>
        ) : wishlist?.length > 0 && user ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {wishlist?.map((car) => {
              const isFavorite = wishlist.some((item) => item.id === car.id);

              const carName = `${car.brand} ${car.model}`;
              const carLocation = `${car.region}, ${car.district}`;
              const carImage =
                car.images?.[0]?.url || car.images?.[0]?.thumbUrl;

              const hasDiscount = car.oldPrice > car.price;
              return (
                <article
                  key={car.id}
                  onClick={() => router.push(`/cars/${car.id}`)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[16px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_45px_rgba(15,23,42,0.11)] sm:rounded-[26px]"
                >
                  {/* Car image */}
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100 sm:h-56">
                    <SafeImage
                      src={carImage}
                      alt={carName}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                    <div className="absolute left-2 top-2 flex items-center gap-1 sm:left-4 sm:top-4 sm:gap-2">
                      {hasDiscount && (
                        <span className="rounded-full bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-lg sm:px-3 sm:py-1.5 sm:text-[11px]">
                          Chegirma
                        </span>
                      )}

                      <span className="rounded-full border border-white/30 bg-black/30 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px]">
                        {car.year}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isToggling && pendingCarId === String(car.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(car);
                      }}
                      aria-label="Sevimlilarga qo‘shish"
                      className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-white disabled:cursor-wait disabled:opacity-70 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
                    >
                      {isToggling && pendingCarId === String(car.id) ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500 sm:h-5 sm:w-5" />
                      ) : (
                        <Heart
                          size={16}
                          className={
                            isFavorite && user
                              ? "fill-rose-500 text-rose-500 sm:h-5 sm:w-5"
                              : "text-slate-600 sm:h-5 sm:w-5"
                          }
                        />
                      )}
                    </button>

                    <div className="absolute bottom-2 left-2 flex max-w-[calc(100%-1rem)] items-center gap-1 text-white sm:bottom-4 sm:left-4 sm:gap-2">
                      <MapPin size={12} className="shrink-0 sm:h-[15px] sm:w-[15px]" />
                      <span className="truncate text-[10px] font-semibold sm:text-xs">
                        {carLocation}
                      </span>
                    </div>
                  </div>

                  {/* Car details */}
                  <div className="flex flex-1 flex-col p-2.5 sm:p-5">
                    <div className="flex items-start justify-between gap-1.5 sm:gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-bold uppercase tracking-[1px] text-slate-400 sm:text-[11px] sm:tracking-[1.5px]">
                          {car.brand} <span className="mx-0.5">/</span>{" "}
                          {car.category}
                        </p>

                        <h2 className="mt-0.5 truncate text-sm font-extrabold tracking-tight text-[#0B1F33] sm:mt-1 sm:text-xl">
                          {carName}
                        </h2>
                      </div>

                      <div className="hidden shrink-0 items-center gap-1.5 rounded-xl bg-emerald-50 px-2.5 py-2 text-emerald-700 sm:flex">
                        <Star
                          size={14}
                          className="fill-emerald-500 text-emerald-500"
                        />
                        <span className="text-xs font-bold">
                          {car.condition === "excellent"
                            ? "A'lo"
                            : car.condition}
                        </span>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-2 hidden grid-cols-2 gap-2.5 sm:mt-5 sm:grid">
                      <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                        <Users size={17} className="text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">
                          {car.seats} o‘rin
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                        <Settings2 size={17} className="text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">
                          {(car.transmission)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                        <Fuel size={17} className="text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">
                          {(car.fuel)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
                        <Gauge size={17} className="text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600">
                          {car.engine} L
                        </span>
                      </div>
                    </div>

                    {car.airCondition && (
                      <div className="mt-3 hidden items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
                        <Wind size={15} />
                        Konditsioner mavjud
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-auto flex items-end justify-between gap-1.5 border-t border-slate-100 pt-2.5 sm:gap-3 sm:pt-5">
                      <div className="min-w-0">
                        {hasDiscount && (
                          <p className="mb-0.5 text-[10px] font-medium text-slate-400 line-through sm:mb-1 sm:text-xs">
                            {formatPrice(car.oldPrice)} so‘m
                          </p>
                        )}

                        <div className="flex flex-wrap items-baseline gap-0.5 sm:gap-1.5">
                          <span className="text-sm font-extrabold tracking-tight text-[#0B1F33] sm:text-xl">
                            {formatPrice(car.price)}
                          </span>
                          <span className="text-[9px] font-medium text-slate-400 sm:text-[11px]">
                            / kun
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/cars/${car.id}`);
                        }}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B1F33] text-white shadow-md shadow-[#0B1F33]/10 transition-all hover:bg-[#173b5c] hover:shadow-lg active:scale-95 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 sm:text-xs sm:font-bold"
                      >
                        <span className="hidden sm:inline">Batafsil</span>
                        <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl py-20 px-5 text-center border border-gray-100">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart size={35} className="text-red-400" />
            </div>

            <h2 className="text-xl font-bold text-[#0B1F33]">
              Hozircha sevimlilar yo'q
            </h2>

            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
              O'zingizga yoqqan avtomobillarni yurakcha orqali sevimlilarga
              qo'shing.
            </p>

            <button
              onClick={() => router.push("/cars")}
              className="mt-7 bg-[#0B1F33] text-white px-7 py-3 rounded-xl hover:bg-[#193b5c] transition"
            >
              Mashinalarni ko'rish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
