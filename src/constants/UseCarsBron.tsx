'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookingType } from "../types";

interface BookingContextType {
  bookings: BookingType[];
  setBookings: React.Dispatch<React.SetStateAction<BookingType[]>>;
  addBooking: (booking: BookingType) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export default function UseCarsBron({ children }: { children: ReactNode }) {
  const [carBron, setCarBron] = useState<BookingType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("carBron");

      if (saved) {
        setCarBron(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Bronlarni yuklashda xatolik:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("carBron", JSON.stringify(carBron));
  }, [carBron, isLoaded]);

  const addBron = (values: BookingType) => {
    setCarBron((prev) => [...prev, values]);
  };
  return (
    <BookingContext.Provider value={{ carBron, setCarBron, addBron, isLoaded }}>
      {children}
    </BookingContext.Provider>
  );
}

export const UseBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("UseBookings Provider ichida ishlatilishi kerak");
  }

  return context;
};
