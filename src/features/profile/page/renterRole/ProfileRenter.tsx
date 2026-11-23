"use client";

import { useMemo } from "react";
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
import { useMyBookings } from "@/src/hooks/use-bookings";
import { useFavorites } from "@/src/hooks/use-favorites";
import { carPrimaryImage } from "@/src/lib/media";
import {
  bookingStatusLabel,
  formatDateRange,
  formatDateShort,
  formatMoney,
  monthBucketsFromBookings,
} from "@/src/lib/format";

export default function ProfileRenter() {
  const { user } = useUser();
  const firstName = user?.fullName?.trim()?.split(" ")[0] || "foydalanuvchi";
  const bookingsQuery = useMyBookings();
  const favoritesQuery = useFavorites();

  const bookings = bookingsQuery.data?.items ?? [];
  const favoritesCount = favoritesQuery.data?.length ?? 0;

  const stats = useMemo(() => {
    const active = bookings.filter((b) =>
      ["CONFIRMED", "ACTIVE"].includes(b.status),
    ).length;
    const pending = bookings.filter(
      (b) => b.status === "PENDING_COMPANY",
    ).length;
    const spent = bookings
      .filter((b) =>
        ["CONFIRMED", "ACTIVE", "COMPLETED"].includes(b.status),
      )
      .reduce((sum, b) => sum + Number(b.totalAmount ?? 0), 0);

    return [
      {
        title: "Jami bronlar",
        value: String(bookings.length),
        description: "Barcha bronlaringiz",
        icon: CalendarCheck,
        tone: "bg-[#eaf6ef] text-[#00863e]",
      },
      {
        title: "Faol ijaralar",
        value: String(active).padStart(2),
        description: "Tasdiqlangan / faol",
        icon: CarFront,
        tone: "bg-[#e7f3ff] text-[#1d6fb8]",
      },
      {
        title: "Kutilayotgan",
        value: String(pending).padStart(2),
        description: "Tasdiqlanishi kutilmoqda",
        icon: Clock3,
        tone: "bg-[#fff4e5] text-[#c47a10]",
      },
      {
        title: "Jami xarajat",
        value: formatMoney(spent),
        description: "So‘m hisobida",
        icon: Wallet,
        tone: "bg-[#f1eefc] text-[#6b4fd3]",
      },
    ];
  }, [bookings]);

  const activeBooking =
    bookings.find((b) => b.status === "ACTIVE") ||
    bookings.find((b) => b.status === "CONFIRMED") ||
    null;

  const recentBookings = bookings.slice(0, 5);
  const expenses = useMemo(() => {
    const all = monthBucketsFromBookings(bookings);
    const month = new Date().getMonth();
    return all.slice(Math.max(0, month - 5), month + 1);
  }, [bookings]);
  const currentMonthSpend = expenses[expenses.length - 1]?.raw ?? 0;
  const loading = bookingsQuery.isLoading;

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
            Ijaralaringiz va bronlaringiz — real ma’lumotlar.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/profile/renter/xabarlar"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e9e7] bg-[#f6faf7] text-[#4a5650] transition hover:border-[#b9dfc6] hover:text-[#00863e]"
            aria-label="Xabarlar"
          >
            <Bell size={18} />
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

      {loading && (
        <p className="text-sm text-[#6d7a73]">Dashboard yuklanmoqda...</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)]"
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
          {activeBooking ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white/70">Hozirgi faol ijara</p>
                  <h2 className="mt-1 text-xl font-bold">
                    {activeBooking.car
                      ? `${activeBooking.car.brand} ${activeBooking.car.model}`
                      : "Avtomobil"}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-[#b7f0c8]">
                  <span className="h-2 w-2 rounded-full bg-[#7dff9d]" />
                  {bookingStatusLabel(activeBooking.status)}
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl">
                <img
                  src={carPrimaryImage(activeBooking.car?.images)}
                  alt="Faol ijara"
                  className="h-52 w-full object-cover sm:h-64"
                />
              </div>

              <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    {activeBooking.car
                      ? `${activeBooking.car.brand} ${activeBooking.car.model}`
                      : "Avtomobil"}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {activeBooking.code || activeBooking.id.slice(0, 8)}
                    {activeBooking.company?.name
                      ? ` · ${activeBooking.company.name}`
                      : ""}
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {formatMoney(activeBooking.totalAmount)}
                  </p>
                  <p className="text-xs text-white/70">Jami summa</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <div>
                  <p className="text-xs text-white/70">Olish sanasi</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays size={16} />
                    {formatDateShort(activeBooking.startAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/70">Qaytarish sanasi</p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays size={16} />
                    {formatDateShort(activeBooking.endAt)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[280px] flex-col items-start justify-center">
              <p className="text-sm text-white/70">Hozirgi faol ijara</p>
              <h2 className="mt-2 text-2xl font-bold">Hali faol bron yo‘q</h2>
              <p className="mt-2 max-w-md text-sm text-white/75">
                Mashina bron qilib, kompaniya tasdiqlagach bu yerda ko‘rinadi.
              </p>
              <Link
                href="/cars"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#00863e]"
              >
                Mashina qidirish <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
          <h2 className="text-lg font-bold text-[#1f2d25]">Tezkor amallar</h2>
          <p className="mt-1 text-sm text-[#8d9892]">
            Kerakli bo&apos;limga tez o&apos;ting
          </p>

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
                desc: `${bookings.length} ta bron`,
                icon: CalendarCheck,
                tone: "bg-[#e7f3ff] text-[#1d6fb8]",
              },
              {
                href: "/sevimlilar",
                title: "Sevimlilar",
                desc: `${favoritesCount} ta saqlangan`,
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
            {recentBookings.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#d7e8dd] px-4 py-8 text-center text-sm text-[#8d9892]">
                Hozircha bronlar yo‘q
              </p>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-3 rounded-2xl border border-[#eef2f0] p-3 transition hover:border-[#d7e8dd] hover:bg-[#f8fbf9] sm:flex-row sm:items-center"
                >
                  <img
                    src={carPrimaryImage(booking.car?.images)}
                    alt={
                      booking.car
                        ? `${booking.car.brand} ${booking.car.model}`
                        : "Car"
                    }
                    className="h-20 w-full rounded-xl object-cover sm:w-28"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#8d9892]">
                      {booking.code || booking.id.slice(0, 8)}
                    </p>
                    <h3 className="mt-1 font-semibold text-[#1f2d25]">
                      {booking.car
                        ? `${booking.car.brand} ${booking.car.model}`
                        : "Avtomobil"}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#8d9892]">
                      <CalendarDays size={13} />
                      {formatDateRange(booking.startAt, booking.endAt)}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        booking.status === "CONFIRMED" ||
                        booking.status === "ACTIVE"
                          ? "bg-[#eaf6ef] text-[#00863e]"
                          : booking.status === "PENDING_COMPANY"
                            ? "bg-[#fff4e5] text-[#c47a10]"
                            : "bg-[#eef2f0] text-[#5a675f]"
                      }`}
                    >
                      {bookingStatusLabel(booking.status)}
                    </span>
                    <p className="text-sm font-bold text-[#1f2d25]">
                      {formatMoney(booking.totalAmount)}
                    </p>
                  </div>
                </div>
              ))
            )}
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
              {formatMoney(currentMonthSpend)}
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
                      item === expenses[expenses.length - 1]
                        ? "bg-[#00863e]"
                        : "bg-[#b7d9c4]"
                    }`}
                    style={{ height: `${item.amountPct}%` }}
                  />
                </div>
                <span className="text-[11px] text-[#8d9892]">{item.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#eaf6ef] p-3">
            <TrendingUp size={17} className="text-[#00863e]" />
            <p className="text-xs text-[#2f6b49]">
              Xarajatlar bronlaringiz asosida hisoblanadi.
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
