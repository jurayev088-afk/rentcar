
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { UseAllCars } from "@/src/constants/UseAllCars";
import { useUser } from "@/src/constants/UseMeContext";
import { bookingPath } from "@/src/features/login/authDestination";
import BookingAuthDialog from "../components/BookingAuthDialog";
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
  Zap,
  Camera,
  X,
} from "lucide-react";
import { Button, Tag } from "antd";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useUser();

  const { allCars } = UseAllCars();

  const car = allCars?.find(
    (item) => String(item.id) === String(id)
  );

  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [bookingPrompt, setBookingPrompt] = useState(false);

  function openBooking() {
    if (user) router.push(bookingPath(id));
    else setBookingPrompt(true);
  }

  // Images
  const images = (
    (car?.images || []) as any[]
  )
    .map((image) =>
      typeof image === "string"
        ? image
        : image?.originalUrl || image?.thumbUrl
    )
    .filter(Boolean);

  // Price formatter
  const formatPrice = (price: number | string) => {
    return `${Number(
      String(price ?? 0).replace(/\s/g, "")
    ).toLocaleString("uz-UZ")} so'm`;
  };

  // Labels
  const brandLabels: Record<string, string> = {
    MERCEDES_BENZ: "Mercedes-Benz",
    CHEVROLET: "Chevrolet",
    BYD: "BYD",
    BMW: "BMW",
    KIA: "Kia",
    HYUNDAI: "Hyundai",
  };

  const categoryLabels: Record<string, string> = {
    SEDAN: "Sedan",
    KROSSOVER: "Krossover",
    SUV: "SUV",
    HATCHBACK: "Hatchback",
    COUPE: "Coupe",
    UNIVERSAL: "Universal",
    BYUDJETLI: "Byudjetli",
  };

  const fuelLabels: Record<string, string> = {
    petrol: "Benzin",
    diesel: "Dizel",
    hybrid: "Gibrid",
    electric: "Elektro",
    gas: "Gaz",
  };

  const transmissionLabels: Record<string, string> = {
    automatic: "Avtomat",
    manual: "Mexanika",
  };

  const conditionLabels: Record<string, string> = {
    excellent: "A'lo holatda",
    good: "Yaxshi holatda",
    normal: "O'rtacha holatda",
  };

  // Images navigation
  const nextImage = () => {
    setActiveImage((prev) =>
      images.length ? (prev + 1) % images.length : 0
    );
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      images.length
        ? (prev - 1 + images.length) % images.length
        : 0
    );
  };

  // Lightbox keyboard
  useEffect(() => {
    if (!lightbox) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);

      if (e.key === "ArrowRight") {
        setActiveImage((prev) =>
          images.length ? (prev + 1) % images.length : 0
        );
      }

      if (e.key === "ArrowLeft") {
        setActiveImage((prev) =>
          images.length
            ? (prev - 1 + images.length) % images.length
            : 0
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, images.length]);

  // Car not found
  if (!car) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <CarFront size={65} className="text-gray-300" />

        <h2 className="text-2xl font-bold text-[#1f2d25]">
          Avtomobil topilmadi
        </h2>

        <p className="text-gray-500">
          Ushbu avtomobil mavjud emas yoki o'chirilgan.
        </p>

        <Button
          type="primary"
          onClick={() => router.back()}
          className="!bg-[#00863e]"
        >
          Orqaga qaytish
        </Button>
      </div>
    );
  }

  // Features
  const features = [
    {
      icon: CalendarDays,
      title: "Ishlab chiqarilgan yili",
      value: car.year,
    },
    {
      icon: Fuel,
      title: "Yoqilg'i turi",
      value: fuelLabels[car.fuel] || car.fuel,
    },
    {
      icon: Settings2,
      title: "Uzatmalar qutisi",
      value:
        transmissionLabels[car.transmission] ||
        car.transmission,
    },
    {
      icon: Gauge,
      title: "Dvigatel hajmi",
      value: `${car.engine} L`,
    },
    {
      icon: Users,
      title: "O'rindiqlar soni",
      value: `${car.seats} ta`,
    },
    {
      icon: Palette,
      title: "Avtomobil rangi",
      value: car.color,
    },
    {
      icon: Wind,
      title: "Konditsioner",
      value: car.airCondition ? "Mavjud" : "Mavjud emas",
    },
    {
      icon: ShieldCheck,
      title: "Texnik holati",
      value:
        conditionLabels[car.condition] || car.condition,
    },
  ];

  const brand =
    brandLabels[car.brand] ||
    car.brand?.replaceAll("_", " ");

  const category =
    categoryLabels[car.category] || car.category;

  return (
    <div className="min-h-screen bg-[#f4f6f5] px-4 py-8 md:px-7">

      <div className="mx-auto max-w-[1250px] mt-10">

        {/* BREADCRUMB */}
        <div className="mb-7">
        

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Tag color="blue">{brand}</Tag>
                <Tag color="purple">{category}</Tag>
                <Tag color="success">Ijara e'loni</Tag>
              </div>

              <h1 className="text-2xl font-bold text-[#1f2d25] md:text-3xl">
                {brand} {car.model}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={16} />
                {car.region}, {car.district}, {car.address}
              </p>
            </div>


          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">

            {/* IMAGE GALLERY */}
            <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white p-3 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-4">

              <div className="group relative h-[260px] overflow-hidden rounded-xl bg-[#F0F2F5] sm:h-[400px] lg:h-[450px]">

                {images.length > 0 ? (
                  <Image
                    src={images[activeImage]}
                    alt={`${car.model} rasmi`}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 66vw"
                    onClick={() => setLightbox(true)}
                    className="cursor-zoom-in object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-300">
                    <Camera size={60} />
                    <p>Rasm mavjud emas</p>
                  </div>
                )}

                {/* Image counter */}
                {images.length > 0 && (
                  <>
                    <div className="absolute bottom-4 right-4 z-10 rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
                      {activeImage + 1} / {images.length}
                    </div>

                    {/* Previous */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute cursor-pointer left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00863e] shadow-lg transition hover:bg-[#00863e] hover:text-white"
                        >
                          <ArrowLeft size={20} />
                        </button>

                        {/* Next */}
                        <button
                          onClick={nextImage}
                          className="absolute cursor-pointer right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#00863e] shadow-lg transition hover:bg-[#00863e] hover:text-white"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setLightbox(true)}
                      className="absolute left-4 top-4 z-10 rounded-lg bg-black/50 px-3 py-2 text-xs text-white backdrop-blur transition hover:bg-black/70"
                    >
                      ⛶ Kattalashtirish
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative h-[75px] w-[110px] shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-[90px] sm:w-[130px] ${
                        activeImage === index
                          ? "border-[#00863e] shadow-[0_0_0_2px_rgba(0,134,62,0.15)]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${car.model} ${index + 1}`}
                        fill
                        unoptimized
                        sizes="130px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-3 text-center text-xs text-gray-400">
                Rasm ustiga bosing — kattalashtirish uchun
              </p>
            </div>

            {/* TECHNICAL FEATURES */}
            <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">

              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#1f2d25]">
                  Texnik xususiyatlari
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Avtomobilning asosiy texnik ma'lumotlari
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {features.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-[#eef2f0] bg-[#f8fbf9] p-4 transition hover:border-[#b9dfc6] hover:bg-white"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf6ef] text-[#00863e]">
                        <Icon size={20} />
                      </div>

                      <p className="text-xs text-[#8d9892]">
                        {item.title}
                      </p>

                      <p className="mt-1 break-words text-sm font-bold text-[#1f2d25]">
                        {item.value || "Ko'rsatilmagan"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
              <h2 className="text-xl font-bold text-[#1f2d25]">
                Avtomobil haqida
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                {car.description || "Tavsif kiritilmagan"}
              </p>
            </div>

            {/* RENTAL RULES */}
            <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[#1f2d25]">
                    Ijara qoidalari
                  </h2>
                  <p className="text-xs text-[#8d9892]">
                    Avtomobildan foydalanish shartlari
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-wrap rounded-xl bg-[#f6faf7] p-4 text-sm leading-7 text-[#6d7a73]">
                {car.rules || "Maxsus qoidalar kiritilmagan"}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm">
                {car.agreement ? (
                  <>
                    <CheckCircle2 size={18} className="text-green-600" />
                    <span className="text-green-700">
                      Shartnoma shartlariga rozilik berilgan
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} className="text-gray-400" />
                    <span className="text-gray-500">
                      Shartnoma tasdiqlanmagan
                    </span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky lg:top-6">

            <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">

              <span className="inline-flex rounded-full bg-[#eaf6ef] px-3 py-1 text-xs font-semibold text-[#00863e]">
                Ijara e&apos;loni
              </span>

              <p className="mt-5 text-sm text-[#6d7a73]">
                Bir kunlik ijara narxi
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#00863e]">
                {formatPrice(car.price)}
              </h2>

              {Number(car.oldPrice) > Number(car.price) && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(car.oldPrice)}
                  </span>

                  <Tag color="red">
                    {Math.round(
                      ((Number(car.oldPrice) - Number(car.price)) /
                        Number(car.oldPrice)) *
                        100
                    )}% chegirma
                  </Tag>
                </div>
              )}

              <div className="my-6 border-t border-gray-100" />

              {/* RENTAL INFO */}
              <h3 className="mb-5 font-bold text-[#1f2d25]">
                Ijara ma&apos;lumotlari
              </h3>

              <div className="space-y-5">

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock size={19} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Minimal muddat
                    </span>
                  </div>

                  <b className="text-sm text-[#1f2d25]">
                    {car.minDays} kun
                  </b>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Wallet size={19} className="text-[#00863e]" />
                    <span className="text-sm text-[#6d7a73]">
                      Depozit
                    </span>
                  </div>

                  <b className="text-sm text-[#1f2d25]">
                    {formatPrice(car.deposit)}
                  </b>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Hash size={19} className="text-[#00863e]" />
                    <span className="text-sm text-[#6d7a73]">
                      Davlat raqami
                    </span>
                  </div>

                  <b className="text-sm text-[#1f2d25]">
                    {car.number}
                  </b>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <MapPin size={19} className="text-[#00863e]" />
                    <span className="text-sm text-[#6d7a73]">
                      Hudud
                    </span>
                  </div>

                  <b className="max-w-[150px] text-right text-sm text-[#1f2d25]">
                    {car.district}
                  </b>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText size={19} className="text-[#00863e]" />
                    <span className="text-sm text-[#6d7a73]">
                      Manzil
                    </span>
                  </div>

                  <b className="max-w-[150px] text-right text-sm text-[#1f2d25]">
                    {car.address}
                  </b>
                </div>

              </div>

              <div className="my-6 border-t border-gray-100" />

              {/* CAR OWNER / BRAND */}
              <h3 className="mb-4 font-bold text-[#1f2d25]">
                Avtomobil ma&apos;lumotlari
              </h3>

              <div className="flex items-center gap-3 rounded-xl bg-[#f6faf7] p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf6ef] text-[#00863e]">
                  <CarFront size={25} />
                </div>

                <div>
                  <p className="font-bold text-[#1f2d25]">
                    {brand} {car.model}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {car.year} • {category}
                  </p>
                </div>
              </div>

              {/* BOOKING BUTTON */}
              <Button
                type="primary"
                size="large"
                block
                onClick={openBooking}
                disabled={authLoading}
                className="!mt-6 !h-12 !rounded-full !bg-[#00863e] !font-semibold !shadow-[0_8px_18px_rgba(0,134,62,0.22)] hover:!bg-[#006f35]"
              >
                Mashinani bron qilish
              </Button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Bron qilish orqali ushbu avtomobilni ijaraga
                olish uchun ariza yuborishingiz mumkin.
              </p>

            </div>

          </div>
        </div>
      </div>

      <BookingAuthDialog carId={id} open={bookingPrompt} onCancel={() => setBookingPrompt(false)} />

      {/* FULLSCREEN LIGHTBOX */}
      {lightbox && images.length > 0 && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={25} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ArrowLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ArrowRight size={24} />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[75vh] w-full max-w-[1100px]"
          >
            <Image
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
