"use client";

import SafeImage from "./SafeImage";
import { useRouter } from "next/navigation";
import {
  Heart,
  Users,
  Cog,
  Wind,
  Phone,
  CarFront,
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

/** Mobile: 1 ustun list; sm+: grid */
const carsGridClass =
  "grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4";

function formatPrice(price: Car["price"]) {
  const number = Number(String(price).replace(/\D/g, ""));
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function transmissionLabel(value?: string) {
  if (!value) return "—";
  const t = value.toLowerCase();
  if (t.includes("avto") || t.includes("auto")) return "Avtomat";
  if (t.includes("mex") || t.includes("manual")) return "Mexanik";
  if (t.includes("cvt")) return "CVT";
  return value;
}

function carImageUrls(car: Car): string[] {
  const urls = (car.images ?? [])
    .map(
      (img) =>
        img?.url ||
        img?.originalUrl ||
        img?.thumbUrl ||
        (typeof img === "string" ? img : ""),
    )
    .filter(Boolean) as string[];
  return urls.length > 0 ? urls : [fallbackImage];
}

export type CarCardProps = {
  car: Car;
  className?: string;
  showWishlist?: boolean;
};

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

  const carName = `${brandLabel(car.brand)} ${car.model}`.trim();
  const images = useMemo(() => carImageUrls(car), [car]);
  const hasDiscount = Number(car.oldPrice) > Number(car.price);
  const available = car.status !== "IJARADA" && car.status !== "BRON_QILINGAN";
  const phone = (car.phone || "").trim();
  const deposit = Number(car.deposit || 0);

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

  const bookCar = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/cars/${car.id}/bron`);
  };

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
      dragRef.current.axis = absX > absY ? "x" : "y";
      dragRef.current.moved = true;
    }
  };

  const onImagePointerUp = (e: ReactPointerEvent) => {
    const dx = e.clientX - dragRef.current.x;
    if (
      dragRef.current.axis === "x" &&
      Math.abs(dx) > 40 &&
      images.length > 1
    ) {
      dragRef.current.swiping = true;
      if (dx < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  };

  const wishlistBtn =
    showWishlist && wishlistCtx ? (
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
        className="absolute right-1.5 top-1.5 z-[1] flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:scale-105 disabled:cursor-wait disabled:opacity-70"
      >
        {wishlistCtx.isToggling &&
        wishlistCtx.pendingCarId === String(car.id) ? (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500" />
        ) : (
          <Heart
            size={14}
            className={
              isFavorite && user
                ? "fill-rose-500 text-rose-500"
                : "text-slate-700"
            }
          />
        )}
      </button>
    ) : null;

  const phoneBtn = phone ? (
    <a
      href={`tel:${phone}`}
      onClick={(e) => e.stopPropagation()}
      aria-label="Qo‘ng‘iroq qilish"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf6ef] text-[#00863e] ring-1 ring-[#c6e5d1] transition hover:bg-[#d8f0e2] active:scale-95"
    >
      <Phone size={16} />
    </a>
  ) : (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openCar();
      }}
      aria-label="Batafsil"
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf6ef] text-[#00863e] ring-1 ring-[#c6e5d1] transition hover:bg-[#d8f0e2] active:scale-95"
    >
      <Phone size={16} />
    </button>
  );

  const specs = [
    { icon: Cog, value: transmissionLabel(car.transmission) },
    { icon: Users, value: `${car.seats ?? 5} o‘rin` },
    { icon: Wind, value: car.airCondition ? "Kondits." : "Yo‘q" },
  ] as const;

  return (
    <article
      onClick={openCar}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className={`group cursor-pointer overflow-hidden rounded-[16px] border border-[#e8ecea] bg-white shadow-[0_6px_18px_rgba(16,37,26,0.06)] transition-all duration-300 hover:border-[#b9dfc6] hover:shadow-[0_14px_32px_rgba(0,134,62,0.12)] ${className}`}
    >
      {/* ========== MOBILE: gorizontal list card ========== */}
      <div className="flex gap-2.5 p-2.5 sm:hidden">
        {/* Chap: rasm (swipe) + narx */}
        <div className="flex w-[42%] shrink-0 flex-col">
          <div
            className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-[12px] bg-[#f3f5f4]"
            onPointerUp={onImagePointerUp}
          >
            <div
              className="flex h-full w-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div
                  key={`${car.id}-m-img-${i}`}
                  className="relative h-full w-full shrink-0 grow-0 basis-full"
                >
                  <SafeImage
                    src={src}
                    alt={`${carName} ${i + 1}`}
                    fill
                    sizes="42vw"
                    className="pointer-events-none object-cover select-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            {wishlistBtn}
            {!available && (
              <span className="absolute left-1.5 top-1.5 z-[1] rounded-full bg-[#e8f1fb] px-1.5 py-0.5 text-[8px] font-bold text-[#1d6fb8]">
                Ijarada
              </span>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-1.5 left-1/2 z-[1] flex -translate-x-1/2 items-center gap-0.5">
                {images.slice(0, 5).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-full ${
                      i === activeIndex
                        ? "h-1.5 w-1.5 bg-[#00863e]"
                        : "h-1 w-1 bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <p className="mt-1.5 text-[12px] font-extrabold leading-tight text-[#1a1a1a]">
            {formatPrice(car.price)}{" "}
            <span className="text-[10px] font-semibold text-[#5a675f]">
              so‘m/kun
            </span>
          </p>
          {hasDiscount && (
            <p className="text-[10px] text-[#8a9690] line-through">
              {formatPrice(car.oldPrice)} so‘m
            </p>
          )}
        </div>

        {/* O‘ng: info + actions */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="m-0 line-clamp-1 text-[13px] font-extrabold uppercase leading-tight tracking-tight text-[#1a1a1a]">
            {carName}
          </h2>
          <p className="mt-0.5 line-clamp-1 text-[11px] text-[#8a9690]">
            {car.companyName || "Yoki o‘xshash avtomobil"}
          </p>

          <div className="mt-2 space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-[#8a9690]">Minimal:</span>
              <span className="text-[12px] font-bold text-[#1a1a1a]">
                {car.minDays || 1} kun
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11px] text-[#8a9690]">Garov:</span>
              <span className="text-[12px] font-bold text-[#1a1a1a]">
                {deposit > 0 ? `${formatPrice(deposit)} so‘m` : "—"}
              </span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-end gap-1.5 pt-2.5">
            {phoneBtn}
            <button
              type="button"
              onClick={bookCar}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#00863e] px-3.5 text-[12px] font-extrabold text-white shadow-[0_4px_12px_rgba(0,134,62,0.25)] transition hover:bg-[#006f35] active:scale-[0.98]"
            >
              Bron qilish
            </button>
          </div>
        </div>
      </div>

      {/* ========== DESKTOP/TABLET: vertikal card ========== */}
      <div className="hidden flex-col sm:flex">
        <div
          className="relative aspect-[16/10] w-full shrink-0 touch-pan-y overflow-hidden bg-[#f3f5f4]"
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
                  sizes="(max-width: 1280px) 33vw, 25vw"
                  className="pointer-events-none object-cover! select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {!available && (
            <span className="absolute left-2 top-2 z-[1] rounded-full bg-[#e8f1fb] px-2 py-0.5 text-[10px] font-bold text-[#1d6fb8] shadow-sm">
              Ijarada
            </span>
          )}
          {hasDiscount && available && (
            <span className="absolute left-2 top-2 z-[1] rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Chegirma
            </span>
          )}

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
              className="absolute right-2 top-2 z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:scale-105 disabled:cursor-wait disabled:opacity-70"
            >
              {wishlistCtx.isToggling &&
              wishlistCtx.pendingCarId === String(car.id) ? (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500" />
              ) : (
                <Heart
                  size={14}
                  className={
                    isFavorite && user
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-700"
                  }
                />
              )}
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 z-[1] flex -translate-x-1/2 items-center gap-1">
              {images.slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Rasm ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  className={`rounded-full transition-all ${
                    i === activeIndex
                      ? "h-2 w-2 bg-[#00863e]"
                      : "h-1.5 w-1.5 bg-[#00863e]/35 hover:bg-[#00863e]/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
          <h2 className="m-0 line-clamp-1 text-[15px] font-extrabold uppercase leading-tight tracking-tight text-[#1a1a1a]">
            {carName}
          </h2>
          <p className="mt-0.5 line-clamp-1 text-[12px] text-[#8a9690]">
            {car.companyName || "Yoki o‘xshash avtomobil"}
          </p>

          <div className="mt-2.5 flex items-center justify-between gap-1 border-b border-[#eef2f0] pb-2.5">
            {specs.map(({ icon: Icon, value }, idx) => (
              <div
                key={value + idx}
                className="flex min-w-0 flex-1 items-center justify-center gap-1 first:justify-start last:justify-end"
              >
                {idx > 0 && (
                  <span
                    aria-hidden
                    className="mr-1.5 h-3 w-px shrink-0 bg-[#dde4e0]"
                  />
                )}
                <Icon
                  size={14}
                  className="shrink-0 text-[#8a9690]"
                  strokeWidth={1.75}
                />
                <span className="truncate text-[11px] font-medium text-[#5a675f]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <p className="m-0 text-[11px] font-medium text-[#8a9690]">
                Kuniga:
              </p>
              <p className="m-0 mt-0.5 truncate text-[15px] font-extrabold leading-tight text-[#1a1a1a]">
                {formatPrice(car.price)}{" "}
                <span className="text-[11px] font-semibold text-[#5a675f]">
                  so‘m
                </span>
              </p>
            </div>
            <div className="min-w-0 text-right">
              <p className="m-0 text-[11px] font-medium text-[#8a9690]">
                Garov:
              </p>
              <p className="m-0 mt-0.5 truncate text-[15px] font-extrabold leading-tight text-[#1a1a1a]">
                {deposit > 0 ? (
                  <>
                    {formatPrice(deposit)}{" "}
                    <span className="text-[11px] font-semibold text-[#5a675f]">
                      so‘m
                    </span>
                  </>
                ) : (
                  <span className="text-[12px] font-bold text-[#8a9690]">—</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {phoneBtn}
            <button
              type="button"
              onClick={bookCar}
              className="inline-flex h-10 flex-1 items-center justify-center rounded-[12px] bg-[#00863e] px-2 text-[13px] font-extrabold text-white shadow-[0_6px_14px_rgba(0,134,62,0.22)] transition hover:bg-[#006f35] active:scale-[0.98]"
            >
              Bron qilish
            </button>
          </div>
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
