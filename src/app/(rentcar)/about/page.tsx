
"use client";

import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Search,
  ShieldCheck,
  CalendarCheck,
  Users,
  CheckCircle2,
  MapPin,
  Handshake,
} from "lucide-react";

const services = [
  {
    icon: Search,
    number: "01",
    title: "Avtomobil topish",
    description:
      "Turli rusumdagi avtomobillarni ko‘rib chiqing, narxi va xususiyatlarini solishtiring hamda o‘zingizga mosini tanlang.",
  },
  {
    icon: CarFront,
    number: "02",
    title: "E'lon joylashtirish",
    description:
      "Avtomobilingiz haqida ma'lumot va rasmlarni joylashtiring. E'loningiz orqali xaridorlar bilan bog‘laning.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Avtomobil ijarasi",
    description:
      "Ijaraga avtomobil izlang yoki o‘z avtomobilingizni ijaraga berish uchun e'lon joylashtiring.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Qulay boshqaruv",
    description:
      "Shaxsiy kabinetingiz orqali e'lonlaringiz, bronlaringiz va avtomobillaringizni bir joyda boshqaring.",
  },
];

const benefits = [
  "Qulay va tushunarli foydalanish",
  "Avtomobillarni bir joyda ko‘rish",
  "Sotish va ijaraga berish imkoniyati",
  "Shaxsiy kabinet orqali boshqaruv",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f7f9f7] py-16 sm:py-20 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#00863e]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#00863e]/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* INTRO */}
        <div className="mx-auto mb-14 max-w-[760px] text-center sm:mb-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00863e]/15 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#00863e]" />
            <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#00863e]">
              Biz haqimizda
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#10251a] sm:text-4xl lg:text-[52px]">
            Avtomobil olamida
            <span className="text-[#00863e]"> yangi imkoniyatlar</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[650px] text-sm leading-7 text-[#68766e] sm:text-base sm:leading-8">
            Avto Bozor — avtomobil sotish, sotib olish va ijaraga berish
            jarayonlarini bir platformada birlashtiruvchi qulay xizmat.
            Maqsadimiz — avtomobil bilan bog‘liq jarayonlarni siz uchun
            osonroq va qulayroq qilish.
          </p>
        </div>

        {/* MAIN ABOUT CARD */}
        <div className="mb-20 grid items-center gap-10 overflow-hidden rounded-[28px] border border-[#e8eee9] bg-white p-5 shadow-[0_20px_60px_rgba(16,37,26,0.05)] sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">

          {/* Left content */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00863e]">
              Bizning maqsadimiz
            </span>

            <h3 className="mt-4 text-2xl font-extrabold leading-snug text-[#10251a] sm:text-3xl lg:text-[38px]">
              Avtomobil bilan bog‘liq barcha imkoniyatlar — bir joyda.
            </h3>

            <p className="mt-5 text-sm leading-7 text-[#68766e] sm:text-base sm:leading-8">
              Avto Bozor foydalanuvchilarga avtomobil topish, sotish va
              ijaraga berish uchun yagona platformani taqdim etadi.
              Biz murakkab jarayonlarni soddalashtirish, kerakli
              ma'lumotlarni bir joyga jamlash va foydalanuvchilarga
              qulay raqamli muhit yaratishni maqsad qilganmiz.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#00863e]" />
                  <span className="text-[13px] font-semibold text-[#34443a]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/cars"
              className="mt-9 inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#00863e] px-6 text-sm font-bold text-white no-underline shadow-lg shadow-[#00863e]/15 transition-all hover:-translate-y-0.5 hover:bg-[#006f35]"
            >
              Avtomobillarni ko‘rish
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[22px] bg-[#10251a] p-6 sm:min-h-[410px] sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#00863e]/20 blur-2xl" />

              <div className="relative z-10 w-full max-w-[380px]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/50">
                      AVTO BOZOR
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">
                      Sizning avtomobil platformangiz
                    </p>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00863e] text-white">
                    <CarFront size={26} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-md">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#6de09a]">
                      <Search size={21} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        O‘zingizga mos avtomobil
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        Qidiring va tanlang
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="my-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#6de09a]">
                      <Handshake size={21} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Sotish va sotib olish
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        E'lonlar orqali bog‘laning
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#6de09a]">
                      <CalendarCheck size={21} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Ijara xizmatlari
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        Ijaraga oling yoki bering
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl border border-[#00863e]/30 bg-[#00863e]/15 px-4 py-3">
                  <span className="text-xs font-semibold text-white/80">
                    Barcha imkoniyatlar bir platformada
                  </span>
                  <CheckCircle2 className="text-[#6de09a]" size={19} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#00863e]">
              Xizmatlarimiz
            </span>

            <h3 className="mt-3 text-2xl font-extrabold text-[#10251a] sm:text-3xl lg:text-4xl">
              Siz uchun nimalar qilamiz?
            </h3>
          </div>

          <p className="max-w-[400px] text-sm leading-7 text-[#68766e]">
            Avtomobilga oid ehtiyojlaringiz uchun kerakli xizmatlar
            va imkoniyatlarni bir joyga jamladik.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.number}
                className="group relative overflow-hidden rounded-2xl border border-[#e7ede8] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00863e]/30 hover:shadow-[0_16px_40px_rgba(0,134,62,0.08)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5ee] text-[#00863e] transition-all duration-300 group-hover:bg-[#00863e] group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <span className="text-sm font-bold text-[#d5ded8]">
                    {service.number}
                  </span>
                </div>

                <h4 className="mt-7 text-lg font-bold text-[#10251a]">
                  {service.title}
                </h4>

                <p className="mt-3 text-[13px] leading-7 text-[#748078]">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#00863e] transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="relative mt-16 overflow-hidden rounded-[26px] bg-[#00863e] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-16 h-48 w-48 rounded-full border border-white/10" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <h3 className="max-w-[650px] text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-[38px]">
                Avtomobil izlashni bugundan boshlang!
              </h3>

              <p className="mt-3 max-w-[550px] text-sm leading-7 text-white/75">
                Avto Bozor imkoniyatlaridan foydalaning va o‘zingizga
                mos avtomobilni toping.
              </p>
            </div>

            <Link
              href="/cars"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 text-sm font-bold text-[#00863e] no-underline transition-all hover:-translate-y-0.5 hover:bg-[#f0f7f2]"
            >
              Boshlash
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
