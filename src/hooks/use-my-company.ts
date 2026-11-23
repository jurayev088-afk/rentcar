"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Company } from "../types/api";

export function useMyCompany() {
  return useQuery({
    queryKey: ["my-company"],
    queryFn: async () => {
      const { data } = await api.get<
        Company & {
          status?: string;
          ratingAvg?: number | string;
          ratingCount?: number;
          _count?: { cars?: number; bookings?: number; payments?: number };
        }
      >("/kompaniyalar/mening");
      return data;
    },
    staleTime: 20_000,
  });
}
