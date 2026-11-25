"use client";

import { useEffect, useState } from "react";
import { brandLabel, brandLogo } from "@/src/lib/media";

const PALETTE = [
  ["#00863e", "#0f2a1c"],
  ["#0ea5e9", "#0c4a6e"],
  ["#f59e0b", "#78350f"],
  ["#6366f1", "#312e81"],
  ["#ef4444", "#7f1d1d"],
  ["#14b8a6", "#134e4a"],
  ["#2563eb", "#1e3a8a"],
  ["#db2777", "#831843"],
];

function hashBrand(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function LetterMark({
  label,
  size,
  className,
}: {
  label: string;
  size: number;
  className: string;
}) {
  const initial = label.charAt(0).toUpperCase() || "R";
  const [from, to] = PALETTE[hashBrand(label) % PALETTE.length];

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl font-extrabold text-white ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
      }}
      aria-label={label}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5), transparent 55%)",
        }}
      />
      <span className="relative">{initial}</span>
    </span>
  );
}

export default function BrandMark({
  brand,
  logoUrl,
  size = 56,
  className = "",
}: {
  brand: string;
  logoUrl?: string | null;
  size?: number;
  className?: string;
}) {
  const logo = brandLogo(brand, logoUrl);
  const label = brandLabel(brand);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [logo, brand]);

  if (!logo || failed) {
    return <LetterMark label={label} size={size} className={className} />;
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        width={Math.round(size * 0.7)}
        height={Math.round(size * 0.7)}
        className="max-h-[70%] max-w-[70%] object-contain"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
