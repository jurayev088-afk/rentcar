"use client";

import { bookingAuthHref } from "@/src/features/login/authDestination";
import { Modal } from "antd";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookingAuthDialog({
  carId,
  open,
  onCancel,
}: {
  carId?: string;
  open: boolean;
  onCancel: () => void;
}) {
  const router = useRouter();
  const needsAccount = carId === undefined;

  return (
    <Modal
      open={open}
      centered
      width={440}
      title={needsAccount ? "Bron qilish uchun hisob kerak" : "Avval hisobingizga kiring"}
      okText={needsAccount ? "Ro‘yxatdan o‘tish" : "Kirish"}
      cancelText="Bekor qilish"
      onOk={() => router.push(bookingAuthHref(needsAccount ? "register" : "login", carId))}
      onCancel={onCancel}
    >
      <div className="mt-4 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-800">
          <LockKeyhole size={19} aria-hidden="true" />
        </span>
        <div className="text-sm leading-6 text-slate-600">
          <p className="m-0">
            {needsAccount
              ? "Mashinani bron qilish uchun avval RENTO hisobini yarating."
              : "Mashinani bron qilish uchun avval RENTO hisobingizga kiring."}
          </p>
          {needsAccount && (
            <Link href={bookingAuthHref("login")} className="mt-2 inline-block font-semibold text-emerald-700 underline">
              Hisobingiz bormi? Kirish
            </Link>
          )}
        </div>
      </div>
    </Modal>
  );
}
