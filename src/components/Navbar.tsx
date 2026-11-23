"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

import NavbarSearch from "./NavbarSearch";
import RentoLogo from "./RentoLogo";

import {
  CarOutlined,
  CloseOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MenuOutlined,
  PlusOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { ArrowRight, Bell, Heart } from "lucide-react";

import { useUser } from "../constants/UseMeContext";
import { useFavorites } from "../hooks/use-favorites";
import { useNotifications } from "../hooks/use-notifications";
import BookingAuthDialog from "../features/mashinalar/components/BookingAuthDialog";

const navLinks = [
  { href: "/", label: "Bosh sahifa", icon: HomeOutlined },
  { href: "/cars", label: "Mashinalar", icon: CarOutlined },
  { href: "/about", label: "Biz haqimizda", icon: InfoCircleOutlined },
];

export default function Navbar({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingPrompt, setBookingPrompt] = useState(false);

  const { user, loading } = useUser();
  const { data: notifications } = useNotifications(Boolean(user));
  const { data: favoriteCars = [] } = useFavorites();
  const unreadCount = notifications?.unreadCount ?? 0;
  const hasUnread = Boolean(user) && unreadCount > 0;
  const likesCount = user?.role === "RENTER" ? favoriteCars.length : 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (page: string) =>
    page === "/"
      ? pathname === "/"
      : pathname === page || pathname.startsWith(`${page}/`);

  const profilePath =
    user?.role === "OWNER" || user?.role === "ADMIN"
      ? "/profile/owner/profile"
      : "/profile/renter/profile";

  const xabarlarPath =
    user?.role === "OWNER" || user?.role === "ADMIN"
      ? "/profile/owner/xabarlar"
      : "/profile/renter/xabarlar";

  const closeMobile = () => setMobileOpen(false);

  const fullName = user?.fullName?.trim();
  const initial = fullName
    ? Array.from(fullName)[0].toLocaleUpperCase()
    : null;
  const accountLabel = loading
    ? "Yuklanmoqda..."
    : user
      ? fullName || "Kabinet"
      : "Kirish";
  const accountSubLabel = loading
    ? "Kuting"
    : user
      ? "Kabinet"
      : "Hisob";

  const onBookingClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (user) return;
    event.preventDefault();
    if (!loading) setBookingPrompt(true);
  };

  return (
    <>
      <nav
        ref={menuRef}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled || !home
            ? "border-b border-[#e6ebe8] bg-white/95 shadow-[0_8px_28px_rgba(16,37,26,0.07)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/70 backdrop-blur-md"
        }`}
        aria-label="Asosiy navigatsiya"
      >
        <div className="mx-auto flex min-h-[68px] w-full max-w-[1440px] items-center gap-3 px-3 sm:px-5 lg:min-h-[80px] lg:gap-5 lg:px-8">
          <Link
            href="/"
            onClick={closeMobile}
            className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          >
            <RentoLogo className="w-[108px] sm:w-[128px] lg:w-[148px]" />
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);

              return (
                <Link
                  href={href}
                  key={href}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-all ${
                    active
                      ? "bg-[#eaf6ef] text-[#00863e]"
                      : "text-[#3a463f] hover:bg-[#f3f6f4] hover:text-[#00863e]"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-[1px] hidden h-0.5 rounded-full bg-[#00863e] xl:block" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mx-auto hidden min-w-0 max-w-[280px] flex-1 lg:block">
            <NavbarSearch />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5">
            <Link
              href="/sevimlilar"
              aria-label={
                likesCount > 0
                  ? `Sevimlilar: ${likesCount} ta mashina`
                  : "Sevimlilar"
              }
              title="Sevimlilar"
              className={`relative hidden h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 sm:inline-flex ${
                isActive("/sevimlilar")
                  ? "border-red-200 bg-red-50 text-red-500 shadow-[0_4px_12px_rgba(239,68,68,0.12)]"
                  : "border-[#e5e9e7] bg-white text-[#4a5650] hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Heart
                className={`h-[18px] w-[18px] ${
                  isActive("/sevimlilar") || likesCount > 0 ? "fill-current" : ""
                }`}
              />
              {likesCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#e11d48] px-1 text-[10px] font-bold leading-none text-white shadow-sm">
                  {likesCount > 99 ? "99+" : likesCount}
                </span>
              )}
            </Link>

            <Link
              href={user ? xabarlarPath : "/login"}
              aria-label={
                hasUnread
                  ? `${unreadCount} ta o‘qilmagan bildirishnoma`
                  : "Bildirishnomalar"
              }
              title="Bildirishnomalar"
              className={`relative hidden h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 sm:inline-flex ${
                isActive("/profile/renter/xabarlar") ||
                isActive("/profile/owner/xabarlar")
                  ? "border-[#b9dfc6] bg-[#eaf6ef] text-[#00863e]"
                  : "border-[#e5e9e7] bg-white text-[#4a5650] hover:border-[#b9dfc6] hover:bg-[#f6faf7] hover:text-[#00863e]"
              }`}
            >
              <Bell className="h-[18px] w-[18px]" />
              {hasUnread && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#e11d48]" />
              )}
            </Link>

            <Link
              href="/cars"
              onClick={onBookingClick}
              className="group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#00863e] px-3.5 text-[12px] font-bold text-white shadow-[0_6px_16px_rgba(0,134,62,0.22)] transition-all hover:bg-[#006f35] hover:shadow-[0_8px_20px_rgba(0,134,62,0.28)] active:scale-[0.98] sm:px-5 sm:text-[13px]"
            >
              <span className="sm:hidden">Bron qilish</span>
              <span className="hidden sm:inline">Mashina bron qilish</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href={user ? profilePath : "/login"}
              aria-label={
                fullName ? `Shaxsiy kabinet: ${fullName}` : "Tizimga kirish"
              }
              className="group flex h-11 max-w-[180px] items-center gap-2 rounded-full border border-[#e5e9e7] bg-white py-1 pl-1 pr-2.5 transition-all hover:border-[#b9dfc6] hover:bg-[#f6faf7] sm:pr-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00863e] text-[13px] font-bold text-white shadow-[0_3px_8px_rgba(0,134,62,0.25)]">
                {initial ?? <UserOutlined />}
              </span>
              <span className="hidden min-w-0 sm:block">
                <span className="block truncate text-[12px] font-bold leading-tight text-[#1f2d25]">
                  {accountLabel}
                </span>
                <span className="block text-[10px] font-medium leading-tight text-[#7a8780]">
                  {accountSubLabel}
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-all xl:hidden ${
                mobileOpen
                  ? "border-[#00863e] bg-[#eaf6ef] text-[#00863e]"
                  : "border-[#e5e9e7] bg-white text-[#26352d] hover:border-[#b9dfc6] hover:bg-[#f6faf7]"
              }`}
              aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
              aria-expanded={mobileOpen}
              aria-controls="rent-mobile-menu"
            >
              {mobileOpen ? (
                <CloseOutlined className="text-[16px]" />
              ) : (
                <MenuOutlined className="text-[16px]" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="rent-mobile-menu"
            className="absolute inset-x-0 top-full z-50 border-t border-[#e9eeeb] bg-white/98 px-3 pb-5 pt-3 shadow-[0_18px_40px_rgba(16,37,26,0.14)] backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:mt-2 sm:w-[360px] sm:rounded-3xl sm:border sm:border-[#e6ebe8] sm:p-4"
          >
            <div className="mb-3 lg:hidden">
              <NavbarSearch />
            </div>

            <div className="grid gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobile}
                    className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-semibold transition ${
                      active
                        ? "bg-[#eaf6ef] text-[#00863e]"
                        : "text-[#29362f] hover:bg-[#f3f6f4] hover:text-[#00863e]"
                    }`}
                  >
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                        active
                          ? "bg-[#00863e] text-white"
                          : "bg-[#f0f3f1] text-[#4f5c55]"
                      }`}
                    >
                      <Icon className="text-[16px]" />
                    </span>
                    {label}
                  </Link>
                );
              })}

              <Link
                href="/sevimlilar"
                onClick={closeMobile}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-semibold transition ${
                  isActive("/sevimlilar")
                    ? "bg-red-50 text-red-500"
                    : "text-[#29362f] hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <span
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                    isActive("/sevimlilar")
                      ? "bg-red-500 text-white"
                      : "bg-[#f0f3f1] text-[#4f5c55]"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isActive("/sevimlilar") || likesCount > 0
                        ? "fill-current"
                        : ""
                    }`}
                  />
                  {likesCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e11d48] px-1 text-[9px] font-bold text-white">
                      {likesCount > 99 ? "99+" : likesCount}
                    </span>
                  )}
                </span>
                <span className="flex-1">Sevimlilar</span>
                {likesCount > 0 && (
                  <span className="text-xs font-bold text-red-500">
                    {likesCount}
                  </span>
                )}
              </Link>

              <Link
                href={user ? xabarlarPath : "/login"}
                onClick={closeMobile}
                className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] font-semibold transition ${
                  isActive("/profile/renter/xabarlar") ||
                  isActive("/profile/owner/xabarlar")
                    ? "bg-[#eaf6ef] text-[#00863e]"
                    : "text-[#29362f] hover:bg-[#f3f6f4] hover:text-[#00863e]"
                }`}
              >
                <span
                  className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                    isActive("/profile/renter/xabarlar") ||
                    isActive("/profile/owner/xabarlar")
                      ? "bg-[#00863e] text-white"
                      : "bg-[#f0f3f1] text-[#4f5c55]"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  {hasUnread && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#e11d48]" />
                  )}
                </span>
                <span className="flex-1">Bildirishnomalar</span>
                {hasUnread && (
                  <span className="text-xs font-bold text-[#e11d48]">
                    {unreadCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="my-3.5 h-px bg-[#edf0ee]" />

            <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[1.4px] text-[#87938b]">
              Avtomobil ijarasi
            </p>

            <Link
              href={
                user?.role === "OWNER"
                  ? "/profile/owner/moshinalarim/qoshish"
                  : "/cars"
              }
              onClick={(event) => {
                if (!user) {
                  event.preventDefault();
                  closeMobile();
                  router.push("/login");
                  return;
                }
                closeMobile();
              }}
              className="group flex items-center gap-3 rounded-2xl border border-[#c6e5d1] bg-[#eff8f2] p-3 transition-all hover:border-[#00863e] hover:bg-[#e4f4e9]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00863e] text-white shadow-[0_6px_14px_rgba(0,134,62,0.25)]">
                {user?.role === "OWNER" ? (
                  <PlusOutlined className="text-[18px]" />
                ) : (
                  <CarOutlined className="text-[18px]" />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold text-[#173c27]">
                  {user?.role === "OWNER"
                    ? "Mashinamni ijaraga berish"
                    : "Ijaraga mashina topish"}
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-[#668071]">
                  {user?.role === "OWNER"
                    ? "Avtomobilingizni ijaraga joylashtiring"
                    : "O‘zingizga mos avtomobilni ijaraga oling"}
                </span>
              </span>

              <RightOutlined className="text-xs text-[#00863e] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="my-3.5 h-px bg-[#edf0ee]" />

            <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[1.4px] text-[#87938b]">
              Shaxsiy kabinet
            </p>

            <Link
              href={user ? profilePath : "/login"}
              onClick={closeMobile}
              className="group flex items-center gap-3 rounded-2xl border border-[#e5e9e7] bg-white p-3 transition-all hover:border-[#b9dfc6] hover:bg-[#f6faf7]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#10251a] text-[15px] font-bold text-white">
                {initial ?? <UserOutlined />}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-bold text-[#26352d]">
                  {accountLabel === "Kirish" ? "Tizimga kirish" : accountLabel}
                </span>
                <span className="mt-0.5 block text-[11px] text-[#00863e]">
                  {user?.role === "OWNER" || user?.role === "ADMIN"
                    ? "Kompaniya kabineti"
                    : user
                      ? "Shaxsiy kabinet"
                      : "Tizimga kiring"}
                </span>
              </span>

              <RightOutlined className="text-xs text-[#8a9690] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        )}
      </nav>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Menyuni yopish"
          className="fixed inset-0 z-40 bg-[#10251a]/25 backdrop-blur-[2px] xl:hidden"
          onClick={closeMobile}
        />
      )}

      <BookingAuthDialog
        open={bookingPrompt}
        onCancel={() => setBookingPrompt(false)}
      />
    </>
  );
}
