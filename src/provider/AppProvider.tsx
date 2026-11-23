"use client";

import { ReactNode } from "react";

/** QueryProvider ildiz layoutda — bu yerda faqat children */
export default function AppProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
