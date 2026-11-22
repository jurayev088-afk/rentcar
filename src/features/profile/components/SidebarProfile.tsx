"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { renterSidebar } from "../config/renterSidebar";
import { ownerSidebar } from "../config/ownerSidebar";
import { useUser } from "@/src/constants/UseMeContext";

export default function SidebarProfile() {
  const pathname = usePathname();
  const { user, logOut } = useUser();
  const [open, setOpen] = useState(false);

  const menu = user?.role === "RENTER" ? renterSidebar : ownerSidebar;

  const fullName = user?.fullName?.trim() || "Foydalanuvchi";
  const initial = Array.from(fullName)[0]?.toLocaleUpperCase() || "U";
  const roleLabel =
    user?.role === "OWNER"
      ? "Avtomobil egasi"
      : user?.role === "RENTER"
        ? "Ijaraga oluvchi"
        : "Profil";

  const isActive = (href: string) =>
    href === "/sevimlilar"
      ? pathname === href || pathname.startsWith(`${href}/`)
      : pathname === href || pathname.startsWith(`${href}/`);

  const activeItem =
    menu.find((item) => item.title !== "Chiqish" && isActive(item.href)) ||
    menu[0];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const NavContent = (
    <>
      <div className="mb-5 rounded-2xl border border-[#dce8e0] bg-[linear-gradient(145deg,#0f2a1c,#165a36_55%,#00863e)] p-4 text-white shadow-[0_10px_24px_rgba(0,134,62,0.18)]">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold backdrop-blur-sm">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{fullName}</p>
            <p className="mt-0.5 text-xs text-white/75">{roleLabel}</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const isLogout = item.title === "Chiqish";

          if (isLogout) {
            return (
              <Link
                key={`${item.title}-${item.href}`}
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  logOut();
                }}
                className="mt-2 flex items-center gap-3 rounded-2xl border border-transparent px-2! py-1.5! text-[15px] font-medium text-[#8b4b4b] transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Icon size={18} />
                </span>
                {item.title}
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-2 py-1.5 text-[15px] font-medium transition ${
                active
                  ? "bg-[#eaf6ef] text-[#00863e] shadow-[inset_0_0_0_1px_rgba(0,134,62,0.12)]"
                  : "text-[#3f4b44] hover:bg-[#f3f6f4] hover:text-[#00863e]"
              }`}
            >
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                  active
                    ? "bg-[#00863e] text-white shadow-[0_6px_14px_rgba(0,134,62,0.25)]"
                    : "bg-[#eef2f0] text-[#5a675f]"
                }`}
              >
                <Icon size={18} />
              </span>
              {item.title}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile top bar + toggle */}
      <div className="sticky top-[68px] z-30 w-full px-3 pt-3 sm:px-5 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#e5e9e7] bg-white px-3.5 py-3 text-left shadow-[0_8px_20px_rgba(16,37,26,0.06)]"
          aria-label="Profil menyusini ochish"
          aria-expanded={open}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
              <Menu size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#87938b]">
                Profil menyusi
              </p>
              <p className="truncate text-sm font-bold text-[#1f2d25]">
                {activeItem?.title || roleLabel}
              </p>
            </div>
          </div>

          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f6faf7] text-[#00863e]">
            <ChevronDown size={18} />
          </span>
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed top-[80px] bottom-0 left-0 z-20 hidden w-72 shrink-0 overflow-y-auto border-r border-[#e6ebe8] bg-white/95 p-4 backdrop-blur-xl lg:block">
        {NavContent}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Menyuni yopish"
          className={`absolute inset-0 bg-[#10251a]/40 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute inset-y-0 left-0 flex w-[min(320px,88vw)] flex-col bg-white shadow-[0_20px_50px_rgba(16,37,26,0.22)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#eef2f0] px-4 py-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1.2px] text-[#87938b]">
                {roleLabel}
              </p>
              <p className="text-sm font-bold text-[#1f2d25]">Kabinet menyusi</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e9e7] bg-[#f6faf7] text-[#3f4b44]"
              aria-label="Yopish"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">{NavContent}</div>
        </aside>
      </div>
    </>
  );
}
