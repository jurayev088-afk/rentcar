"use client";

import { UseBookings } from "@/src/constants/UseCarsBron";
import { Table, Button, Image, Space, Tooltip, Empty } from "antd";
import {
  PhoneOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  passportNumber: string;
  birthDate: string;
  startDate: string;
  endDate: string;
  comment: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  pravaImg: {
    uid: string;
    name: string;
    thumbUrl?: string;
    url?: string;
    type?: string;
  }[];
}

export default function BronlarTable() {
  const { carBron, setCarBron, isLoaded } = UseBookings();

  const updateStatus = (id: number, status: Booking["status"]) => {
    setCarBron((prev: Booking[]) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "-";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const statusStyles = {
    PENDING: "bg-[#fff4e5] text-[#c47a10] ring-[#f0d4a8]",
    CONFIRMED: "bg-[#eaf6ef] text-[#00863e] ring-[#b9dfc6]",
    REJECTED: "bg-red-50 text-red-600 ring-red-200",
  } as const;

  const statusLabels = {
    PENDING: "Kutilmoqda",
    CONFIRMED: "Tasdiqlangan",
    REJECTED: "Rad etilgan",
  } as const;

  const columns: ColumnsType<Booking> = [
    {
      title: "Mijoz",
      key: "customer",
      width: 190,
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ef] text-lg text-[#00863e]">
            <UserOutlined />
          </div>
          <div>
            <p className="font-semibold text-[#1f2d25]">
              {record.firstName} {record.lastName}
            </p>
            <p className="mt-1 text-xs text-[#8d9892]">ID: {record.id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      width: 155,
      render: (phone: string) => (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 font-medium text-[#3f4b44] transition hover:text-[#00863e]"
        >
          <PhoneOutlined className="text-[#00863e]" />
          {phone}
        </a>
      ),
    },
    {
      title: "Pasport",
      dataIndex: "passportNumber",
      key: "passportNumber",
      width: 140,
      render: (value: string) => (
        <span className="rounded-lg bg-[#f3f6f4] px-3 py-2 font-mono text-xs font-semibold text-[#3f4b44]">
          {value || "-"}
        </span>
      ),
    },
    {
      title: "Tug‘ilgan sana",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 145,
      render: (date: string) => (
        <span className="text-sm text-[#6d7a73]">{formatDate(date)}</span>
      ),
    },
    {
      title: "Boshlanishi",
      dataIndex: "startDate",
      key: "startDate",
      width: 155,
      render: (date: string) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-[#00863e]" />
          <span className="text-sm font-medium text-[#3f4b44]">
            {formatDate(date)}
          </span>
        </div>
      ),
    },
    {
      title: "Tugashi",
      dataIndex: "endDate",
      key: "endDate",
      width: 145,
      render: (date: string) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-red-500" />
          <span className="text-sm font-medium text-[#3f4b44]">
            {formatDate(date)}
          </span>
        </div>
      ),
    },
    {
      title: "Izoh",
      dataIndex: "comment",
      key: "comment",
      width: 180,
      render: (comment: string) => (
        <Tooltip title={comment}>
          <p className="max-w-[160px] truncate text-sm text-[#6d7a73]">
            {comment || "Izoh yo'q"}
          </p>
        </Tooltip>
      ),
    },
    {
      title: "Guvohnoma",
      dataIndex: "pravaImg",
      key: "pravaImg",
      width: 160,
      render: (images) => (
        <Space>
          {images?.length > 0 ? (
            images.map((file: Booking["pravaImg"][number]) => (
              <Image
                key={file.uid}
                src={file.thumbUrl || file.url}
                alt={file.name}
                width={48}
                height={42}
                className="rounded-lg object-cover"
                fallback=""
              />
            ))
          ) : (
            <span className="text-xs text-[#8d9892]">Rasm yo‘q</span>
          )}
        </Space>
      ),
    },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
      width: 140,
      fixed: "right",
      render: (status: Booking["status"]) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
            statusStyles[status] || "bg-[#eef2f0] text-[#5a675f] ring-[#d7ddd9]"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabels[status] || status}
        </span>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space>
          {record.status === "PENDING" && (
            <>
              <Tooltip title="Bronni tasdiqlash">
                <Button
                  type="primary"
                  size="small"
                  className="!rounded-full !border-0 !bg-[#00863e] hover:!bg-[#006f35]"
                  onClick={() => updateStatus(record.id, "CONFIRMED")}
                >
                  Tasdiqlash
                </Button>
              </Tooltip>

              <Tooltip title="Bronni rad etish">
                <Button
                  danger
                  size="small"
                  className="!rounded-full"
                  onClick={() => updateStatus(record.id, "REJECTED")}
                >
                  Rad etish
                </Button>
              </Tooltip>
            </>
          )}

          {record.status === "CONFIRMED" && (
            <span className="inline-flex rounded-full bg-[#eaf6ef] px-3 py-1.5 text-xs font-semibold text-[#00863e]">
              Tasdiqlangan
            </span>
          )}

          {record.status === "REJECTED" && (
            <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
              Rad etilgan
            </span>
          )}
        </Space>
      ),
    },
  ];

  if (!isLoaded) {
    return (
      <div className="flex justify-center rounded-3xl border border-[#e5e9e7] bg-white py-20 text-[#00863e]">
        Ma&apos;lumotlar yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] md:flex-row md:items-center md:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Egasi kabineti
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">Bronlar</h1>
          <p className="mt-1 text-sm text-[#6d7a73]">
            Mijozlar tomonidan yuborilgan barcha bronlarni boshqaring.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-2xl border border-[#e5e9e7] bg-[#f6faf7] px-4 py-3">
            <p className="text-xs text-[#8d9892]">Jami bronlar</p>
            <p className="mt-1 text-xl font-bold text-[#1f2d25]">
              {carBron.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#f0d4a8] bg-[#fff4e5] px-4 py-3">
            <p className="text-xs text-[#c47a10]">Kutilmoqda</p>
            <p className="mt-1 text-xl font-bold text-[#c47a10]">
              {carBron.filter((x: Booking) => x.status === "PENDING").length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#b9dfc6] bg-[#eaf6ef] px-4 py-3">
            <p className="text-xs text-[#00863e]">Tasdiqlangan</p>
            <p className="mt-1 text-xl font-bold text-[#00863e]">
              {carBron.filter((x: Booking) => x.status === "CONFIRMED").length}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        <Table<Booking>
          columns={columns}
          dataSource={carBron}
          rowKey="id"
          scroll={{ x: 1800 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Jami ${total} ta bron`,
          }}
          className="[&_.ant-table-thead>tr>th]:!bg-[#f6faf7] [&_.ant-table-thead>tr>th]:!text-[#6d7a73] [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-pagination]:!px-4 [&_.ant-pagination]:!py-3"
          rowClassName="hover:!bg-[#f8fbf9]"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Hozircha bronlar mavjud emas"
              />
            ),
          }}
        />
      </div>
    </div>
  );
}
