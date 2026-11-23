"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import type { Paginated } from "../types/api";

export type ApiBooking = {
  id: string;
  code?: string;
  status: string;
  startAt: string;
  endAt: string;
  totalAmount?: number | string;
  days?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  passportNumber?: string | null;
  birthDate?: string | null;
  licenseImageUrl?: string | null;
  comment?: string | null;
  rejectReason?: string | null;
  ratingScore?: number | null;
  ratingComment?: string | null;
  ratedAt?: string | null;
  car?: {
    id: string;
    brand: string;
    model: string;
    images?: { url: string }[];
  };
  company?: { id: string; name: string; phone?: string | null };
  user?: { id: string; fullName?: string; phone?: string };
};

export function useMyBookings() {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const { data } = await api.get<Paginated<ApiBooking>>("/bronlar/mening", {
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

export function useCompanyBookings() {
  return useQuery({
    queryKey: ["company-bookings"],
    queryFn: async () => {
      const { data } = await api.get<Paginated<ApiBooking>>(
        "/bronlar/kompaniya",
        { params: { page: 1, limit: 50 } },
      );
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        meta: data?.meta ?? { page: 1, limit: 50, total: 0, totalPages: 0 },
      };
    },
    staleTime: 15_000,
  });
}

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      carId: string;
      startAt: string;
      endAt: string;
      firstName: string;
      lastName: string;
      phone: string;
      passportNumber?: string;
      birthDate?: string;
      licenseImageUrl?: string;
      comment?: string;
    }) => {
      const { data } = await api.post<ApiBooking>("/bronlar", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
      qc.invalidateQueries({ queryKey: ["company-bookings"] });
    },
  });
}

export function useConfirmBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/bronlar/${id}/tasdiqlash`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["company-bookings"] });
    },
  });
}

export function useRejectBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      rejectReason,
    }: {
      id: string;
      rejectReason?: string;
    }) => {
      const { data } = await api.post(`/bronlar/${id}/rad-etish`, {
        rejectReason,
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["company-bookings"] });
    },
  });
}

export function useCancelBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/bronlar/${id}/bekor-qilish`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
      qc.invalidateQueries({ queryKey: ["company-bookings"] });
    },
  });
}

export function useCompleteBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/bronlar/${id}/yakunlash`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["company-bookings"] });
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
    },
  });
}

export function useRateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      score,
      comment,
    }: {
      id: string;
      score: number;
      comment?: string;
    }) => {
      const { data } = await api.post(`/bronlar/${id}/baholash`, {
        score,
        comment,
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
      qc.invalidateQueries({ queryKey: ["home"] });
      qc.invalidateQueries({ queryKey: ["companies"] });
    },
  });
}
