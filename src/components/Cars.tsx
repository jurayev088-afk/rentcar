"use client";

import SafeImage from "./SafeImage";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Users,
  Fuel,
  CarFront,
  CalendarDays,
  Cog,
  Gauge,
  Wind,
  Phone,
} from "lucide-react";
import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { WishlistContext } from "../constants/UseWishlist";
import type { Car } from "../types";
import { useUser } from "../constants/UseMeContext";
import { brandLabel } from "../lib/media";
import CarsLoadingGrid from "./CarsLoadingGrid";

const fallbackImage =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";

const carsGridClass =
  "grid grid-cols-2 gap-1.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4";

function formatPrice(price: Car["price"]) {
  const number = Number(String(price).replace(/\D/g, ""));
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function shortFuel(fuel?: string) {
  if (!fuel) return "—";
  const f = fuel.toLowerCase();
  if (f.includes("benzin") || f.includes("petrol") || f.includes("gasolin"))
    return "Benzin";
  if (f.includes("dizel") || f.includes("diesel")) return "Dizel";
  if (f.includes("elektro") || f.includes("electric")) return "Elektro";
  if (f.includes("gibrid") || f.includes("hybrid")) return "Gibrid";
  if (f.includes("gaz") || f.includes("lpg") || f.includes("metan")) return "Gaz";
  return fuel;
}

function shortTransmission(value?: string) {
  if (!value) return "—";
  const t = value.toLowerCase();
  if (t.includes("avto") || t.includes("auto")) return "Avto";
  if (t.includes("mex") || t.includes("manual")) return "Mex";
  if (t.includes("cvt")) return "CVT";
  return value.length > 6 ? `${value.slice(0, 5)}…` : value;
}

function carImageUrls(car: Car): string[] {
  const urls = (car.images ?? [])
    .map(
      (img) =>
        img?.url || img?.originalUrl || img?.thumbUrl || (typeof img === "string" ? img : ""),
    )
    .filter(Boolean) as string[];
  return urls.length > 0 ? urls : [fallbackImage];
}

export type CarCardProps = {
  car: Car;
  className?: string;
  showWishlist?: boolean;
};

/** Kartochka: swipe-rasm + kompakt specs (dizayn) */
export function CarCard({
  car,
  className = "",
  showWishlist = true,
}: CarCardProps) {
  const router = useRouter();
  const wishlistCtx = useContext(WishlistContext);
  const { user } = useUser();
  const isFavorite =
    wishlistCtx?.wishlist.some((item) => item.id === car.id) ?? false;

  const carName = `${brandLabel(car.brand)} ${car.model}`;
  const carLocation =
    [car.region, car.district].filter(Boolean).join(", ") || "—";
  const images = useMemo(() => carImageUrls(car), [car]);
  const hasDiscount = Number(car.oldPrice) > Number(car.price);
  const available = car.status !== "IJARADA" && car.status !== "BRON_QILINGAN";

  const [activeIndex, setActiveIndex] = useState(0);
  const dragRef = useRef({
    x: 0,
    y: 0,
    moved: false,
    axis: null as null | "x" | "y",
    swiping: false,
  });

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
    },
    [images.length],
  );

  const openCar = useCallback(() => {
    if (dragRef.current.moved || dragRef.current.swiping) return;
    router.push(`/cars/${car.id}`);
  }, [car.id, router]);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      moved: false,
      axis: null,
      swiping: false,
    };
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (!dragRef.current.axis && (absX > 8 || absY > 8)) {
      // Vertikal → sahifa scroll; gorizontal → rasm almashtirish
      dragRef.current.axis = absX > absY ? "x" : "y";
      dragRef.current.moved = true;
    }
  };

  const onImagePointerUp = (e: ReactPointerEvent) => {
    const dx = e.clientX - dragRef.current.x;
    const absX = Math.abs(dx);
    if (dragRef.current.axis === "x" && absX > 40 && images.length > 1) {
      dragRef.current.swiping = true;
      if (dx < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  };

  const specs = [
    {
      icon: Gauge,
      value: car.engine ? `${car.engine}L` : "—",
      label: "Dvigatel",
    },
    {
      icon: Cog,
      value: shortTransmission(car.transmission),
      label: "Uzatma",
    },
    {
      icon: Fuel,
      value: shortFuel(car.fuel),
      label: "Yoqilg‘i",
    },
    {
      icon: Users,
      value: String(car.seats ?? "—"),
      label: "O‘rin",
    },
  ] as const;

  return (
    <article
      onClick={openCar}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#e5e9e7] bg-white shadow-[0_6px_16px_rgba(16,37,26,0.04)] transition-all duration-300 hover:border-[#b9dfc6] hover:shadow-[0_16px_36px_rgba(0,134,62,0.12)] sm:rounded-[18px] ${className}`}
    >
      {/* Image + swipe (touch-action: pan-y — vertikal scroll bloklanmaydi) */}
      <div
        className="relative aspect-[16/10] w-full shrink-0 touch-pan-y overflow-hidden bg-[#eef2f6] sm:aspect-[5/3.4]"
        onPointerUp={onImagePointerUp}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={`${car.id}-img-${i}`}
              className="relative h-full w-full shrink-0 grow-0 basis-full"
            >
              <SafeImage
                src={src}
                alt={`${carName} ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 20vw"
                className="pointer-events-none object-cover! select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/35 to-transparent" />

        <div className="absolute left-1.5 top-1.5 z-[1] flex max-w-[70%] flex-wrap gap-0.5 sm:left-2 sm:top-2 sm:gap-1">
          <span className="inline-flex items-center rounded-full border border-[#b9dfc6] bg-[#eaf6ef] px-1.5 py-px text-[9px] font-bold text-[#00863e] shadow-sm sm:px-2 sm:py-0.5 sm:text-[11px]">
            {car.year}
          </span>
          {!available && (
            <span className="inline-flex items-center rounded-full bg-[#e8f1fb] px-1.5 py-px text-[8px] font-bold text-[#1d6fb8] shadow-sm sm:py-0.5 sm:text-[10px]">
              Ijarada
            </span>
          )}
          {hasDiscount && available && (
            <span className="rounded-full bg-orange-500 px-1.5 py-px text-[8px] font-bold text-white shadow-sm sm:py-0.5 sm:text-[10px]">
              Chegirma
            </span>
          )}
        </div>

        {showWishlist && wishlistCtx && (
          <button
            type="button"
            disabled={
              wishlistCtx.isToggling &&
              wishlistCtx.pendingCarId === String(car.id)
            }
            onClick={(e) => {
              e.stopPropagation();
              wishlistCtx.toggleWishlist(car);
            }}
            aria-label="Sevimlilarga qo‘shish"
            className="absolute right-1.5 top-1.5 z-[1] flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:scale-105 disabled:cursor-wait disabled:opacity-70 sm:right-2 sm:top-2 sm:h-8 sm:w-8"
          >
            {wishlistCtx.isToggling &&
            wishlistCtx.pendingCarId === String(car.id) ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500" />
            ) : (
              <Heart
                size={12}
                className={
                  isFavorite && user
                    ? "fill-rose-500 text-rose-500 sm:h-3.5 sm:w-3.5"
                    : "text-slate-700 sm:h-3.5 sm:w-3.5"
                }
              />
            )}
          </button>
        )}

        {carLocation && carLocation !== "—" && (
          <div className="absolute bottom-1.5 left-1.5 z-[1] flex max-w-[72%] items-center gap-0.5 text-white drop-shadow sm:bottom-2 sm:left-2 sm:gap-1">
            <MapPin size={10} className="shrink-0 sm:h-3 sm:w-3" />
            <span className="truncate text-[9px] font-semibold sm:text-[11px]">
              {carLocation}
            </span>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-1.5 right-1.5 z-[1] flex items-center gap-0.5 sm:bottom-2 sm:right-2 sm:gap-1">
            {images.slice(0, 6).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Rasm ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`h-1 rounded-full transition-all sm:h-1.5 ${
                  i === activeIndex
                    ? "w-2 bg-white sm:w-3"
                    : "w-1 bg-white/55 hover:bg-white/80 sm:w-1.5"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-2 py-1.5 sm:gap-1.5 sm:px-2.5 sm:py-2">
        <h2 className="line-clamp-1 text-[12px] font-extrabold leading-tight tracking-tight text-[#1f2d25] sm:text-[14px]">
          {carName}
        </h2>

        {/* Specs — to‘liq matn (Elektro, Benzin…) */}
        <div className="grid grid-cols-4 gap-0.5 sm:gap-1">
          {specs.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center rounded-md bg-slate-50 px-0.5 py-1 text-center sm:rounded-lg sm:py-1.5"
              title={label}
            >
              <Icon
                size={11}
                className="text-slate-400 sm:h-3 sm:w-3"
                strokeWidth={1.75}
              />
              <span className="mt-0.5 w-full text-center text-[8px] font-bold leading-tight text-slate-700 sm:text-[10px]">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[9px] text-slate-500 sm:text-[10px]">
          <span className="inline-flex items-center gap-0.5 font-medium">
            <CalendarDays size={10} className="shrink-0 text-slate-400" />
            Min. {car.minDays || 1} kun
          </span>
          {car.airCondition && (
            <span className="inline-flex items-center gap-0.5 font-medium">
              <Wind size={10} className="shrink-0 text-slate-400" />
              Konditsioner
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1.5 border-t border-slate-100 pt-1 sm:pt-1.5">
          <div className="min-w-0">
            {hasDiscount && (
              <p className="text-[8px] font-medium leading-none text-slate-400 line-through sm:text-[9px]">
                {formatPrice(car.oldPrice)} so‘m
              </p>
            )}
            <div className="flex flex-wrap items-baseline gap-0.5">
              <span className="text-[12px] font-extrabold tracking-tight text-[#00863e] sm:text-[14px]">
                {formatPrice(car.price)} so‘m
              </span>
              <span className="text-[8px] font-medium text-[#8d9892] sm:text-[10px]">
                /kun
              </span>
            </div>
          </div>

          {car?.phone ? (
            <a
              href={`tel:${car.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-7 shrink-0 items-center justify-center gap-1 rounded-full bg-[#00863e] px-2 text-white shadow-[0_3px_8px_rgba(0,134,62,0.2)] transition hover:bg-[#006f35] active:scale-95 sm:h-8 sm:gap-1.5 sm:px-2.5 sm:text-[11px] sm:font-bold"
            >
              <Phone size={12} />
              <span className="hidden sm:inline">Qo&apos;ngiroq</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/cars/${car.id}`);
              }}
              className="inline-flex h-7 shrink-0 items-center rounded-full bg-[#00863e] px-2.5 text-[9px] font-bold text-white shadow-[0_3px_8px_rgba(0,134,62,0.2)] transition hover:bg-[#006f35] active:scale-95 sm:h-8 sm:px-3 sm:text-[11px]"
            >
              Batafsil
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

interface CarsProps {
  cars: Car[];
  filteredCars: Car[];
  showWishlist?: boolean;
  isLoading?: boolean;
  /** true bo‘lsa — faqat haqiqatan bo‘sh (loading emas) */
  forceEmpty?: boolean;
}

export default function Cars({
  cars,
  filteredCars,
  showWishlist = true,
  isLoading = false,
  forceEmpty = false,
}: CarsProps) {
  const displayedCars = useMemo(
    () => filteredCars ?? cars ?? [],
    [filteredCars, cars],
  );

  const availableCars = displayedCars.filter((car) => {
    if (!car?.status) return true;
    return (
      car.status !== "INACTIVE" &&
      car.status !== "REJECTED" &&
      car.status !== "PENDING"
    );
  });

  if (isLoading && availableCars.length === 0) {
    return (
      <section className="mt-3 w-full min-w-0 overflow-x-hidden sm:mt-4">
        <CarsLoadingGrid count={10} />
      </section>
    );
  }

  return (
    <section className="mt-3 w-full min-w-0 overflow-x-hidden sm:mt-4">
      {availableCars.length > 0 ? (
        <div className={carsGridClass}>
          {availableCars.map((car) => (
            <CarCard key={car.id} car={car} showWishlist={showWishlist} />
          ))}
        </div>
      ) : forceEmpty || (!isLoading && availableCars.length === 0) ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d7e8dd] bg-white px-6 py-14 text-center sm:py-16">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#eaf6ef,#d8f0e2)] text-[#00863e] shadow-[0_8px_18px_rgba(0,134,62,0.12)]">
            <CarFront size={26} />
          </div>

          <h3 className="text-base font-bold text-[#1f2d25] sm:text-lg">
            Avtomobillar topilmadi
          </h3>

          <p className="mt-1.5 max-w-sm text-sm text-[#6d7a73]">
            Hozircha ushbu parametrlar bo‘yicha avtomobillar mavjud emas.
          </p>
        </div>
      ) : (
        <CarsLoadingGrid count={10} />
      )}
    </section>
  );
}
