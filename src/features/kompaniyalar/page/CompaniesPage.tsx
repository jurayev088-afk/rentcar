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
import { useCompanies } from "@/src/hooks/use-companies";
import { companyLogo } from "@/src/lib/media";

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
    return "bg-gradient-to-br from-[#f5d76e] via-[#f0b429] to-[#d4920a] text-[#3d2a00]";
  if (rank === 2)
    return "bg-gradient-to-br from-[#e8edf2] via-[#c5ced8] to-[#9aa8b5] text-[#1f2d25]";
  if (rank === 3)
    return "bg-gradient-to-br from-[#f0c9a8] via-[#d9956c] to-[#b8734a] text-[#3d2214]";
  return "bg-[#eaf6ef] text-[#00863e] ring-1 ring-[#b9dfc6]";
}

export default function CompaniesPage() {
  const { data, isLoading, isError } = useCompanies({ page: 1, limit: 50 });
  const companies = data?.items ?? [];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f7f5_0%,#eef2f0_40%,#f4f6f5_100%)]">
      <div className="mx-auto w-full max-w-[1240px] px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
        <div className="mb-7 overflow-hidden rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_16px_40px_rgba(16,37,26,0.07)] sm:p-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9dfc6] bg-[#eaf6ef] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[1.4px] text-[#00863e]">
            <Building2 className="h-3.5 w-3.5" />
            Hamkorlar
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#1f2d25] sm:text-3xl">
            Barcha kompaniyalar
          </h1>
          <p className="mt-1.5 max-w-xl text-sm text-[#6d7a73]">
            Eng ko‘p yulduz yig‘ganlardan boshlab tartiblangan ishonchli
            avtoijara kompaniyalari
          </p>
        </div>

        {isLoading && (
          <p className="text-sm text-[#6d7a73]">Yuklanmoqda...</p>
        )}
        {isError && (
          <p className="text-sm text-red-600">
            Kompaniyalarni yuklashda xatolik yuz berdi.
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {companies.map((company, index) => {
            const rank = index + 1;
            const rating = Number(company.ratingAvg || 0);
            const carsCount = company._count?.cars ?? 0;

            return (
              <Link
                key={company.id}
                href={`/kompaniyalar/${company.id}`}
                className="group relative overflow-hidden rounded-[24px] border border-white/80 bg-white no-underline shadow-[0_12px_36px_rgba(16,37,26,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#b9dfc6] hover:shadow-[0_20px_48px_rgba(0,134,62,0.14)]"
              >
                <div className="relative h-[110px] overflow-hidden bg-[#0f1f16]">
                  <Image
                    src={companyLogo(company.logoUrl)}
                    alt=""
                    fill
                    className="object-cover opacity-50 blur-[1px] transition duration-700 group-hover:scale-110"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f16] via-[#0f1f16]/50 to-[#00863e]/25" />

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md ring-1 ring-white/25">
                    <BadgeCheck className="h-3 w-3 text-[#7ddea3]" />
                    Kompaniya
                  </span>

                  <span
                    className={`absolute right-3 top-3 flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-extrabold ${rankStyle(rank)}`}
                  >
                    #{rank}
                  </span>
                </div>

                <div className="relative px-4 pb-4">
                  <div className="-mt-8 mb-3 flex items-end justify-between gap-2">
                    <div className="relative h-16 w-16 overflow-hidden rounded-[16px] bg-white p-1 shadow-[0_10px_22px_rgba(16,37,26,0.18)] ring-2 ring-white">
                      <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-[#eef2f0]">
                        <Image
                          src={companyLogo(company.logoUrl)}
                          alt={company.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </div>
                    <div className="mb-0.5 rounded-xl bg-[#f6faf7] px-2.5 py-1.5 text-center ring-1 ring-[#eaf6ef]">
                      <p className="m-0 text-[10px] font-bold uppercase text-[#8a9690]">
                        Reyting
                      </p>
                      <p className="m-0 text-base font-extrabold leading-none text-[#1f2d25]">
                        {rating.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <h2 className="m-0 truncate text-lg font-extrabold text-[#1f2d25] transition group-hover:text-[#00863e]">
                    {company.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-2">
                    <Stars value={rating} />
                    <span className="text-xs font-semibold text-[#8a9690]">
                      {company.ratingCount} baho
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf6ef] px-2.5 py-1 text-[11px] font-bold text-[#00863e]">
                      <Car className="h-3 w-3" />
                      {carsCount} ta mashina
                    </span>
                    {company.address && (
                      <span className="inline-flex max-w-full items-center gap-1 truncate rounded-full bg-[#f3f5f4] px-2.5 py-1 text-[11px] font-semibold text-[#5a675f]">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{company.address}</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#eef2f0] pt-3">
                    <span className="text-xs font-semibold text-[#8a9690]">
                      Profilni ochish
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00863e] text-white shadow-[0_6px_14px_rgba(0,134,62,0.28)] transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
