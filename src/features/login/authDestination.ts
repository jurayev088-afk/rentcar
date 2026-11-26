export function bookingPath(carId: string) {
  return `/cars/${encodeURIComponent(carId)}/bron`;
}

const ADD_CAR_PATH = "/profile/owner/moshinalarim/qoshish";

/** Ichki next yo‘llarni xavfsiz qabul qilish */
export function authDestination(next: string | string[] | undefined) {
  if (typeof next !== "string" || !next) return "/";
  if (next === "/#booking") return next;

  try {
    const decoded = decodeURIComponent(next);
    if (!decoded.startsWith("/") || decoded.startsWith("//")) return "/";

    if (
      /^\/cars\/(?:[\w.-]|%(?!2f|5c)[\da-f]{2})+\/bron$/i.test(decoded) ||
      decoded === ADD_CAR_PATH ||
      decoded.startsWith(`${ADD_CAR_PATH}/`) ||
      decoded.startsWith("/profile/") ||
      decoded.startsWith("/cars")
    ) {
      return decoded;
    }
  } catch {
    return "/";
  }
  return "/";
}

export type AuthRole = "USER" | "COMPANY";

export function authHref(opts: {
  mode?: "login" | "register";
  role?: AuthRole;
  next?: string;
}) {
  const params = new URLSearchParams();
  if (opts.next) params.set("next", opts.next);
  if (opts.role) params.set("role", opts.role);
  const path = opts.mode === "register" ? "/register" : "/login";
  const q = params.toString();
  return q ? `${path}?${q}` : path;
}

/** Bron: mijoz register */
export function bookingAuthHref(mode: "login" | "register", carId?: string) {
  return authHref({
    mode,
    role: "USER",
    next: carId ? bookingPath(carId) : "/#booking",
  });
}

/** Mashina qo‘shish: kompaniya register */
export function addCarAuthHref() {
  return authHref({
    mode: "register",
    role: "COMPANY",
    next: ADD_CAR_PATH,
  });
}

/** Profil: umumiy register (mijoz) */
export function profileAuthHref() {
  return authHref({ mode: "register", role: "USER", next: "/profile/renter/profile" });
}
