"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { Paginated } from "../types/api";

export type CreateMurojaatPayload = {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  type: string;
  message: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  type: string;
  status: string;
  createdAt: string;
  messages?: { id: string; message: string; senderRole: string; createdAt: string }[];
};

export function useCreateMurojaat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateMurojaatPayload) => {
      const { data } = await api.post<SupportTicket>("/murojaatlar", payload);
      return data;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["my-murojaatlar"] });
      void qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMyMurojaatlar() {
  return useQuery({
    queryKey: ["my-murojaatlar"],
    queryFn: async () => {
      const { data } = await api.get<Paginated<SupportTicket>>("/murojaatlar", {
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
