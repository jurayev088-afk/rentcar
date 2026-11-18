'use client'
import Link from "next/link";
import "../app/globals.css";
import HeaderSearch from "./HeaderSearch";
import { ArrowRightOutlined, CarOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <section className="header relative mt-15 min-h-[620px] overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071727]/95 via-[#0B1F33]/75 to-[#0B1F33]/20" />

      {/* Content */}
      <div className="relative flex min-h-[620px] flex-col justify-center px-6 py-16 md:px-14 lg:px-20">
        
        {/* Badge */}
        <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <CarOutlined className="text-white" />
          <span className="text-sm font-medium text-white">
            Avto Bozor — avtomobil bozori
          </span>
        </div>

        {/* Title */}
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          O‘zingizga mos
          <span className="block text-[#A9C7E8]">
            avtomobilni toping.
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 md:text-base">
          Xarid qiling, soting, ijaraga oling yoki avtomobilingizni
          ijaraga bering. Barchasi bir platformada.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/cars"
            className="flex h-12 items-center gap-3 rounded-xl bg-white px-6 font-semibold text-[#0B1F33] transition hover:bg-slate-200"
          >
            Mashinalarni ko‘rish
            <ArrowRightOutlined />
          </Link>

          <a
            href="/ijara"
            className="flex h-12 items-center rounded-xl border border-white/40 bg-white/10 px-6 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            Ijaraga berish
          </a>
        </div>

        {/* Search */}
        <div className="mt-12 w-full max-w-5xl">
          <HeaderSearch />
        </div>
      </div>
    </section>
  );
}
