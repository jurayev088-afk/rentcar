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

export function formatMoney(value?: number | string | null) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return "0 so‘m";
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
    totals[d.getMonth()] += Number(item.totalAmount ?? 0);
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
