/** Brand logo — faqat ishonchli manbalar (404 bo‘lmasin) */
const CAR_LOGO = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/filippofilip95/car-logos-dataset@master/logos/optimized/${slug}.png`;

/** Datasetda bor brandlar — taxminiy slug yasamaymiz */
const brandLogoByKey: Record<string, string> = {
  ACURA: CAR_LOGO("acura"),
  "ALFA ROMEO": CAR_LOGO("alfa-romeo"),
  "ASTON MARTIN": CAR_LOGO("aston-martin"),
  AUDI: CAR_LOGO("audi"),
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
  FERRARI: CAR_LOGO("ferrari"),
  FIAT: CAR_LOGO("fiat"),
  FORD: CAR_LOGO("ford"),
  GEELY: CAR_LOGO("geely"),
  GENESIS: CAR_LOGO("genesis"),
  GMC: CAR_LOGO("gmc"),
  "GREAT WALL": CAR_LOGO("great-wall"),
  HAVAL: CAR_LOGO("haval"),
  HONDA: CAR_LOGO("honda"),
  HYUNDAI: CAR_LOGO("hyundai"),
  INFINITI: CAR_LOGO("infiniti"),
  ISUZU: CAR_LOGO("isuzu"),
  JAGUAR: CAR_LOGO("jaguar"),
  JEEP: CAR_LOGO("jeep"),
  JETOUR: CAR_LOGO("jetour"),
  KIA: CAR_LOGO("kia"),
  LADA: CAR_LOGO("lada"),
  LAMBORGHINI: CAR_LOGO("lamborghini"),
  "LAND ROVER": CAR_LOGO("land-rover"),
  "RANGE ROVER": CAR_LOGO("land-rover"),
  LANDROVER: CAR_LOGO("land-rover"),
  LEXUS: CAR_LOGO("lexus"),
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
  TESLA: CAR_LOGO("tesla"),
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

export function carPrimaryImage(images?: { url: string; isPrimary?: boolean }[]) {
  if (!images?.length) return fallbackCar;
  return images.find((img) => img.isPrimary)?.url || images[0].url || fallbackCar;
}

export function companyLogo(logoUrl?: string | null) {
  return logoUrl || fallbackCompany;
}

const categoryFallback: Record<string, string> = {
  sedan:
    "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80",
  suv: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
  krossover:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
  crossover:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
  hetchbek:
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
  hatchback:
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
  kupe: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  coupe:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
  miniven:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  elektromobil:
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
  gibrid:
    "https://images.unsplash.com/photo-1593941707881-a5bde0c4b8f3?auto=format&fit=crop&w=800&q=80",
};

export function categoryImage(category: {
  imageUrl?: string | null;
  iconUrl?: string | null;
  name?: string;
  nameUz?: string | null;
  slug?: string | null;
}) {
  if (category.imageUrl) return category.imageUrl;
  if (category.iconUrl) return category.iconUrl;
  const key = (category.slug || category.nameUz || category.name || "")
    .toLowerCase()
    .replace(/\s+/g, "");
  return (
    categoryFallback[key] ||
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=640&q=80"
  );
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
