"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Car } from "../types";

interface AllCarsContextType {
  allCars: Car[];
  setAllCars: React.Dispatch<React.SetStateAction<Car[]>>;
  removeCar: (id: string) => void;
  isLoaded: boolean;
}

export const AllCarsContext = createContext<AllCarsContextType | undefined>(
  undefined,
);

export default function UseAllCarsContext({
  children,
}: {
  children: ReactNode;
}) {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedAllCars = localStorage.getItem("allCars");
      if (savedAllCars) {
        setAllCars(JSON.parse(savedAllCars));
      }
    } catch (error) {
      console.error("Moshinalar yuklashda xatolik:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("allCars", JSON.stringify(allCars));
  }, [allCars, isLoaded]);

  const removeCar = (id: string) => {
    setAllCars((prev) => prev.filter((car) => car?.id !== id));
  };

  return (
    <AllCarsContext.Provider
      value={{ allCars, setAllCars, removeCar, isLoaded }}
    >
      {children}
    </AllCarsContext.Provider>
  );
}

export const UseAllCars = () => {
  const context = useContext(AllCarsContext);

  if (!context) {
    throw new Error("UseAllCarsContext Provider ichida ishlatilishi kerak");
  }

  return context;
};
