import UseCarBrands from "@/src/constants/UseCarBrands";
import AddCar from "./AddCar";
import UseAllCarsContext from "@/src/constants/UseAllCars";

export default function AddCar2() {
  return (
    <div>
      <UseCarBrands>
        <UseAllCarsContext>
          <AddCar />
        </UseAllCarsContext>
      </UseCarBrands>
    </div>
  );
}
