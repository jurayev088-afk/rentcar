const MONTHS_UZ = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyun",
  "Iyul",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

/** Prisma Decimal / string / number → finite number (narx, reyting, …) */
export function toMoneyNumber(value: unknown, fallback = 0): number {
  if (value == null || value === "") return fallback;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }
  if (typeof value === "string") {
    const n = Number(value.replace(/\s/g, "").replace(",", "."));
    return Number.isFinite(n) ? n : fallback;
  }
  if (typeof value === "object") {
    const v = value as {
      toNumber?: () => number;
      toString?: () => string;
      s?: number;
      d?: number[];
    };
    if (typeof v.toNumber === "function") {
      const n = v.toNumber();
      return Number.isFinite(n) ? n : fallback;
    }
    if (typeof v.toString === "function") {
      const raw = v.toString();
      if (raw && raw !== "[object Object]") {
        const n = Number(raw);
        if (Number.isFinite(n)) return n;
      }
    }
    // JSON’ga aylanib qolgan Decimal.js: { s, e, d }
    if (Array.isArray(v.d) && v.d.length > 0) {
      const digits = v.d.map(String).join("");
      const exp =
        typeof (v as { e?: unknown }).e === "number"
          ? ((v as { e: number }).e - digits.length + 1)
          : 0;
      const n = Number(`${v.s === -1 ? "-" : ""}${digits}e${exp}`);
      return Number.isFinite(n) ? n : fallback;
    }
  }
  return fallback;
}

export function formatMoney(value?: number | string | null) {
  const n = toMoneyNumber(value, 0);
  if (n >= 1_000_000) {
    const mln = n / 1_000_000;
    return `${mln % 1 === 0 ? mln.toFixed(0) : mln.toFixed(1)} mln`;
  }
  return `${Math.round(n).toLocaleString("uz-UZ")} so‘m`;
}

export function formatDateShort(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

export function formatDateRange(start?: string | null, end?: string | null) {
  return `${formatDateShort(start)} – ${formatDateShort(end)}`;
}

export function bookingStatusLabel(status?: string) {
  switch (status) {
    case "PENDING_COMPANY":
      return "Kutilmoqda";
    case "CONFIRMED":
      return "Tasdiqlangan";
    case "ACTIVE":
      return "Faol";
    case "COMPLETED":
      return "Yakunlangan";
    case "CANCELLED":
      return "Bekor qilingan";
    case "REJECTED":
      return "Rad etilgan";
    default:
      return status || "-";
  }
}

export function monthBucketsFromBookings(
  items: { startAt?: string; createdAt?: string; totalAmount?: number | string }[],
) {
  const year = new Date().getFullYear();
  const totals = Array.from({ length: 12 }, () => 0);
  for (const item of items) {
    const raw = item.startAt || item.createdAt;
    if (!raw) continue;
    const d = new Date(raw);
    if (Number.isNaN(d.getTime()) || d.getFullYear() !== year) continue;
    totals[d.getMonth()] += toMoneyNumber(item.totalAmount);
  }
  return MONTHS_UZ.map((month, index) => ({
    month,
    income: Number((totals[index] / 1_000_000).toFixed(2)),
    amountPct: Math.max(
      8,
      Math.round(
        (totals[index] / Math.max(...totals, 1)) * 100 || 8,
      ),
    ),
    raw: totals[index],
  }));
}
