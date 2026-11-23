"use client";

import Link from "next/link";
import { ArrowRight, CircleArrowDown } from "lucide-react";
import { useUser } from "../constants/UseMeContext";
import HeaderSearch from "./HeaderSearch";

export default function Header2() {
  const { user } = useUser();

  return (
    <>
      <div className="mx-auto w-[min(calc(100%-80px),944px)] pt-[35px] max-[860px]:w-[min(calc(100%-40px),760px)] max-[860px]:min-h-[272px] max-[860px]:pt-[30px] max-[600px]:min-h-[calc(205px+clamp(151px,42vw,250px))] max-[600px]:pt-[clamp(24px,3vw,48px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)] lg:pt-[clamp(35px,3.4vw,50px)]">
        <h1 className="mb-[11px] text-[36px] font-bold leading-[1.05] tracking-[-0.045em] text-[#202427] max-[600px]:text-[clamp(31px,8.6vw,48px)] lg:text-[clamp(36px,3.52vw,53px)]">
          Yo‘l sizniki.
          <br />
          <em className="not-italic text-[#00863e]">Manzilni tanlang.</em>
        </h1>

        <p className="mb-[18px] max-w-[clamp(224px,20vw,300px)] text-[clamp(12px,1.02vw,15px)] font-medium leading-[1.4] max-[860px]:text-xs max-[600px]:mb-3.5 max-[600px]:max-w-[230px] lg:max-w-[clamp(178px,18vw,270px)]">
          O‘zingizga mos avtomobilni toping. Avtomobilni ijaraga oling yoki bir
          platformada ijaraga bering.
        </p>

        <div className="flex flex-wrap gap-[11px] max-[365px]:gap-2">
          <Link
            href="/cars"
            className="inline-flex min-h-[30px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-transparent bg-gradient-to-r from-[#00813d] via-[#008a40] to-[#00813d] px-3.5 text-[clamp(12px,1.07vw,16px)] font-bold text-white no-underline shadow-[0_3px_6px_rgba(0,105,46,0.21)] transition hover:bg-[#006f35] max-[860px]:min-h-10 max-[860px]:px-4 max-[365px]:px-3 lg:min-h-[clamp(30px,3vw,44px)]"
          >
            Mashinalarni ko‘rish
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </Link>

          <Link
            href={user ? "/profile/owner/moshinalarim/qoshish" : "/login"}
            className="inline-flex min-h-[30px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#8e959a] bg-[#e3e6e8]/50 px-3.5 text-[clamp(12px,1.07vw,16px)] font-bold text-[#121516] no-underline transition hover:bg-[#f5f6f7] max-[860px]:min-h-10 max-[860px]:px-4 max-[365px]:px-3 lg:min-h-[clamp(30px,3vw,44px)]"
          >
            Ijaraga berish
          </Link>
        </div>

      </div>

      <div
        id="booking"
        className="relative z-[2] mx-auto mt-2 w-[min(calc(100%-32px),1100px)] max-[365px]:w-[calc(100%-20px)] sm:w-[min(calc(100%-40px),1100px)] lg:mt-6 lg:w-[min(calc(100%-48px),1240px)]"
      >
        <HeaderSearch />
      </div>
    </>
  );
}
