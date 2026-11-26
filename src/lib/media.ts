/** Brand logo — faqat ishonchli manbalar (404 bo‘lmasin) */
const CAR_LOGO = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${slug}.png`;

const SIMPLE = (slug: string, color = "111111") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

/** Datasetda bor brandlar — taxminiy slug yasamaymiz */
const brandLogoByKey: Record<string, string> = {
  ACURA: CAR_LOGO("acura"),
  "ALFA ROMEO": CAR_LOGO("alfa-romeo"),
  "ASTON MARTIN": CAR_LOGO("aston-martin"),
  AUDI: CAR_LOGO("audi"),
  BAIC: CAR_LOGO("baic-motor"),
  BENTLEY: CAR_LOGO("bentley"),
  BMW: CAR_LOGO("bmw"),
  BUGATTI: CAR_LOGO("bugatti"),
  BYD: CAR_LOGO("byd"),
  CADILLAC: CAR_LOGO("cadillac"),
  CHANGAN: CAR_LOGO("changan"),
  CHERY: CAR_LOGO("chery"),
  CHEVROLET: CAR_LOGO("chevrolet"),
  CHRYSLER: CAR_LOGO("chrysler"),
  CITROEN: CAR_LOGO("citroen"),
  CUPRA: CAR_LOGO("cupra"),
  DAEWOO: CAR_LOGO("daewoo"),
  DODGE: CAR_LOGO("dodge"),
  EXEED: CAR_LOGO("exeed"),
  FERRARI: CAR_LOGO("ferrari"),
  FIAT: CAR_LOGO("fiat"),
  FORD: CAR_LOGO("ford"),
  "GAC AION": CAR_LOGO("aion"),
  GAC: CAR_LOGO("gac-group"),
  AION: CAR_LOGO("aion"),
  GEELY: CAR_LOGO("geely"),
  GENESIS: CAR_LOGO("genesis"),
  GMC: CAR_LOGO("gmc"),
  "GREAT WALL": CAR_LOGO("great-wall"),
  HAVAL: CAR_LOGO("haval"),
  HONDA: CAR_LOGO("honda"),
  HONGQI: CAR_LOGO("hongqi"),
  HYUNDAI: CAR_LOGO("hyundai"),
  INFINITI: CAR_LOGO("infiniti"),
  ISUZU: CAR_LOGO("isuzu"),
  JAC: CAR_LOGO("jac"),
  JAGUAR: CAR_LOGO("jaguar"),
  JEEP: CAR_LOGO("jeep"),
  JETOUR: CAR_LOGO("jetour"),
  KIA: CAR_LOGO("kia"),
  LADA: CAR_LOGO("lada"),
  LAMBORGHINI: CAR_LOGO("lamborghini"),
  "LAND ROVER": CAR_LOGO("land-rover"),
  "RANGE ROVER": CAR_LOGO("land-rover"),
  LANDROVER: CAR_LOGO("land-rover"),
  LEAPMOTOR: CAR_LOGO("leapmotor"),
  LEXUS: CAR_LOGO("lexus"),
  LIXIANG: CAR_LOGO("li-auto"),
  "LI AUTO": CAR_LOGO("li-auto"),
  LI: CAR_LOGO("li-auto"),
  LINCOLN: CAR_LOGO("lincoln"),
  MASERATI: CAR_LOGO("maserati"),
  MAZDA: CAR_LOGO("mazda"),
  MCLAREN: CAR_LOGO("mclaren"),
  "MERCEDES-BENZ": CAR_LOGO("mercedes-benz"),
  MERCEDES: CAR_LOGO("mercedes-benz"),
  MG: CAR_LOGO("mg"),
  MINI: CAR_LOGO("mini"),
  MITSUBISHI: CAR_LOGO("mitsubishi"),
  NISSAN: CAR_LOGO("nissan"),
  OMODA: CAR_LOGO("omoda"),
  OPEL: CAR_LOGO("opel"),
  PEUGEOT: CAR_LOGO("peugeot"),
  POLESTAR: CAR_LOGO("polestar"),
  PORSCHE: CAR_LOGO("porsche"),
  RAM: CAR_LOGO("ram"),
  RENAULT: CAR_LOGO("renault"),
  "ROLLS-ROYCE": CAR_LOGO("rolls-royce"),
  SEAT: CAR_LOGO("seat"),
  SKODA: CAR_LOGO("skoda"),
  SMART: CAR_LOGO("smart"),
  SSANGYONG: CAR_LOGO("ssangyong"),
  SUBARU: CAR_LOGO("subaru"),
  SUZUKI: CAR_LOGO("suzuki"),
  TESLA: SIMPLE("tesla", "CC0000"),
  TOYOTA: CAR_LOGO("toyota"),
  UAZ: CAR_LOGO("uaz"),
  VOLKSWAGEN: CAR_LOGO("volkswagen"),
  VOLVO: CAR_LOGO("volvo"),
  WULING: CAR_LOGO("wuling"),
  XPENG: CAR_LOGO("xpeng"),
  NIO: CAR_LOGO("nio"),
  LUCID: CAR_LOGO("lucid"),
  RIVIAN: CAR_LOGO("rivian"),
  UZAUTO: CAR_LOGO("chevrolet"),
  RAVON: CAR_LOGO("chevrolet"),
  XIAOMI: SIMPLE("xiaomi", "FF6900"),
};

const fallbackCar =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";

const fallbackCompany =
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=400&q=80";

export function brandLabel(value: string) {
  return value.replaceAll("_", " ");
}

function isCarPhotoUrl(url?: string | null) {
  if (!url) return true;
  return /unsplash\.com|images\.pexels\.com|picsum\.photos/i.test(url);
}

/**
 * Brand logosi.
 * Noma’lum brand uchun taxminiy CDN URL yasamaymiz (404 → broken image).
 * UI BrandMark onError bilan harf avatarga o‘tadi.
 */
export function brandLogo(
  brand: string,
  apiLogo?: string | null,
): string | null {
  const key = brand.trim().toUpperCase();
  if (brandLogoByKey[key]) return brandLogoByKey[key];

  // API logo faqat ishonchli bo‘lsa (unsplash emas)
  if (apiLogo && !isCarPhotoUrl(apiLogo)) {
    // Datasetda yo‘q brandlar uchun API ham 404 berishi mumkin — UI onError ushlaydi
    return apiLogo;
  }

  return null;
}

/** Orqa moslik: logo yoki fallback (faqat mashina kartalari uchun) */
export function brandImage(brand: string, apiLogo?: string | null) {
  return brandLogo(brand, apiLogo) || fallbackCar;
}

/** API host ( /api/v1 siz ) — lokal upload URL’larini to‘g‘rilash uchun */
export function apiOrigin() {
  const base =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:3000/api/v1";
  return base.replace(/\/api\/v1$/i, "") || base;
}

/**
 * Backend ba’zan http://localhost:3000/uploads/... saqlaydi.
 * Brauzerda Render hostiga almashtiramiz.
 */
export function resolveMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("/uploads/")) return `${apiOrigin()}${url}`;
  const local = url.match(
    /^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(\/uploads\/.+)$/i,
  );
  if (local) return `${apiOrigin()}${local[1]}`;
  return url;
}

export function carPrimaryImage(images?: { url: string; isPrimary?: boolean }[]) {
  if (!images?.length) return fallbackCar;
  const raw =
    images.find((img) => img.isPrimary)?.url || images[0].url || fallbackCar;
  return resolveMediaUrl(raw) || fallbackCar;
}

export function companyLogo(logoUrl?: string | null) {
  return resolveMediaUrl(logoUrl) || fallbackCompany;
}

/** Mockupdagi aniq mashina rasmlari — public/categories */
const categoryFallback: Record<string, string> = {
  sedan: "/categories/sedan.png",
  suv: "/categories/krossover.png",
  krossover: "/categories/krossover.png",
  crossover: "/categories/krossover.png",
  hetchbek: "/categories/byudjetli.png",
  hatchback: "/categories/byudjetli.png",
  kupe: "/categories/kupe.png",
  coupe: "/categories/kupe.png",
  miniven: "/categories/miniven.png",
  minivan: "/categories/miniven.png",
  elektromobil: "/categories/elektromobil.png",
  elektro: "/categories/elektromobil.png",
  electric: "/categories/elektromobil.png",
  gibrid: "/categories/gibrid.png",
  hybrid: "/categories/gibrid.png",
  byudjetli: "/categories/byudjetli.png",
  budget: "/categories/byudjetli.png",
  premium: "/categories/premium.png",
  lux: "/categories/premium.png",
  luxury: "/categories/premium.png",
};

const categoryKeyAliases: [RegExp, string][] = [
  [/sedan|седан/i, "sedan"],
  [/krossover|crossover|suv|кроссовер/i, "krossover"],
  [/kupe|coupe|купе/i, "kupe"],
  [/miniven|minivan|минив/i, "miniven"],
  [/elektro|electric|tesla|электр/i, "elektromobil"],
  [/gibrid|hybrid|гибрид/i, "gibrid"],
  [/byudjet|budget|бюджет/i, "byudjetli"],
  [/premium|lux|премиум/i, "premium"],
  [/hetch|hatch/i, "hetchbek"],
];

export function resolveCategoryKey(category: {
  name?: string;
  nameUz?: string | null;
  slug?: string | null;
}): string | null {
  const raw = `${category.slug || ""} ${category.nameUz || ""} ${category.name || ""}`
    .trim()
    .toLowerCase();
  const compact = raw.replace(/\s+/g, "");

  if (categoryFallback[compact]) return compact;

  for (const [re, key] of categoryKeyAliases) {
    if (re.test(raw)) return key;
  }
  return null;
}

/** Lokal studio rasmlar birinchi — API imageUrl eski Unsplash’ni bosib ketmasin */
export function categoryImage(category: {
  imageUrl?: string | null;
  iconUrl?: string | null;
  name?: string;
  nameUz?: string | null;
  slug?: string | null;
}) {
  const key = resolveCategoryKey(category);
  if (key && categoryFallback[key]) return categoryFallback[key];

  if (category.imageUrl) return category.imageUrl;
  if (category.iconUrl) return category.iconUrl;

  return categoryFallback.sedan;
}

export function formatPrice(value: number | string | null | undefined) {
  const number = Number(value ?? 0);
  if (Number.isNaN(number)) return "0";
  return Math.round(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function normalizePhoneInput(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("998") && digits.length === 12) return `+${digits}`;
  if (digits.length === 9) return `+998${digits}`;
  if (phone.startsWith("+")) return phone;
  return `+998${digits}`;
}
