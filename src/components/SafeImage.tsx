"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80";

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

/** Lokal API/uploads va remote rasmlar; 404 bo‘lsa fallback */
export default function SafeImage({ src, alt, ...rest }: ImageProps) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrent(src);
    setFailed(false);
  }, [src]);

  const resolved = failed || !current ? FALLBACK : current;
  const backendUpload = isBackendUpload(resolved);

  return (
    <Image
      {...rest}
      src={resolved}
      alt={alt}
      unoptimized={backendUpload || rest.unoptimized || failed}
      onError={() => {
        if (!failed) setFailed(true);
      }}
    />
  );
}
