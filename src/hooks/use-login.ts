"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../services/api";
import { setTokens } from "../lib/auth-storage";
import { getErrorMessage } from "../lib/get-error-message";
import { normalizePhoneInput } from "../lib/media";
import type { AuthResponse } from "../types/api";
import { meQueryKey } from "./use-me";

type LoginPayload = {
  phone: string;
  password: string;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<AuthResponse>("/auth/kirish", {
        phone: normalizePhoneInput(payload.phone),
        password: payload.password,
      });
      return data;
    },
    onSuccess: async (data) => {
      setTokens(data.accessToken, data.refreshToken);
      await queryClient.invalidateQueries({ queryKey: meQueryKey });
      message.success("Tizimga muvaffaqiyatli kirdingiz");
    },
    onError: (error) => {
      message.error(getErrorMessage(error, "Telefon yoki parol noto‘g‘ri"));
    },
  });
}
