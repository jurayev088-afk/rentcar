
"use client";

import {
  CalendarCheck,
  CarFront,
  Clock3,
  Wallet,
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Heart,
  Search,
  Bell,
  TrendingUp,
  ChevronRight,
  CircleCheck,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    title: "Jami bronlar",
    value: "12",
    description: "Barcha bronlaringiz",
    icon: CalendarCheck,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Faol ijaralar",
    value: "02",
    description: "Hozir foydalanilmoqda",
    icon: CarFront,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Kutilayotgan",
    value: "03",
    description: "Tasdiqlanishi kutilmoqda",
    icon: Clock3,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Jami xarajat",
    value: "4.5 mln",
    description: "So'm hisobida",
    icon: Wallet,
    color: "bg-purple-50 text-purple-600",
  },
];

const bookings = [
  {
    id: "#RB-1024",
    car: "Chevrolet Malibu 2",
    date: "16 – 20 Noyabr, 2026",
    price: "2 600 000 so'm",
    status: "Tasdiqlangan",
    color: "bg-emerald-50 text-emerald-600",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200",
  },
  {
    id: "#RB-1023",
    car: "BYD Song Plus",
    date: "21 – 25 Noyabr, 2026",
    price: "3 250 000 so'm",
    status: "Kutilmoqda",
    color: "bg-amber-50 text-amber-600",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200",
  },
  {
    id: "#RB-1022",
    car: "Kia K5",
    date: "10 – 12 Noyabr, 2026",
    price: "1 300 000 so'm",
    status: "Yakunlangan",
    color: "bg-gray-100 text-gray-600",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200",
  },
];

const expenses = [
  { month: "Iyul", amount: 35 },
  { month: "Avg", amount: 55 },
  { month: "Sen", amount: 42 },
  { month: "Okt", amount: 75 },
  { month: "Noy", amount: 90 },
  { month: "Dek", amount: 60 },
];

export default function ProfileRenter() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1450px] space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mt-2 text-2xl font-bold text-[#0B1F33] sm:text-3xl">
              Xush kelibsiz, Abdulloh!
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Ijaralaringiz va bronlaringizni bir joyda boshqaring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <Link
              href="/cars"
              className="flex h-11 items-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white transition hover:bg-[#183B5B]"
            >
              <Search size={17} />
              Mashina qidirish
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                    <Icon size={23} />
                  </div>
                  <ArrowUpRight size={19} className="text-gray-400" />
                </div>
                <h2 className="mt-5 text-sm font-medium text-gray-500">
                  {item.title}
                </h2>
                <p className="mt-1 text-2xl font-bold text-[#0B1F33]">
                  {item.value}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active rental */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="overflow-hidden rounded-2xl bg-[#0B1F33] p-5 text-white shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">
                  Hozirgi faol ijara
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Avtomobilingiz
                </h2>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-2 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Faol
              </span>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000"
                alt="Chevrolet Malibu"
                className="h-52 w-full object-cover sm:h-64"
              />
            </div>

            <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-bold">Chevrolet Malibu 2</h3>
                <p className="mt-1 text-sm text-gray-300">
                  2024 · Oq rang · 01 A 777 AA
                </p>
              </div>
              <div>
                <p className="text-xl font-bold">650 000 so'm</p>
                <p className="text-xs text-gray-300">Bir kun uchun</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-white/10 p-4">
              <div>
                <p className="text-xs text-gray-300">Olish sanasi</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays size={16} />
                  16.11.2026
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-300">Qaytarish sanasi</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays size={16} />
                  20.11.2026
                </p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-[#0B1F33]">
              Tezkor amallar
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Kerakli bo'limga tez o'ting
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/mashinalar"
                className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Search size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0B1F33]">
                    Mashina qidirish
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Yangi avtomobil toping
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>

              <Link
                href="/profile/renter/bronlarim"
                className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CalendarCheck size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0B1F33]">
                    Mening bronlarim
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Barcha bronlarni ko'ring
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>

              <Link
                href="/profile/renter/sevimlilar"
                className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                  <Heart size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0B1F33]">
                    Sevimlilar
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Saqlangan avtomobillar
                  </p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>

              
            </div>
          </div>
        </div>

        {/* Bookings and expenses */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* Recent bookings */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0B1F33]">
                  Oxirgi bronlar
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Sizning so'nggi bronlaringiz
                </p>
              </div>
              <Link
                href="/profile/renter/bronlarim"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Barchasi <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50 sm:flex-row sm:items-center"
                >
                  <img
                    src={booking.image}
                    alt={booking.car}
                    className="h-20 w-full rounded-lg object-cover sm:w-28"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">{booking.id}</p>
                    <h3 className="mt-1 font-semibold text-[#0B1F33]">
                      {booking.car}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <CalendarDays size={13} />
                      {booking.date}
                    </p>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-medium ${booking.color}`}>
                      {booking.status}
                    </span>
                    <p className="text-sm font-bold text-[#0B1F33]">
                      {booking.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0B1F33]">
                  Xarajatlar
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Oylik statistika
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="mt-7">
              <p className="text-sm text-gray-400">
                Joriy oy xarajatlari
              </p>
              <h3 className="mt-1 text-2xl font-bold text-[#0B1F33]">
                4 500 000 so'm
              </h3>
            </div>

            <div className="mt-8 flex h-40 items-end justify-between gap-2">
              {expenses.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="flex h-full w-full items-end overflow-hidden rounded-t-md bg-gray-100">
                    <div
                      className={`w-full rounded-t-md ${
                        item.month === "Noy"
                          ? "bg-[#0B1F33]"
                          : "bg-blue-200"
                      }`}
                      style={{ height: `${item.amount}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-400">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3">
              <TrendingUp size={17} className="text-emerald-600" />
              <p className="text-xs text-emerald-700">
                Xarajatlar statistikasi demo ma'lumotlar asosida.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom notification */}
        <div className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
            <CircleCheck size={22} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[#0B1F33]">
              Avtomobil ijaraga olishga tayyormisiz?
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              O'zingizga mos avtomobilni toping va bron qiling.
            </p>
          </div>
          <Link
            href="/cars"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183B5B]"
          >
            Mashinalarni ko'rish <ArrowRight size={17} />
          </Link>
        </div>

      </div>
    </div>
  );
}
