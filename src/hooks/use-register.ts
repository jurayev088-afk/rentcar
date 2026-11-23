"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import api from "../services/api";
import { setTokens } from "../lib/auth-storage";
import { getErrorMessage } from "../lib/get-error-message";
import { normalizePhoneInput } from "../lib/media";
import type { ApiRole, AuthResponse } from "../types/api";
import { meQueryKey } from "./use-me";

type RegisterPayload = {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role: Extract<ApiRole, "USER" | "COMPANY">;
  companyName?: string;
  stir?: string;
};

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const body = {
        fullName: payload.fullName.trim(),
        phone: normalizePhoneInput(payload.phone),
        email: payload.email || undefined,
        password: payload.password,
        role: payload.role,
        companyName: payload.companyName?.trim(),
        companyAddress: payload.stir ? `STIR: ${payload.stir}` : undefined,
      };
      const { data } = await api.post<AuthResponse>(
        "/auth/royxatdan-otish",
        body,
      );
      return data;
    },
    onSuccess: async (data) => {
      setTokens(data.accessToken, data.refreshToken);
      await queryClient.invalidateQueries({ queryKey: meQueryKey });
      message.success("Hisob muvaffaqiyatli yaratildi");
    },
    onError: (error) => {
      message.error(
        getErrorMessage(error, "Ro‘yxatdan o‘tishda xatolik yuz berdi"),
      );
    },
  });
}
