/**
 * O‘zbekiston davlat raqami — format har xil bo‘lishi mumkin:
 * - 01A777AA  → 01 A 777 AA
 * - 01777AAA  → 01 777 AAA
 * Yozayotganda 3-belgidan keyin qaysi tur ekanligi aniqlanadi.
 */
export function formatPlateNumber(raw: string): string {
  const cleaned = raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);

  if (!cleaned) return "";
  if (cleaned.length <= 2) return cleaned;

  const region = cleaned.slice(0, 2);
  const rest = cleaned.slice(2);
  const third = rest[0];

  // 01 A 777 AA
  if (/[A-Z]/.test(third)) {
    const letter = third;
    const after = rest.slice(1);
    const digits = (after.match(/^\d*/)?.[0] ?? "").slice(0, 3);
    const series = after
      .slice(digits.length)
      .replace(/[^A-Z]/g, "")
      .slice(0, 2);
    return [region, letter, digits, series].filter(Boolean).join(" ");
  }

  // 01 777 AAA
  if (/\d/.test(third)) {
    const digits = (rest.match(/^\d*/)?.[0] ?? "").slice(0, 3);
    const series = rest
      .slice(digits.length)
      .replace(/[^A-Z]/g, "")
      .slice(0, 3);
    return [region, digits, series].filter(Boolean).join(" ");
  }

  return cleaned;
}

export function plateDigitsOnly(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/** +998 93 105 54 77 — faqat 9 ta mahalliy raqam */
export function formatUzPhoneDisplay(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  digits = digits.slice(0, 9);

  const a = digits.slice(0, 2);
  const b = digits.slice(2, 5);
  const c = digits.slice(5, 7);
  const d = digits.slice(7, 9);

  let out = "";
  if (a) out = a;
  if (b) out += ` ${b}`;
  if (c) out += ` ${c}`;
  if (d) out += ` ${d}`;
  return out;
}

export function uzPhoneDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  return digits.slice(0, 9);
}

export function uzPhoneComplete(raw: string) {
  return uzPhoneDigits(raw).length === 9;
}

export function toE164Uz(raw: string) {
  const d = uzPhoneDigits(raw);
  return d.length === 9 ? `+998${d}` : "";
}
