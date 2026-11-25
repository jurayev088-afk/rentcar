"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import SafeImage from "@/src/components/SafeImage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/src/constants/UseMeContext";
import { bookingPath } from "@/src/features/login/authDestination";
import BookingAuthDialog from "../components/BookingAuthDialog";
import { useCar } from "@/src/hooks/use-cars";
import { mapApiCarToUi } from "@/src/lib/map-car";
import { brandLabel } from "@/src/lib/media";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  CalendarDays,
  Users,
  Fuel,
  Settings2,
  Gauge,
  Palette,
  Wind,
  ShieldCheck,
  Clock,
  Wallet,
  CarFront,
  CheckCircle2,
  FileText,
  Hash,
  Camera,
  X,
  Maximize2,
  Building2,
  Phone,
  BadgeCheck,
} from "lucide-react";

function formatPrice(price: number | string) {
  return `${Number(String(price ?? 0).replace(/\s/g, "")).toLocaleString(
    "uz-UZ",
  )} so‘m`;
}

function SpecCard({
  icon: Icon,
  title,
  value,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[#eef2f0] bg-[#f8fbf9] px-2.5 py-2.5 transition hover:border-[#b9dfc6] hover:bg-white">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eaf6ef] text-[#00863e]">
        <Icon size={15} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#8d9892]">
          {title}
        </p>
        <p className="truncate text-[13px] font-extrabold text-[#1f2d25]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-[#f6faf7] px-2.5 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#00863e] ring-1 ring-[#eaf6ef]">
          <Icon size={14} />
        </span>
        <span className="text-xs text-[#6d7a73] sm:text-sm">{label}</span>
      </div>
      <span className="max-w-[55%] truncate text-right text-xs font-bold text-[#1f2d25] sm:text-sm">
        {value}
      </span>
    </div>
  );
}

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useUser();

  const { data: apiCar, isLoading, isError } = useCar(id);
  const car = useMemo(
    () => (apiCar ? mapApiCarToUi(apiCar) : undefined),
    [apiCar],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [bookingPrompt, setBookingPrompt] = useState(false);

  const isRented = Boolean(apiCar?.isRented) || car?.status === "IJARADA";

  function openBooking() {
    if (isRented) return;
    if (user) router.push(bookingPath(id));
    else setBookingPrompt(true);
  }

  const images = ((car?.images || []) as any[])
    .map((image) =>
      typeof image === "string"
        ? image
        : image?.originalUrl || image?.url || image?.thumbUrl,
    )
    .filter(Boolean);

  const nextImage = () => {
    setActiveImage((prev) => (images.length ? (prev + 1) % images.length : 0));
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      images.length ? (prev - 1 + images.length) % images.length : 0,
    );
  };

  useEffect(() => {
    if (!lightbox) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, images.length]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1100px] px-3 py-6 sm:px-5">
        <div className="mb-4 h-8 w-28 animate-pulse rounded-full bg-[#eef2f0]" />
        <div className="mb-4 h-9 w-2/3 max-w-md animate-pulse rounded-xl bg-[#eef2f0]" />
        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.9fr]">
          <div className="h-[240px] animate-pulse rounded-2xl bg-[#eef2f0] sm:h-[300px]" />
          <div className="h-[320px] animate-pulse rounded-2xl bg-[#eef2f0]" />
        </div>
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eef2f0]">
          <CarFront size={40} className="text-[#b0bbb5]" />
        </div>
        <h2 className="text-2xl font-bold text-[#1f2d25]">
          Avtomobil topilmadi
        </h2>
        <p className="text-center text-[#6d7a73]">
          Ushbu avtomobil mavjud emas yoki o&apos;chirilgan.
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#00863e] px-5 py-2.5 text-sm font-bold text-white"
        >
          <ArrowLeft size={16} />
          Orqaga qaytish
        </button>
      </div>
    );
  }

  const brand = brandLabel(car.brand);
  const category = car.category || "Kategoriya";
  const hasDiscount = Number(car.oldPrice) > Number(car.price);
  const discountPct = hasDiscount
    ? Math.round(
        ((Number(car.oldPrice) - Number(car.price)) / Number(car.oldPrice)) *
          100,
      )
    : 0;

  const features = [
    { icon: CalendarDays, title: "Yili", value: car.year },
    { icon: Fuel, title: "Yoqilg‘i", value: car.fuel || "—" },
    {
      icon: Settings2,
      title: "Uzatma",
      value: car.transmission || "—",
    },
    {
      icon: Gauge,
      title: "Dvigatel",
      value: car.engine ? `${car.engine} L` : "—",
    },
    { icon: Users, title: "O‘rinlar", value: `${car.seats} ta` },
    { icon: Palette, title: "Rang", value: car.color || "—" },
    {
      icon: Wind,
      title: "Konditsioner",
      value: car.airCondition ? "Mavjud" : "Yo‘q",
    },
    {
      icon: ShieldCheck,
      title: "Holati",
      value: car.condition || "—",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#eef2f0_40%,#f4f6f5_100%)]">
      <div className="mx-auto max-w-[1100px] px-3 pb-6 pt-3 sm:px-5 sm:pb-8 sm:pt-4 lg:px-6">
        {/* Top bar */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e9e7] bg-white px-3 py-1.5 text-sm font-semibold text-[#5a675f] shadow-sm transition hover:border-[#b9dfc6] hover:text-[#00863e]"
          >
            <ArrowLeft size={15} />
            Orqaga
          </button>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#00863e] shadow-sm ring-1 ring-[#d7e8dd]">
              {brand}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#5a675f] shadow-sm ring-1 ring-[#e5e9e7]">
              {category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#00863e] px-2.5 py-1 text-[10px] font-bold text-white">
              <BadgeCheck size={11} />
              Ijara
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1f2d25] sm:text-3xl">
            {brand} {car.model}
          </h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-[#6d7a73] sm:text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-sm ring-1 ring-[#e5e9e7]">
              <MapPin size={13} className="text-[#00863e]" />
              {[car.region, car.district].filter(Boolean).join(", ") ||
                "Manzil ko‘rsatilmagan"}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 shadow-sm ring-1 ring-[#e5e9e7]">
              <CalendarDays size={13} className="text-[#00863e]" />
              {car.year}-yil
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1.45fr_0.9fr] lg:gap-5">
          {/* LEFT */}
          <div className="space-y-3.5">
            {/* Gallery */}
            <section className="overflow-hidden rounded-2xl border border-white/80 bg-white p-2 shadow-[0_12px_28px_rgba(16,37,26,0.06)] sm:rounded-[22px]">
              <div className="group relative h-[200px] overflow-hidden rounded-xl bg-[#0f1f16] sm:h-[280px] lg:h-[320px]">
                {images.length > 0 ? (
                  <SafeImage
                    src={images[activeImage]}
                    alt={`${car.model} rasmi`}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 66vw"
                    onClick={() => setLightbox(true)}
                    className="cursor-zoom-in object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-white/40">
                    <Camera size={52} />
                    <p>Rasm mavjud emas</p>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

                {images.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setLightbox(true)}
                      className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-2 text-xs font-bold text-white backdrop-blur transition hover:bg-black/65"
                    >
                      <Maximize2 size={14} />
                      Kattalashtirish
                    </button>

                    <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      {activeImage + 1} / {images.length}
                    </div>

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#00863e] shadow-lg transition hover:bg-[#00863e] hover:text-white"
                        >
                          <ArrowLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#00863e] shadow-lg transition hover:bg-[#00863e] hover:text-white"
                        >
                          <ArrowRight size={18} />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto px-0.5 pb-0.5">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`relative h-[52px] w-[72px] shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-[60px] sm:w-[84px] ${
                        activeImage === index
                          ? "border-[#00863e] shadow-[0_0_0_2px_rgba(0,134,62,0.12)]"
                          : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                    >
                      <SafeImage
                        src={image}
                        alt={`${car.model} ${index + 1}`}
                        fill
                        unoptimized
                        sizes="112px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Specs */}
            <section className="rounded-2xl border border-white/80 bg-white p-3.5 shadow-[0_10px_24px_rgba(16,37,26,0.04)] sm:p-4">
              <div className="mb-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#00863e]">
                  Texnika
                </p>
                <h2 className="mt-0.5 text-base font-extrabold text-[#1f2d25] sm:text-lg">
                  Texnik xususiyatlari
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {features.map((item) => (
                  <SpecCard
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </div>
            </section>

            {/* About + Rules */}
            <section className="rounded-2xl border border-white/80 bg-white p-3.5 shadow-[0_10px_24px_rgba(16,37,26,0.04)] sm:p-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#00863e]">
                Tavsif
              </p>
              <h2 className="mt-0.5 text-base font-extrabold text-[#1f2d25] sm:text-lg">
                Avtomobil haqida
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#5a675f]">
                {car.description || "Tavsif kiritilmagan"}
              </p>

              <div className="mt-3 border-t border-[#eef2f0] pt-3">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf6ef] text-[#00863e]">
                    <ShieldCheck size={16} />
                  </div>
                  <h3 className="text-sm font-extrabold text-[#1f2d25]">
                    Ijara qoidalari
                  </h3>
                </div>
                <p className="whitespace-pre-wrap rounded-xl bg-[#f6faf7] p-3 text-sm leading-6 text-[#6d7a73]">
                  {car.rules || "Maxsus qoidalar kiritilmagan"}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm">
                  {car.agreement ? (
                    <>
                      <CheckCircle2 size={15} className="text-[#00863e]" />
                      <span className="font-semibold text-[#00863e]">
                        Shartnoma shartlariga rozilik berilgan
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={15} className="text-[#8d9892]" />
                      <span className="text-[#6d7a73]">
                        Shartnoma tasdiqlanmagan
                      </span>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT — booking card */}
          <aside className="lg:sticky lg:top-20">
            <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_14px_36px_rgba(16,37,26,0.08)] sm:rounded-[22px]">
              <div className="relative bg-[linear-gradient(135deg,#0f1f16_0%,#00863e_100%)] px-4 py-3.5 text-white">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.35), transparent 45%)",
                  }}
                />
                <p className="relative text-[10px] font-bold uppercase tracking-[1.2px] text-white/75">
                  Bir kunlik ijara
                </p>
                <div className="relative mt-0.5 flex flex-wrap items-end gap-2">
                  <h2 className="text-2xl font-extrabold tracking-tight sm:text-[28px]">
                    {formatPrice(car.price)}
                  </h2>
                </div>
                {hasDiscount && (
                  <div className="relative mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/60 line-through">
                      {formatPrice(car.oldPrice)}
                    </span>
                    <span className="rounded-full bg-[#ff5a7a] px-2 py-0.5 text-[10px] font-extrabold">
                      −{discountPct}% chegirma
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 p-3.5 sm:p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#00863e]">
                  Ijara ma’lumotlari
                </p>

                <InfoRow
                  icon={Clock}
                  label="Minimal muddat"
                  value={`${car.minDays} kun`}
                />
                <InfoRow
                  icon={Wallet}
                  label="Depozit"
                  value={formatPrice(car.deposit)}
                />
                <InfoRow
                  icon={Hash}
                  label="Davlat raqami"
                  value={car.number || "—"}
                />
                <InfoRow
                  icon={MapPin}
                  label="Hudud"
                  value={car.district || car.region || "—"}
                />
                <InfoRow
                  icon={FileText}
                  label="Manzil"
                  value={car.address || "—"}
                />

                <div className="pt-1.5">
                  <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[1.2px] text-[#00863e]">
                    E’lon egasi
                  </p>
                  {car.companyId ? (
                    <Link
                      href={`/kompaniyalar/${car.companyId}`}
                      className="flex items-center gap-2.5 rounded-xl border border-[#eaf6ef] bg-[#f6faf7] p-2.5 no-underline transition hover:border-[#b9dfc6]"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#00863e] shadow-sm ring-1 ring-[#eaf6ef]">
                        <Building2 size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-[#1f2d25]">
                          {car.companyName || "Kompaniya"}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-[#8a9690]">
                          {brand} {car.model} · {car.year}
                        </span>
                      </span>
                      <ArrowRight size={14} className="text-[#00863e]" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2.5 rounded-xl bg-[#f6faf7] p-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#00863e] shadow-sm">
                        <CarFront size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#1f2d25]">
                          {brand} {car.model}
                        </p>
                        <p className="text-[11px] text-[#8a9690]">
                          {car.year} · {category}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {car.phone && (
                  <a
                    href={`tel:${car.phone}`}
                    className="mt-0.5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7e8dd] bg-white py-2.5 text-sm font-bold text-[#00863e] no-underline transition hover:bg-[#eaf6ef]"
                  >
                    <Phone size={15} />
                    Qo‘ng‘iroq qilish
                  </a>
                )}

                {isRented ? (
                  <div className="mt-0.5 rounded-xl border border-[#b7d7f0] bg-[#e7f3ff] px-3 py-2.5 text-center">
                    <p className="text-sm font-extrabold text-[#1d6fb8]">
                      Bu mashina hozir ijarada
                    </p>
                    <p className="mt-0.5 text-[11px] leading-4 text-[#3d6f9a]">
                      Ijara tugagach qayta urinib ko‘ring.
                    </p>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={openBooking}
                      disabled={authLoading}
                      className="mt-0.5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00863e] py-3 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(0,134,62,0.25)] transition hover:bg-[#006f35] disabled:opacity-60"
                    >
                      Mashinani bron qilish
                      <ArrowRight size={15} />
                    </button>
                    <p className="text-center text-[10px] leading-4 text-[#8a9690]">
                      Bron orqali ijaraga olish uchun ariza yuborasiz.
                    </p>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <BookingAuthDialog
        carId={id}
        open={bookingPrompt}
        onCancel={() => setBookingPrompt(false)}
      />

      {lightbox && images.length > 0 && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ArrowLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ArrowRight size={22} />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[75vh] w-full max-w-[1100px]"
          >
            <SafeImage
              src={images[activeImage]}
              alt={car.model}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 text-sm text-white">
            {activeImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
