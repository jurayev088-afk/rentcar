"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { hasAccessToken } from "../lib/auth-storage";
import type { Paginated } from "../types/api";

export type AppNotification = {
  id: string;
  type: string;
  title: string;
  body: string;
  entityType?: string | null;
  entityId?: string | null;
  isRead: boolean;
  createdAt: string;
};

type NotificationsResponse = Paginated<AppNotification> & {
  unreadCount?: number;
};

export function useNotifications(enabled = true) {
  const canFetch = enabled && hasAccessToken();

  return useQuery({
    queryKey: ["notifications"],
    enabled: canFetch,
    queryFn: async () => {
      const { data } = await api.get<NotificationsResponse>("/bildirishnomalar", {
        params: { page: 1, limit: 50 },
      });
      return {
        items: Array.isArray(data?.items) ? data.items : [],
        unreadCount: data?.unreadCount ?? 0,
        meta: data?.meta ?? { page: 1, limit: 50, total: 0, totalPages: 0 },
      };
    },
    staleTime: 10_000,
    refetchInterval: canFetch ? 30_000 : false,
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch(`/bildirishnomalar/${id}/oqildi`);
      return data;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/bildirishnomalar/hammasini-oqish");
      return data;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
