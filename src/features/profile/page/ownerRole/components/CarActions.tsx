import { UseAllCars } from "@/src/constants/UseAllCars";
import { Button, message, Space } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CarActions({ record }) {
  const { removeCar } = UseAllCars();
  const router = useRouter()

  const handleDelete = () => {
    removeCar(record.id);
    message.success("Avtomobil o‘chirildi");
  };

  return (
    <Space>
      <Button
        type="text"
        icon={<Eye size={17} />}
        onClick={() => router.push(`/profile/owner/moshinalarim/${record?.id}`)}
      />
      <Button
        type="text"
        icon={<Pencil size={17} />}
        onClick={() => router.push(`/profile/owner/moshinalarim/qoshish/${record?.id}`)}
      />
      <Button
        type="text"
        danger
        icon={<Trash2 size={17} />}
        onClick={() => handleDelete()}
      />
    </Space>
  );
}
