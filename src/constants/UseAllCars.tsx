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
}

export const AllCarsContext = createContext<AllCarsContextType | undefined>(
  undefined
);

export default function UseAllCarsContext({
  children,
}: {
  children: ReactNode;
}) {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(allCars);

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

  const removeCar = (id:string) => {
    const cars = JSON.parse(localStorage.getItem("allCars") || "[]")

    const updatedCars = cars.filter((car:Car) => car?.id !== id)

    setAllCars(updatedCars)

    localStorage.setItem("allCars", JSON.stringify(updatedCars))
  }

  return (
    <AllCarsContext.Provider value={{ allCars, setAllCars, removeCar, isLoaded }}>
      {children}
    </AllCarsContext.Provider>
  );
}

export const UseAllCars = () => {
  const context = useContext(AllCarsContext);

  if (!context) {
    throw new Error(
      "UseAllCarsContext Provider ichida ishlatilishi kerak"
    );
  }

  return context;
};