"use client";

import Image, { type ImageProps } from "next/image";

/** Backend upload (localhost / Render /uploads) — next optimize kerak emas */
function isBackendUpload(src: ImageProps["src"]) {
  if (typeof src !== "string") return false;
  if (src.startsWith("/uploads/")) return true;
  try {
    const u = new URL(src);
    return (
      u.pathname.startsWith("/uploads/") ||
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname.endsWith(".onrender.com")
    );
  } catch {
    return false;
  }
}

/** Lokal API/uploads va remote rasmlar uchun next/image wrapper */
export default function SafeImage({ src, alt, ...rest }: ImageProps) {
  const backendUpload = isBackendUpload(src);
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={backendUpload || rest.unoptimized}
      {...rest}
    />
  );
}
