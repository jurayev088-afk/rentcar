/** Nest / axios xato matnini o‘qiladigan qilib olish */
export function getApiErrorMessage(
  error: unknown,
  fallback = "Xatolik yuz berdi",
): string {
  const err = error as {
    response?: { data?: { message?: string | string[]; error?: string } };
    message?: string;
  };
  const raw = err?.response?.data?.message ?? err?.message;
  if (Array.isArray(raw)) {
    return raw.filter(Boolean).join(", ") || fallback;
  }
  if (typeof raw === "string" && raw.trim()) return raw;
  return fallback;
}
