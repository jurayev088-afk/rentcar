"use client";

import RentoLogo from "@/src/components/RentoLogo";
import { useUser } from "@/src/constants/UseMeContext";
import { useLogin } from "@/src/hooks/use-login";
import { useRegister } from "@/src/hooks/use-register";
import { Button, Form, Input } from "antd";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CarFront,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Credentials = { phone: string; password: string };
type Registration = {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  companyName?: string;
  stir?: string;
};

const phoneRules = [
  { required: true, message: "Telefon raqamingizni kiriting." },
  {
    pattern: /^\d{9}$/,
    message: "Telefon raqami 9 ta raqamdan iborat bo‘lishi kerak.",
  },
];

const copy = {
  USER: {
    eyebrow: "Mijoz kabineti",
    title: "Avtomobil ijara\nqidiruvingiz shu yerda",
    description:
      "Minglab mashinalar orasidan o‘zingizga mosini tanlang, bron qiling va ijarani profilingizdan kuzating.",
    welcome: "Xush kelibsiz, Mijoz!",
    welcomeSub: "Bron va sevimlilar uchun hisobingizga kiring",
    registerHint: "Ijaraga moshina olish uchun tezkor ro‘yxatdan o‘ting",
    shield: "Mijoz uchun himoyalangan kirish",
  },
  COMPANY: {
    eyebrow: "Kompaniya kabineti",
    title: "Avtoparkingiz\nboshqaruvi shu yerda",
    description:
      "Mashinalarni joylashtiring, bronlarni tasdiqlang va kompaniya statistikasini yagona paneldan nazorat qiling.",
    welcome: "Xush kelibsiz, kompaniya!",
    welcomeSub: "Kompaniya kabinetiga kirish uchun ma’lumotlaringizni kiriting",
    registerHint: "Kompaniyani RENTO’da ochish uchun ro‘yxatdan o‘ting",
    shield: "Kompaniya uchun himoyalangan kirish",
  },
} as const;

export default function Login({
  destination,
  initialRegister = false,
}: {
  destination: string;
  initialRegister?: boolean;
}) {
  const router = useRouter();
  const { user, loading } = useUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const [role, setRole] = useState<"USER" | "COMPANY">("USER");
  const [isRegister, setIsRegister] = useState(initialRegister);
  const text = copy[role];

  const afterAuthPath = useMemo(() => {
    if (destination && destination !== "/") return destination;
    return "/";
  }, [destination]);

  useEffect(() => {
    if (!user) return;
    router.replace(afterAuthPath);
  }, [user, router, afterAuthPath]);

  async function signIn(values: Credentials) {
    await loginMutation.mutateAsync(values);
    router.replace(afterAuthPath);
  }

  async function signUp(values: Registration) {
    await registerMutation.mutateAsync({
      ...values,
      role,
      companyName: role === "COMPANY" ? values.companyName : undefined,
    });
    router.replace(afterAuthPath);
  }

  const busy =
    loading || loginMutation.isPending || registerMutation.isPending;

  if (user) return null;

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="relative flex min-h-[280px] flex-1 flex-col justify-between overflow-hidden bg-[linear-gradient(160deg,#0f2a1c_0%,#10251a_48%,#165a36_100%)] px-8 py-8 sm:px-12 lg:min-h-screen lg:px-16 lg:py-12">
        <div className="pointer-events-none absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-[#00863e]/25 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-[#00863e]/15 blur-[100px]" />

        <div className="relative z-10">
          <Link href="/">
            <RentoLogo className="w-36 brightness-0 invert" />
          </Link>
        </div>

        <div className="relative z-10 my-10 max-w-[550px] lg:my-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-white/90 backdrop-blur-sm">
            {role === "COMPANY" ? (
              <Building2 size={14} />
            ) : (
              <CarFront size={14} />
            )}
            {text.eyebrow}
          </div>

          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-sm">
            {role === "COMPANY" ? (
              <Building2 size={27} />
            ) : (
              <CarFront size={27} />
            )}
          </div>

          <h1 className="whitespace-pre-line text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {text.title}
          </h1>

          <p className="mt-6 max-w-[470px] text-sm leading-7 text-[#9aa59e] sm:text-base">
            {text.description}
          </p>
        </div>

        <div className="relative z-10 text-xs text-[#8d9892] sm:text-sm">
          Rento · 2026
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#f4f6f5] px-4 py-10 sm:px-8">
        <div className="w-full max-w-[440px]">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#6d7a73] no-underline hover:text-[#00863e] lg:hidden"
          >
            <ArrowLeft size={16} /> Bosh sahifa
          </Link>

          <div className="rounded-[28px] border border-white bg-white p-6 shadow-[0_20px_50px_rgba(16,37,26,0.08)] sm:p-8">
            <h2 className="text-2xl font-bold text-[#1f2d25]">{text.welcome}</h2>
            <p className="mt-2 text-sm text-[#6d7a73]">
              {isRegister ? text.registerHint : text.welcomeSub}
            </p>

            <div
              className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-[#f4f6f5] p-1.5"
              role="group"
              aria-label="Hisob turi"
            >
              {(
                [
                  ["USER", "Mijoz", CarFront],
                  ["COMPANY", "Kompaniya", Building2],
                ] as const
              ).map(([value, label, Icon]) => {
                const active = role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRole(value)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
                      active
                        ? "bg-white text-[#00863e] shadow-sm"
                        : "text-[#6d7a73] hover:text-[#1f2d25]"
                    }`}
                  >
                    <Icon size={16} aria-hidden />
                    {label}
                  </button>
                );
              })}
            </div>

            <Form
              key={`${role}-${isRegister ? "reg" : "login"}`}
              layout="vertical"
              requiredMark={false}
              onFinish={isRegister ? signUp : signIn}
              className="mt-5"
            >
              {isRegister && role === "COMPANY" && (
                <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
                  <Form.Item
                    name="companyName"
                    label="Kompaniya nomi"
                    rules={[
                      {
                        required: true,
                        message: "Kompaniya nomini kiriting.",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      autoComplete="organization"
                      placeholder="Kompaniya nomi"
                    />
                  </Form.Item>
                  <Form.Item name="stir" label="STIR">
                    <Input
                      size="large"
                      inputMode="numeric"
                      placeholder="STIR raqami"
                    />
                  </Form.Item>
                </div>
              )}

              {isRegister && (
                <Form.Item
                  name="fullName"
                  label="Ism va familiya"
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Ism va familiyangizni kiriting.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    autoComplete="name"
                    placeholder="Ism va familiyangiz"
                  />
                </Form.Item>
              )}

              <Form.Item name="phone" label="Telefon raqami" rules={phoneRules}>
                <Input
                  size="large"
                  prefix="+998"
                  type="tel"
                  inputMode="numeric"
                  autoComplete={isRegister ? "tel-national" : "username"}
                  maxLength={9}
                  placeholder="90 123 45 67"
                />
              </Form.Item>

              {isRegister && (
                <Form.Item
                  name="email"
                  label="Elektron pochta"
                  rules={[
                    {
                      type: "email",
                      message: "Elektron pochta manzilini tekshiring.",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    type="email"
                    autoComplete="email"
                    placeholder="ism@example.uz"
                  />
                </Form.Item>
              )}

              <Form.Item
                name="password"
                label="Parol"
                rules={[
                  { required: true, message: "Parolni kiriting." },
                  {
                    min: 6,
                    message: "Parol kamida 6 ta belgidan iborat bo‘lsin.",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  placeholder={
                    isRegister ? "Parol yarating" : "Parolingizni kiriting"
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                disabled={busy}
                loading={busy}
                block
                size="large"
                className="!mt-1 !h-12 !rounded-xl !border-0 !bg-[#00863e] !font-bold hover:!bg-[#006f35]"
              >
                {isRegister ? "Hisob yaratish" : "Tizimga kirish"}{" "}
                <ArrowRight size={17} aria-hidden />
              </Button>
            </Form>

            <p className="mt-5 text-center text-sm text-[#6d7a73]">
              {isRegister ? "Hisobingiz bormi?" : "Hisobingiz yo‘qmi?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegister((v) => !v)}
                className="font-bold text-[#00863e] hover:underline"
              >
                {isRegister ? "Kirish" : "Ro‘yxatdan o‘tish"}
              </button>
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-[#00863e]">
              <ShieldCheck size={15} />
              {text.shield}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[#8d9892]">
            Rento. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </div>
  );
}
