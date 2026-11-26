"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type MouseEvent } from "react";
import { Bell, CarFront, Heart, Home, UserRound } from "lucide-react";
import { useUser } from "../constants/UseMeContext";
import { useNotifications } from "../hooks/use-notifications";

function scrollToPageTop(smooth = true) {
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { data: notifications } = useNotifications(Boolean(user));
  const unreadCount = notifications?.unreadCount ?? 0;

  useEffect(() => {
    document.body.classList.add("has-mobile-tabbar");
    return () => document.body.classList.remove("has-mobile-tabbar");
  }, []);

  const profilePath =
    user?.role === "OWNER" || user?.role === "ADMIN"
      ? "/profile/owner/profile"
      : "/profile/renter/profile";

  const xabarlarPath =
    user?.role === "OWNER" || user?.role === "ADMIN"
      ? "/profile/owner/xabarlar"
      : "/profile/renter/xabarlar";

  const items = [
    { href: "/", label: "Asosiy", icon: Home, match: (p: string) => p === "/" },
    {
      href: "/sevimlilar",
      label: "Saralangan",
      icon: Heart,
      match: (p: string) => p.startsWith("/sevimlilar"),
    },
    {
      href: "/cars",
      label: "Moshinalar",
      icon: CarFront,
      match: (p: string) =>
        p.startsWith("/cars") || p.startsWith("/top-mashinalar"),
      center: true,
    },
    {
      href: user ? xabarlarPath : "/register?role=USER",
      label: "Xabarlar",
      icon: Bell,
      match: (p: string) => p.includes("/xabarlar"),
      badge: unreadCount,
    },
    {
      href: user
        ? profilePath
        : "/register?role=USER&next=%2Fprofile%2Frenter%2Fprofile",
      label: "Profil",
      icon: UserRound,
      match: (p: string) => p.startsWith("/profile") && !p.includes("/xabarlar"),
    },
  ];

  const onAsosiyClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (pathname === "/") {
      // Allaqachon bosh sahifada — header / eng yuqoriga
      scrollToPageTop(true);
      return;
    }
    router.push("/");
    // Boshqa sahifadan kelganda ham tepaga chiqsin
    requestAnimationFrame(() => scrollToPageTop(false));
    setTimeout(() => scrollToPageTop(false), 80);
    setTimeout(() => scrollToPageTop(false), 250);
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-[#e8ecea] bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Mobil navigatsiya"
    >
      <div className="mx-auto grid h-[64px] max-w-lg grid-cols-5 items-center px-1">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          const isAsosiy = item.label === "Asosiy";
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={isAsosiy ? onAsosiyClick : undefined}
              className={`relative flex flex-col items-center justify-center gap-0.5 no-underline transition ${
                active ? "text-[#00863e]" : "text-[#7a8780]"
              }`}
            >
              <span
                className={`relative inline-flex items-center justify-center ${
                  item.center
                    ? `h-11 w-11 rounded-full ${
                        active
                          ? "bg-[#00863e] text-white shadow-[0_8px_18px_rgba(0,134,62,0.28)]"
                          : "bg-[#eaf6ef] text-[#00863e]"
                      }`
                    : ""
                }`}
              >
                <Icon
                  size={item.center ? 20 : 21}
                  strokeWidth={active ? 2.3 : 1.9}
                  className={
                    !item.center && active && item.label === "Saralangan"
                      ? "fill-current"
                      : ""
                  }
                />
                {!!item.badge && item.badge > 0 && (
                  <span className="absolute -right-1.5 -top-1 h-2 w-2 rounded-full bg-[#e11d48] ring-2 ring-white" />
                )}
              </span>
              <span
                className={`text-[10px] font-semibold ${
                  active ? "text-[#00863e]" : "text-[#8a9690]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
