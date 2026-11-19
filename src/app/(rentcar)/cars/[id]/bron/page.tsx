import UseCarsBron from "@/src/constants/UseCarsBron";
import BookingAccess from "@/src/features/mashinalar/components/BookingAccess";
import BookingCar from "@/src/features/mashinalar/page/BookingCar";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <BookingAccess carId={id}>
      <UseCarsBron>
        <BookingCar />
      </UseCarsBron>
    </BookingAccess>
  );
}
