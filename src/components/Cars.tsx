"use client";

import SafeImage from "./SafeImage";
import { useRouter } from "next/navigation";
import {
  Heart,
  MapPin,
  Users,
  Fuel,
  Settings2,
  Star,
  CarFront,
  Wind,
  Gauge,
  Phone,
} from "lucide-react";
import { useContext, useMemo } from "react";

import { WishlistContext } from "../constants/UseWishlist";
import { carStatus, type Car } from "../types";
import { useUser } from "../constants/UseMeContext";
import { brandLabel } from "../lib/media";
import CarsLoadingGrid from "./CarsLoadingGrid";

const fallbackImage =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";

function formatPrice(price: Car["price"]) {
  const number = Number(String(price).replace(/\D/g, ""));
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export type CarCardProps = {
  car: Car;
  className?: string;
  showWishlist?: boolean;
};

/** Eski Cars.tsx kartasi — hamma joyda shu */
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
  const carLocation = [car.region, car.district].filter(Boolean).join(", ");
  const carImage =
    car.images?.[0]?.url ||
    car.images?.[0]?.originalUrl ||
    car.images?.[0]?.thumbUrl ||
    fallbackImage;
  const hasDiscount = Number(car.oldPrice) > Number(car.price);

  return (
    <article
      onClick={() => router.push(`/cars/${car.id}`)}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-[22px] border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.04)] transition-all duration-300 hover:border-[#b9dfc6] hover:shadow-[0_16px_36px_rgba(0,134,62,0.12)] ${className}`}
    >
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 sm:h-52">
        <SafeImage
          src={carImage}
          alt={carName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover! transition-transform! duration-700! group-hover:scale-115!"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          {car.status === "IJARADA" && (
            <span className="rounded-full bg-[#1d6fb8] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
              Ijarada
            </span>
          )}

          {hasDiscount && car.status !== "IJARADA" && (
            <span className="rounded-full bg-orange-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
              Chegirma
            </span>
          )}

          <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
            {car.year}
          </span>
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
            className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition-all hover:scale-110 hover:bg-white disabled:cursor-wait disabled:opacity-70"
          >
            {wishlistCtx.isToggling &&
            wishlistCtx.pendingCarId === String(car.id) ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-rose-500" />
            ) : (
              <Heart
                size={20}
                className={
                  isFavorite && user
                    ? "fill-rose-500 text-rose-500"
                    : "text-slate-600"
                }
              />
            )}
          </button>
        )}

        {carLocation && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
            <MapPin size={15} />
            <span className="text-xs font-semibold">{carLocation}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="mt-1 text-md font-extrabold tracking-tight text-[#1f2d25]">
              {carName}
            </h2>
          </div>

        </div>


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
              {car?.transmission || "—"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
            <Fuel size={17} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">
              {car?.fuel || "—"}
            </span>
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl bg-slate-50 p-3 transition-colors group-hover:bg-slate-100/80">
            <Gauge size={17} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-600">
              {car.engine ? `${car.engine} L` : "—"}
            </span>
          </div>
        </div>

        {car?.airCondition && (
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-500">
            <Wind size={15} />
            Konditsioner mavjud
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-5">
          <div className="min-w-0">
            {hasDiscount && (
              <p className="mb-1 text-xs font-medium text-slate-400 line-through">
                {formatPrice(car.oldPrice)} so‘m
              </p>
            )}

            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-[#00863e]">
                {formatPrice(car.price)}
              </span>

              <span className="text-[11px] font-medium text-[#8d9892]">
                so‘m / kun
              </span>
            </div>
          </div>

          {car?.phone ? (
            <a
              href={`tel:${car.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#00863e] px-2 py-2 text-[12px] font-bold text-white shadow-[0_6px_14px_rgba(0,134,62,0.22)] transition-all hover:bg-[#006f35] hover:shadow-lg active:scale-95"
            >
              <Phone size={16} />
              <span>Qo&apos;ngiroq qilish</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/cars/${car.id}`);
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00863e] px-4 py-3 text-xs font-bold text-white shadow-[0_6px_14px_rgba(0,134,62,0.22)] transition-all hover:bg-[#006f35] hover:shadow-lg active:scale-95"
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
  // Filtr / API natijasi — home URL bo‘yicha qayta kesilmasin
  const displayedCars = useMemo(
    () => filteredCars ?? cars ?? [],
    [filteredCars, cars],
  );

  // Public API allaqachon faqat APPROVED mashinalarni qaytaradi.
  // Status filtri faqat aniq yashirilganlarni (INACTIVE/REJECTED) kesadi.
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
      <section className="mt-4 w-full min-w-0 sm:mt-6">
        <CarsLoadingGrid count={6} />
      </section>
    );
  }

  return (
    <section className="mt-4 w-full min-w-0 sm:mt-6">
      {availableCars.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-2 2xl:grid-cols-3">
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
        <CarsLoadingGrid count={6} />
      )}
    </section>
  );
}
