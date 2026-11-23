"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Car,
  MapPin,
  Star,
} from "lucide-react";
import { useHome } from "@/src/hooks/use-home";
import { companyLogo } from "@/src/lib/media";
import HomeCarousel from "./HomeCarousel";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(value);
        return (
          <Star
            key={index}
            className={`h-3.5 w-3.5 ${
              filled
                ? "fill-[#f5b301] text-[#f5b301] drop-shadow-[0_1px_2px_rgba(245,179,1,0.35)]"
                : "text-[#e2e6e3]"
            }`}
          />
        );
      })}
    </div>
  );
}

function rankStyle(rank: number) {
  if (rank === 1)
    return "bg-gradient-to-br from-[#f5d76e] via-[#f0b429] to-[#d4920a] text-[#3d2a00] shadow-[0_6px_16px_rgba(212,146,10,0.35)]";
  if (rank === 2)
    return "bg-gradient-to-br from-[#e8edf2] via-[#c5ced8] to-[#9aa8b5] text-[#1f2d25] shadow-[0_6px_16px_rgba(154,168,181,0.35)]";
  if (rank === 3)
    return "bg-gradient-to-br from-[#f0c9a8] via-[#d9956c] to-[#b8734a] text-[#3d2214] shadow-[0_6px_16px_rgba(184,115,74,0.35)]";
  return "bg-[#eaf6ef] text-[#00863e] ring-1 ring-[#b9dfc6]";
}

export default function TopCompanies() {
  const { data: home, isLoading } = useHome();
  const companies = (home?.topCompanies ?? []).slice(0, 10);

  return (
    <section
      id="top-companies"
      className="relative scroll-mt-24 overflow-hidden py-[clamp(28px,3.5vw,52px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,134,62,0.07),_transparent_55%),linear-gradient(180deg,#f4f7f5_0%,#eef2f0_100%)]"
      />

      <div className={`relative ${shell}`}>
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9dfc6] bg-white/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e] shadow-sm backdrop-blur">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Reyting · Hamkor kompaniyalar
            </span>
            <h2 className="mt-3 m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[28px]">
              Eng top kompaniyalar
            </h2>
          </div>
          <Link
            href="/kompaniyalar"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#b9dfc6] bg-white px-4 py-2.5 text-sm font-bold text-[#00863e] no-underline shadow-sm transition hover:bg-[#00863e] hover:text-white"
          >
            Hammasi
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {isLoading && (
          <p className="text-sm text-[#6d7a73]">Kompaniyalar yuklanmoqda...</p>
        )}
        {!isLoading && companies.length === 0 && (
          <p className="rounded-2xl border border-dashed border-[#d7e8dd] bg-white/70 px-4 py-6 text-sm text-[#6d7a73]">
            Hozircha kompaniyalar yo‘q.
          </p>
        )}

        <HomeCarousel itemCount={companies.length}>
          {companies.map((company, index) => {
            const rank = index + 1;
            const rating = Number(company.ratingAvg || 0);
            const carsCount = company._count?.cars ?? 0;

            return (
              <Link
                key={company.id}
                href={`/kompaniyalar/${company.id}`}
                className="group relative w-[min(100%,280px)] shrink-0 overflow-hidden rounded-[24px] border border-white/70 bg-white no-underline shadow-[0_12px_40px_rgba(16,37,26,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-[#b9dfc6] hover:shadow-[0_22px_50px_rgba(0,134,62,0.16)] sm:w-[calc(50%-10px)] lg:w-[calc(25%-12px)]"
              >
                {/* Cover */}
                <div className="relative h-[118px] overflow-hidden bg-[#0f1f16]">
                  <Image
                    src={companyLogo(company.logoUrl)}
                    alt=""
                    fill
                    className="object-cover opacity-55 blur-[1px] transition duration-700 group-hover:scale-110 group-hover:opacity-70"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f16] via-[#0f1f16]/55 to-[#00863e]/25" />

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/25">
                    <BadgeCheck className="h-3 w-3 text-[#7ddea3]" aria-hidden />
                    Kompaniya
                  </span>

                  <span
                    className={`absolute right-3 top-3 flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-extrabold ${rankStyle(rank)}`}
                  >
                    #{rank}
                  </span>
                </div>

                {/* Logo overlap */}
                <div className="relative px-4 pb-4 pt-0">
                  <div className="-mt-9 mb-3 flex items-end justify-between gap-2">
                    <div className="relative h-[68px] w-[68px] overflow-hidden rounded-[18px] bg-white p-1 shadow-[0_10px_24px_rgba(16,37,26,0.18)] ring-2 ring-white">
                      <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#eef2f0]">
                        <Image
                          src={companyLogo(company.logoUrl)}
                          alt={company.name}
                          fill
                          className="object-cover"
                          sizes="68px"
                        />
                      </div>
                    </div>

                    <div className="mb-1 rounded-xl bg-[#f6faf7] px-2.5 py-1.5 text-center ring-1 ring-[#eaf6ef]">
                      <p className="m-0 text-[10px] font-bold uppercase tracking-wide text-[#8a9690]">
                        Reyting
                      </p>
                      <p className="m-0 text-lg font-extrabold leading-none text-[#1f2d25]">
                        {rating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <h3 className="m-0 truncate text-[17px] font-extrabold tracking-tight text-[#1f2d25] transition group-hover:text-[#00863e]">
                    {company.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <Stars value={rating} />
                    <span className="text-xs font-semibold text-[#8a9690]">
                      {company.ratingCount} baho
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf6ef] px-2.5 py-1 text-[11px] font-bold text-[#00863e]">
                      <Car className="h-3 w-3" aria-hidden />
                      {carsCount} ta mashina
                    </span>
                    {company.address && (
                      <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-[#f3f5f4] px-2.5 py-1 text-[11px] font-semibold text-[#5a675f]">
                        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                        <span className="truncate">{company.address}</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#eef2f0] pt-3">
                    <span className="text-xs font-semibold text-[#8a9690]">
                      Profilni ochish
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00863e] text-white shadow-[0_6px_14px_rgba(0,134,62,0.28)] transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </HomeCarousel>
      </div>
    </section>
  );
}
