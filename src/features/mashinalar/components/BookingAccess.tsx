"use client";

import { useUser } from "@/src/constants/UseMeContext";
import { bookingAuthHref } from "@/src/features/login/authDestination";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { Button } from "antd";

export default function BookingAccess({
  carId,
  children,
}: {
  carId: string;
  children: ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading || user) return;
    // Birinchi bron: to‘g‘ridan-to‘g‘ri mijoz register
    router.replace(bookingAuthHref("register", carId));
  }, [loading, user, carId, router]);

  if (loading)
    return (
      <p className="px-5 pt-28" role="status">
        Yuklanmoqda…
      </p>
    );

  if (!user) {
    return (
      <p className="px-5 pt-28 text-center text-sm text-[#6d7a73]" role="status">
        Ro‘yxatdan o‘tish sahifasiga yo‘naltirilmoqda…
      </p>
    );
  }

  if (user.role === "OWNER") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#1f2d25]">
          Kompaniya hisobi bilan bron qilib bo‘lmaydi
        </h1>
        <p className="mt-3 text-sm text-[#6d7a73]">
          Bron qilish uchun ijarachi (foydalanuvchi) hisobidan kiring.
        </p>
        <Button
          type="primary"
          className="!mt-6 !rounded-full !bg-[#00863e]"
          onClick={() => router.replace(`/cars/${encodeURIComponent(carId)}`)}
        >
          Orqaga
        </Button>
      </div>
    );
  }

  return children;
}
