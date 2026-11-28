import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import MobileSnapRow, { SnapSlide } from "@/src/components/MobileSnapRow";
import { categoryImage } from "@/src/lib/media";
import type { Category, HomeData } from "@/src/types/api";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const cardThemes = [
  "from-[#e8f5ed] via-[#f4faf6] to-[#ffffff]",
  "from-[#eaf6ef] via-[#f6faf7] to-[#ffffff]",
  "from-[#e6f3eb] via-[#f3f9f5] to-[#ffffff]",
  "from-[#ebf6f0] via-[#f5faf7] to-[#ffffff]",
  "from-[#e9f5ee] via-[#f4faf6] to-[#ffffff]",
  "from-[#eaf6ef] via-[#f6fbf8] to-[#ffffff]",
  "from-[#e7f4ec] via-[#f3f9f5] to-[#ffffff]",
  "from-[#ecf7f1] via-[#f6faf7] to-[#ffffff]",
];

function categoryHint(label: string) {
  const key = label.toLowerCase();
  if (key.includes("elektro")) return "Zamonaviy elektromobillar";
  if (key.includes("gibrid")) return "Tejamkor gibridlar";
  if (key.includes("premium")) return "Premium klass avtomobillar";
  if (key.includes("byudjet")) return "Arzon ijara variantlari";
  if (key.includes("krossover")) return "Yo‘l va shahar uchun";
  if (key.includes("miniven")) return "Oilaviy qulaylik";
  if (key.includes("kupe")) return "Sport va uslub";
  if (key.includes("sedan")) return "Klassik qulay sedanlar";
  return "Shu kategoriya bo‘yicha filter";
}

function CategoryCard({
  category,
  index,
}: {
  category: Category;
  index: number;
}) {
  const label = category.nameUz || category.name;
  const img = `${categoryImage({
    name: category.name,
    nameUz: category.nameUz,
    slug: category.slug,
  })}?v=4`;
  const theme = cardThemes[index % cardThemes.length];

  return (
    <Link
      href={`/cars?categoryId=${encodeURIComponent(category.id)}`}
      prefetch
      className={`relative flex h-[128px] w-full overflow-hidden rounded-[20px] bg-gradient-to-r ${theme} no-underline  ring-1 ring-[#d7e8dd] active:opacity-95 sm:h-[148px] sm:rounded-[22px] sm:transition sm:hover:ring-[#b9dfc6]`}
    >
      <div className="relative z-[2] flex w-[38%] min-w-0 flex-col justify-between py-3.5 pl-3.5 pr-1 sm:w-[36%] sm:py-4 sm:pl-4">
        <div>
          <h3 className="m-0 text-[14px] font-extrabold leading-tight tracking-tight text-[#1f2d25] sm:text-[16px]">
            {label}
          </h3>
          <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-[#6d7a73] sm:mt-1.5 sm:text-[11px]">
            {categoryHint(label)}
          </p>
        </div>

        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#00863e] sm:text-[12px]">
          Ko‘rish
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>

      <div className="relative z-[1] w-[62%] self-stretch sm:w-[64%]">
        <div className="absolute inset-y-1 right-0 left-0 flex items-center justify-center sm:inset-y-2">
          <div className="relative h-full w-[108%] max-w-none translate-x-[2%] sm:w-[112%]">
            <Image
              src={img}
              alt={label}
              fill
              unoptimized
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 30vw, 280px"
              className="object-contain object-center drop-shadow-[0_8px_14px_rgba(16,37,26,0.14)]"
              priority={index < 2}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoryNavStrip({ data }: { data: HomeData }) {
  const categories = data.categories ?? [];

  if (categories.length === 0) return null;

  return (
    <section
      id="categories"
      aria-label="Kategoriyalar"
      className={`${shell} scroll-mt-24 py-[clamp(18px,2.4vw,32px)]`}
    >
      <div className="mb-3.5 flex items-center justify-between gap-3 sm:mb-4">
        <h2 className="m-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1f2d25] sm:text-[25px]">
          Kategoriyalar
        </h2>
        <Link
          href="/cars"
          className="inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-[#00863e] no-underline hover:underline"
        >
          Hammasi
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      {/* Mobile: 1 tadan snap */}
      <div className="sm:hidden">
        <MobileSnapRow perPage={1} gapClassName="gap-0">
          {categories.map((category, index) => (
            <SnapSlide key={category.id} perPage={1} className="px-0.5">
              <CategoryCard category={category} index={index} />
            </SnapSlide>
          ))}
        </MobileSnapRow>
      </div>

      {/* Desktop grid */}
      <div className="hidden grid-cols-2 gap-2.5 sm:grid sm:gap-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
