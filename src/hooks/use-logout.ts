"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../services/api";
import { clearTokens, getRefreshToken } from "../lib/auth-storage";
import { getErrorMessage } from "../lib/get-error-message";
import { meQueryKey } from "./use-me";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      try {
        await api.post("/auth/chiqish", { refreshToken });
      } catch {
        // Token bo‘lmasa ham lokal chiqish
      }
    },
    onSuccess: () => {
      clearTokens();
      queryClient.setQueryData(meQueryKey, null);
      queryClient.removeQueries({ queryKey: meQueryKey });
      message.success("Tizimdan chiqdingiz");
    },
    onError: (error) => {
      clearTokens();
      queryClient.setQueryData(meQueryKey, null);
      message.error(getErrorMessage(error, "Chiqishda xatolik"));
    },
  });
}
