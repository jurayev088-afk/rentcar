"use client";

import Image, { type ImageProps } from "next/image";

function isLocalUpload(src: ImageProps["src"]) {
  if (typeof src !== "string") return false;
  return (
    src.startsWith("http://localhost") ||
    src.startsWith("http://127.0.0.1") ||
    src.startsWith("/uploads/")
  );
}

/** Lokal API/uploads va remote rasmlar uchun next/image wrapper */
export default function SafeImage({ src, alt, ...rest }: ImageProps) {
  const local = isLocalUpload(src);
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={local || rest.unoptimized}
      {...rest}
    />
  );
}
