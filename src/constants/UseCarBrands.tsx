"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface CarBrandType {
  label: string;
  value: string;
}

interface CarBrandsContextType {
  carBrands: CarBrandType[];
  setCarBrands?: React.Dispatch<React.SetStateAction<CarBrandType[]>>;
  isLoaded?: boolean;
}

export const carBrand: CarBrandType[] = [
  { label: "Chevrolet", value: "CHEVROLET" },
  { label: "BMW", value: "BMW" },
  { label: "Mercedes-Benz", value: "MERCEDES_BENZ" },
  { label: "BYD", value: "BYD" },
  { label: "Toyota", value: "TOYOTA" },
  { label: "Kia", value: "KIA" },
  { label: "Hyundai", value: "HYUNDAI" },
  { label: "Volkswagen", value: "VOLKSWAGEN" },
  { label: "Audi", value: "AUDI" },
  { label: "Lexus", value: "LEXUS" },
  { label: "Tesla", value: "TESLA" },
  { label: "Nissan", value: "NISSAN" },
  { label: "Honda", value: "HONDA" },
  { label: "Mazda", value: "MAZDA" },
  { label: "Mitsubishi", value: "MITSUBISHI" },
  { label: "Subaru", value: "SUBARU" },
  { label: "Suzuki", value: "SUZUKI" },
  { label: "Ford", value: "FORD" },
  { label: "Renault", value: "RENAULT" },
  { label: "Peugeot", value: "PEUGEOT" },
  { label: "Porsche", value: "PORSCHE" },
  { label: "Land Rover", value: "LAND_ROVER" },
  { label: "Range Rover", value: "RANGE_ROVER" },
  { label: "Volvo", value: "VOLVO" },
  { label: "Geely", value: "GEELY" },
  { label: "Chery", value: "CHERY" },
  { label: "Changan", value: "CHANGAN" },
  { label: "Haval", value: "HAVAL" },
  { label: "Jetour", value: "JETOUR" },
  { label: "Exeed", value: "EXEED" },
  { label: "Zeekr", value: "ZEEKR" },
  { label: "Li Auto", value: "LI_AUTO" },
  { label: "Hongqi", value: "HONGQI" },
  { label: "GAC", value: "GAC" },
  { label: "Genesis", value: "GENESIS" },
  { label: "Infiniti", value: "INFINITI" },
  { label: "Jaguar", value: "JAGUAR" },
  { label: "Mini", value: "MINI" },
  { label: "Opel", value: "OPEL" },
  { label: "Skoda", value: "SKODA" },
  { label: "Daewoo", value: "DAEWOO" },
  { label: "Lada", value: "LADA" },
  { label: "Moskvich", value: "MOSKVICH" },
  { label: "Ravon", value: "RAVON" },
];

export const CarBrandsContext = createContext<CarBrandsContextType>({
  carBrands: carBrand,
});

export default function UseCarBrands({ children }: { children: ReactNode }) {
  const [carBrands, setCarBrands] = useState<CarBrandType[]>(carBrand);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCarBrand = localStorage.getItem("carBrands");

      if (savedCarBrand) {
        setCarBrands(JSON.parse(savedCarBrand));
      }
    } catch (error) {
      console.error("brand yuklashda xatolik:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("carBrands", JSON.stringify(carBrands));
  }, [carBrands, isLoaded]);

  return (
    <CarBrandsContext.Provider value={{ carBrands, setCarBrands, isLoaded }}>
      {children}
    </CarBrandsContext.Provider>
  );
}

export const UseCarBrand = () => {
  const context = useContext(CarBrandsContext);

  if (!context) {
    throw new Error("UseCarBrand Provider ichida ishlatilishi kerak");
  }

  return context;
};
