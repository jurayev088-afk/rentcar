"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { Car } from "../types";
import { useUser } from "./UseMeContext";
import { useFavorites, useToggleFavorite } from "../hooks/use-favorites";
import { mapApiCarToUi } from "../lib/map-car";
import { getAccessToken } from "../lib/auth-storage";
import { getApiErrorMessage } from "../lib/api-error";

interface WishlistContextType {
  wishlist: Car[];
  setWishlist: (cars: Car[]) => void;
  toggleWishlist: (car: Car) => void;
  isLoading: boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export default function UseWishlistContext({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();
  const { data: favoriteCars = [], isLoading } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  const wishlist = useMemo(
    () => favoriteCars.map(mapApiCarToUi),
    [favoriteCars],
  );

  const toggleWishlist = useCallback(
    (car: Car) => {
      if (!user && !getAccessToken()) {
        message.info("Sevimlilarga qo‘shish uchun tizimga kiring");
        router.push("/login");
        return;
      }

      if (user?.role !== "RENTER") {
        message.warning(
          "Sevimlilar faqat ijarachi hisobi uchun. Ijarachi sifatida kiring.",
        );
        return;
      }

      const isFavorite = wishlist.some((item) => item.id === car.id);
      toggleFavorite.mutate(
        { carId: String(car.id), isFavorite },
        {
          onSuccess: () => {
            message.success(
              isFavorite
                ? "Sevimlilardan olib tashlandi"
                : "Sevimlilarga qo‘shildi",
            );
          },
          onError: (error) => {
            message.error(
              getApiErrorMessage(error, "Sevimlilarni yangilab bo‘lmadi"),
            );
          },
        },
      );
    },
    [router, toggleFavorite, user, wishlist],
  );

  const value = useMemo(
    () => ({
      wishlist,
      setWishlist: () => undefined,
      toggleWishlist,
      isLoading,
    }),
    [wishlist, toggleWishlist, isLoading],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export const UseWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("UseWishlistContext Provider ichida ishlatilishi kerak");
  }

  return context;
};
