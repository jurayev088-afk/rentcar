"use client";

import Image from "next/image";
import Link from "next/link";
import HeaderSearch from "./HeaderSearch";
import { ArrowRightOutlined, CarOutlined } from "@ant-design/icons";
import { useUser } from "../constants/UseMeContext";

export default function Header2() {
  const { user } = useUser();

  return (
    <section className="header relative mt-[78px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_40%,rgba(255,255,255,0.7),transparent_62%)]" />

      <div className="relative mx-auto grid min-h-[560px] max-w-[1440px] items-center gap-6 px-6 py-14 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-14">
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[#d9dde0] bg-white/70 px-4 py-2">
            <CarOutlined className="text-[#008b50]" />
            <span className="text-sm font-medium text-[#141718]">
              Avto Bozor — avtomobil bozori
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#141718] md:text-5xl lg:text-6xl">
            O‘zingizga mos
            <span className="mt-1 block text-[#008b50]">avtomobilni toping.</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#6d7276] md:text-base">
            Xarid qiling, soting, ijaraga oling yoki avtomobilingizni ijaraga
            bering. Barchasi bir platformada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cars"
              className="inline-flex h-12 items-center gap-3 rounded-full bg-[#008b50] px-6 font-semibold text-white shadow-[0_5px_13px_rgba(0,126,73,0.2)] transition hover:bg-[#006f40]"
            >
              Mashinalarni ko‘rish
              <ArrowRightOutlined />
            </Link>

            <Link
              href={user ? "/profile/owner/moshinalarim/qoshish" : "/login"}
              className="inline-flex h-12 items-center rounded-full border border-[#141718]/20 bg-white px-6 font-semibold text-[#141718] transition hover:border-[#008b50] hover:text-[#008b50]"
            >
              Ijaraga berish
            </Link>
          </div>
        </div>

        <div className="relative h-[280px] sm:h-[360px] lg:h-[440px]">
          <Image
            src="/images/hero-premium.jpg"
            alt="Zamonaviy avtomobil"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain object-center lg:object-right"
          />
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-5xl px-6 pb-12 md:px-10">
        <HeaderSearch />
      </div>
    </section>
  );
}