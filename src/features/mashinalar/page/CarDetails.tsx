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
    <div className="group rounded-2xl border border-[#eef2f0] bg-[#f8fbf9] p-4 transition hover:border-[#b9dfc6] hover:bg-white hover:shadow-[0_10px_24px_rgba(0,134,62,0.06)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e] transition group-hover:scale-105">
        <Icon size={18} />
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#8d9892]">
        {title}
      </p>
      <p className="mt-1 break-words text-sm font-extrabold text-[#1f2d25]">
        {value || "Ko‘rsatilmagan"}
      </p>
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
    <div className="flex items-start justify-between gap-3 rounded-2xl bg-[#f6faf7] px-3.5 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#00863e] shadow-sm ring-1 ring-[#eaf6ef]">
          <Icon size={16} />
        </span>
        <span className="text-sm text-[#6d7a73]">{label}</span>
      </div>
      <span className="max-w-[55%] text-right text-sm font-bold text-[#1f2d25]">
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
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#6d7a73]">
        Yuklanmoqda...
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
      <div className="mx-auto max-w-[1240px] px-3 pb-10 pt-5 sm:px-5 sm:pt-7 lg:px-8">
        {/* Top bar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-[#e5e9e7] bg-white px-3.5 py-2 text-sm font-semibold text-[#5a675f] shadow-sm transition hover:border-[#b9dfc6] hover:text-[#00863e]"
          >
            <ArrowLeft size={16} />
            Orqaga
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#00863e] shadow-sm ring-1 ring-[#d7e8dd]">
              {brand}
            </span>
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#5a675f] shadow-sm ring-1 ring-[#e5e9e7]">
              {category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#00863e] px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_6px_14px_rgba(0,134,62,0.25)]">
              <BadgeCheck size={12} />
              Ijara e’loni
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1f2d25] sm:text-4xl">
            {brand} {car.model}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#6d7a73]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#e5e9e7]">
              <MapPin size={14} className="text-[#00863e]" />
              {[car.region, car.district, car.address]
                .filter(Boolean)
                .join(", ") || "Manzil ko‘rsatilmagan"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-[#e5e9e7]">
              <CalendarDays size={14} className="text-[#00863e]" />
              {car.year}-yil
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.55fr_0.9fr]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Gallery */}
            <section className="overflow-hidden rounded-[28px] border border-white/80 bg-white p-2.5 shadow-[0_16px_40px_rgba(16,37,26,0.07)] sm:p-3">
              <div className="group relative h-[240px] overflow-hidden rounded-[22px] bg-[#0f1f16] sm:h-[380px] lg:h-[440px]">
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
                <div className="mt-3 flex gap-2.5 overflow-x-auto px-0.5 pb-1">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`relative h-[68px] w-[96px] shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-[78px] sm:w-[112px] ${
                        activeImage === index
                          ? "border-[#00863e] shadow-[0_0_0_3px_rgba(0,134,62,0.12)]"
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
            <section className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_12px_32px_rgba(16,37,26,0.05)] sm:p-6">
              <div className="mb-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[1.3px] text-[#00863e]">
                    Texnika
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-[#1f2d25]">
                    Texnik xususiyatlari
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

            {/* About */}
            <section className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_12px_32px_rgba(16,37,26,0.05)] sm:p-6">
              <p className="text-[11px] font-extrabold uppercase tracking-[1.3px] text-[#00863e]">
                Tavsif
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-[#1f2d25]">
                Avtomobil haqida
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#5a675f]">
                {car.description || "Tavsif kiritilmagan"}
              </p>
            </section>

            {/* Rules */}
            <section className="rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_12px_32px_rgba(16,37,26,0.05)] sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf6ef] text-[#00863e]">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h2 className="font-extrabold text-[#1f2d25]">
                    Ijara qoidalari
                  </h2>
                  <p className="text-xs text-[#8d9892]">
                    Avtomobildan foydalanish shartlari
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-wrap rounded-2xl bg-[#f6faf7] p-4 text-sm leading-7 text-[#6d7a73] ring-1 ring-[#eaf6ef]">
                {car.rules || "Maxsus qoidalar kiritilmagan"}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm">
                {car.agreement ? (
                  <>
                    <CheckCircle2 size={18} className="text-[#00863e]" />
                    <span className="font-semibold text-[#00863e]">
                      Shartnoma shartlariga rozilik berilgan
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} className="text-[#8d9892]" />
                    <span className="text-[#6d7a73]">
                      Shartnoma tasdiqlanmagan
                    </span>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT — booking card */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(16,37,26,0.1)]">
              <div className="relative bg-[linear-gradient(135deg,#0f1f16_0%,#00863e_100%)] px-5 py-5 text-white">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.35), transparent 45%)",
                  }}
                />
                <p className="relative text-xs font-bold uppercase tracking-[1.2px] text-white/75">
                  Bir kunlik ijara
                </p>
                <div className="relative mt-1 flex flex-wrap items-end gap-2">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    {formatPrice(car.price)}
                  </h2>
                </div>
                {hasDiscount && (
                  <div className="relative mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm text-white/60 line-through">
                      {formatPrice(car.oldPrice)}
                    </span>
                    <span className="rounded-full bg-[#ff5a7a] px-2.5 py-0.5 text-[11px] font-extrabold">
                      −{discountPct}% chegirma
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5 p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#00863e]">
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

                <div className="pt-2">
                  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[1.2px] text-[#00863e]">
                    E’lon egasi
                  </p>
                  {car.companyId ? (
                    <Link
                      href={`/kompaniyalar/${car.companyId}`}
                      className="flex items-center gap-3 rounded-2xl border border-[#eaf6ef] bg-[#f6faf7] p-3 no-underline transition hover:border-[#b9dfc6]"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#00863e] shadow-sm ring-1 ring-[#eaf6ef]">
                        <Building2 size={22} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-[#1f2d25]">
                          {car.companyName || "Kompaniya"}
                        </span>
                        <span className="mt-0.5 block text-xs text-[#8a9690]">
                          {brand} {car.model} · {car.year}
                        </span>
                      </span>
                      <ArrowRight size={16} className="text-[#00863e]" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 rounded-2xl bg-[#f6faf7] p-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#00863e] shadow-sm">
                        <CarFront size={22} />
                      </span>
                      <div>
                        <p className="font-bold text-[#1f2d25]">
                          {brand} {car.model}
                        </p>
                        <p className="text-xs text-[#8a9690]">
                          {car.year} · {category}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {car.phone && (
                  <a
                    href={`tel:${car.phone}`}
                    className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7e8dd] bg-white py-3 text-sm font-bold text-[#00863e] no-underline transition hover:bg-[#eaf6ef]"
                  >
                    <Phone size={16} />
                    Qo‘ng‘iroq qilish
                  </a>
                )}

                {isRented ? (
                  <div className="mt-1 rounded-2xl border border-[#b7d7f0] bg-[#e7f3ff] px-4 py-3.5 text-center">
                    <p className="text-sm font-extrabold text-[#1d6fb8]">
                      Bu mashina hozir ijarada
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-[#3d6f9a]">
                      Hozircha bron qilib bo‘lmaydi. Ijara tugagach qayta
                      urinib ko‘ring.
                    </p>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={openBooking}
                      disabled={authLoading}
                      className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00863e] py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(0,134,62,0.28)] transition hover:bg-[#006f35] disabled:opacity-60"
                    >
                      Mashinani bron qilish
                      <ArrowRight size={16} />
                    </button>

                    <p className="text-center text-[11px] leading-5 text-[#8a9690]">
                      Bron qilish orqali ushbu avtomobilni ijaraga olish uchun
                      ariza yuborasiz.
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
