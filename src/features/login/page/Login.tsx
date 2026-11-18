"use client";

import UseMeContext, {
  UserContext,
  useUser,
} from "@/src/constants/UseMeContext";
import { Button, Form, Input, message } from "antd";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building,
  Car,
  Hash,
  Headphones,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  UserCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CAR_IMAGE =
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop";

/* ---------- style tokens ---------- */

const inputClass =
  "h-[50px]! rounded-[13px]! border-[#e7ebf1]! bg-white! text-[14.5px]! text-[#0d1727]! shadow-none! transition-all duration-200 hover:border-[#cbd5e1]! focus:border-[#0d1727]! focus:shadow-[0_0_0_4px_rgba(13,23,39,0.06)]! short:lg:h-[52px]! lg:h-[54px]! [&_.ant-input]:text-[14.5px]! [&_.anticon]:text-slate-400! [&_input]:h-full! [&_input]:py-0! [&_input]:text-[14.5px]! [&_input]:placeholder:text-[#9aa5b5]!";

const buttonClass =
  "h-[52px]! w-full! rounded-[13px]! border-none! bg-[#0d1727]! text-[14.5px]! font-semibold! text-white! shadow-[0_16px_32px_-14px_rgba(13,23,39,0.65)]! transition-all duration-200 hover:bg-[#16243b]! hover:shadow-[0_20px_38px_-16px_rgba(13,23,39,0.75)]! active:translate-y-[1px]! short:lg:h-[52px]! lg:h-[54px]!";

const linkClass =
  "cursor-pointer font-semibold text-blue-400 underline-offset-4 transition-colors hover:text-blue-500";

const featureList = [
  { Icon: ShieldCheck, label: "Xavfsiz bron" },
  { Icon: Zap, label: "Tez xizmat" },
  { Icon: Headphones, label: "24/7 qo'llab-quvvatlash" },
];

function Divider() {
  return (
    <div className="my-5 flex items-center gap-3 short:my-3.5">
      <div className="h-px flex-1 bg-[#eef1f6]" />
      <span className="text-[11px] font-medium lowercase tracking-[0.09em] text-slate-400">
        yoki
      </span>
      <div className="h-px flex-1 bg-[#eef1f6]" />
    </div>
  );
}

function RememberRow() {
  return (
    <div className="mb-4 mt-3 flex items-center justify-end gap-3">
      <span className="cursor-pointer text-[12.5px] font-semibold text-blue-400 underline-offset-4 transition-colors hover:text-blue-600 hover:underline">
        Parolni unutdingizmi?
      </span>
    </div>
  );
}

export default function Login() {
  const [toggleRole, setToggleRole] = useState(false);
  const [renterRole, setRenterRole] = useState(false);
  const [ownerRole, setOwnerRole] = useState(false);
  const router = useRouter();
  const { user, setUser, registerUser, users } = useUser();

  const renterLoginFinish = (values: Record<string, unknown>) => {
    const foundUser = users.find(
      (item) =>
        item?.phone === values?.phone &&
        item.password === values.password &&
        item.role === "RENTER",
    );
    if (foundUser) {
      setUser(foundUser);
      router.push("/");
      return;
    } else {
      message.error("Telefon raqam yoki parol noto'g'ri");
    }
  };

  const renterRegistorFinish = (values: Record<string, unknown>) => {
    setRenterRole(false);
    const renterRegisterForm = {
      ...values,
      role: "RENTER",
    };
    registerUser(renterRegisterForm);
  };

  const ownerLoginFinish = (values: Record<string, unknown>) => {
    const foundUser = users.find(
      (item) =>
        item?.phone === values?.phone &&
        item.password === values.password &&
        item.role === "OWNER",
    );
    if (foundUser) {
      setUser(foundUser);
      router.push("/");
      return;
    } else {
      message.error("Telefon raqam yoki parol noto'g'ri");
    }
  };

  const ownerRegistorFinish = (values: Record<string, unknown>) => {
    setOwnerRole(false)
    console.log("ownerRegistorFinish", values);
    const ownerRegisterForm = {
      ...values,
      role: "OWNER",
    };
    registerUser(ownerRegisterForm);
  };

  const phoneRules = [
    { required: true, message: "Telefon raqamni kiriting!" },
    {
      pattern: /^\d{9}$/,
      message: "Telefon raqam 9 ta raqamdan iborat bo'lishi kerak!",
    },
  ];

  /* ---------- derived state (design only) ---------- */

  const isRegister = toggleRole ? ownerRole : renterRole;

  const switchMode = () => {
    if (toggleRole) setOwnerRole(!ownerRole);
    else setRenterRole(!renterRole);
  };

  const title = isRegister ? "Ro'yxatdan o'tish" : "Tizimga kirish";

  const subtitle = isRegister
    ? toggleRole
      ? "Kompaniyangizni ro'yxatdan o'tkazing va avtomobillarni boshqaring"
      : "Bir necha daqiqada hisob yarating va ijarani boshlang"
    : toggleRole
      ? "Kompaniya hisobingizga kiring va avtomobillarni boshqaring"
      : "Hisobingizga kiring va davom eting";

  /* ---------- style tokens ---------- */

  const phonePrefix = (
    <span className="mr-1 flex items-center gap-2">
      <Phone size={17} className="text-slate-400" />
      <span className="text-[13.5px] font-medium text-[#0d1727]">+998</span>
    </span>
  );

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#070d18] font-sans">
      {/* Ambient blurred backdrop */}
      <div
        className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-3xl"
        style={{ backgroundImage: `url('${CAR_IMAGE}')` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#050a12]/90 via-[#070d18]/80 to-[#0b1424]/92" />

      <div className="relative z-10 flex h-full w-full items-center justify-center p-0 sm:p-5 lg:p-7 short:sm:p-4 short:lg:p-4">
        <div className="grid h-full max-h-[860px] w-full max-w-[1360px] overflow-hidden bg-white shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)] sm:rounded-[26px] lg:grid-cols-[1.15fr_0.85fr] lg:rounded-[30px]">
          {/* ================= LEFT BANNER ================= */}
          <div className="relative hidden overflow-hidden lg:flex lg:flex-col">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${CAR_IMAGE}')` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,11,20,0.96)_0%,rgba(5,11,20,0.9)_30%,rgba(5,11,20,0.6)_55%,rgba(5,11,20,0.2)_80%,rgba(5,11,20,0.35)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,20,0.5)_0%,transparent_30%,transparent_55%,rgba(5,11,20,0.8)_100%)]" />

            <div className="relative z-10 flex h-full flex-col p-10 xl:p-14">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-2.5 text-white transition-opacity duration-200 hover:opacity-80"
              >
                <Car size={36} strokeWidth={1.4} />
                <span className="text-[23px] font-bold tracking-[-0.02em]">
                  RentCar
                </span>
              </Link>

              {/* Hero copy */}
              <div className="mt-[14%] max-w-[430px]">
                <h1 className="text-[46px] font-bold leading-[1.03] tracking-[-0.03em] text-white xl:text-[62px]">
                  Avto Bozor
                </h1>

                <p className="mt-5 max-w-[380px] text-[16px] leading-[1.65] text-white/80 xl:text-[18px]">
                  Orzudagi mashinani ijaraga oling va barcha yo&apos;llarda
                  erkin harakat qiling.
                </p>

                <div className="mt-10 space-y-4">
                  {featureList.map(({ Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3.5 text-white/90"
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.7}
                        className="shrink-0 text-white/75"
                      />
                      <span className="text-[14.5px] font-medium tracking-[-0.01em] xl:text-[15.5px]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-white px-0 [scrollbar-width:none] sm:px-10 lg:px-12 xl:px-14 [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-5 py-5 sm:px-0 sm:py-8 short:py-5">
              {/* Top bar */}
              <div className="flex items-center justify-between gap-3">
                <Link
                  href="/"
                  className="group hidden items-center gap-1.5 whitespace-nowrap text-[12px] font-medium text-slate-400 transition-colors hover:text-[#0d1727] lg:inline-flex"
                >
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-200 font-bold text-[40px] group-hover:-translate-x-0.5"
                  />
                  Saytga qaytish
                </Link>

                {/* Mobile brand */}
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#0d1727] lg:hidden"
                >
                  <Car size={24} strokeWidth={1.5} />
                  <span className="text-[18px] font-bold tracking-[-0.02em]">
                    RentCar
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={switchMode}
                  className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] text-slate-500 transition-colors hover:text-[#0d1727] sm:text-[12.5px]"
                >
                  <span className="hidden sm:inline">
                    {isRegister ? "Hisobingiz bormi?" : "Hisobingiz yo'qmi?"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0d1727]">
                    {isRegister ? "Kirish" : "Ro'yxatdan o'tish"}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </button>
              </div>

              {/* Heading */}
              <div className="mt-5 sm:mt-6 short:mt-4">
                <h2 className="text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-[#0d1727] sm:text-[34px] short:text-[30px]">
                  {title}
                </h2>
                <p className="mt-1.5 max-w-[380px] text-[13px] leading-relaxed text-slate-500 sm:text-[14px]">
                  {subtitle}
                </p>
              </div>

              {/* Role tabs */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 short:mt-4">
                <button
                  type="button"
                  onClick={() => setToggleRole(false)}
                  className={`flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[13px] px-3 text-[12.5px] font-semibold transition-all duration-200 sm:h-[56px] short:sm:h-[52px] sm:text-[13px] ${
                    !toggleRole
                      ? "bg-[#0d1727] text-white shadow-[0_14px_28px_-14px_rgba(13,23,39,0.85)]"
                      : "border border-[#e7ebf1] bg-white text-[#0d1727] hover:border-[#cbd5e1] hover:bg-[#f8fafc]"
                  }`}
                >
                  <User size={18} strokeWidth={1.8} className="shrink-0" />
                  Ijaraga oluvchi
                </button>

                <button
                  type="button"
                  onClick={() => setToggleRole(true)}
                  className={`flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[13px] px-3 text-left text-[12.5px] font-semibold leading-[1.2] transition-all duration-200 sm:h-[56px] short:sm:h-[52px] sm:text-[13px] ${
                    toggleRole
                      ? "bg-[#0d1727] text-white shadow-[0_14px_28px_-14px_rgba(13,23,39,0.85)]"
                      : "border border-[#e7ebf1] bg-white text-[#0d1727] hover:border-[#cbd5e1] hover:bg-[#f8fafc]"
                  }`}
                >
                  <Briefcase size={18} strokeWidth={1.8} className="shrink-0" />
                  <span className="cursor-pointer">
                    Kompaniya /<br />
                    Mashina egasi
                  </span>
                </button>
              </div>

              {/* ---------------- Forms ---------------- */}
              <div className="mt-5 short:mt-4 sm:mt-6">
                {!toggleRole ? (
                  !renterRole ? (
                    /* RENTER LOGIN */
                    <Form
                      layout="vertical"
                      onFinish={renterLoginFinish}
                      requiredMark={false}
                      className="auth-form"
                    >
                      <Form.Item
                        name="phone"
                        rules={phoneRules}
                        className="!mb-3.5"
                      >
                        <Input
                          className={inputClass}
                          type="tel"
                          inputMode="numeric"
                          maxLength={9}
                          prefix={phonePrefix}
                          placeholder="90 123 45 67"
                        />
                      </Form.Item>

                      <Form.Item name="password" className="!mb-0">
                        <Input.Password
                          className={inputClass}
                          prefix={<Lock size={17} className="text-slate-400" />}
                          placeholder="Parol"
                        />
                      </Form.Item>

                      <RememberRow />

                      <Button htmlType="submit" className={buttonClass}>
                        <span className="flex items-center justify-center gap-2">
                          Kirish
                          <ArrowRight size={18} strokeWidth={2} />
                        </span>
                      </Button>

                      <Divider />

                      <p className="mt-4 text-center text-[12.5px] text-slate-500 short:mt-3">
                        Hisobingiz yo&apos;qmi?{" "}
                        <span
                          onClick={() => setRenterRole(true)}
                          className={linkClass}
                        >
                          Ro&apos;yxatdan o&apos;tish
                        </span>
                      </p>
                    </Form>
                  ) : (
                    /* RENTER REGISTER */
                    <Form
                      layout="vertical"
                      onFinish={renterRegistorFinish}
                      requiredMark={false}
                      className="auth-form"
                    >
                      <div className="grid grid-cols-1 gap-x-3.5 sm:grid-cols-2">
                        <Form.Item name="fullName" className="!mb-3.5">
                          <Input
                            className={inputClass}
                            prefix={
                              <User size={17} className="text-slate-400" />
                            }
                            placeholder="Ismingiz"
                          />
                        </Form.Item>

                        <Form.Item name="email" className="!mb-3.5">
                          <Input
                            className={inputClass}
                            prefix={
                              <Mail size={17} className="text-slate-400" />
                            }
                            placeholder="Email manzili"
                          />
                        </Form.Item>

                        <Form.Item
                          name="phone"
                          rules={phoneRules}
                          className="!mb-3.5"
                        >
                          <Input
                            className={inputClass}
                            type="tel"
                            inputMode="numeric"
                            maxLength={9}
                            prefix={phonePrefix}
                            placeholder="90 123 45 67"
                          />
                        </Form.Item>

                        <Form.Item name="password" className="!mb-3.5">
                          <Input.Password
                            className={inputClass}
                            prefix={
                              <Lock size={17} className="text-slate-400" />
                            }
                            placeholder="Parol yarating"
                          />
                        </Form.Item>
                      </div>

                      <Button
                        htmlType="submit"
                        className={`${buttonClass} !mt-1`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          Ro&apos;yxatdan o&apos;tish
                          <ArrowRight size={18} strokeWidth={2} />
                        </span>
                      </Button>

                      <p className="mt-4 text-center text-[12.5px] text-slate-500 short:mt-3">
                        Hisobingiz bormi?{" "}
                        <span
                          onClick={() => setRenterRole(false)}
                          className={linkClass}
                        >
                          Kirish
                        </span>
                      </p>
                    </Form>
                  )
                ) : !ownerRole ? (
                  /* COMPANY LOGIN */
                  <Form
                    layout="vertical"
                    onFinish={ownerLoginFinish}
                    requiredMark={false}
                    className="auth-form"
                  >
                    <Form.Item
                      name="phone"
                      rules={phoneRules}
                      className="!mb-3.5"
                    >
                      <Input
                        className={inputClass}
                        type="tel"
                        inputMode="numeric"
                        maxLength={9}
                        prefix={phonePrefix}
                        placeholder="90 123 45 67"
                      />
                    </Form.Item>

                    <Form.Item name="password" className="!mb-0">
                      <Input.Password
                        className={inputClass}
                        prefix={<Lock size={17} className="text-slate-400" />}
                        placeholder="Parol"
                      />
                    </Form.Item>

                    <RememberRow />

                    <Button htmlType="submit" className={buttonClass}>
                      <span className="flex items-center justify-center gap-2">
                        Kirish
                        <ArrowRight size={18} strokeWidth={2} />
                      </span>
                    </Button>

                    <Divider />

                    <p className="mt-4 text-center text-[12.5px] text-slate-500 short:mt-3">
                      Hisobingiz yo&apos;qmi?{" "}
                      <span
                        onClick={() => setOwnerRole(true)}
                        className={linkClass}
                      >
                        Ro&apos;yxatdan o&apos;tish
                      </span>
                    </p>
                  </Form>
                ) : (
                  /* COMPANY REGISTER */
                  <Form
                    layout="vertical"
                    onFinish={ownerRegistorFinish}
                    requiredMark={false}
                    className="auth-form"
                  >
                    <div className="grid grid-cols-1 gap-x-3.5 sm:grid-cols-2">
                      <Form.Item name="companyName" className="!mb-3.5">
                        <Input
                          className={inputClass}
                          prefix={
                            <Building size={17} className="text-slate-400" />
                          }
                          placeholder="Kompaniya nomi"
                        />
                      </Form.Item>

                      <Form.Item name="stir" className="!mb-3.5">
                        <Input
                          className={inputClass}
                          prefix={<Hash size={17} className="text-slate-400" />}
                          placeholder="STIR raqami"
                        />
                      </Form.Item>

                      <Form.Item
                        name="fullName"
                        className="!mb-3.5 sm:col-span-2"
                      >
                        <Input
                          className={inputClass}
                          prefix={
                            <UserCheck size={17} className="text-slate-400" />
                          }
                          placeholder="Mas'ul shaxs F.I.Sh."
                        />
                      </Form.Item>

                      <Form.Item
                        name="phone"
                        rules={phoneRules}
                        className="!mb-3.5"
                      >
                        <Input
                          className={inputClass}
                          type="tel"
                          inputMode="numeric"
                          maxLength={9}
                          prefix={phonePrefix}
                          placeholder="90 123 45 67"
                        />
                      </Form.Item>

                      <Form.Item name="email" className="!mb-3.5">
                        <Input
                          className={inputClass}
                          prefix={<Mail size={17} className="text-slate-400" />}
                          placeholder="Email manzili"
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        className="!mb-3.5 sm:col-span-2"
                      >
                        <Input.Password
                          className={inputClass}
                          prefix={<Lock size={17} className="text-slate-400" />}
                          placeholder="Parol yarating"
                        />
                      </Form.Item>
                    </div>

                    <Button
                      htmlType="submit"
                      className={`${buttonClass} !mt-1`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Ro&apos;yxatdan o&apos;tish
                        <ArrowRight size={18} strokeWidth={2} />
                      </span>
                    </Button>

                    <p className="mt-4 text-center text-[12.5px] text-slate-500 short:mt-3">
                      Hisobingiz bormi?{" "}
                      <span
                        onClick={() => setOwnerRole(false)}
                        className={linkClass}
                      >
                        Kirish
                      </span>
                    </p>
                  </Form>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 border-t border-[#f1f4f8] pt-4 text-center short:hidden lg:mt-6">
                <p className="text-[11px] text-slate-400">
                  © 2026 RentCar. Barcha huquqlar himoyalangan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
