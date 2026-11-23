"use client";

import { useState } from "react";
import {
  Button,
  Empty,
  Form,
  Input,
  Select,
  Spin,
  Tag,
  message,
} from "antd";
import { AlertTriangle, Send } from "lucide-react";
import {
  useCreateShikoyat,
  useMyShikoyatlar,
} from "@/src/hooks/use-shikoyatlar";

const { TextArea } = Input;

const SUBJECT_OPTIONS = [
  { label: "Bron bilan bog‘liq shikoyat", value: "bron", subject: "Bron bilan bog‘liq shikoyat" },
  { label: "To‘lov bilan bog‘liq shikoyat", value: "payment", subject: "To‘lov bilan bog‘liq shikoyat" },
  { label: "Avtomobil holati", value: "car", subject: "Avtomobil holati" },
  { label: "Kompaniya xizmati", value: "company", subject: "Kompaniya xizmati" },
  { label: "Boshqa shikoyat", value: "other", subject: "Boshqa shikoyat" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  NEW: { label: "Yangi", color: "blue" },
  IN_REVIEW: { label: "Ko‘rib chiqilmoqda", color: "orange" },
  RESOLVED: { label: "Hal qilindi", color: "green" },
  REJECTED: { label: "Rad etildi", color: "red" },
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function ShikoyatlarPage({
  roleLabel,
}: {
  roleLabel: string;
}) {
  const [form] = Form.useForm();
  const { data, isLoading, refetch } = useMyShikoyatlar();
  const create = useCreateShikoyat();
  const [submitting, setSubmitting] = useState(false);

  const items = data?.items ?? [];

  const onFinish = async (values: {
    type: string;
    description: string;
  }) => {
    const option = SUBJECT_OPTIONS.find((o) => o.value === values.type);
    setSubmitting(true);
    try {
      await create.mutateAsync({
        type: values.type,
        subject: option?.subject ?? values.type,
        description: values.description.trim(),
      });
      message.success("Shikoyat yuborildi. Javob Xabarlar bo‘limiga keladi.");
      form.resetFields();
      void refetch();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string | string[] } } })
          ?.response?.data?.message;
      message.error(
        Array.isArray(msg)
          ? msg[0]
          : typeof msg === "string"
            ? msg
            : "Shikoyat yuborilmadi",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
          {roleLabel}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">Shikoyatlar</h1>
        <p className="mt-1 text-sm text-[#6d7a73]">
          Shikoyatingiz CRM dagi Shikoyatlar bo‘limiga boradi. Javob Xabarlarda
          chiqadi.
        </p>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff4e8] text-[#c2410c]">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1f2d25]">
              Shikoyat yuborish
            </h2>
            <p className="text-sm text-[#6d7a73]">
              Muammoni aniq va qisqa yozing.
            </p>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Shikoyat turi"
            name="type"
            rules={[{ required: true, message: "Turini tanlang" }]}
          >
            <Select
              size="large"
              placeholder="Shikoyat turini tanlang"
              options={SUBJECT_OPTIONS.map(({ label, value }) => ({
                label,
                value,
              }))}
              className="!rounded-xl"
            />
          </Form.Item>

          <Form.Item
            label="Tavsif"
            name="description"
            rules={[
              { required: true, message: "Shikoyat matnini yozing" },
              { min: 5, message: "Kamida 5 belgi yozing" },
            ]}
          >
            <TextArea
              rows={4}
              maxLength={2000}
              showCount
              placeholder="Nima bo‘lganini batafsil yozing..."
              className="!rounded-xl"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={submitting}
            icon={<Send size={16} />}
            className="!h-11 !rounded-full !border-0 !bg-[#00863e] !px-6 !font-bold hover:!bg-[#006f35]"
          >
            Shikoyat yuborish
          </Button>
        </Form>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-[#1f2d25]">
          Mening shikoyatlarim
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : items.length === 0 ? (
          <Empty description="Hali shikoyat yubormagansiz" />
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const status = STATUS_MAP[item.status] ?? {
                label: item.status,
                color: "default",
              };
              return (
                <li
                  key={item.id}
                  className="rounded-2xl border border-[#eef2f0] bg-[#f8faf9] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-[#1f2d25]">{item.subject}</p>
                    <Tag color={status.color}>{status.label}</Tag>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#6d7a73]">
                    {item.description}
                  </p>
                  {item.adminReply && (
                    <div className="mt-3 rounded-xl border border-[#c6e5d1] bg-[#eff8f2] p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#00863e]">
                        CRM javobi
                      </p>
                      <p className="mt-1 text-sm text-[#2f6b49]">
                        {item.adminReply}
                      </p>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-[#9aa59e]">
                    {formatDate(item.createdAt)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
