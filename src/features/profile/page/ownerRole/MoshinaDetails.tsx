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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <CarFront size={55} className="text-gray-300" />
        <h2 className="text-xl font-bold text-[#0B1F33]">
          Avtomobil topilmadi
        </h2>
        <Link href="/profile" className="text-blue-600 hover:underline">
          Orqaga qaytish
        </Link>
      </div>
    );
  }

  //   const images = (car.images || [])
  //     .map((image: any) =>
  //       typeof image === "string"
  //         ? image
  //         : image.url || image.imageUrl || image.src
  //     )
  //     .filter(Boolean);

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
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-7 md:px-8">
      <div className="mx-auto max-w-[1250px]">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:text-[#0B1F33]"
          >
            <ArrowLeft size={17} />
            Orqaga
          </Link>
          <span>/</span>
          <span>Avtomobillar</span>
          <span>/</span>
          <span className="font-medium text-[#0B1F33]">{car.model}</span>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Images */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="relative overflow-hidden rounded-xl bg-gray-100">
              {car?.images.length > 0 ? (
                <Image
                  width={300}
                  height={300}
                  src={imageUrl}
                  alt={car?.model}
                  className="h-[300px] w-full object-cover! md:h-[430px]"
                />
              ) : (
                <div className="flex h-[300px] items-center justify-center md:h-[430px]">
                  <CarFront size={80} className="text-gray-300" />
                </div>
              )}

              <span className="absolute left-4 top-4 rounded-lg bg-[#0B1F33] px-3 py-2 text-xs font-semibold text-white">
                {car?.category}
              </span>
            </div>

            {/* Thumbnails */}
            {car?.images.length > 0 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {car?.images.map((image, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`shrink-0 overflow-hidden rounded-lg border-2 ${
                      activeImage === index
                        ? "border-[#0B1F33]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      width={300}
                      height={300}
                      src={image.thumbUrl}
                      alt={`${car.model} ${index + 1}`}
                      className="h-20 w-28 object-cover!"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car info */}
          <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {car.brand}
              </span>
              <span className="rounded-md bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {conditionLabels[car.condition] || car.condition}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-[#0B1F33] md:text-3xl">
              {car.model}
            </h1>

            <div className="mt-3 flex items-center gap-2 text-gray-500">
              <MapPin size={17} />
              {car.region}, {car.district}
            </div>

            <div className="my-6 border-t border-gray-100" />

            <p className="text-sm text-gray-500">Bir kunlik ijara narxi</p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold text-[#0B1F33]">
                {formatPrice(car.price)} so'm
              </h2>

              {car.oldPrice > car.price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(car.oldPrice)} so'm
                </span>
              )}
            </div>

            <div className="my-6 border-t border-gray-100" />

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <CalendarDays className="mb-2 text-[#0B1F33]" />
                <p className="text-xs text-gray-500">Yili</p>
                <p className="mt-1 font-bold">{car.year}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <Fuel className="mb-2 text-[#0B1F33]" />
                <p className="text-xs text-gray-500">Yoqilg'i</p>
                <p className="mt-1 font-bold">
                  {fuelLabels[car.fuel] || car.fuel}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <Users className="mb-2 text-[#0B1F33]" />
                <p className="text-xs text-gray-500">O'rindiqlar</p>
                <p className="mt-1 font-bold">{car.seats} ta</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <Settings2 className="mb-2 text-[#0B1F33]" />
                <p className="text-xs text-gray-500">Uzatma</p>
                <p className="mt-1 font-bold">
                  {transmissionLabels[car.transmission] || car.transmission}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between rounded-xl bg-[#F5F7FA] p-4">
                <div>
                  <p className="text-sm text-gray-500">Depozit</p>
                  <p className="mt-1 font-bold text-[#0B1F33]">
                    {formatPrice(car.deposit)} so'm
                  </p>
                </div>
                <Wallet size={25} className="text-[#0B1F33]" />
              </div>
            </div>
          </div>
        </div>

        {/* Technical features */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B1F33]">
            Texnik xususiyatlari
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-gray-100 p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F3F7] text-[#0B1F33]">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="mt-1 font-semibold text-[#0B1F33]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0B1F33]">Avtomobil haqida</h2>

          <p className="mt-4 leading-7 text-gray-600">
            {car.description || "Tavsif mavjud emas"}
          </p>
        </div>

        {/* Rental conditions */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="text-[#0B1F33]" />
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Ijara shartlari
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Minimal ijara muddati</span>
                <b>{car.minDays} kun</b>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Depozit</span>
                <b>{formatPrice(car.deposit)} so'm</b>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Davlat raqami</span>
                <b>{car.number}</b>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Manzil</span>
                <b>{car.address}</b>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#0B1F33]" />
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Avtomobil qoidalari
              </h2>
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {car.rules || "Maxsus qoidalar kiritilmagan"}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 size={18} />
              <span>Shartnoma: {car.agreement ? "Mavjud" : "Mavjud emas"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
