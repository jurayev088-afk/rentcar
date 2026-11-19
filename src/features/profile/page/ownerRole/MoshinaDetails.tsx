"use client";

import { UseAllCars } from "@/src/constants/UseAllCars";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
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
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MoshinaDetails() {
  const { id } = useParams<{ id: string }>();
  const { allCars } = UseAllCars();

  const car = allCars?.find((car) => String(car.id) === String(id));
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = car?.images?.[activeImage];

  const imageUrl =
    currentImage?.originFileObj instanceof Blob
      ? URL.createObjectURL(currentImage.originFileObj)
      : currentImage?.thumbUrl;

  if (!car) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 rounded-3xl border border-[#e5e9e7] bg-white">
        <CarFront size={55} className="text-[#c5cec9]" />
        <h2 className="text-xl font-bold text-[#1f2d25]">Avtomobil topilmadi</h2>
        <Link
          href="/profile/owner/moshinalarim"
          className="font-semibold text-[#00863e] hover:underline"
        >
          Orqaga qaytish
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number | string) =>
    Number(String(price).replace(/\s/g, "")).toLocaleString("uz-UZ");

  const fuelLabels: Record<string, string> = {
    hybrid: "Gibrid",
    petrol: "Benzin",
    diesel: "Dizel",
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

  const features = [
    {
      icon: <CalendarDays />,
      label: "Ishlab chiqarilgan yili",
      value: car.year,
    },
    {
      icon: <Fuel />,
      label: "Yoqilg'i turi",
      value: fuelLabels[car.fuel] || car.fuel,
    },
    {
      icon: <Settings2 />,
      label: "Uzatmalar qutisi",
      value: transmissionLabels[car.transmission] || car.transmission,
    },
    {
      icon: <Gauge />,
      label: "Dvigatel hajmi",
      value: `${car.engine} L`,
    },
    {
      icon: <Users />,
      label: "O'rindiqlar soni",
      value: `${car.seats} ta`,
    },
    {
      icon: <Palette />,
      label: "Rangi",
      value: car.color,
    },
    {
      icon: <Wind />,
      label: "Konditsioner",
      value: car.airCondition ? "Mavjud" : "Mavjud emas",
    },
    {
      icon: <ShieldCheck />,
      label: "Avtomobil holati",
      value: conditionLabels[car.condition] || car.condition,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-[#6d7a73]">
        <Link
          href="/profile/owner/moshinalarim"
          className="inline-flex items-center gap-2 font-semibold text-[#00863e] hover:text-[#006f35]"
        >
          <ArrowLeft size={17} />
          Orqaga
        </Link>
        <span>/</span>
        <span>Avtomobillar</span>
        <span>/</span>
        <span className="font-medium text-[#1f2d25]">{car.model}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-4 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="relative overflow-hidden rounded-2xl bg-[#eef2f0]">
            {car?.images?.length > 0 ? (
              <Image
                width={900}
                height={500}
                src={imageUrl || ""}
                alt={car?.model}
                className="!h-[300px] !w-full !object-cover md:!h-[430px]"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center md:h-[430px]">
                <CarFront size={80} className="text-[#c5cec9]" />
              </div>
            )}

            <span className="absolute left-4 top-4 rounded-full bg-[#00863e] px-3 py-2 text-xs font-semibold text-white shadow-[0_6px_14px_rgba(0,134,62,0.25)]">
              {car?.category}
            </span>
          </div>

          {car?.images?.length > 0 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {car.images.map((image, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    activeImage === index
                      ? "border-[#00863e]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    width={120}
                    height={80}
                    src={image.thumbUrl}
                    alt={`${car.model} ${index + 1}`}
                    className="!h-20 !w-28 !object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eaf6ef] px-3 py-1 text-xs font-semibold text-[#00863e]">
              {car.brand}
            </span>
            <span className="rounded-full bg-[#f3f6f4] px-3 py-1 text-xs font-semibold text-[#3f4b44]">
              {conditionLabels[car.condition] || car.condition}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold text-[#1f2d25] md:text-3xl">
            {car.model}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-[#6d7a73]">
            <MapPin size={17} className="text-[#00863e]" />
            {car.region}, {car.district}
          </div>

          <div className="my-6 border-t border-[#eef2f0]" />

          <p className="text-sm text-[#6d7a73]">Bir kunlik ijara narxi</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-[#00863e]">
              {formatPrice(car.price)} so&apos;m
            </h2>
            {car.oldPrice > car.price && (
              <span className="text-lg text-[#8d9892] line-through">
                {formatPrice(car.oldPrice)} so&apos;m
              </span>
            )}
          </div>

          <div className="my-6 border-t border-[#eef2f0]" />

          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: CalendarDays,
                label: "Yili",
                value: car.year,
              },
              {
                icon: Fuel,
                label: "Yoqilg'i",
                value: fuelLabels[car.fuel] || car.fuel,
              },
              {
                icon: Users,
                label: "O'rindiqlar",
                value: `${car.seats} ta`,
              },
              {
                icon: Settings2,
                label: "Uzatma",
                value: transmissionLabels[car.transmission] || car.transmission,
              },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-[#f6faf7] p-4">
                <Icon className="mb-2 text-[#00863e]" size={18} />
                <p className="text-xs text-[#6d7a73]">{label}</p>
                <p className="mt-1 font-bold text-[#1f2d25]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between rounded-2xl bg-[#eaf6ef] p-4">
              <div>
                <p className="text-sm text-[#2f6b49]">Depozit</p>
                <p className="mt-1 font-bold text-[#00863e]">
                  {formatPrice(car.deposit)} so&apos;m
                </p>
              </div>
              <Wallet size={25} className="text-[#00863e]" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        <h2 className="text-xl font-bold text-[#1f2d25]">Texnik xususiyatlari</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-2xl border border-[#eef2f0] p-4 transition hover:border-[#b9dfc6] hover:bg-[#f8fbf9]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-[#6d7a73]">{item.label}</p>
                <p className="mt-1 font-semibold text-[#1f2d25]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        <h2 className="text-xl font-bold text-[#1f2d25]">Avtomobil haqida</h2>
        <p className="mt-4 leading-7 text-[#6d7a73]">
          {car.description || "Tavsif mavjud emas"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="flex items-center gap-2">
            <Clock className="text-[#00863e]" />
            <h2 className="text-lg font-bold text-[#1f2d25]">Ijara shartlari</h2>
          </div>
          <div className="mt-5 space-y-4">
            {[
              ["Minimal ijara muddati", `${car.minDays} kun`],
              ["Depozit", `${formatPrice(car.deposit)} so'm`],
              ["Davlat raqami", car.number],
              ["Manzil", car.address],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <span className="text-[#6d7a73]">{label}</span>
                <b className="text-right text-[#1f2d25]">{value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#00863e]" />
            <h2 className="text-lg font-bold text-[#1f2d25]">
              Avtomobil qoidalari
            </h2>
          </div>
          <p className="mt-5 leading-7 text-[#6d7a73]">
            {car.rules || "Maxsus qoidalar kiritilmagan"}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-[#00863e]">
            <CheckCircle2 size={18} />
            <span>Shartnoma: {car.agreement ? "Mavjud" : "Mavjud emas"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
