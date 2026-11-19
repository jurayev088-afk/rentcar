"use client";

import { useUser } from "@/src/constants/UseMeContext";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";
import BookingAuthDialog from "./BookingAuthDialog";

export default function BookingAccess({ carId, children }: { carId: string; children: ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) return <p className="px-5 pt-28" role="status">Yuklanmoqda…</p>;
  if (user) return children;

  return (
    <BookingAuthDialog
      carId={carId}
      open
      onCancel={() => router.replace(`/cars/${encodeURIComponent(carId)}`)}
    />
  );
}
