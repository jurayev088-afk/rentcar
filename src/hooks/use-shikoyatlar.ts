"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { Paginated } from "../types/api";

export type CreateShikoyatPayload = {
  subject: string;
  type: string;
  description: string;
  companyId?: string;
  carId?: string;
  bookingId?: string;
};

export type Complaint = {
  id: string;
  subject: string;
  type: string;
  description: string;
  status: string;
  adminReply?: string | null;
  createdAt: string;
  company?: { id: string; name: string } | null;
  car?: { id: string; brand: string; model: string } | null;
};

export function useCreateShikoyat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateShikoyatPayload) => {
      const { data } = await api.post<Complaint>("/shikoyatlar", payload);
      return data;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["my-shikoyatlar"] });
      void qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMyShikoyatlar() {
  return useQuery({
    queryKey: ["my-shikoyatlar"],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Complaint>>("/shikoyatlar", {
        params: { page: 1, limit: 50 },
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 50, total: 0, totalPages: 0 },
      };
    },
    staleTime: 15_000,
  });
}
