"use client";

import {
  CarFront,
  CalendarCheck,
  Wallet,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@/src/constants/UseMeContext";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const statistics = [
  {
    title: "Jami mashinalar",
    value: "24",
    change: "+12.5%",
    description: "O'tgan oyga nisbatan",
    icon: CarFront,
    positive: true,
    tone: "bg-[#eaf6ef] text-[#00863e]",
  },
  {
    title: "Faol bronlar",
    value: "12",
    change: "+8.2%",
    description: "O'tgan oyga nisbatan",
    icon: CalendarCheck,
    positive: true,
    tone: "bg-[#e7f3ff] text-[#1d6fb8]",
  },
  {
    title: "Jami daromad",
    value: "45.8 mln",
    change: "+18.4%",
    description: "O'tgan oyga nisbatan",
    icon: Wallet,
    positive: true,
    tone: "bg-[#f1eefc] text-[#6b4fd3]",
  },
  {
    title: "Kutilayotgan bronlar",
    value: "5",
    change: "-2.4%",
    description: "O'tgan oyga nisbatan",
    icon: Clock,
    positive: false,
    tone: "bg-[#fff4e5] text-[#c47a10]",
  },
];

const chartData = [
  { month: "Yan", income: 12 },
  { month: "Fev", income: 18 },
  { month: "Mar", income: 15 },
  { month: "Apr", income: 25 },
  { month: "May", income: 21 },
  { month: "Iyun", income: 22 },
  { month: "Iyul", income: 8 },
  { month: "Avg", income: 38 },
  { month: "Sen", income: 33 },
  { month: "Okt", income: 45 },
  { month: "Noy", income: 41 },
  { month: "Dek", income: 10 },
];

const bookings = [
  {
    id: "#BR-1024",
    name: "Abdulloh Jo'rayev",
    car: "BYD Song Plus",
    date: "15.11.2026",
    amount: "850 000 so'm",
    status: "Tasdiqlangan",
  },
  {
    id: "#BR-1023",
    name: "Azizbek Karimov",
    car: "Chevrolet Malibu 2",
    date: "14.11.2026",
    amount: "650 000 so'm",
    status: "Kutilmoqda",
  },
  {
    id: "#BR-1022",
    name: "Javohir Aliyev",
    car: "Kia K5",
    date: "13.11.2026",
    amount: "750 000 so'm",
    status: "Tasdiqlangan",
  },
  {
    id: "#BR-1021",
    name: "Sardor Rahimov",
    car: "Hyundai Sonata",
    date: "12.11.2026",
    amount: "900 000 so'm",
    status: "Bekor qilingan",
  },
];

const popularCars = [
  {
    name: "BYD Song Plus",
    category: "Hybrid · 2024",
    bookings: 18,
    income: "12.5 mln",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200",
  },
  {
    name: "Chevrolet Malibu 2",
    category: "Sedan · 2023",
    bookings: 14,
    income: "9.2 mln",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200",
  },
  {
    name: "Kia K5",
    category: "Sedan · 2024",
    bookings: 11,
    income: "7.8 mln",
    image:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200",
  },
];

export default function ProfileOwner() {
  const { user } = useUser();
  const firstName = user?.fullName?.trim()?.split(" ")[0] || "egasi";

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Egasi kabineti
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1f2d25] md:text-3xl">
            Xush kelibsiz, {firstName}!
          </h1>
          <p className="mt-2 text-sm text-[#6d7a73]">
            Kompaniyangiz faoliyatining umumiy ko&apos;rsatkichlari.
          </p>
        </div>

        <Link
          href="/profile/owner/moshinalarim/qoshish"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#00863e] px-5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(0,134,62,0.22)] transition hover:bg-[#006f35]"
        >
          <CarFront size={17} />
          Mashina qo&apos;shish
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,37,26,0.07)]"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}
              >
                <Icon size={22} />
              </div>

              <p className="mt-5 text-sm font-medium text-[#6d7a73]">
                {item.title}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-[#1f2d25]">
                  {item.value}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                    item.positive
                      ? "bg-[#eaf6ef] text-[#00863e]"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {item.positive ? (
                    <TrendingUp size={13} />
                  ) : (
                    <TrendingDown size={13} />
                  )}
                  {item.change}
                </span>
              </div>

              <p className="mt-2 text-xs text-[#8d9892]">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] xl:col-span-2 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1f2d25]">
                Daromadlar statistikasi
              </h2>
              <p className="mt-1 text-sm text-[#6d7a73]">
                Kompaniyangizning oylik daromadi
              </p>
            </div>

            <select className="rounded-full border border-[#e5e9e7] bg-[#f6faf7] px-3 py-2 text-sm text-[#4a5650] outline-none focus:border-[#00863e]">
              <option>2026-yil</option>
              <option>2025-yil</option>
            </select>
          </div>

          <div className="mt-5 flex items-end gap-2">
            <h2 className="text-3xl font-bold text-[#1f2d25]">52 mln</h2>
            <span className="mb-1 flex items-center gap-1 text-sm font-medium text-[#00863e]">
              <TrendingUp size={15} />
              +18.4%
            </span>
          </div>

          <div className="mt-5 h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00863e" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#00863e" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#E8EEEA"
                  vertical={false}
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8d9892", fontSize: 12 }}
                  dy={10}
                />

                <Tooltip
                  formatter={(value) => [`${value} mln so'm`, "Daromad"]}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid #E5E9E7",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#00863e"
                  strokeWidth={3}
                  fill="url(#incomeGradient)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <h2 className="text-lg font-bold text-[#1f2d25]">Tezkor amallar</h2>
          <p className="mt-1 text-sm text-[#6d7a73]">
            Kerakli bo&apos;limga tez o&apos;ting
          </p>

          <div className="mt-5 space-y-3">
            {[
              {
                title: "Mashina qo'shish",
                desc: "Yangi avtomobil joylashtirish",
                icon: CarFront,
                href: "/profile/owner/moshinalarim/qoshish",
              },
              {
                title: "Bronlarni ko'rish",
                desc: "Mijozlar bronlarini boshqarish",
                icon: CalendarCheck,
                href: "/profile/owner/bronlar",
              },
              {
                title: "Mashinalarim",
                desc: "Avtomobil parkini boshqarish",
                icon: Wallet,
                href: "/profile/owner/moshinalarim",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-2xl border border-[#eef2f0] p-3 transition hover:border-[#b9dfc6] hover:bg-[#f6faf7]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1f2d25]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[#8d9892]">{item.desc}</p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-[#9aa59e] transition group-hover:translate-x-0.5 group-hover:text-[#00863e]"
                  />
                </Link>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-[linear-gradient(145deg,#0f2a1c,#165a36_55%,#00863e)] p-4 text-white">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span className="text-sm font-semibold">
                Mijozlaringiz ko&apos;paymoqda!
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/75">
              Avtomobillaringizni faol joylashtiring va ko&apos;proq mijozlarga
              yetib boring.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)] xl:col-span-2">
          <div className="flex items-center justify-between gap-3 p-5 md:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#1f2d25]">
                So&apos;nggi bronlar
              </h2>
              <p className="mt-1 text-sm text-[#6d7a73]">
                Mijozlarning oxirgi buyurtmalari
              </p>
            </div>

            <Link
              href="/profile/owner/bronlar"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#00863e] hover:text-[#006f35]"
            >
              Barchasi
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-[#f6faf7] text-xs text-[#6d7a73]">
                <tr>
                  <th className="px-5 py-4 font-medium">Buyurtma</th>
                  <th className="px-5 py-4 font-medium">Mijoz</th>
                  <th className="px-5 py-4 font-medium">Avtomobil</th>
                  <th className="px-5 py-4 font-medium">Sana</th>
                  <th className="px-5 py-4 font-medium">Narx</th>
                  <th className="px-5 py-4 font-medium">Holat</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eef2f0]">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="text-sm transition hover:bg-[#f8fbf9]"
                  >
                    <td className="px-5 py-4 font-semibold text-[#1f2d25]">
                      {booking.id}
                    </td>
                    <td className="px-5 py-4 font-medium text-[#3f4b44]">
                      {booking.name}
                    </td>
                    <td className="px-5 py-4 text-[#6d7a73]">{booking.car}</td>
                    <td className="px-5 py-4 text-[#6d7a73]">{booking.date}</td>
                    <td className="px-5 py-4 font-semibold text-[#1f2d25]">
                      {booking.amount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                          booking.status === "Tasdiqlangan"
                            ? "bg-[#eaf6ef] text-[#00863e]"
                            : booking.status === "Kutilmoqda"
                              ? "bg-[#fff4e5] text-[#c47a10]"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/profile/owner/bronlar"
            className="flex items-center justify-center gap-2 border-t border-[#eef2f0] p-4 text-sm font-semibold text-[#00863e] hover:bg-[#f6faf7]"
          >
            Barcha bronlarni ko&apos;rish
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1f2d25]">
                Mashhur avtomobillar
              </h2>
              <p className="mt-1 text-sm text-[#6d7a73]">
                Eng ko&apos;p bron qilinganlar
              </p>
            </div>
            <CarFront className="text-[#9aa59e]" size={21} />
          </div>

          <div className="mt-5 space-y-4">
            {popularCars.map((car) => (
              <div key={car.name} className="flex gap-3">
                <div className="relative h-[65px] w-[85px] shrink-0 overflow-hidden rounded-xl bg-[#eef2f0]">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#1f2d25]">
                    {car.name}
                  </p>
                  <p className="mt-1 text-xs text-[#8d9892]">{car.category}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs text-[#6d7a73]">
                      {car.bookings} ta bron
                    </span>
                    <span className="whitespace-nowrap text-xs font-bold text-[#00863e]">
                      {car.income}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/profile/owner/moshinalarim"
            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-[#d7e8dd] bg-[#f6faf7] py-3 text-sm font-semibold text-[#00863e] transition hover:bg-[#eaf6ef]"
          >
            Mashinalarni ko&apos;rish
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e9e7] pt-5 text-xs text-[#8d9892]">
        <p>© 2026 RENTO. Barcha huquqlar himoyalangan.</p>
        <p className="flex items-center gap-1">
          <CheckCircle2 size={14} className="text-[#00863e]" />
          Tizim faol ishlamoqda
        </p>
      </div>
    </div>
  );
}
