/** Brand logo (simpleicons) — mashina rasmi emas */
const brandLogoSlugs: Record<string, string> = {
  CHEVROLET: "chevrolet",
  BMW: "bmw",
  MERCEDES: "mercedes",
  "MERCEDES-BENZ": "mercedes",
  BYD: "byd",
  TOYOTA: "toyota",
  KIA: "kia",
  HYUNDAI: "hyundai",
  TESLA: "tesla",
  VOLKSWAGEN: "volkswagen",
  AUDI: "audi",
  LEXUS: "lexus",
  NISSAN: "nissan",
  HONDA: "honda",
  MAZDA: "mazda",
  MITSUBISHI: "mitsubishi",
  FORD: "ford",
  SKODA: "skoda",
  "RANGE ROVER": "landrover",
  LANDROVER: "landrover",
  "LAND ROVER": "landrover",
};

const fallbackCar =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";

const fallbackCompany =
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=400&q=80";

export function brandLabel(value: string) {
  return value.replaceAll("_", " ");
}

/** Brand logosi URL (SVG). Topilmasa null — UI harf avatar ko‘rsatadi */
export function brandLogo(brand: string): string | null {
  const key = brand.trim().toUpperCase();
  const slug = brandLogoSlugs[key];
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/00863e`;
}

/** Orqa moslik: logo yoki fallback */
export function brandImage(brand: string) {
  return brandLogo(brand) || fallbackCar;
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
