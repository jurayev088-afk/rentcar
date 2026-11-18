import UseAllCarsContext from "@/src/constants/UseAllCars";
import CarDetails from "@/src/features/mashinalar/page/CarDetails";

export default function page() {
  return (
    <div>
      <UseAllCarsContext>
        <CarDetails/>
      </UseAllCarsContext>
    </div>
  )
}
