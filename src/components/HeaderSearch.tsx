"use client";
import { Button, DatePicker, Form, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { regions } from "../features/profile/page/ownerRole/components/AddCar";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    // router.push("/cars");
    const params = new URLSearchParams()

    if(values.startDate){
      params.set("startDate", values.startDate.format('YYYY-MM-DD'))
    }
    if(values?.endDate){
      params.set("endDate", values?.endDate.format('YYYY-MM-DD'))
    }
    if(values?.location){
      params?.set("location", values?.location)
    }

    router.push(`/cars?${params?.toString()}`)
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className=" flex items-end justify-between gap-4"
      >
        <Form.Item label="Qayerdan" name="location" className="!mb-0 flex-1">
          <Select
            size="large"
            showSearch
            placeholder="Hududni tanlang"
            options={regions.map((x) => ({
              label: x,
              value: x,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Olish va qaytarish sanasi"
          name="startDate"
          className="!mb-0 flex-1"
        >
          <DatePicker
            size="large"
            showTime
            format="DD.MM.YYYY HH:mm"
            placeholder={"Olish sanasi"}
            className="w-full rounded-xl"
          />
        </Form.Item>

        <Form.Item
          label="Olish va qaytarish sanasi"
          name="endDate"
          className="!mb-0 flex-1"
        >
          <DatePicker
            size="large"
            showTime
            format="DD.MM.YYYY HH:mm"
            placeholder={"Qaytarish sanasi"}
            className="w-full rounded-xl"
          />
        </Form.Item>

        <Form.Item className="!mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<SearchOutlined />}
            className="h-10 rounded-xl font-semibold"
          >
            Mashina qidirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
