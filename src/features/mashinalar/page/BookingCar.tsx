"use client";

import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
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
import { useEffect, useRef, useState, type ReactNode } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { useCreateBooking } from "@/src/hooks/use-bookings";
import { useCar } from "@/src/hooks/use-cars";
import { uploadImageFile } from "@/src/lib/upload-media";
import { getApiErrorMessage } from "@/src/lib/api-error";
import { useUser } from "@/src/constants/UseMeContext";
import {
  formatUzPhoneDisplay,
  toE164Uz,
  uzPhoneComplete,
} from "@/src/lib/input-masks";
import {
  birthDateToDayjs,
  loadRenterBookingProfile,
  saveRenterBookingProfile,
} from "@/src/lib/renter-profile-storage";
import api from "@/src/services/api";

type BookingFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  passportNumber?: string;
  birthDate: Dayjs;
  rentalRange: [Dayjs, Dayjs];
  comment?: string;
};

const MIN_AGE = 18;
const BRONLARIM_PATH = "/profile/renter/bronlarim";

export default function BookingCar() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitLockRef = useRef(false);
  const createBooking = useCreateBooking();
  const router = useRouter();
  const params = useParams();
  const carId = String(params.id || "");
  const { user } = useUser();
  const { data: apiCar, isLoading: carLoading } = useCar(carId || undefined);
  const isRented = Boolean(apiCar?.isRented);
  const isLoading = submitting || createBooking.isPending;

  useEffect(() => {
    if (!user?.id) return;
    const saved = loadRenterBookingProfile(user.id);
    const [fn, ...rest] = (user.fullName || "").trim().split(/\s+/);
    form.setFieldsValue({
      firstName: saved?.firstName || fn || undefined,
      lastName: saved?.lastName || rest.join(" ") || undefined,
      phone: formatUzPhoneDisplay(saved?.phone || user.phone || ""),
      passportNumber: saved?.passportNumber || undefined,
      birthDate: birthDateToDayjs(saved?.birthDate),
    });
  }, [user, form]);

  const goToBronlarim = () => {
    router.replace(BRONLARIM_PATH);
  };

  const onFinish = async (values: BookingFormValues) => {
    // Allaqachon yuborilgan — qayta bron yaratmasin, bronlarimga o‘tsin
    if (submitted || submitLockRef.current) {
      if (submitted) goToBronlarim();
      return;
    }

    if (!carId) {
      message.error("Mashina topilmadi");
      return;
    }
    if (isRented) {
      message.error("Bu mashina hozir ijarada");
      return;
    }

    const raw = fileList[0]?.originFileObj as File | undefined;
    const existingUrl =
      typeof fileList[0]?.url === "string" ? fileList[0].url : undefined;

    if (!values.birthDate) {
      message.error("Tug‘ilgan sanani kiriting");
      return;
    }
    if (!values.rentalRange?.[0] || !values.rentalRange?.[1]) {
      message.error("Ijara muddatini tanlang");
      return;
    }
    const ageAtStart = values.rentalRange[0].diff(values.birthDate, "year");
    if (ageAtStart < MIN_AGE) {
      message.error("Bron qilish uchun 18 yoshdan katta bo‘lishingiz kerak");
      return;
    }

    if (!raw && !existingUrl) {
      message.error("Haydovchilik guvohnomasi rasmi majburiy");
      return;
    }

    if (raw) {
      const okType = /^image\/(jpeg|jpg|png|webp|avif)$/i.test(raw.type);
      if (!okType) {
        message.error("Faqat JPEG, PNG, WebP yoki AVIF rasm yuklang");
        return;
      }
      if (raw.size <= 0 || raw.size > 8 * 1024 * 1024) {
        message.error("Rasm hajmi 8 MB dan oshmasligi kerak");
        return;
      }
    }

    submitLockRef.current = true;
    setSubmitting(true);

    try {
      let licenseImageUrl = existingUrl;
      if (raw) {
        licenseImageUrl = await uploadImageFile(raw);
      }
      if (!licenseImageUrl) {
        message.error("Guvohnoma rasmini yuklab bo‘lmadi");
        submitLockRef.current = false;
        setSubmitting(false);
        return;
      }

      const [start, end] = values.rentalRange;
      const startAt = start.toDate().toISOString();
      const endAt = end.toDate().toISOString();
      const phoneE164 = toE164Uz(values.phone);

      await createBooking.mutateAsync({
        carId,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: phoneE164,
        passportNumber: values.passportNumber?.trim(),
        birthDate: values.birthDate.toDate().toISOString(),
        startAt,
        endAt,
        comment: values.comment?.trim() || undefined,
        licenseImageUrl,
      });

      // Keyingi bron uchun profilga saqlash
      if (user?.id) {
        saveRenterBookingProfile(user.id, {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phone: phoneE164,
          passportNumber: values.passportNumber?.trim(),
          birthDate: values.birthDate.toDate().toISOString(),
        });
        try {
          await api.patch("/foydalanuvchilar/profil", {
            fullName: `${values.firstName.trim()} ${values.lastName.trim()}`.trim(),
          });
        } catch {
          // profil yangilanmasa ham bron OK
        }
      }

      setSubmitted(true);
      message.success("Bron so‘rovingiz yuborildi!");
      form.resetFields();
      setFileList([]);
      goToBronlarim();
    } catch (error: unknown) {
      submitLockRef.current = false;
      setSubmitting(false);
      message.error(
        getApiErrorMessage(error, "Bron qilishda xatolik yuz berdi"),
      );
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

  if (!carLoading && isRented) {
    return (
      <div className="bg-[#f4f6f5] px-3 pb-16 pt-8 sm:px-5 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-xl rounded-3xl border border-[#b7d7f0] bg-[#e7f3ff] p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#1d6fb8]">
            Bu mashina hozir ijarada
          </h1>
          <p className="mt-3 text-sm text-[#3d6f9a]">
            Hozircha bron qilib bo‘lmaydi. Ijara tugagach qayta urinib ko‘ring.
          </p>
          <Button
            type="primary"
            className="!mt-6 !h-11 !rounded-full !border-0 !bg-[#00863e] hover:!bg-[#006f35]"
            onClick={() => router.push(carId ? `/cars/${carId}` : "/cars")}
          >
            Orqaga
          </Button>
        </div>
      </div>
    );
  }

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
              validateTrigger={["onBlur", "onSubmit"]}
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
                getValueFromEvent={(e) =>
                  formatUzPhoneDisplay(e?.target?.value ?? "")
                }
                normalize={(v) => formatUzPhoneDisplay(String(v ?? ""))}
                rules={[
                  {
                    required: true,
                    message: "Telefon raqamingizni kiriting",
                  },
                  {
                    validator: async (_, value: string) => {
                      if (!value) return;
                      if (!uzPhoneComplete(value)) {
                        throw new Error("Masalan: 90 123 45 67");
                      }
                    },
                  },
                ]}
              >
                <Input
                  prefix={
                    <span className="text-[#8d9892]">
                      <PhoneOutlined className="mr-1" />
                      +998
                    </span>
                  }
                  placeholder="90 123 45 67"
                  maxLength={12}
                  inputMode="numeric"
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
                  label="Tug‘ilgan sanangiz (18+)"
                  rules={[
                    {
                      required: true,
                      message: "Tug‘ilgan sanangizni tanlang",
                    },
                    {
                      validator: (_, value: Dayjs | undefined) => {
                        if (!value) return Promise.resolve();
                        if (dayjs().diff(value, "year") < MIN_AGE) {
                          return Promise.reject(
                            new Error(
                              "Bron qilish uchun 18 yoshdan katta bo‘lishingiz kerak",
                            ),
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <DatePicker
                    className="!h-12 !w-full !rounded-xl"
                    format="DD.MM.YYYY"
                    placeholder="Kun.Oy.Yil"
                    inputReadOnly={false}
                    allowClear
                    disabledDate={(date) =>
                      date.isAfter(dayjs().subtract(MIN_AGE, "year"), "day")
                    }
                  />
                </Form.Item>
              </div>

              <div className="my-5 border-t border-[#eef2f0]" />

              {sectionTitle(
                <CalendarOutlined className="text-xl" />,
                "Ijara muddati",
                "Olish va qaytarish sanasini birgalikda tanlang",
              )}

              <Form.Item
                name="rentalRange"
                label="Olish — qaytarish"
                rules={[
                  {
                    required: true,
                    message: "Ijara muddatini tanlang",
                  },
                  {
                    validator: (_, value: [Dayjs, Dayjs] | undefined) => {
                      if (!value?.[0] || !value?.[1]) return Promise.resolve();
                      if (value[1].isAfter(value[0])) return Promise.resolve();
                      return Promise.reject(
                        new Error(
                          "Qaytarish sanasi olish sanasidan keyin bo‘lishi kerak",
                        ),
                      );
                    },
                  },
                ]}
              >
                <DatePicker.RangePicker
                  showTime={{ format: "HH:mm" }}
                  className="!h-12 !w-full !rounded-xl"
                  format="DD.MM.YYYY HH:mm"
                  placeholder={["Olish", "Qaytarish"]}
                  allowClear
                  inputReadOnly={false}
                  disabledDate={(date) =>
                    date.isBefore(dayjs().startOf("day"))
                  }
                />
              </Form.Item>

              {sectionTitle(
                <SolutionOutlined className="text-xl" />,
                "Haydovchilik guvohnomasi",
                "Guvohnomangiz rasmini yuklang",
              )}

              <Form.Item
                name="pravaImg"
                label="Guvohnoma rasmi (majburiy)"
                required
                rules={[
                  {
                    validator: () => {
                      if (fileList.length === 0) {
                        return Promise.reject(
                          new Error("Guvohnoma rasmini yuklang"),
                        );
                      }
                      const f = fileList[0]?.originFileObj as File | undefined;
                      if (f) {
                        if (
                          !/^image\/(jpeg|jpg|png|webp|avif)$/i.test(f.type)
                        ) {
                          return Promise.reject(
                            new Error("Faqat rasm fayli (JPEG/PNG/WebP/AVIF)"),
                          );
                        }
                        if (f.size > 8 * 1024 * 1024) {
                          return Promise.reject(
                            new Error("Rasm 8 MB dan katta bo‘lmasin"),
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Upload
                  listType="picture-card"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  maxCount={1}
                  fileList={fileList}
                  beforeUpload={(file) => {
                    const okType = /^image\/(jpeg|jpg|png|webp|avif)$/i.test(
                      file.type,
                    );
                    if (!okType) {
                      message.error("Faqat JPEG, PNG, WebP yoki AVIF");
                      return Upload.LIST_IGNORE;
                    }
                    if (file.size > 8 * 1024 * 1024) {
                      message.error("Rasm 8 MB dan oshmasin");
                      return Upload.LIST_IGNORE;
                    }
                    return false;
                  }}
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
                htmlType={submitted ? "button" : "submit"}
                type="primary"
                block
                loading={isLoading}
                disabled={isLoading}
                onClick={submitted ? goToBronlarim : undefined}
                className="!mt-6 !h-12 !rounded-full !border-0 !bg-[#00863e] !font-bold !shadow-[0_8px_18px_rgba(0,134,62,0.22)] hover:!bg-[#006f35] disabled:!bg-[#00863e] disabled:!opacity-85"
              >
                {submitted ? "Mening bronlarim" : "Bron qilish"}
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
