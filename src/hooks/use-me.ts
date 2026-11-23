"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { hasAccessToken } from "../lib/auth-storage";
import type { ApiUser } from "../types/api";

export const meQueryKey = ["me"] as const;

export function useMe() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasAccessToken());
    setReady(true);
  }, []);

  const query = useQuery({
    queryKey: meQueryKey,
    enabled: ready && enabled,
    queryFn: async () => {
      const { data } = await api.get<ApiUser>("/auth/men");
      return data;
    },
    retry: false,
    staleTime: 60_000,
  });

  return {
    user: enabled ? query.data ?? null : null,
    isLoading: !ready || (enabled && query.isLoading),
    isError: query.isError,
    refetch: query.refetch,
    isLoggedIn: Boolean(enabled && query.data),
  };
}
