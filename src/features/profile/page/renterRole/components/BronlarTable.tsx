"use client";

import { useMemo, useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Search, CalendarDays, CarFront, Clock, XCircle } from "lucide-react";
import Image from "next/image";

import { bronlar as initialBronlar } from "./BronlarArray";
import { Booking, CarRenterStatus } from "@/src/types";

export default function BronlarTable() {
  const [bronlar, setBronlar] = useState<Booking[]>(initialBronlar);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("BARCHASI");

  const handleCancel = (id: string) => {
    setBronlar((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: CarRenterStatus.BekorQilingan }
          : item,
      ),
    );
    message.success("Bron muvaffaqiyatli bekor qilindi");
  };

  const filteredBronlar = useMemo(() => {
    return bronlar.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.car.toLowerCase().includes(searchValue) ||
        item.phone.toLowerCase().includes(searchValue) ||
        item.id.toLowerCase().includes(searchValue);

      const matchesStatus =
        filterStatus === "BARCHASI" || item.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bronlar, search, filterStatus]);

  const total = bronlar.length;
  const pending = bronlar.filter(
    (item) => item.status === CarRenterStatus.Kutilmoqda,
  ).length;
  const confirmed = bronlar.filter(
    (item) => item.status === CarRenterStatus.Tasdiqlangan,
  ).length;
  const cancelled = bronlar.filter(
    (item) => item.status === CarRenterStatus.BekorQilingan,
  ).length;

  const statusStyles: Record<string, string> = {
    [CarRenterStatus.Tasdiqlangan]:
      "bg-[#eaf6ef] text-[#00863e] ring-[#b9dfc6]",
    [CarRenterStatus.Kutilmoqda]:
      "bg-[#fff4e5] text-[#c47a10] ring-[#f0d4a8]",
    [CarRenterStatus.Faol]: "bg-[#e7f3ff] text-[#1d6fb8] ring-[#b7d7f0]",
    [CarRenterStatus.Yakunlangan]:
      "bg-[#eef2f0] text-[#5a675f] ring-[#d7ddd9]",
    [CarRenterStatus.BekorQilingan]: "bg-red-50 text-red-600 ring-red-200",
    [CarRenterStatus.RadEtilgan]: "bg-red-50 text-red-600 ring-red-200",
  };

  const columns: ColumnsType<Booking> = [
    {
      title: "Avtomobil",
      dataIndex: "car",
      key: "car",
      width: 260,
      render: (car: string, record) => (
        <div className="flex items-center gap-3">
          <div className="relative h-[58px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-[#eef2f0]">
            <Image
              className="object-cover"
              fill
              sizes="82px"
              src={record.image}
              alt={car}
            />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[#1f2d25]">{car}</p>
            <p className="mt-1 text-xs text-[#8d9892]">{record.id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Ijara muddati",
      key: "date",
      width: 190,
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm font-medium text-[#3f4b44]">
            <CalendarDays size={15} className="text-[#00863e]" />
            {record.startDate}
          </div>
          <div className="pl-[23px] text-xs text-[#8d9892]">
            {record.endDate} gacha
          </div>
        </div>
      ),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      width: 160,
      render: (price: string) => (
        <span className="font-semibold text-[#00863e]">{price}</span>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone: string) => (
        <span className="text-sm text-[#3f4b44]">{phone}</span>
      ),
    },
    {
      title: "Bron holati",
      dataIndex: "status",
      key: "status",
      width: 160,
      render: (status: string) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
            statusStyles[status] ||
            "bg-[#eef2f0] text-[#5a675f] ring-[#d7ddd9]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {status}
        </span>
      ),
    },
    {
      title: "Amallar",
      key: "action",
      width: 140,
      render: (_, record) => {
        if (
          record.status === CarRenterStatus.Kutilmoqda ||
          record.status === CarRenterStatus.Tasdiqlangan
        ) {
          return (
            <Popconfirm
              title="Bronni bekor qilmoqchimisiz?"
              description="Bu amalni qaytarib bo‘lmaydi."
              okText="Ha, bekor qilish"
              cancelText="Yo‘q"
              okButtonProps={{ danger: true }}
              onConfirm={() => handleCancel(record.id)}
            >
              <Button
                danger
                type="text"
                size="small"
                className="!rounded-full !font-semibold"
              >
                Bekor qilish
              </Button>
            </Popconfirm>
          );
        }

        return <span className="text-xs text-[#8d9892]">Amal mavjud emas</span>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] md:flex-row md:items-center md:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Ijarachi kabineti
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">
            Mening bronlarim
          </h1>
          <p className="mt-1 text-sm text-[#6d7a73]">
            Avtomobil ijaralaringizni boshqaring va kuzatib boring
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e8dd] bg-[#f6faf7] px-4 py-3">
          <CalendarDays size={18} className="text-[#00863e]" />
          <span className="text-sm font-semibold text-[#3f4b44]">
            Jami {total} ta bron
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Jami bronlar",
            value: total,
            icon: CarFront,
            tone: "bg-[#eaf6ef] text-[#00863e]",
          },
          {
            title: "Kutilmoqda",
            value: pending,
            icon: Clock,
            tone: "bg-[#fff4e5] text-[#c47a10]",
          },
          {
            title: "Tasdiqlangan",
            value: confirmed,
            icon: CalendarDays,
            tone: "bg-[#e7f3ff] text-[#1d6fb8]",
          },
          {
            title: "Bekor qilingan",
            value: cancelled,
            icon: XCircle,
            tone: "bg-red-50 text-red-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6d7a73]">{item.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#1f2d25]">
                    {item.value}
                  </h2>
                </div>
                <div className={`rounded-xl p-3 ${item.tone}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        <div className="flex flex-col justify-between gap-4 border-b border-[#eef2f0] p-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#1f2d25]">
              Bronlar ro‘yxati
            </h2>
            <p className="mt-1 text-xs text-[#8d9892]">
              Barcha avtomobil bronlaringiz
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              allowClear
              prefix={<Search size={17} className="text-[#8d9892]" />}
              placeholder="Avtomobil yoki telefon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="!h-10 !rounded-full sm:!w-[230px]"
            />

            <Select
              value={filterStatus}
              onChange={setFilterStatus}
              className="h-10 sm:w-[180px]"
              options={[
                { label: "Barcha holatlar", value: "BARCHASI" },
                ...Object.values(CarRenterStatus).map((status) => ({
                  label: status,
                  value: status,
                })),
              ]}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBronlar}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (count) => `Jami ${count} ta bron`,
          }}
          scroll={{ x: 950 }}
          locale={{
            emptyText: "Hozircha bronlar mavjud emas",
          }}
          className="[&_.ant-table-thead>tr>th]:!bg-[#f6faf7] [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-thead>tr>th]:!text-[#6d7a73] [&_.ant-pagination]:!px-4 [&_.ant-pagination]:!py-3"
          rowClassName="hover:!bg-[#f8fbf9]"
        />
      </div>
    </div>
  );
}
