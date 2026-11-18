
"use client";

import {
  CarFront,
  CalendarCheck,
  Wallet,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Eye,
  MoreHorizontal,
  MapPin,
  CalendarDays,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react";

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
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Faol bronlar",
    value: "12",
    change: "+8.2%",
    description: "O'tgan oyga nisbatan",
    icon: CalendarCheck,
    positive: true,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Jami daromad",
    value: "45.8 mln",
    change: "+18.4%",
    description: "O'tgan oyga nisbatan",
    icon: Wallet,
    positive: true,
    color: "bg-violet-50 text-violet-700",
  },
  {
    title: "Kutilayotgan bronlar",
    value: "5",
    change: "-2.4%",
    description: "O'tgan oyga nisbatan",
    icon: Clock,
    positive: false,
    color: "bg-orange-50 text-orange-700",
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
  return (
    <div className="min-h-screen space-y-7 bg-[#F7F9FC] p-4 md:p-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">
            Boshqaruv paneli / Umumiy ma'lumot
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F33] md:text-3xl">
            Xush kelibsiz! 👋
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Kompaniyangiz faoliyatining umumiy ko'rsatkichlari.
          </p>
        </div>

    
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
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
              </div>

              <p className="mt-5 text-sm font-medium text-gray-500">
                {item.title}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-[#0B1F33]">
                  {item.value}
                </h2>

                <span
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                    item.positive
                      ? "bg-emerald-50 text-emerald-600"
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

              <p className="mt-2 text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart + Quick actions */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Income chart */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Daromadlar statistikasi
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Kompaniyangizning oylik daromadi
              </p>
            </div>

            <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none">
              <option>2026-yil</option>
              <option>2025-yil</option>
            </select>
          </div>

          <div className="mt-5 flex items-end gap-2">
            <h2 className="text-3xl font-bold text-[#0B1F33]">
              52 mln
            </h2>
            <span className="mb-1 flex items-center gap-1 text-sm font-medium text-emerald-600">
              <TrendingUp size={15} />
              +18.4%
            </span>
          </div>

          <div className="mt-5 h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0B1F33" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0B1F33" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#EEF1F5"
                  vertical={false}
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />

                <Tooltip
                  formatter={(value) => [`${value} mln so'm`, "Daromad"]}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #EEF1F5",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#0B1F33"
                  strokeWidth={3}
                  fill="url(#incomeGradient)"
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F33]">
            Tezkor amallar
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kerakli bo'limga tez o'ting
          </p>

          <div className="mt-5 space-y-3">
            {[
              {
                title: "Mashina qo'shish",
                desc: "Yangi avtomobil joylashtirish",
                icon: CarFront,
                href: "/profile/owner/cars",
              },
              {
                title: "Bronlarni ko'rish",
                desc: "Mijozlar bronlarini boshqarish",
                icon: CalendarCheck,
                href: "/profile/owner/bookings",
              },
              {
                title: "Daromadlar",
                desc: "To'lov va tushumlarni ko'rish",
                icon: Wallet,
                href: "/profile/owner/earnings",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition hover:border-[#0B1F33]/20 hover:bg-gray-50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B1F33]/5 text-[#0B1F33]">
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#0B1F33]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.desc}
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-400 transition group-hover:translate-x-1"
                  />
                </a>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl bg-[#0B1F33] p-4 text-white">
            <div className="flex items-center gap-2">
              <Users size={19} />
              <span className="text-sm font-semibold">
                Mijozlaringiz ko'paymoqda!
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-300">
              Avtomobillaringizni faol joylashtiring va ko'proq mijozlarga
              yetib boring.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Recent bookings */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between gap-3 p-5 md:p-6">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F33]">
                So'nggi bronlar
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Mijozlarning oxirgi buyurtmalari
              </p>
            </div>

            <a
              href="/profile/owner/bookings"
              className="flex items-center gap-1 text-sm font-semibold text-[#0B1F33] hover:underline"
            >
              Barchasi
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Buyurtma</th>
                  <th className="px-5 py-4 font-medium">Mijoz</th>
                  <th className="px-5 py-4 font-medium">Avtomobil</th>
                  <th className="px-5 py-4 font-medium">Sana</th>
                  <th className="px-5 py-4 font-medium">Narx</th>
                  <th className="px-5 py-4 font-medium">Holat</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="text-sm transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-semibold text-[#0B1F33]">
                      {booking.id}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-700">
                      {booking.name}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {booking.car}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {booking.date}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#0B1F33]">
                      {booking.amount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                          booking.status === "Tasdiqlangan"
                            ? "bg-emerald-50 text-emerald-700"
                            : booking.status === "Kutilmoqda"
                              ? "bg-orange-50 text-orange-700"
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

          <a
            href="/profile/owner/bookings"
            className="flex items-center justify-center gap-2 border-t border-gray-100 p-4 text-sm font-semibold text-[#0B1F33] hover:bg-gray-50"
          >
            Barcha bronlarni ko'rish
            <ChevronRight size={16} />
          </a>
        </div>

        {/* Popular cars */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Mashhur avtomobillar
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Eng ko'p bron qilinganlar
              </p>
            </div>
            <CarFront className="text-gray-400" size={21} />
          </div>

          <div className="mt-5 space-y-5">
            {popularCars.map((car, index) => (
              <div key={car.name} className="flex gap-3">
                <div className="relative h-[65px] w-[85px] shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#0B1F33]">
                    {car.name}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {car.category}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs text-gray-500">
                      {car.bookings} ta bron
                    </span>
                    <span className="whitespace-nowrap text-xs font-bold text-emerald-600">
                      {car.income}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/profile/owner/cars"
            className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-[#0B1F33] transition hover:bg-gray-50"
          >
            Mashinalarni ko'rish
            <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5 text-xs text-gray-400">
        <p>© 2026 Avto Bozor. Barcha huquqlar himoyalangan.</p>
        <p className="flex items-center gap-1">
          <CheckCircle2 size={14} className="text-emerald-500" />
          Tizim faol ishlamoqda
        </p>
      </div>
    </div>
  );
}
