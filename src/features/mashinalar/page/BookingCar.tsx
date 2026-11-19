"use client";

import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Spin,
  Upload,
  type UploadFile,
} from "antd";

import {
  CalendarOutlined,
  CarOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PhoneOutlined,
  CloudUploadOutlined,
  IdcardOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import { useParams, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import dayjs from "dayjs";
import { UseBookings } from "@/src/constants/UseCarsBron";
import { BookingType } from "@/src/types";

export default function BookingCar() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { isLoaded, addBron } = UseBookings();
  const router = useRouter();
  const startDate = Form.useWatch("startDate", form);

  const onFinish = async (values: BookingType) => {
    try {
      setLoading(true);
      addBron({ ...values, id: Date.now(), status: "PENDING" });
      message.success("Bron so'rovingiz tayyor!");
      form.resetFields();
      setFileList([]);
      router.push("/profile/renter/bronlarim");
    } catch (error: any) {
      console.error(error);
      message.error(
        error?.response?.data?.message || "Bron qilishda xatolik yuz berdi",
      );
    } finally {
      setLoading(false);
    }
  };

  const sectionTitle = (
    icon: ReactNode,
    title: string,
    description: string,
  ): ReactNode => (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
        {icon}
      </div>
      <div>
        <h2 className="font-semibold text-[#1f2d25]">{title}</h2>
        <p className="text-xs text-[#8d9892]">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f4f6f5] px-3 pb-16 pt-8 sm:px-5 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-[#6d7a73]">
            <CarOutlined className="text-[#00863e]" />
            <span>RENTO</span>
            <span>/</span>
            <span className="font-medium text-[#1f2d25]">
              Mashina bron qilish
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#1f2d25]">
            Mashinani bron qilish
          </h1>
          <p className="mt-2 text-sm text-[#6d7a73]">
            Ma’lumotlaringizni kiriting va ijara muddatini belgilang.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-7">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="large"
            >
              {sectionTitle(
                <UserOutlined className="text-xl" />,
                "Shaxsiy ma’lumotlar",
                "Siz bilan bog‘lanish uchun",
              )}

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                <Form.Item
                  name="firstName"
                  label="Ismingiz"
                  rules={[{ required: true, message: "Ismingizni kiriting" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-[#8d9892]" />}
                    placeholder="Abdulloh"
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Familiyangiz"
                  rules={[
                    { required: true, message: "Familiyangizni kiriting" },
                  ]}
                >
                  <Input placeholder="Jo'rayev" className="!h-12 !rounded-xl" />
                </Form.Item>
              </div>

              <Form.Item
                name="phone"
                label="Telefon raqamingiz"
                rules={[
                  {
                    required: true,
                    message: "Telefon raqamingizni kiriting",
                  },
                  {
                    pattern: /^\+998\d{9}$/,
                    message: "Masalan: +998901234567",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-[#8d9892]" />}
                  placeholder="+998901234567"
                  className="!h-12 !rounded-xl"
                />
              </Form.Item>

              {sectionTitle(
                <IdcardOutlined className="text-xl" />,
                "Pasport ma’lumotlari",
                "Shaxsingizni tasdiqlash uchun",
              )}

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                <Form.Item
                  name="passportNumber"
                  label="Pasport seriyasi va raqami"
                  rules={[
                    {
                      required: true,
                      message: "Pasport raqamingizni kiriting",
                    },
                    {
                      pattern: /^[A-Z]{2}\d{7}$/,
                      message: "Masalan: AA1234567",
                    },
                  ]}
                  normalize={(value) => value?.toUpperCase()}
                >
                  <Input
                    placeholder="AA1234567"
                    maxLength={9}
                    className="!h-12 !rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  name="birthDate"
                  label="Tug‘ilgan sanangiz"
                  rules={[
                    {
                      required: true,
                      message: "Tug‘ilgan sanangizni tanlang",
                    },
                  ]}
                >
                  <DatePicker
                    className="!h-12 !w-full !rounded-xl"
                    format="DD.MM.YYYY"
                    placeholder="Kun / Oy / Yil"
                    disabledDate={(date) => date.isAfter(dayjs(), "day")}
                  />
                </Form.Item>
              </div>

              <div className="my-5 border-t border-[#eef2f0]" />

              {sectionTitle(
                <CalendarOutlined className="text-xl" />,
                "Ijara muddati",
                "Olish va qaytarish sanasini tanlang",
              )}

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                <Form.Item
                  name="startDate"
                  label="Olish sanasi"
                  rules={[
                    { required: true, message: "Olish sanasini tanlang" },
                  ]}
                >
                  <DatePicker
                    showTime
                    className="!h-12 !w-full !rounded-xl"
                    format="DD.MM.YYYY HH:mm"
                    placeholder="Boshlanish sanasi"
                    disabledDate={(date) =>
                      date.isBefore(dayjs().startOf("day"))
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="endDate"
                  label="Qaytarish sanasi"
                  dependencies={["startDate"]}
                  rules={[
                    {
                      required: true,
                      message: "Qaytarish sanasini tanlang",
                    },
                    {
                      validator: (_, value) => {
                        if (!value || !startDate) return Promise.resolve();
                        if (value.isAfter(startDate)) return Promise.resolve();
                        return Promise.reject(
                          new Error(
                            "Qaytarish sanasi olish sanasidan keyin bo‘lishi kerak",
                          ),
                        );
                      },
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    className="!h-12 !w-full !rounded-xl"
                    format="DD.MM.YYYY HH:mm"
                    placeholder="Tugash sanasi"
                    disabled={!startDate}
                    disabledDate={(date) =>
                      !startDate || !date.isAfter(startDate, "day")
                    }
                  />
                </Form.Item>
              </div>

              {sectionTitle(
                <SolutionOutlined className="text-xl" />,
                "Haydovchilik guvohnomasi",
                "Guvohnomangiz rasmini yuklang",
              )}

              <Form.Item
                name="pravaImg"
                label="Guvohnoma rasmi"
                rules={[
                  {
                    validator: () => {
                      if (fileList.length === 0) {
                        return Promise.reject(
                          new Error("Guvohnoma rasmini yuklang"),
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  accept="image/*"
                  maxCount={1}
                  fileList={fileList}
                  beforeUpload={() => false}
                  onChange={({ fileList: next }) => {
                    const newFileList = next.slice(-1);
                    setFileList(newFileList);
                    form.setFieldValue("pravaImg", newFileList);
                  }}
                >
                  {fileList.length < 1 && (
                    <div className="flex flex-col items-center gap-2">
                      <CloudUploadOutlined className="text-2xl text-[#00863e]" />
                      <span className="text-xs font-medium">Rasm yuklash</span>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item name="comment" label="Qo‘shimcha izoh (ixtiyoriy)">
                <Input.TextArea
                  rows={3}
                  placeholder="Qo‘shimcha talablaringiz bo‘lsa yozing..."
                  maxLength={500}
                  showCount
                  className="!rounded-xl"
                />
              </Form.Item>

              <div className="mt-4 rounded-2xl border border-[#c6e5d1] bg-[#eff8f2] p-4">
                <div className="flex gap-3">
                  <CheckCircleOutlined className="mt-1 text-[#00863e]" />
                  <p className="text-sm leading-6 text-[#2f6b49]">
                    Bron so‘rovingiz mashina egasiga yuboriladi. Egasi
                    tasdiqlaganidan keyin bron holatini profilingizda
                    ko‘rishingiz mumkin.
                  </p>
                </div>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                block
                loading={loading}
                className="!mt-6 !h-12 !rounded-full !border-0 !bg-[#00863e] !font-bold !shadow-[0_8px_18px_rgba(0,134,62,0.22)] hover:!bg-[#006f35]"
              >
                {!isLoaded ? <Spin /> : "Bron qilish"}
              </Button>
            </Form>
          </div>

          <div className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00863e] text-white">
                  <CarOutlined className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1f2d25]">Bron haqida</h3>
                  <p className="text-xs text-[#8d9892]">Muhim ma’lumotlar</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  [
                    "1. Bron so‘rovi",
                    "Ma’lumotlaringiz mashina egasiga yuboriladi.",
                  ],
                  [
                    "2. Egasi tasdiqlaydi",
                    "Mashina egasi ma’lumotlaringizni tasdiqlaganda sizga telefon qiladi.",
                  ],
                  [
                    "3. Bron holatini kuzating",
                    "Barcha bronlaringiz profilingizda saqlanadi.",
                  ],
                ].map(([title, desc]) => (
                  <div key={title}>
                    <p className="text-sm font-medium text-[#1f2d25]">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-[#6d7a73]">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[linear-gradient(145deg,#0f2a1c,#165a36_55%,#00863e)] p-6 text-white shadow-[0_14px_32px_rgba(0,134,62,0.18)]">
              <h3 className="text-lg font-semibold">Ishonchli va qulay ijara</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Bron qilishdan oldin sanalarni va shaxsiy ma’lumotlaringizni
                tekshirib chiqing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
