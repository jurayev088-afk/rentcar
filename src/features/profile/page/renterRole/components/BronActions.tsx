import { Booking, CarRenterStatus } from "@/src/types";
import { Button } from "antd";

interface Props {
  record: Booking;
  onCancel: (id: string) => void;
}

export default function BronActions({ record, onCancel }: Props) {
  if (record.status === CarRenterStatus.Kutilmoqda) {
    return (
      <Button danger onClick={() => onCancel(record.id)}>
        Bekor qilish
      </Button>
    );
  }

  return null;
}