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
      console.log("Profil ma'lumotlari:", values);
      message.success("Ma'lumotlar saqlandi");
      setEditing(false);
    } catch {
      message.error("Ma'lumotlarni tekshiring");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await passwordForm.validateFields();
      message.success("Parol muvaffaqiyatli o'zgartirildi");
      passwordForm.resetFields();
      setChangingPassword(false);
    } catch {
      message.error("Ma'lumotlarni to'g'ri kiriting");
    }
  };

  const initial = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-[1100px] space-y-6">
      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
          Ijarachi kabineti
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">
          Shaxsiy ma&apos;lumotlar
        </h1>
        <p className="mt-1 text-sm text-[#6d7a73]">
          Profilingiz va hisob xavfsizligini boshqaring
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        <div className="h-32 bg-[linear-gradient(145deg,#0f2a1c,#165a36_55%,#00863e)]" />

        <div className="px-5 pb-6 sm:px-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#eaf6ef] text-3xl font-bold text-[#00863e] shadow-sm">
              {initial}
            </div>

            <div className="pb-1">
              <h2 className="text-xl font-bold text-[#1f2d25]">
                {user?.fullName || "Foydalanuvchi"}
              </h2>
              <p className="mt-1 text-sm text-[#6d7a73]">{user?.email}</p>
            </div>

            <div className="sm:ml-auto sm:pb-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf6ef] px-3 py-2 text-xs font-semibold text-[#00863e]">
                <BadgeCheck size={15} />
                Faol profil
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] md:p-7">
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#eef2f0] pb-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#eaf6ef] p-3 text-[#00863e]">
              <UserRound size={21} />
            </div>
            <div>
              <h2 className="font-bold text-[#1f2d25]">Asosiy ma&apos;lumotlar</h2>
              <p className="mt-1 text-xs text-[#8d9892]">
                Shaxsiy ma&apos;lumotlaringiz
              </p>
            </div>
          </div>

          {!editing ? (
            <Button
              icon={<Pencil size={16} />}
              onClick={() => setEditing(true)}
              className="!h-10 !rounded-full !border-[#d7e8dd] !bg-[#f6faf7] !font-semibold !text-[#00863e]"
            >
              Tahrirlash
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleCancel}
                icon={<X size={15} />}
                className="!h-10 !rounded-full"
              >
                Bekor qilish
              </Button>
              <Button
                type="primary"
                onClick={handleSave}
                icon={<Save size={15} />}
                className="!h-10 !rounded-full !border-0 !bg-[#00863e] hover:!bg-[#006f35]"
              >
                Saqlash
              </Button>
            </div>
          )}
        </div>

        <Form form={form} layout="vertical" disabled={!editing} requiredMark={false}>
          <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
            <Form.Item
              label="To'liq ism"
              name="fullName"
              rules={[{ required: true, message: "Ismingizni kiriting" }]}
            >
              <Input
                prefix={<UserRound size={16} className="text-[#8d9892]" />}
                placeholder="To'liq ismingiz"
                size="large"
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item
              label="Telefon raqam"
              name="phone"
              rules={[{ required: true, message: "Telefon raqam kiriting" }]}
            >
              <Input
                prefix={<Phone size={16} className="text-[#8d9892]" />}
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
                prefix={<Mail size={16} className="text-[#8d9892]" />}
                placeholder="example@gmail.com"
                size="large"
                className="!rounded-xl"
              />
            </Form.Item>

            <Form.Item label="Foydalanuvchi roli">
              <Input
                prefix={<ShieldCheck size={16} className="text-[#8d9892]" />}
                value={
                  user?.role === "RENTER" ? "Ijaraga oluvchi" : user?.role
                }
                disabled
                size="large"
                className="!rounded-xl"
              />
            </Form.Item>
          </div>
        </Form>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] md:p-7">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#fff4e5] p-3 text-[#c47a10]">
              <LockKeyhole size={21} />
            </div>
            <div>
              <h2 className="font-bold text-[#1f2d25]">Parol va xavfsizlik</h2>
              <p className="mt-1 text-xs text-[#8d9892]">
                Hisobingiz parolini boshqaring
              </p>
            </div>
          </div>

          {!changingPassword && (
            <Button
              icon={<KeyRound size={16} />}
              onClick={() => setChangingPassword(true)}
              className="!h-10 !rounded-full !border-[#d7e8dd] !bg-[#f6faf7] !font-semibold !text-[#00863e]"
            >
              Parolni o&apos;zgartirish
            </Button>
          )}
        </div>

        {!changingPassword ? (
          <div className="flex items-center justify-between rounded-2xl bg-[#f6faf7] p-4">
            <div>
              <p className="text-sm font-medium text-[#1f2d25]">Hisob paroli</p>
              <p className="mt-1 text-xs text-[#8d9892]">
                Parolingiz maxfiy saqlanadi
              </p>
            </div>
            <span className="font-bold tracking-[5px] text-[#8d9892]">
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
                      return Promise.reject(new Error("Parollar bir xil emas"));
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
                      {showConfirmPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
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
                className="!h-10 !rounded-full"
              >
                Bekor qilish
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                icon={<Save size={16} />}
                className="!h-10 !rounded-full !border-0 !bg-[#00863e] hover:!bg-[#006f35]"
              >
                Yangi parolni saqlash
              </Button>
            </div>
          </Form>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-[#c6e5d1] bg-[#eff8f2] p-4">
        <ShieldCheck size={20} className="shrink-0 text-[#00863e]" />
        <p className="text-xs leading-5 text-[#2f6b49]">
          Hisobingiz xavfsizligi uchun parolingizni hech kimga bermang. Yangi
          parol kamida 8 ta belgidan iborat bo&apos;lishi kerak.
        </p>
      </div>
    </div>
  );
}
