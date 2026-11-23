const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  // Eski kalitlarni tozalash
  localStorage.removeItem("bizdaAccessTokin");
  localStorage.removeItem("bizdaRefreshTokin");
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem("bizdaAccessTokin");
  localStorage.removeItem("bizdaRefreshTokin");
}

export function hasAccessToken() {
  return Boolean(getAccessToken());
}
