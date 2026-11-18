
"use client";

import { useMemo, useState } from "react";
import {
  Table,
  Tag,
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

  // Bronni bekor qilish
  const handleCancel = (id: string) => {
    setBronlar((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: CarRenterStatus.BekorQilingan }
          : item
      )
    );

    message.success("Bron muvaffaqiyatli bekor qilindi");
  };

  // Qidiruv va filter
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

  // Statistikalar
  const total = bronlar.length;
  const pending = bronlar.filter(
    (item) => item.status === CarRenterStatus.Kutilmoqda
  ).length;
  const confirmed = bronlar.filter(
    (item) => item.status === CarRenterStatus.Tasdiqlangan
  ).length;
  const cancelled = bronlar.filter(
    (item) => item.status === CarRenterStatus.BekorQilingan
  ).length;

  // Status ranglari
  const getStatusColor = (status: string) => {
    switch (status) {
      case CarRenterStatus.Tasdiqlangan:
        return "success";
      case CarRenterStatus.Kutilmoqda:
        return "processing";
      case CarRenterStatus.Faol:
        return "blue";
      case CarRenterStatus.Yakunlangan:
        return "default";
      case CarRenterStatus.BekorQilingan:
        return "error";
      case CarRenterStatus.RadEtilgan:
        return "warning";
      default:
        return "default";
    }
  };

  const columns: ColumnsType<Booking> = [
    {
      title: "AVTOMOBIL",
      dataIndex: "car",
      key: "car",
      width: 260,
      render: (car: string, record) => (
        <div className="flex items-center gap-3">
          <div className="relative h-[58px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-gray-100">
            <Image
              className="object-cover"
              fill
              sizes="82px"
              src={record.image}
              alt={car}
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-[#0B1F33]">{car}</p>
            <p className="mt-1 text-xs text-gray-400">
              {record.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "IJARA MUDDATI",
      key: "date",
      width: 190,
      render: (_, record) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <CalendarDays size={15} className="text-gray-400" />
            {record.startDate}
          </div>
          <div className="pl-[23px] text-xs text-gray-400">
            {record.endDate} gacha
          </div>
        </div>
      ),
    },
    {
      title: "NARXI",
      dataIndex: "price",
      key: "price",
      width: 160,
      render: (price: string) => (
        <span className="font-semibold text-[#0B1F33]">
          {price}
        </span>
      ),
    },
    {
      title: "TELEFON",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      render: (phone: string) => (
        <span className="text-sm text-gray-600">{phone}</span>
      ),
    },
    {
      title: "BRON HOLATI",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: string) => (
        <Tag
          color={getStatusColor(status)}
          className="rounded-full px-3 py-1 text-xs font-medium"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "AMALLAR",
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
              <Button danger type="text" size="small">
                Bekor qilish
              </Button>
            </Popconfirm>
          );
        }

        return (
          <span className="text-xs text-gray-400">
            Amal mavjud emas
          </span>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-7">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F33]">
              Mening bronlarim
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Avtomobil ijaralaringizni boshqaring va kuzatib boring
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
            <CalendarDays size={19} className="text-[#0B1F33]" />
            <span className="text-sm font-medium text-gray-600">
              Jami {total} ta bron
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Jami bronlar",
              value: total,
              icon: CarFront,
              color: "bg-blue-50 text-blue-600",
            },
            {
              title: "Kutilmoqda",
              value: pending,
              icon: Clock,
              color: "bg-amber-50 text-amber-600",
            },
            {
              title: "Tasdiqlangan",
              value: confirmed,
              icon: CalendarDays,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              title: "Bekor qilingan",
              value: cancelled,
              icon: XCircle,
              color: "bg-red-50 text-red-600",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {item.title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table section */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#0B1F33]">
                Bronlar ro‘yxati
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Barcha avtomobil bronlaringiz
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                allowClear
                prefix={<Search size={17} className="text-gray-400" />}
                placeholder="Avtomobil yoki telefon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 sm:w-[230px]"
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
              showTotal: (total) => `Jami ${total} ta bron`,
            }}
            scroll={{ x: 950 }}
            locale={{
              emptyText: "Hozircha bronlar mavjud emas",
            }}
            rowClassName="hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
