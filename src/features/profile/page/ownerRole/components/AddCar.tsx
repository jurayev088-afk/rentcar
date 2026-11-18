"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { UploadFile } from "antd";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  Checkbox,
  Divider,
  Switch,
  message,
} from "antd";
import {
  CarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CameraOutlined,
  FileTextOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";

import { CarBrandType, UseCarBrand } from "@/src/constants/UseCarBrands";
import { carCategory } from "@/src/features/mashinalar/components/Filter";
import { UseAllCars } from "@/src/constants/UseAllCars";
import { Car, carStatus } from "@/src/types";

const { TextArea } = Input;

export const regions = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg'ona",
  "Namangan",
  "Xorazm",
  "Navoiy",
  "Qashqadaryo",
  "Surxondaryo",
  "Jizzax",
  "Sirdaryo",
  "Qoraqalpog'iston",
];

function SectionTitle({
  icon,
  title,
  description,
  number,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  number: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1F33] text-xl text-white shadow-lg shadow-blue-950/10">
        {icon}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#0B1F33]">{title}</h2>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
            {number}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md md:p-7">
      {children}
    </div>
  );
}

export default function AddCar() {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [depositEnabled, setDepositEnabled] = useState(false);

  const { carBrands } = UseCarBrand();
  const { allCars, setAllCars, isLoaded } = UseAllCars();

  const params = useParams();
  const router = useRouter();

  const id = params.id as string | undefined;
  const isEdit = Boolean(id);

  // Mashinani ID orqali topamiz
  const editingCar = allCars.find((car) => String(car.id) === String(id));

  // Dinamik matnlar
  const pageTitle = isEdit
    ? "Mashinangiz e'lonini tahrirlang"
    : "Mashinangizni ijaraga bering";

  const pageDescription = isEdit
    ? "Avtomobil ma'lumotlarini yangilang va o'zgarishlarni saqlang."
    : "Avtomobilingiz haqida ma'lumotlarni kiriting, rasmlarini yuklang va e'loningizni joylashtiring.";

  // Edit paytida formani to'ldirish
  useEffect(() => {
    if (!isEdit || !isLoaded) return;

    if (!editingCar) {
      message.error("Mashina topilmadi");
      router.replace("/profile/owner/moshinalarim");
      return;
    }

    form.setFieldsValue({
      ...editingCar,
    });

    setDepositEnabled(Boolean(editingCar.deposit));

    if (editingCar.images) {
      setFileList(editingCar.images as UploadFile[]);
      form.setFieldValue("images", editingCar.images);
    }
  }, [id, isLoaded, editingCar, form, router, isEdit]);

  // Add va Edit
  const onFinish = (values: Car) => {
    if (isEdit) {
      if (!editingCar) {
        message.error("Tahrirlanadigan mashina topilmadi");
        return;
      }

      setAllCars((prev) =>
        prev.map((car) =>
          String(car.id) === String(id)
            ? {
                ...car,
                ...values,
                id: car.id,
              }
            : car,
        ),
      );

      message.success("Mashina muvaffaqiyatli yangilandi");

      router.push("/profile/owner/moshinalarim");
    } else {
      setAllCars((prev) => [
        ...prev,
        {
          ...values,
          id: Date.now().toString(),
        },
      ]);

      message.success("Mashina muvaffaqiyatli qo'shildi");

      form.resetFields();
      setFileList([]);
      setDepositEnabled(false);
    }
    router.push("/profile/owner/moshinalarim");
  };

  // Edit ma'lumotlari yuklanayotgan payt
  if (isEdit && !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F6F9]">
        <p className="text-lg font-semibold text-[#0B1F33]">
          Ma'lumotlar yuklanmoqda...
        </p>
      </div>
    );
  }

  if (isEdit && !editingCar) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F6F9]">
        <p className="text-lg font-semibold text-slate-500">
          Mashina topilmadi
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] pb-20">
      {/* HERO */}
      <div className="relative overflow-hidden bg-[#0B1F33] px-5 py-14 md:py-16">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-200">
            <CarOutlined />
            Avto Bozor / {isEdit ? "E'lonni tahrirlash" : "Ijara"}
          </div>

          <div className="mt-7 max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
              {pageTitle}
            </h1>

            <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
              {pageDescription}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {(isEdit
              ? [
                  "Ma'lumotlarni yangilash",
                  "Oson boshqaruv",
                  "E'lonni tahrirlash",
                ]
              : ["Bepul e'lon", "Oson boshqaruv", "To'g'ridan-to'g'ri bron"]
            ).map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200"
              >
                <CheckCircleOutlined className="text-green-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto mt-6 max-w-[1200px] px-4">
        {/* FORM HEADER */}
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-md md:p-7">
          <h2 className="text-xl font-bold text-[#0B1F33]">
            {isEdit ? "E'lon ma'lumotlarini tahrirlash" : "Yangi ijara e'loni"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {isEdit
              ? "Kerakli maydonlarni o'zgartiring va o'zgarishlarni saqlang."
              : "E'loningiz qanchalik batafsil bo'lsa, mijozlar uni shunchalik oson topishadi."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["01", "Avtomobil"],
              ["02", "Texnik holat"],
              ["03", "Narx va manzil"],
              ["04", "Rasmlar"],
            ].map(([num, title]) => (
              <div
                key={num}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1F33] text-xs font-bold text-white">
                  {num}
                </span>
                <span className="text-xs font-semibold text-slate-700 md:text-sm">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{
            status:"Mavjud",
            transmission: "Avtomat",
            fuel: "Benzin",
            airCondition:true,
            condition: "A'lo",
            minDays: 1,
            seats: 5,
          }}
          className="rental-form"
        >
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_300px]">
            {/* LEFT FORM */}
            <div>
              {/* 01 CAR */}
              <FormCard>
                <SectionTitle
                  number="01"
                  icon={<CarOutlined />}
                  title="Avtomobil haqida"
                  description="Mashinaning asosiy ma'lumotlarini kiriting."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Avtomobil markasi"
                    name="brand"
                    rules={[{ required: true, message: "Markani tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      placeholder="Markani tanlang"
                      options={carBrands.map((x: CarBrandType) => ({
                        label: x.label,
                        value: x.value,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Category" name="category">
                    <Select
                      size="large"
                      showSearch
                      placeholder="Category tanlang"
                      options={carCategory.map((x: CarBrandType) => ({
                        label: x.label,
                        value: x.value,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Modeli"
                    name="model"
                    rules={[{ required: true, message: "Modelni kiriting" }]}
                  >
                    <Input size="large" placeholder="Masalan: Malibu 2" />
                  </Form.Item>

                  <Form.Item
                    label="Ishlab chiqarilgan yili"
                    name="year"
                    rules={[{ required: true, message: "Yilni tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      placeholder="Yilni tanlang"
                      options={Array.from({ length: 30 }, (_, i) => {
                        const year = 2026 - i;
                        return { label: String(year), value: year };
                      })}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Rangi"
                    name="color"
                    rules={[{ required: true, message: "Rangini kiriting" }]}
                  >
                    <Input size="large" placeholder="Masalan: Qora" />
                  </Form.Item>

                  <Form.Item label="Davlat raqami" name="number">
                    <Input size="large" placeholder="01 A 123 BC" />
                  </Form.Item>

                  <Form.Item label="Status" name="status">
                    <Select
                    placeholder={"Status tanlang"}
                      options={carStatus?.map((item) => {
                       return {
                          label: item?.label,
                          value:item?.value
                        }
                      })}
                    />
                  </Form.Item>

                  <Form.Item label="Telefon raqam" name="phone">
                    <Input size="large" placeholder="+998 93 777 77 77" />
                  </Form.Item>
                </div>
              </FormCard>

              {/* 02 TECHNICAL */}
              <FormCard>
                <SectionTitle
                  number="02"
                  icon={<SettingOutlined />}
                  title="Texnik xususiyatlari"
                  description="Avtomobilning texnik holati va jihozlari."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Uzatmalar qutisi"
                    name="transmission"
                    rules={[{ required: true, message: "Tanlang" }]}
                  >
                    <Select
                      size="large"
                      options={[
                        { label: "Avtomat", value: "Avtomat" },
                        { label: "Mexanika", value: "Mexanika" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Yoqilg'i turi"
                    name="fuel"
                    rules={[{ required: true, message: "Tanlang" }]}
                  >
                    <Select
                      size="large"
                      options={[
                        { label: "Benzin", value: "Benzin" },
                        { label: "Metan", value: "Metan" },
                        { label: "Propan", value: "Propan" },
                        { label: "Dizel", value: "Dizel" },
                        { label: "Gibrid", value: "Gibrid" },
                        { label: "Elektro", value: "Elektro" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="Dvigatel hajmi (L)" name="engine">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={0}
                      step={0.1}
                      placeholder="Masalan: 2.0"
                    />
                  </Form.Item>

                  <Form.Item label="O'rindiqlar soni" name="seats">
                    <Select
                      size="large"
                      options={[2, 3, 4, 5, 6, 7, 8, 9].map((x) => ({
                        label: `${x} ta`,
                        value: x,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Konditsioner" name="airCondition">
                    <Select
                      size="large"
                      placeholder="Tanlang"
                      options={[
                        { label: "Bor", value: true },
                        { label: "Yo'q", value: false },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="Avtomobil holati" name="condition">
                    <Select
                      size="large"
                      options={[
                        { label: "A'lo", value: "A'lo" },
                        { label: "Yaxshi", value: "Yaxshi" },
                        { label: "O'rtacha", value: "O'rtacha" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </FormCard>

              {/* 03 LOCATION */}
              <FormCard>
                <SectionTitle
                  number="03"
                  icon={<EnvironmentOutlined />}
                  title="Joylashuv"
                  description="Avtomobil joylashgan hududni belgilang."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Viloyat / Shahar"
                    name="region"
                    rules={[{ required: true, message: "Hududni tanlang" }]}
                  >
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
                    label="Tuman"
                    name="district"
                    rules={[{ required: true, message: "Tumanni kiriting" }]}
                  >
                    <Input size="large" placeholder="Masalan: Chilonzor" />
                  </Form.Item>

                  <Form.Item
                    label="Aniq manzil"
                    name="address"
                    className="md:col-span-2"
                  >
                    <Input size="large" placeholder="Ko'cha, uy yoki mo'ljal" />
                  </Form.Item>
                </div>
              </FormCard>

              {/* 04 PRICE */}
              <FormCard>
                <SectionTitle
                  number="04"
                  icon={<DollarOutlined />}
                  title="Ijara narxi va shartlari"
                  description="Narx va ijaraga berish talablaringizni belgilang."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Kunlik ijara narxi (so'm)"
                    name="price"
                    rules={[
                      { required: true, message: "Narxni kiriting" },
                      {
                        type: "number",
                        min: 1000,
                        message: "Narx kamida 1 000 so'm bo'lishi kerak",
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1000}
                      placeholder="Masalan: 500000"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : ""
                      }
                      parser={(value) => Number(value?.replace(/\s/g, "") || 0)}
                    />
                  </Form.Item>

                  <Form.Item label="Oldingi narxi (so'm)" name="oldPrice">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1000}
                      placeholder="Ixtiyoriy"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : ""
                      }
                      parser={(value) => Number(value?.replace(/\s/g, "") || 0)}
                    />
                  </Form.Item>

                  <Form.Item label="Garov puli (so'm)" name="deposit">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={0}
                      disabled={!depositEnabled}
                      placeholder="Garov miqdori"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : ""
                      }
                      parser={(value) => Number(value?.replace(/\s/g, "") || 0)}
                    />
                  </Form.Item>

                  <Form.Item label="Minimal ijara muddati (kun)" name="minDays">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1}
                      placeholder="1"
                    />
                  </Form.Item>
                </div>

                <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-semibold text-[#0B1F33]">
                      Garov talab qilinadi
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Ijaraga oluvchidan qaytariladigan kafolat puli.
                    </p>
                  </div>

                  <Switch
                    checked={depositEnabled}
                    onChange={(checked) => {
                      setDepositEnabled(checked);

                      if (!checked) {
                        form.setFieldValue("deposit", undefined);
                      }
                    }}
                  />
                </div>

                <Form.Item label="Ijara shartlari" name="rules">
                  <TextArea
                    rows={4}
                    maxLength={1000}
                    showCount
                    placeholder="Masalan: Mashinani toza holatda qaytarish, chet elga olib chiqmaslik..."
                  />
                </Form.Item>
              </FormCard>

              {/* 05 IMAGES */}
              <FormCard>
                <SectionTitle
                  number="05"
                  icon={<CameraOutlined />}
                  title="Avtomobil rasmlari"
                  description="Mashinangizni turli tomondan suratga olib yuklang."
                />

                <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex gap-3">
                    <InfoCircleOutlined className="mt-0.5 text-blue-600" />

                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Sifatli rasmlar ko'proq mijoz jalb qiladi
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Oldi, orqasi, yon tomoni va salon rasmlarini yuklashni
                        tavsiya qilamiz. Maksimal 10 ta rasm.
                      </p>
                    </div>
                  </div>
                </div>

                <Form.Item
                  name="images"
                  rules={[
                    {
                      required: true,
                      message: "Kamida bitta rasm yuklang",
                    },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    accept="image/*"
                    multiple
                    maxCount={10}
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={({ fileList: newList }) => {
                      setFileList(newList);
                      form.setFieldValue("images", newList);
                    }}
                  >
                    {fileList.length < 10 && (
                      <div className="flex flex-col items-center gap-2">
                        <CloudUploadOutlined className="text-2xl text-[#0B1F33]" />
                        <span className="text-xs font-medium">
                          Rasm yuklash
                        </span>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </FormCard>

              {/* 06 DESCRIPTION */}
              <FormCard>
                <SectionTitle
                  number="06"
                  icon={<FileTextOutlined />}
                  title="Qo'shimcha ma'lumot"
                  description="Avtomobilingiz haqida batafsil yozing."
                />

                <Form.Item label="Avtomobil tavsifi" name="description">
                  <TextArea
                    rows={5}
                    maxLength={1500}
                    showCount
                    placeholder="Avtomobilning afzalliklari, holati, qulayliklari va boshqa muhim ma'lumotlar..."
                  />
                </Form.Item>
              </FormCard>

              {/* AGREEMENT */}
              <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  className="!mb-0"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Rozilik bildirishingiz kerak"),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    Kiritilgan ma'lumotlar to'g'riligini tasdiqlayman va ijara
                    shartlariga roziman.
                  </Checkbox>
                </Form.Item>
              </div>

              {/* SUBMIT */}
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                className="!h-14 !rounded-xl !bg-[#0B1F33] !text-base !font-semibold shadow-lg shadow-blue-950/10 hover:!bg-[#173b5d]"
              >
                <CarOutlined />
                {isEdit ? "O'zgarishlarni saqlash" : "E'lonni joylashtirish"}
              </Button>

              <p className="mt-4 text-center text-xs text-slate-400">
                {isEdit
                  ? "O'zgarishlar saqlangandan so'ng e'loningiz yangilangan ma'lumotlar bilan ko'rinadi."
                  : "E'lon joylashtirilgandan so'ng uni profilingizdan boshqarishingiz mumkin."}
              </p>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-[#0B1F33] p-6 text-white shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                  <SafetyCertificateOutlined />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {isEdit
                    ? "E'loningizni yangilang"
                    : "Ishonchli e'lon yarating"}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isEdit
                    ? "Ma'lumotlarni to'g'ri va dolzarb saqlang. Bu mijozlarning sizga bo'lgan ishonchini oshiradi."
                    : "Barcha ma'lumotlarni to'g'ri kiriting. Bu mijozlarning sizga ishonchini oshiradi."}
                </p>

                <Divider className="!border-white/15" />

                <div className="space-y-5">
                  {[
                    [
                      "01",
                      "To'liq ma'lumot",
                      "Mashina xususiyatlarini kiriting",
                    ],
                    [
                      "02",
                      "Sifatli rasmlar",
                      "Kamida 4 ta rasm tavsiya qilinadi",
                    ],
                    ["03", "Aniq narx", "Kunlik ijara narxini belgilang"],
                    ["04", "To'g'ri manzil", "Hudud va tumanni ko'rsating"],
                  ].map(([num, title, desc]) => (
                    <div key={num} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-blue-300">
                        {num}
                      </span>

                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="mt-1 text-xs text-slate-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROFILE INFO */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg text-green-600">
                    <CheckCircleOutlined />
                  </div>

                  <div>
                    <p className="font-bold text-[#0B1F33]">
                      {isEdit ? "E'lonni boshqarish" : "Profilingiz orqali"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {isEdit
                        ? "Ma'lumotlarni yangilash"
                        : "E'lonlarni boshqarish"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {isEdit
                    ? "E'loningizni tahrirlashingiz, rasmlarini yangilashingiz va ijara shartlarini o'zgartirishingiz mumkin."
                    : "E'lon joylashtirilgach, bronlar, ijaraga oluvchilar, sanalar va daromadlaringiz Profile bo'limida ko'rinadi."}
                </p>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
