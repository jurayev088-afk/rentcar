"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import { useMe } from "../hooks/use-me";
import { useLogout } from "../hooks/use-logout";
import type { ApiUser } from "../types/api";

/** Eski UI mosligi: USER → RENTER, COMPANY → OWNER */
export type Account = {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  password?: string;
  role: "RENTER" | "OWNER" | "ADMIN";
  companyName?: string;
  stir?: string;
  avatarUrl?: string | null;
};

export type UserContextType = {
  user: Account | null;
  users: Account[];
  loading: boolean;
  setUser: (user: Account | null) => void;
  logIn: (registeredUser: Account) => void;
  logOut: () => void;
  registerUser: (newUser: Account) => void;
  apiUser: ApiUser | null;
};

const UserContext = createContext<UserContextType | null>(null);

function mapRole(role: ApiUser["role"]): Account["role"] {
  if (role === "COMPANY") return "OWNER";
  if (role === "ADMIN") return "ADMIN";
  return "RENTER";
}

function mapUser(user: ApiUser): Account {
  return {
    id: user.id,
    fullName: user.fullName,
    phone: user.phone,
    email: user.email ?? undefined,
    role: mapRole(user.role),
    companyName: user.company?.name,
    avatarUrl: user.avatarUrl,
  };
}

export default function UseMeContext({ children }: { children: ReactNode }) {
  const { user, isLoading } = useMe();
  const logout = useLogout();

  const value = useMemo<UserContextType>(
    () => ({
      user: user ? mapUser(user) : null,
      apiUser: user ?? null,
      users: [],
      loading: isLoading,
      setUser: () => undefined,
      logIn: () => undefined,
      logOut: () => logout.mutate(),
      registerUser: () => undefined,
    }),
    [user, isLoading, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser UseMeContext ichida ishlatilishi kerak");
  }
  return context;
};
