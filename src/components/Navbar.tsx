
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import NavbarSearch from "./NavbarSearch";
import {
  CarOutlined,
  HeartFilled,
  PlusOutlined,
  MenuOutlined,
  CloseOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useUser } from "../constants/UseMeContext";
import { UseWishlist } from "../constants/UseWishlist";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  // const { wishlist } = UseWishlist();

  const pagesLink = [
    {
      id: 1,
      page: "/cars",
      label: "Mashinalar",
      icon: <CarOutlined />,
    },
  ];

  const isActive = (page: string) =>
    pathname === page || pathname.startsWith(`${page}/`);

  const profilePath =
    user?.role === "RENTER"
      ? "/profile/renter/profile"
      : "/profile/owner/profile";

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 shadow-[0_4px_25px_rgba(11,31,51,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1F33] text-white shadow-lg shadow-[#0B1F33]/15 transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <CarOutlined className="text-xl" />
          </div>

          <div className="leading-tight">
            <h1 className="text-[21px] font-extrabold tracking-tight text-[#0B1F33]">
              Avto<span className="text-[#D18B35]">Bozor</span>
            </h1>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[2.5px] text-slate-400">
              Automotive marketplace
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 xl:flex">
          {pagesLink.map((item) => (
            <Link
              key={item.id}
              href={item.page}
              className={`relative flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                isActive(item.page)
                  ? "bg-[#0B1F33] text-white shadow-md shadow-[#0B1F33]/15"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#0B1F33]"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="hidden min-w-[180px] max-w-[340px] flex-1 lg:block">
          <NavbarSearch />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Wishlist icon only */}
          <Link
            href="/sevimlilar"
            aria-label="Sevimlilar"
            className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200 ${
              isActive("/sevimlilar")
                ? "border-red-100 bg-red-50 text-red-500"
                : "border-slate-200 bg-white text-slate-600 hover:border-red-100 hover:bg-red-50 hover:text-red-500"
            }`}
          >
            <HeartFilled className="text-[19px]" />

            {/* {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[10px] font-bold text-white">
                {wishlist.length > 99 ? "99+" : wishlist.length}
              </span>
            )} */}
          </Link>

          {/* Login / Profile */}
          {user?.fullName ? (
            <button
              onClick={() => router.push(profilePath)}
              className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white py-2 pl-2 pr-3 transition hover:border-slate-300 hover:bg-slate-50 sm:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1F33] text-white">
                <UserOutlined />
              </div>

              <div className="text-left">
                <p className="max-w-[110px] truncate text-sm font-bold text-[#0B1F33]">
                  {user.fullName}
                </p>
                <p className="text-[10px] text-slate-400">
                  Shaxsiy kabinet
                </p>
              </div>

              <RightOutlined className="ml-1 text-[10px] text-slate-400" />
            </button>
          ) : (
            <Button
              type="primary"
              onClick={() => router.push("/login")}
              className="!hidden !h-11 !rounded-xl !bg-[#0B1F33] !px-6 !font-semibold sm:!inline-flex"
            >
              Kirish
            </Button>
          )}

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-[#0B1F33] transition hover:bg-slate-50 xl:hidden"
            aria-label="Menyuni ochish"
          >
            {mobileOpen ? (
              <CloseOutlined className="text-lg" />
            ) : (
              <MenuOutlined className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-5 shadow-xl xl:hidden">
          <div className="mb-5">
            <NavbarSearch />
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/cars"
              onClick={closeMobile}
              className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold ${
                isActive("/cars")
                  ? "bg-[#0B1F33] text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              <CarOutlined className="text-lg" />
              Mashinalar
            </Link>

            <Link
              href="/sevimlilar"
              onClick={closeMobile}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold ${
                isActive("/sevimlilar")
                  ? "bg-red-50 text-red-500"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              <span className="flex items-center gap-3">
                <HeartFilled className="text-lg" />
                Sevimlilar
              </span>
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">
                {/* {wishlist.length} */}
              </span>
            </Link>

            <Link
              href="/ijara"
              onClick={closeMobile}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-4 py-4 font-semibold text-white transition hover:bg-[#193b5c]"
            >
              <PlusOutlined />
              Moshina joylash
            </Link>

            {user?.fullName ? (
              <button
                onClick={() => {
                  closeMobile();
                  router.push(profilePath);
                }}
                className="mt-1 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-left font-semibold text-[#0B1F33]"
              >
                <UserOutlined />
                Shaxsiy kabinet
              </button>
            ) : (
              <button
                onClick={() => {
                  closeMobile();
                  router.push("/login");
                }}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 font-semibold text-[#0B1F33]"
              >
                <UserOutlined />
                Tizimga kirish
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
