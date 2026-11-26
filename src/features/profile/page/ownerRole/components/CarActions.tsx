"use client";

import { Button, message, Popconfirm, Space } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Car } from "@/src/types";
import { useDeleteCar } from "@/src/hooks/use-my-cars";

export default function CarActions({ record }: { record: Car }) {
  const router = useRouter();
  const deleteCar = useDeleteCar();

  const handleDelete = async () => {
    try {
      await deleteCar.mutateAsync(record.id);
      message.success("Avtomobil o‘chirildi");
    } catch {
      message.error("O‘chirishda xatolik");
    }
  };

  return (
    <Space size={4}>
      <Button
        type="text"
        className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !text-[#00863e] hover:!bg-[#eaf6ef]"
        icon={<Eye size={16} />}
        onClick={() => router.push(`/cars/${record.id}`)}
      />
      <Button
        type="text"
        className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl !text-[#3f4b44] hover:!bg-[#f3f6f4]"
        icon={<Pencil size={16} />}
        onClick={() =>
          router.push(`/profile/owner/moshinalarim/qoshish/${record.id}`)
        }
      />
      <Popconfirm
        title="Avtomobilni o‘chirasizmi?"
        description="Bu amalni bekor qilib bo‘lmaydi (bron bo‘lsa yashiriladi)."
        okText="Ha, o‘chirish"
        cancelText="Yo‘q"
        onConfirm={handleDelete}
      >
        <Button
          type="text"
          danger
          loading={deleteCar.isPending}
          className="!flex !h-9 !w-9 !items-center !justify-center !rounded-xl hover:!bg-red-50"
          icon={<Trash2 size={16} />}
        />
      </Popconfirm>
    </Space>
  );
}
