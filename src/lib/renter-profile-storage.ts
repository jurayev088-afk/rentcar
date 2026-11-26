import dayjs from "dayjs";

export type RenterBookingProfile = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  passportNumber?: string;
  birthDate?: string; // ISO
};

function key(userId: string) {
  return `rento.renterBookingProfile.${userId}`;
}

export function loadRenterBookingProfile(
  userId: string,
): RenterBookingProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key(userId));
    if (!raw) return null;
    return JSON.parse(raw) as RenterBookingProfile;
  } catch {
    return null;
  }
}

export function saveRenterBookingProfile(
  userId: string,
  data: RenterBookingProfile,
) {
  if (typeof window === "undefined") return;
  const prev = loadRenterBookingProfile(userId) || {};
  localStorage.setItem(key(userId), JSON.stringify({ ...prev, ...data }));
}

export function birthDateToDayjs(iso?: string) {
  if (!iso) return undefined;
  const d = dayjs(iso);
  return d.isValid() ? d : undefined;
}
