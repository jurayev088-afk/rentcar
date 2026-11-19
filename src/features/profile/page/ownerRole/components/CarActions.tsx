"use client";

import { UseAllCars } from "@/src/constants/UseAllCars";
import { Button, message, Space } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Car } from "@/src/types";

export default function CarActions({ record }: { record: Car }) {
  const { removeCar } = UseAllCars();
  const router = useRouter();

  const handleDelete = () => {
    removeCar(record.id);
    message.success("Avtomobil o‘chirildi");
  };

  return (
    <Space size={4}>
      <Button
        type="text"
        className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !text-[#00863e] hover:!bg-[#eaf6ef]"
        icon={<Eye size={16} />}
        onClick={() => router.push(`/profile/owner/moshinalarim/${record?.id}`)}
      />
      <Button
        type="text"
        className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !text-[#3f4b44] hover:!bg-[#f3f6f4]"
        icon={<Pencil size={16} />}
        onClick={() =>
          router.push(`/profile/owner/moshinalarim/qoshish/${record?.id}`)
        }
      />
      <Button
        type="text"
        danger
        className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl hover:!bg-red-50"
        icon={<Trash2 size={16} />}
        onClick={handleDelete}
      />
    </Space>
  );
}
