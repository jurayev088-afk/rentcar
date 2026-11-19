"use client";

import {
  CalendarCheck,
  CarFront,
  Clock3,
  Wallet,
  ArrowUpRight,
  ArrowRight,
  Heart,
  Search,
  Bell,
  TrendingUp,
  ChevronRight,
  CircleCheck,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/src/constants/UseMeContext";

const stats = [
  {
    title: "Jami bronlar",
    value: "12",
    description: "Barcha bronlaringiz",
    icon: CalendarCheck,
    tone: "bg-[#eaf6ef] text-[#00863e]",
  },
  {
    title: "Faol ijaralar",
    value: "02",
    description: "Hozir foydalanilmoqda",
    icon: CarFront,
    tone: "bg-[#e7f3ff] text-[#1d6fb8]",
  },
  {
    title: "Kutilayotgan",
    value: "03",
    description: "Tasdiqlanishi kutilmoqda",
    icon: Clock3,
    tone: "bg-[#fff4e5] text-[#c47a10]",
  },
  {
    title: "Jami xarajat",
    value: "4.5 mln",
    description: "So'm hisobida",
    icon: Wallet,
    tone: "bg-[#f1eefc] text-[#6b4fd3]",
  },
];

const bookings = [
  {
    id: "#RB-1024",
    car: "Chevrolet Malibu 2",
    date: "16 – 20 Noyabr, 2026",
    price: "2 600 000 so'm",
    status: "Tasdiqlangan",
    color: "bg-[#eaf6ef] text-[#00863e]",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200",
  },
  {
    id: "#RB-1023",
    car: "BYD Song Plus",
    date: "21 – 25 Noyabr, 2026",
    price: "3 250 000 so'm",
    status: "Kutilmoqda",
    color: "bg-[#fff4e5] text-[#c47a10]",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200",
  },
  {
    id: "#RB-1022",
    car: "Kia K5",
    date: "10 – 12 Noyabr, 2026",
    price: "1 300 000 so'm",
    status: "Yakunlangan",
    color: "bg-[#eef2f0] text-[#5a675f]",
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
  const { user } = useUser();
  const firstName = user?.fullName?.trim()?.split(" ")[0] || "foydalanuvchi";

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Ijarachi kabineti
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1f2d25] sm:text-3xl">
            Xush kelibsiz, {firstName}!
          </h1>
          <p className="mt-2 text-sm text-[#6d7a73]">
            Ijaralaringiz va bronlaringizni bir joyda boshqaring.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/profile/renter/xabarlar"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e9e7] bg-[#f6faf7] text-[#4a5650] transition hover:border-[#b9dfc6] hover:text-[#00863e]"
            aria-label="Xabarlar"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#00863e]" />
          </Link>
          <Link
            href="/cars"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#00863e] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(0,134,62,0.22)] transition hover:bg-[#006f35]"
          >
            <Search size={16} />
            Mashina qidirish
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,37,26,0.07)]"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}
                >
                  <Icon size={22} />
                </div>
                <ArrowUpRight size={18} className="text-[#9aa59e]" />
              </div>
              <h2 className="mt-5 text-sm font-medium text-[#6d7a73]">
                {item.title}
              </h2>
              <p className="mt-1 text-2xl font-bold text-[#1f2d25]">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-[#8d9892]">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#0f2a1c,#165a36_52%,#00863e)] p-5 text-white shadow-[0_14px_32px_rgba(0,134,62,0.2)] sm:p-6 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/70">Hozirgi faol ijara</p>
              <h2 className="mt-1 text-xl font-bold">Avtomobilingiz</h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-[#b7f0c8]">
              <span className="h-2 w-2 rounded-full bg-[#7dff9d]" />
              Faol
            </span>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000"
              alt="Chevrolet Malibu"
              className="h-52 w-full object-cover sm:h-64"
            />
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold">Chevrolet Malibu 2</h3>
              <p className="mt-1 text-sm text-white/70">
                2024 · Oq rang · 01 A 777 AA
              </p>
            </div>
            <div>
              <p className="text-xl font-bold">650 000 so&apos;m</p>
              <p className="text-xs text-white/70">Bir kun uchun</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div>
              <p className="text-xs text-white/70">Olish sanasi</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                <CalendarDays size={16} />
                16.11.2026
              </p>
            </div>
            <div>
              <p className="text-xs text-white/70">Qaytarish sanasi</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                <CalendarDays size={16} />
                20.11.2026
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
          <h2 className="text-lg font-bold text-[#1f2d25]">Tezkor amallar</h2>
          <p className="mt-1 text-sm text-[#8d9892]">Kerakli bo&apos;limga tez o&apos;ting</p>

          <div className="mt-6 space-y-3">
            {[
              {
                href: "/cars",
                title: "Mashina qidirish",
                desc: "Yangi avtomobil toping",
                icon: Search,
                tone: "bg-[#eaf6ef] text-[#00863e]",
              },
              {
                href: "/profile/renter/bronlarim",
                title: "Mening bronlarim",
                desc: "Barcha bronlarni ko'ring",
                icon: CalendarCheck,
                tone: "bg-[#e7f3ff] text-[#1d6fb8]",
              },
              {
                href: "/sevimlilar",
                title: "Sevimlilar",
                desc: "Saqlangan avtomobillar",
                icon: Heart,
                tone: "bg-red-50 text-red-500",
              },
            ].map(({ href, title, desc, icon: Icon, tone }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 rounded-2xl border border-[#eef2f0] p-4 transition hover:border-[#b9dfc6] hover:bg-[#f6faf7]"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon size={19} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#1f2d25]">{title}</p>
                  <p className="mt-1 text-xs text-[#8d9892]">{desc}</p>
                </div>
                <ChevronRight size={18} className="text-[#9aa59e]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1f2d25]">Oxirgi bronlar</h2>
              <p className="mt-1 text-sm text-[#8d9892]">
                Sizning so&apos;nggi bronlaringiz
              </p>
            </div>
            <Link
              href="/profile/renter/bronlarim"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#00863e] hover:text-[#006f35]"
            >
              Barchasi <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-3 rounded-2xl border border-[#eef2f0] p-3 transition hover:border-[#d7e8dd] hover:bg-[#f8fbf9] sm:flex-row sm:items-center"
              >
                <img
                  src={booking.image}
                  alt={booking.car}
                  className="h-20 w-full rounded-xl object-cover sm:w-28"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#8d9892]">{booking.id}</p>
                  <h3 className="mt-1 font-semibold text-[#1f2d25]">
                    {booking.car}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[#8d9892]">
                    <CalendarDays size={13} />
                    {booking.date}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${booking.color}`}
                  >
                    {booking.status}
                  </span>
                  <p className="text-sm font-bold text-[#1f2d25]">
                    {booking.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1f2d25]">Xarajatlar</h2>
              <p className="mt-1 text-sm text-[#8d9892]">Oylik statistika</p>
            </div>
            <div className="rounded-xl bg-[#eaf6ef] p-2 text-[#00863e]">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm text-[#8d9892]">Joriy oy xarajatlari</p>
            <h3 className="mt-1 text-2xl font-bold text-[#1f2d25]">
              4 500 000 so&apos;m
            </h3>
          </div>

          <div className="mt-8 flex h-40 items-end justify-between gap-2">
            {expenses.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex h-full w-full items-end overflow-hidden rounded-t-md bg-[#eef2f0]">
                  <div
                    className={`w-full rounded-t-md ${
                      item.month === "Noy" ? "bg-[#00863e]" : "bg-[#b7d9c4]"
                    }`}
                    style={{ height: `${item.amount}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#8d9892]">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#eaf6ef] p-3">
            <TrendingUp size={17} className="text-[#00863e]" />
            <p className="text-xs text-[#2f6b49]">
              Xarajatlar statistikasi demo ma&apos;lumotlar asosida.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-[#c6e5d1] bg-[#eff8f2] p-5 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#00863e]">
          <CircleCheck size={22} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[#1f2d25]">
            Avtomobil ijaraga olishga tayyormisiz?
          </h3>
          <p className="mt-1 text-sm text-[#668071]">
            O&apos;zingizga mos avtomobilni toping va bron qiling.
          </p>
        </div>
        <Link
          href="/cars"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00863e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#006f35]"
        >
          Mashinalarni ko&apos;rish <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
