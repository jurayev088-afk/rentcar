"use client";

import { useUser } from "@/src/constants/UseMeContext";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { Button } from "antd";
import BookingAuthDialog from "./BookingAuthDialog";

export default function BookingAccess({
  carId,
  children,
}: {
  carId: string;
  children: ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading)
    return (
      <p className="px-5 pt-28" role="status">
        Yuklanmoqda…
      </p>
    );

  if (!user) {
    return (
      <BookingAuthDialog
        carId={carId}
        open
        onCancel={() => router.replace(`/cars/${encodeURIComponent(carId)}`)}
      />
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
