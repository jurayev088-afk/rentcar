"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Car,
  MapPin,
  Star,
} from "lucide-react";
import MobileSnapRow, { SnapPage } from "@/src/components/MobileSnapRow";
import { toMoneyNumber } from "@/src/lib/format";
import { companyLogo } from "@/src/lib/media";
import type { HomeData } from "@/src/types/api";

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
            className={`h-3 w-3 ${
              filled
                ? "fill-[#f5b301] text-[#f5b301]"
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
    return "bg-gradient-to-br from-[#f5d76e] via-[#f0b429] to-[#d4920a] text-[#3d2a00]";
  if (rank === 2)
    return "bg-gradient-to-br from-[#e8edf2] via-[#c5ced8] to-[#9aa8b5] text-[#1f2d25]";
  if (rank === 3)
    return "bg-gradient-to-br from-[#f0c9a8] via-[#d9956c] to-[#b8734a] text-[#3d2214]";
  return "bg-[#eaf6ef] text-[#00863e] ring-1 ring-[#b9dfc6]";
}

function CompanyCard({
  company,
  rank,
}: {
  company: NonNullable<HomeData["topCompanies"]>[number];
  rank: number;
}) {
  const rating = toMoneyNumber(company.ratingAvg, 0);
  const carsCount = company._count?.cars ?? 0;

  return (
    <Link
      href={`/kompaniyalar/${company.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border border-white/70 bg-white no-underline shadow-[0_8px_22px_rgba(16,37,26,0.07)] active:opacity-95 sm:transition sm:hover:border-[#b9dfc6]"
    >
      <div className="relative h-[72px] overflow-hidden bg-[#0f1f16] sm:h-[84px]">
        <Image
          src={companyLogo(company.logoUrl)}
          alt=""
          fill
          className="object-cover opacity-50 blur-[1px]"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f16] via-[#0f1f16]/50 to-[#00863e]/20" />

        <span className="absolute left-2 top-2 inline-flex items-center gap-0.5 rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white backdrop-blur-md ring-1 ring-white/20">
          <BadgeCheck className="h-2.5 w-2.5 text-[#7ddea3]" aria-hidden />
          Top
        </span>

        <span
          className={`absolute right-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${rankStyle(rank)}`}
        >
          #{rank}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col px-2.5 pb-2.5 pt-0 sm:px-3 sm:pb-3">
        <div className="-mt-5 mb-2 flex items-end justify-between gap-1.5">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white p-0.5 shadow-md ring-2 ring-white sm:h-11 sm:w-11">
            <div className="relative h-full w-full overflow-hidden rounded-[10px] bg-[#eef2f0]">
              <Image
                src={companyLogo(company.logoUrl)}
                alt={company.name}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
          </div>

          <div className="mb-0.5 rounded-lg bg-[#f6faf7] px-1.5 py-1 text-center ring-1 ring-[#eaf6ef]">
            <p className="m-0 text-[8px] font-bold uppercase tracking-wide text-[#8a9690]">
              Reyting
            </p>
            <p className="m-0 text-sm font-extrabold leading-none text-[#1f2d25]">
              {rating.toFixed(1)}
            </p>
          </div>
        </div>

        <h3 className="m-0 truncate text-[13px] font-extrabold tracking-tight text-[#1f2d25] transition group-hover:text-[#00863e] sm:text-sm">
          {company.name}
        </h3>

        <div className="mt-1 flex items-center gap-1.5">
          <Stars value={rating} />
          <span className="text-[10px] font-semibold text-[#8a9690]">
            {company.ratingCount}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf6ef] px-1.5 py-0.5 text-[10px] font-bold text-[#00863e]">
            <Car className="h-2.5 w-2.5" aria-hidden />
            {carsCount} ta
          </span>
          {company.address && (
            <span className="inline-flex max-w-full items-center gap-0.5 truncate rounded-full bg-[#f3f5f4] px-1.5 py-0.5 text-[10px] font-semibold text-[#5a675f]">
              <MapPin className="h-2.5 w-2.5 shrink-0" aria-hidden />
              <span className="truncate">{company.address}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function chunkPairs<T>(items: T[]): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pages.push(items.slice(i, i + 2));
  }
  return pages;
}

export default function TopCompanies({ data }: { data: HomeData }) {
  const companies = (data.topCompanies ?? []).slice(0, 10);
  const pages = chunkPairs(companies);

  return (
    <section
      id="top-companies"
      className="relative scroll-mt-24 overflow-hidden py-[clamp(24px,3vw,44px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,134,62,0.07),_transparent_55%),linear-gradient(180deg,#f4f7f5_0%,#eef2f0_100%)]"
      />

      <div className={`relative ${shell}`}>
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
          <h2 className="m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[25px]">
            Top kompaniyalar
          </h2>
          <Link
            href="/kompaniyalar"
            className="inline-flex cursor-pointer shrink-0 items-center gap-1.5 text-sm font-bold text-[#00863e] no-underline hover:underline"
          >
            Hammasi
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {companies.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#d7e8dd] bg-white/70 px-4 py-6 text-sm text-[#6d7a73]">
            Hozircha kompaniyalar yo‘q.
          </p>
        ) : (
          <>
            {/* Mobile: 2 tadan snap-scroll */}
            <div className="sm:hidden">
              <MobileSnapRow>
                {pages.map((pair, pageIndex) => (
                  <SnapPage key={`page-${pageIndex}`}>
                    {pair.map((company, i) => (
                      <div key={company.id} className="min-w-0 flex-1">
                        <CompanyCard
                          company={company}
                          rank={pageIndex * 2 + i + 1}
                        />
                      </div>
                    ))}
                    {pair.length === 1 && <div className="min-w-0 flex-1" />}
                  </SnapPage>
                ))}
              </MobileSnapRow>
            </div>

            {/* Desktop grid */}
            <div className="hidden grid-cols-2 gap-2.5 sm:grid sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {companies.map((company, index) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  rank={index + 1}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
