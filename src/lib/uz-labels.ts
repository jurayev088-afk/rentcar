/** Backend status kodlarini UI’da o‘zbekcha ko‘rsatish */

const STATUS_UZ: Record<string, string> = {
  PENDING: "Kutilmoqda",
  APPROVED: "Tasdiqlandi",
  REJECTED: "Rad etildi",
  INACTIVE: "Nofaol",
  BLOCKED: "Bloklangan",
  MAVJUD: "Mavjud",
  IJARADA: "Ijarada",
  BRON_QILINGAN: "Bron qilingan",
  PENDING_COMPANY: "Kompaniya kutilmoqda",
  CONFIRMED: "Tasdiqlangan",
  ACTIVE: "Faol",
  COMPLETED: "Yakunlangan",
  CANCELLED: "Bekor qilingan",
  REFUNDED: "Qaytarilgan",
  OPEN: "Ochiq",
  IN_PROGRESS: "Ko‘rib chiqilmoqda",
  RESOLVED: "Hal qilindi",
  CLOSED: "Yopildi",
};

export function statusLabelUz(status?: string | null) {
  if (!status) return "";
  return STATUS_UZ[status] ?? status;
}

/** Xabar matnidagi APPROVED / PENDING va h.k. ni o‘zbekchaga */
export function localizeStatusText(text?: string | null) {
  if (!text) return "";
  let out = text;
  const keys = Object.keys(STATUS_UZ).sort((a, b) => b.length - a.length);
  for (const en of keys) {
    out = out.replace(new RegExp(`\\b${en}\\b`, "g"), STATUS_UZ[en]);
  }
  return out;
}
