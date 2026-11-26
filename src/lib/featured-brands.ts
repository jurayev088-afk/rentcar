/**
 * Select / Brandlar sahifasi uchun asosiy brandlar
 * (Uzum tartibidagi mashhurlar — "212" dan oldingi qator).
 */
export const FEATURED_BRANDS = [
  "BYD",
  "Chery",
  "Chevrolet",
  "Daewoo",
  "GAC Aion",
  "Haval",
  "Hongqi",
  "Hyundai",
  "KIA",
  "Lada",
  "Leapmotor",
  "Lexus",
  "LiXiang",
  "Mercedes-Benz",
  "Nissan",
  "Ravon",
  "Toyota",
  "Volkswagen",
  "BMW",
  "BAIC",
  "Land Rover",
  "Honda",
  "Geely",
  "Audi",
  "Tesla",
  "Changan",
  "Jetour",
  "EXEED",
  "Omoda",
  "JAC",
] as const;

const featuredSet = new Set(
  FEATURED_BRANDS.map((b) => b.trim().toLowerCase()),
);

export function isFeaturedBrand(name: string) {
  return featuredSet.has(name.trim().toLowerCase());
}

/** Aliases: KIA/Kia, Land Rover/Range Rover */
export function normalizeFeaturedBrandName(name: string) {
  const key = name.trim().toLowerCase();
  if (key === "kia") return "KIA";
  if (key === "range rover") return "Land Rover";
  if (key === "li auto" || key === "li") return "LiXiang";
  if (key === "gac" || key === "aion") return "GAC Aion";
  if (key === "mercedes" || key === "mercedes benz") return "Mercedes-Benz";
  return name;
}
