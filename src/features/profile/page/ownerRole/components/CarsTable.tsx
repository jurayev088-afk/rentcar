"use client";

import { UseAllCars } from "@/src/constants/UseAllCars";
import { Car, carStatus } from "@/src/types";
import { ColumnsType } from "antd/es/table";
import { Table, Image } from "antd";
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
        images?.[0] ? (
          <Image
            src={images[0].thumbUrl}
            alt="Car"
            width={75}
            height={55}
            className="rounded-xl object-cover"
          />
        ) : (
          <span className="text-[#8d9892]">Rasm yo‘q</span>
        ),
    },
    {
      title: "Avtomobil",
      dataIndex: "model",
      key: "carName",
      render: (name, record) => (
        <div>
          <p className="font-semibold text-[#1f2d25]">{name}</p>
          <p className="mt-0.5 text-xs text-[#8d9892]">{record.number || "—"}</p>
        </div>
      ),
    },
    {
      title: "Marka",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => (
        <span className="inline-flex rounded-full bg-[#eaf6ef] px-3 py-1 text-xs font-semibold text-[#00863e]">
          {brand}
        </span>
      ),
    },
    {
      title: "Kategoriya",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="inline-flex rounded-full bg-[#f3f6f4] px-3 py-1 text-xs font-semibold text-[#3f4b44]">
          {category || "—"}
        </span>
      ),
    },
    {
      title: "Yili",
      dataIndex: "year",
      key: "year",
      render: (year) => (
        <span className="text-sm font-medium text-[#3f4b44]">{year}</span>
      ),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-semibold text-[#00863e]">
          {Number(price).toLocaleString("uz-UZ")} so‘m
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusStyles: Record<string, string> = {
          MAVJUD: "bg-[#eaf6ef] text-[#00863e] ring-[#b9dfc6]",
          IJARADA: "bg-[#e7f3ff] text-[#1d6fb8] ring-[#b7d7f0]",
          BRON_QILINGAN: "bg-[#fff4e5] text-[#c47a10] ring-[#f0d4a8]",
        };

        const statusLabel =
          carStatus.find((item) => item.value === status)?.label || status;

        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
              statusStyles[status] ||
              "bg-[#eef2f0] text-[#5a675f] ring-[#d7ddd9]"
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
      render: (_, record) => <CarActions record={record} />,
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
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
        className="[&_.ant-table-thead>tr>th]:!bg-[#f6faf7] [&_.ant-table-thead>tr>th]:!text-[#6d7a73] [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-pagination]:!px-4 [&_.ant-pagination]:!py-3"
        rowClassName="hover:!bg-[#f8fbf9]"
      />
    </div>
  );
}
