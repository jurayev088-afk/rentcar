
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Car } from "../types";
import { useUser } from "./UseMeContext";
import { useRouter } from "next/navigation";

interface WishlistContextType {
  wishlist: Car[];
  setWishlist: React.Dispatch<React.SetStateAction<Car[]>>;
  toggleWishlist: (car: Car) => void;
}

export const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export default function UseWishlistContext({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<Car[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const {user} = useUser()
  const router = useRouter()

  // LocalStorage'dan ma'lumot olish
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");

      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Wishlist yuklashda xatolik:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Ma'lumot yuklangandan keyin saqlash
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  const toggleWishlist = (car: Car) => {
    if(user){
      setWishlist((prev) =>
      prev.some((item) => item.id === car.id)
        ? prev.filter((item) => item.id !== car.id)
        : [...prev, car]
    );
    }
    else{
      router.push('/login')
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const UseWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("UseWishlistContext Provider ichida ishlatilishi kerak");
  }

  return context;
};
