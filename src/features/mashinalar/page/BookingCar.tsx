"use client";

import api from "@/src/services/api";
import {
  Button,
  Card,
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
import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { UseBookings } from "@/src/constants/UseCarsBron";
import { BookingType } from "@/src/types";



export default function BookingCar() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {isLoaded, addBron} = UseBookings()

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const startDate = Form.useWatch("startDate", form);

  const onFinish = async (values: BookingType) => {
    try {
      addBron({...values, id:Date.now(), status:'PENDING'})

      message.success("Bron so'rovingiz tayyor!");
      form.resetFields()
      setFileList([])

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

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 pb-16 pt-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <CarOutlined />
            <span>Avto Bozor</span>
            <span>/</span>
            <span className="text-[#0B1F33]">Mashina bron qilish</span>
          </div>

          <h1 className="text-3xl font-bold text-[#0B1F33]">
            Mashinani bron qilish
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Ma’lumotlaringizni kiriting va ijara muddatini belgilang.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1fr_350px]">
          {/* Form */}
          <Card
            className="!rounded-2xl !shadow-sm"
            styles={{ body: { padding: 28 } }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="large"
            >
              {/* Personal information */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B1F33]">
                  <UserOutlined className="text-xl" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#0B1F33]">
                    Shaxsiy ma’lumotlar
                  </h2>
                  <p className="text-xs text-slate-400">
                    Siz bilan bog‘lanish uchun
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                <Form.Item
                  name="firstName"
                  label="Ismingiz"
                  rules={[
                    {
                      required: true,
                      message: "Ismingizni kiriting",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-slate-400" />}
                    placeholder="Abdulloh"
                    className="!h-12"
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Familiyangiz"
                  rules={[
                    {
                      required: true,
                      message: "Familiyangizni kiriting",
                    },
                  ]}
                >
                  <Input placeholder="Jo'rayev" className="!h-12" />
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
                  prefix={<PhoneOutlined className="text-slate-400" />}
                  placeholder="+998901234567"
                  className="!h-12"
                />
              </Form.Item>

              {/* Passport information */}
              <div className="mb-5 mt-2 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B1F33]">
                  <IdcardOutlined className="text-xl" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#0B1F33]">
                    Pasport ma’lumotlari
                  </h2>
                  <p className="text-xs text-slate-400">
                    Shaxsingizni tasdiqlash uchun
                  </p>
                </div>
              </div>

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
                    className="!h-12"
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
                    className="!h-12 !w-full"
                    format="DD.MM.YYYY"
                    placeholder="Kun / Oy / Yil"
                    disabledDate={(date) => date.isAfter(dayjs(), "day")}
                  />
                </Form.Item>
              </div>

              <div className="my-5 border-t border-slate-100" />

              {/* Rental dates */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B1F33]">
                  <CalendarOutlined className="text-xl" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#0B1F33]">
                    Ijara muddati
                  </h2>
                  <p className="text-xs text-slate-400">
                    Olish va qaytarish sanasini tanlang
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                <Form.Item
                  name="startDate"
                  label="Olish sanasi"
                  rules={[
                    {
                      required: true,
                      message: "Olish sanasini tanlang",
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    className="!h-12 !w-full"
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
                        if (!value || !startDate) {
                          return Promise.resolve();
                        }

                        if (value.isAfter(startDate)) {
                          return Promise.resolve();
                        }

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
                    className="!h-12 !w-full"
                    format="DD.MM.YYYY HH:mm"
                    placeholder="Tugash sanasi"
                    disabled={!startDate}
                    disabledDate={(date) =>
                      !startDate || !date.isAfter(startDate, "day")
                    }
                  />
                </Form.Item>
              </div>

              {/* Driving license */}

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0B1F33]">
                  <SolutionOutlined className="text-xl" />
                </div>

                <div>
                  <h2 className="font-semibold text-[#0B1F33]">
                    Haydovchilik guvohnomasi
                  </h2>
                  <p className="text-xs text-slate-400">
                    Guvohnomangiz rasmini yuklang
                  </p>
                </div>
              </div>

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
                  onChange={({ fileList }) => {
                    const newFileList = fileList.slice(-1);
                    setFileList(newFileList);
                    form.setFieldValue("pravaImg", newFileList);
                  }}
                >
                  {fileList.length < 1 && (
                    <div className="flex flex-col items-center gap-2">
                      <CloudUploadOutlined className="text-2xl text-[#0B1F33]" />
                      <span className="text-xs font-medium">Rasm yuklash</span>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              {/* Comment */}
              <Form.Item name="comment" label="Qo‘shimcha izoh (ixtiyoriy)">
                <Input.TextArea
                  rows={3}
                  placeholder="Qo‘shimcha talablaringiz bo‘lsa yozing..."
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              {/* Information */}
              <div className="mt-4 rounded-xl bg-blue-50 p-4">
                <div className="flex gap-3">
                  <CheckCircleOutlined className="mt-1 text-[#0B1F33]" />

                  <p className="text-sm leading-6 text-slate-600">
                    Bron so‘rovingiz mashina egasiga yuboriladi. Egasi
                    tasdiqlaganidan keyin bron holatini profilingizda
                    ko‘rishingiz mumkin.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <Button
                htmlType="submit"
                type="primary"
                block
                className="!mt-6 !h-13 !rounded-xl !bg-[#0B1F33] !font-semibold hover:!bg-[#173957]"
              >
                {
                  !isLoaded ? <Spin/> : "Bron qilish"
                }
              </Button>
            </Form>
          </Card>

          {/* Right sidebar */}
          <div className="space-y-5">
            <Card
              className="!rounded-2xl !shadow-sm"
              styles={{ body: { padding: 24 } }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F33] text-white">
                  <CarOutlined className="text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-[#0B1F33]">Bron haqida</h3>
                  <p className="text-xs text-slate-400">Muhim ma’lumotlar</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    1. Bron so‘rovi
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Ma’lumotlaringiz mashina egasiga yuboriladi.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    2. Egasi tasdiqlaydi
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Mashina egasi malumotlaringnizni tasdiqlaganda sizga telefon qiladi
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    3. Bron holatini kuzating
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Barcha bronlaringiz profilingizda saqlanadi.
                  </p>
                </div>
              </div>
            </Card>

            <div className="rounded-2xl bg-[#0B1F33] p-6 mt-3 text-white">
              <h3 className="text-lg font-semibold">
                Ishonchli va qulay ijara
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
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
