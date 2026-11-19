export function bookingPath(carId: string) {
  return `/cars/${encodeURIComponent(carId)}/bron`;
}

export function bookingAuthHref(mode: "login" | "register", carId?: string) {
  const params = new URLSearchParams({ next: carId ? bookingPath(carId) : "/#booking" });
  return `/${mode}?${params}`;
}

export function authDestination(next: string | string[] | undefined) {
  if (next === "/#booking") return next;
  if (typeof next === "string" && /^\/cars\/(?:[\w.-]|%(?!2f|5c)[\da-f]{2})+\/bron$/i.test(next)) {
    const carId = next.split("/")[2];
    if (!/^(?:\.|%2e){1,2}$/i.test(carId)) return next;
  }
  return "/";
}
