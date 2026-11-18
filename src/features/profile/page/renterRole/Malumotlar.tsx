
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/src/constants/UseMeContext";
import {
  UserRound,
  Phone,
  Mail,
  ShieldCheck,
  Pencil,
  Save,
  X,
  LockKeyhole,
  Eye,
  EyeOff,
  BadgeCheck,
  KeyRound,
} from "lucide-react";
import { Button, Input, Form, message } from "antd";

export default function Malumotlar() {
  const { user } = useUser();

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleCancel = () => {
    form.setFieldsValue({
      fullName: user?.fullName,
      phone: user?.phone,
      email: user?.email,
    });

    setEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // TODO: Backend API ga PUT/PATCH so'rovi yuboriladi
      console.log("Profil ma'lumotlari:", values);

      message.success("Ma'lumotlar saqlandi");
      setEditing(false);
    } catch {
      message.error("Ma'lumotlarni tekshiring");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const values = await passwordForm.validateFields();

      // TODO: Backend API orqali parolni almashtirish
      console.log("Parolni o'zgartirish so'rovi");

      message.success("Parol muvaffaqiyatli o'zgartirildi");

      passwordForm.resetFields();
      setChangingPassword(false);
    } catch {
      message.error("Ma'lumotlarni to'g'ri kiriting");
    }
  };

  const initial = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-7">
      <div className="mx-auto max-w-[1100px]">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-[#0B1F33]">
            Shaxsiy ma'lumotlar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Profilingiz va hisob xavfsizligini boshqaring
          </p>
        </div>

        {/* Profile card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#0B1F33] to-[#315575]" />

          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#E8EEF4] text-3xl font-bold text-[#0B1F33] shadow-sm">
                {initial}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-[#0B1F33]">
                  {user?.fullName || "Foydalanuvchi"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>

              <div className="sm:ml-auto sm:pb-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <BadgeCheck size={15} />
                  Faol profil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-[#0B1F33]">
                <UserRound size={21} />
              </div>
              <div>
                <h2 className="font-bold text-[#0B1F33]">
                  Asosiy ma'lumotlar
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Shaxsiy ma'lumotlaringiz
                </p>
              </div>
            </div>

            {!editing ? (
              <Button
                icon={<Pencil size={16} />}
                onClick={() => setEditing(true)}
                className="!h-10 !rounded-xl"
              >
                Tahrirlash
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleCancel} icon={<X size={15} />}>
                  Bekor qilish
                </Button>
                <Button
                  type="primary"
                  onClick={handleSave}
                  icon={<Save size={15} />}
                  className="!bg-[#0B1F33]"
                >
                  Saqlash
                </Button>
              </div>
            )}
          </div>

          <Form
            form={form}
            layout="vertical"
            disabled={!editing}
            requiredMark={false}
          >
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <Form.Item
                label="To'liq ism"
                name="fullName"
                rules={[{ required: true, message: "Ismingizni kiriting" }]}
              >
                <Input
                  prefix={<UserRound size={16} className="text-gray-400" />}
                  placeholder="To'liq ismingiz"
                  size="large"
                  className="!rounded-xl"
                />
              </Form.Item>

              <Form.Item
                label="Telefon raqam"
                name="phone"
                rules={[
                  { required: true, message: "Telefon raqam kiriting" },
                ]}
              >
                <Input
                  prefix={<Phone size={16} className="text-gray-400" />}
                  placeholder="+998 93 105 54 75"
                  size="large"
                  className="!rounded-xl"
                />
              </Form.Item>

              <Form.Item
                label="Elektron pochta"
                name="email"
                rules={[
                  { required: true, message: "Email kiriting" },
                  { type: "email", message: "Email noto'g'ri" },
                ]}
              >
                <Input
                  prefix={<Mail size={16} className="text-gray-400" />}
                  placeholder="example@gmail.com"
                  size="large"
                  className="!rounded-xl"
                />
              </Form.Item>

              <Form.Item label="Foydalanuvchi roli">
                <Input
                  prefix={<ShieldCheck size={16} className="text-gray-400" />}
                  value={
                    user?.role === "RENTER"
                      ? "Ijaraga oluvchi"
                      : user?.role
                  }
                  disabled
                  size="large"
                  className="!rounded-xl"
                />
              </Form.Item>
            </div>
          </Form>
        </div>

        {/* Password section */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <LockKeyhole size={21} />
              </div>
              <div>
                <h2 className="font-bold text-[#0B1F33]">
                  Parol va xavfsizlik
                </h2>
                <p className="mt-1 text-xs text-gray-400">
                  Hisobingiz parolini boshqaring
                </p>
              </div>
            </div>

            {!changingPassword && (
              <Button
                icon={<KeyRound size={16} />}
                onClick={() => setChangingPassword(true)}
                className="!h-10 !rounded-xl"
              >
                Parolni o'zgartirish
              </Button>
            )}
          </div>

          {!changingPassword ? (
            <div className="flex items-center justify-between rounded-xl bg-[#F7F9FC] p-4">
              <div>
                <p className="text-sm font-medium text-[#0B1F33]">
                  Hisob paroli
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Parolingiz maxfiy saqlanadi
                </p>
              </div>
              <span className="font-bold tracking-[5px] text-gray-400">
                ••••••••
              </span>
            </div>
          ) : (
            <Form
              form={passwordForm}
              layout="vertical"
              requiredMark={false}
              onFinish={handlePasswordChange}
            >
              <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                <Form.Item
                  label="Eski parol"
                  name="oldPassword"
                  rules={[{ required: true, message: "Eski parolni kiriting" }]}
                >
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    prefix={<LockKeyhole size={16} />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    }
                    size="large"
                    placeholder="Eski parol"
                    className="!rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label="Yangi parol"
                  name="newPassword"
                  rules={[
                    { required: true, message: "Yangi parolni kiriting" },
                    { min: 8, message: "Kamida 8 ta belgi kiriting" },
                  ]}
                >
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    prefix={<LockKeyhole size={16} />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    }
                    size="large"
                    placeholder="Yangi parol"
                    className="!rounded-xl"
                  />
                </Form.Item>

                <Form.Item
                  label="Yangi parolni tasdiqlang"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    { required: true, message: "Parolni qayta kiriting" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Parollar bir xil emas")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    prefix={<ShieldCheck size={16} />}
                    suffix={
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    }
                    size="large"
                    placeholder="Yangi parolni takrorlang"
                    className="!rounded-xl"
                  />
                </Form.Item>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    passwordForm.resetFields();
                    setChangingPassword(false);
                  }}
                  className="!h-10 !rounded-xl"
                >
                  Bekor qilish
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<Save size={16} />}
                  className="!h-10 !rounded-xl !bg-[#0B1F33]"
                >
                  Yangi parolni saqlash
                </Button>
              </div>
            </Form>
          )}
        </div>

        {/* Security info */}
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <ShieldCheck size={20} className="shrink-0 text-blue-600" />
          <p className="text-xs leading-5 text-blue-800">
            Hisobingiz xavfsizligi uchun parolingizni hech kimga bermang.
            Yangi parol kamida 8 ta belgidan iborat bo'lishi kerak.
          </p>
        </div>
      </div>
    </div>
  );
}
