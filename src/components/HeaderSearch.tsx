"use client";

import { Button, DatePicker, Form, Select } from "antd";
import { CalendarDays, MapPin, Search, ArrowRight } from "lucide-react";
import { regions } from "../features/profile/page/ownerRole/components/AddCar";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    const params = new URLSearchParams();

    if (values.startDate) {
      params.set("startDate", values.startDate.format("YYYY-MM-DD"));
    }

    if (values.endDate) {
      params.set("endDate", values.endDate.format("YYYY-MM-DD"));
    }

    if (values.location) {
      params.set("location", values.location);
    }

    router.push(`/cars?${params.toString()}`);
  };

  const fieldClass =
    "group flex h-15 flex-1 items-center gap-3.5 rounded-[19px] border border-[#e9ecef] bg-[#fafbfc] px-4 py-3 transition-all duration-200 hover:border-[#cbded3] hover:bg-white focus-within:border-[#00863e] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,134,62,0.07)] sm:px-5";

  const itemClass =
    "!mb-0 min-w-0 flex-1 [&_.ant-form-item-control-input]:!min-h-0 [&_.ant-form-item-control-input-content]:min-w-0";

  const iconClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#e8f3ec] text-[#00863e] transition-colors group-hover:bg-[#dceee3]";

  const selectClass =
    "!h-auto w-full !border-0 !bg-transparent !p-0 !shadow-none [&_.ant-select-selector]:!h-auto [&_.ant-select-selector]:!min-h-0 [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!p-0 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-[15px] [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!leading-[1.4] [&_.ant-select-selection-item]:!text-[#17211c] [&_.ant-select-selection-placeholder]:!text-[14px] [&_.ant-select-selection-placeholder]:!font-medium [&_.ant-select-selection-placeholder]:!text-[#9aa19d] [&_.ant-select-arrow]:!text-[#8a9690]";

  const pickerClass =
    "!w-full !border-0 !bg-transparent !p-0 !shadow-none [&_.ant-picker-input>input]:!text-[14px] [&_.ant-picker-input>input]:!font-semibold [&_.ant-picker-input>input]:!leading-[1.4] [&_.ant-picker-input>input]:!text-[#17211c] [&_.ant-picker-input>input::placeholder]:!font-medium [&_.ant-picker-input>input::placeholder]:!text-[#9aa19d] [&_.ant-picker-suffix]:!hidden";

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="w-full rounded-[25px] mb-10! border border-white bg-white p-3 shadow-[0_16px_50px_rgba(20,35,28,0.10)] sm:rounded-[30px] sm:p-4 lg:p-[18px]"
    >
      <div className="flex w-full min-w-0 flex-col p-3 gap-3 sm:gap-3.5 lg:flex-row lg:items-stretch lg:gap-3">
        {/* Hudud */}
        <div>
          <div className={fieldClass}>
            <div className={iconClass}>
              <MapPin size={19} strokeWidth={2} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Form.Item name="location" className={itemClass}>
                <Select
                  size="large"
                  showSearch
                  allowClear
                  placeholder="Hududni tanlang"
                  options={regions.map((region) => ({
                    label: region,
                    value: region,
                  }))}
                  className={selectClass}
                />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Olish sanasi */}
        <div className={fieldClass}>
          <div className={iconClass}>
            <CalendarDays size={19} strokeWidth={2} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Form.Item name="startDate" className={itemClass}>
              <DatePicker
                size="large"
                showTime
                format="DD.MM.YYYY HH:mm"
                placeholder="Boshlanish sana va vaqt"
                className={pickerClass}
              />
            </Form.Item>
          </div>
        </div>

        {/* Qaytarish sanasi */}
        <div className={fieldClass}>
          <div className={iconClass}>
            <CalendarDays size={19} strokeWidth={2} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Form.Item name="endDate" className={itemClass}>
              <DatePicker
                size="large"
                showTime
                format="DD.MM.YYYY HH:mm"
                placeholder="Tugash sana va vaqt"
                // variant="borderless"
                className={pickerClass}
              />
            </Form.Item>
          </div>
        </div>

        {/* Qidirish */}
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={<Search size={20} strokeWidth={2.3} />}
          className="h-15! rounded-[15px]!"
        >
          Mashina qidirish
          <ArrowRight size={17} />
        </Button>
      </div>
    </Form>
  );
}
