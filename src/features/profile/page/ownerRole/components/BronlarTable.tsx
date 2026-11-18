"use client";

import { UseBookings } from "@/src/constants/UseCarsBron";
import { Table, Tag, Button, Image, Space, Tooltip, Empty } from "antd";
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

  const statusInfo = {
    PENDING: {
      label: "Kutilmoqda",
      color: "warning",
    },
    CONFIRMED: {
      label: "Tasdiqlangan",
      color: "success",
    },
    REJECTED: {
      label: "Rad etilgan",
      color: "error",
    },
  } as const;

  const columns: ColumnsType<Booking> = [
    {
      title: "MIJOZ",
      key: "customer",
      width: 190,
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#0B1F33]">
            <UserOutlined />
          </div>

          <div>
            <p className="font-semibold text-[#0B1F33]">
              {record.firstName} {record.lastName}
            </p>
            <p className="mt-1 text-xs text-slate-400">ID: {record.id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "TELEFON",
      dataIndex: "phone",
      key: "phone",
      width: 155,
      render: (phone: string) => (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 font-medium text-slate-600"
        >
          <PhoneOutlined className="text-green-600" />
          {phone}
        </a>
      ),
    },
    {
      title: "PASPORT",
      dataIndex: "passportNumber",
      key: "passportNumber",
      width: 140,
      render: (value: string) => (
        <span className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs font-semibold text-slate-700">
          {value || "-"}
        </span>
      ),
    },
    {
      title: "TUG'ILGAN SANA",
      dataIndex: "birthDate",
      key: "birthDate",
      width: 145,
      render: (date: string) => (
        <span className="text-sm text-slate-600">{formatDate(date)}</span>
      ),
    },
    {
      title: "BRON BOSHLANISHI",
      dataIndex: "startDate",
      key: "startDate",
      width: 165,
      render: (date: string) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-green-600" />
          <span className="text-sm font-medium text-slate-700">
            {formatDate(date)}
          </span>
        </div>
      ),
    },
    {
      title: "BRON TUGASHI",
      dataIndex: "endDate",
      key: "endDate",
      width: 165,
      render: (date: string) => (
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-red-500" />
          <span className="text-sm font-medium text-slate-700">
            {formatDate(date)}
          </span>
        </div>
      ),
    },
    {
      title: "IZOH",
      dataIndex: "comment",
      key: "comment",
      width: 180,
      render: (comment: string) => (
        <Tooltip title={comment}>
          <p className="max-w-[160px] truncate text-sm text-slate-500">
            {comment || "Izoh yo'q"}
          </p>
        </Tooltip>
      ),
    },
    {
      title: "HAYDOVCHILIK GUVOHNOMASI",
      dataIndex: "pravaImg",
      key: "pravaImg",
      width: 190,
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
            <span className="text-xs text-slate-400">Rasm mavjud emas</span>
          )}
        </Space>
      ),
    },
    {
      title: "HOLATI",
      dataIndex: "status",
      key: "status",
      width: 135,
      fixed: "right",
      render: (status: Booking["status"]) => {
        const info = statusInfo[status];

        return (
          <Tag color={info?.color || "default"}>{info?.label || status}</Tag>
        );
      },
    },
    {
      title: "AMALLAR",
      key: "actions",
      width: 190,
      fixed: "right",
      render: (_, record) => (
        <Space>
          {record.status === "PENDING" && (
            <>
              <Tooltip title="Bronni tasdiqlash">
                <Button
                  type="primary"
                  size="small"
                  className="!bg-green-600"
                  onClick={() => updateStatus(record.id, "CONFIRMED")}
                >
                  Tasdiqlash
                </Button>
              </Tooltip>

              <Tooltip title="Bronni rad etish">
                <Button
                  danger
                  size="small"
                  onClick={() => updateStatus(record.id, "REJECTED")}
                >
                  Rad etish
                </Button>
              </Tooltip>
            </>
          )}

          {record.status === "CONFIRMED" && (
            <Tag color="success">Tasdiqlangan</Tag>
          )}

          {record.status === "REJECTED" && <Tag color="error">Rad etilgan</Tag>}
        </Space>
      ),
    },
  ];

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-20">
        Ma'lumotlar yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">Bronlar</h1>
          <p className="mt-2 text-sm text-slate-500">
            Mijozlar tomonidan yuborilgan barcha bronlarni boshqaring.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs text-slate-400">Jami bronlar</p>
            <p className="mt-1 text-xl font-bold text-[#0B1F33]">
              {carBron.length}
            </p>
          </div>

          <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
            <p className="text-xs text-orange-600">Kutilmoqda</p>
            <p className="mt-1 text-xl font-bold text-orange-700">
              {carBron.filter((x: Booking) => x.status === "PENDING").length}
            </p>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
            <p className="text-xs text-green-600">Tasdiqlangan</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {carBron.filter((x: Booking) => x.status === "CONFIRMED").length}
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
