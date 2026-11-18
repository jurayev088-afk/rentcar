
"use client";

import { UseAllCars } from "@/src/constants/UseAllCars";
import { Car, carStatus } from "@/src/types";
import { ColumnsType } from "antd/es/table";
import { Table, Tag, Image, Button, Space } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import CarActions from "./CarActions";

export default function CarsTable() {
  const { allCars } = UseAllCars();

  const columns: ColumnsType<Car> = [
    {
      title: "Rasm",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (images) =>
        images[0] ? (
          <Image
            src={images[0].thumbUrl}
            alt="Car"
            width={75}
            height={55}
            className="rounded-lg object-cover"
          />
        ) : (
          <span className="text-gray-400">Rasm yo‘q</span>
        ),
    },
    {
      title: "Avtomobil nomi",
      dataIndex: "model",
      key: "model",
      render: (name) => (
        <span className="font-semibold">{name}</span>
      ),
    },
    {
      title: "Marka",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => <Tag color="blue">{brand}</Tag>,
    },
    {
      title: "Kategoriya",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="purple">{category}</Tag>,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Yili",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-semibold text-green-600">
          {Number(price).toLocaleString("uz-UZ")} so‘m
        </span>
      ),
    },
    {
      title: "Nomer",
      dataIndex: "number",
      key: "number",
    },
   {
  title: "Status",
  dataIndex: "status",
  key: "status",
  render: (status: string) => {
    const statusStyles: Record<string, string> = {
      MAVJUD: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      IJARADA: "bg-blue-50 text-blue-700 ring-blue-200",
      BRON_QILINGAN: "bg-orange-50 text-orange-700 ring-orange-200",
    };

    const statusLabel =
      carStatus.find((item) => item.value === status)?.label || status;

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
          statusStyles[status] || "bg-slate-100 text-slate-600 ring-slate-200"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {statusLabel}
      </span>
    );
  },
},
    {
      title: "Amallar",
      key: "actions",
      fixed: "right",
      width: 130,
      render: (_, record) => (
       <CarActions record={record}/>
      ),
    },
  ];

  return (
    <Table<Car>
      columns={columns}
      dataSource={allCars || []}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total) => `Jami ${total} ta avtomobil`,
      }}
      scroll={{ x: 1100 }}
      locale={{
        emptyText: "Hozircha avtomobillar mavjud emas",
      }}
      rowClassName="hover:bg-gray-50"
    />
  );
}
