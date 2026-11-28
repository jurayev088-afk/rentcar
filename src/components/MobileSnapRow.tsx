"use client";

import {
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Props = {
  children: ReactNode;
  /** 1 = bitta to‘liq slide; 2 = bir sahifada 2 ta */
  perPage?: 1 | 2;
  className?: string;
  gapClassName?: string;
};

/**
 * Mobile horizontal snap — faqat native scroll (JS drag yo‘q → qotib qolmaydi).
 */
export default function MobileSnapRow({
  children,
  className = "",
  gapClassName = "gap-2.5",
}: Props) {
  const moved = useRef(false);
  const startX = useRef(0);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    moved.current = false;
    startX.current = e.clientX;
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (Math.abs(e.clientX - startX.current) > 10) moved.current = true;
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onClickCapture={(e) => {
        // Swipe bo‘lsa — link ochilmasin
        if (moved.current) {
          e.preventDefault();
          e.stopPropagation();
          moved.current = false;
        }
      }}
      className={`flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${gapClassName} ${className}`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>
  );
}

/** Slide wrapper — perPage ga qarab kenglik */
export function SnapSlide({
  children,
  perPage = 2,
  className = "",
}: {
  children: ReactNode;
  perPage?: 1 | 2;
  className?: string;
}) {
  const width =
    perPage === 1
      ? "w-full min-w-full"
      : "w-[calc(50%-0.3125rem)] min-w-[calc(50%-0.3125rem)]";

  return (
    <div className={`shrink-0 snap-start ${width} ${className}`}>{children}</div>
  );
}

/** 2 tadan sahifa (scroll bir marta = keyingi juftlik) */
export function SnapPage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full min-w-full shrink-0 snap-start gap-2.5 ${className}`}
    >
      {children}
    </div>
  );
}
