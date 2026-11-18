
"use client";

import { useState } from "react";
import { useUser } from "@/src/constants/UseMeContext";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BankOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  Modal,
  Divider,
  message,
} from "antd";

export default function Malumotlar() {
  const { user, setUser } = useUser();

  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // Ma'lumotlarni tahrirlash
  const handleEdit = () => {
    form.setFieldsValue({
      fullName: user?.fullName,
      companyName: user?.companyName,
      email: user?.email,
      phone: user?.phone,
      stir: user?.stir,
    });

    setOpen(true);
  };

  // Asosiy ma'lumotlarni saqlash
  const handleSubmit = (values: any) => {
    setUser({
      ...user,
      ...values,
    });

    message.success("Ma'lumotlar yangilandi!");

    setOpen(false);
    form.resetFields();
  };

  // Ma'lumotlar modalini yopish
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  // Parolni o'zgartirish
  const handlePasswordSubmit = (values: any) => {
    const { newPassword, confirmPassword } = values;

    setUser({
      ...user,
      password: newPassword,
    });

    console.log("Yangi parol:", newPassword);

    message.success("Parol muvaffaqiyatli o'zgartirildi!");

    passwordForm.resetFields();
    setPasswordOpen(false);
  };

  // Parol modalini yopish
  const handlePasswordCancel = () => {
    passwordForm.resetFields();
    setPasswordOpen(false);
  };

  console.log(user);

  const userInfo = [
    {
      label: "To‘liq ism",
      value: user?.fullName || "Kiritilmagan",
      icon: <UserOutlined />,
    },
    {
      label: "Kompaniya nomi",
      value: user?.companyName || "Kiritilmagan",
      icon: <BankOutlined />,
    },
    {
      label: "Email manzil",
      value: user?.email || "Kiritilmagan",
      icon: <MailOutlined />,
    },
    {
      label: "Telefon raqam",
      value: user?.phone ? `+998 ${user.phone}` : "Kiritilmagan",
      icon: <PhoneOutlined />,
    },
    {
      label: "STIR",
      value: user?.stir || "Kiritilmagan",
      icon: <IdcardOutlined />,
    },
    {
      label: "Hisob turi",
      value:
        user?.role === "OWNER"
          ? "Kompaniya egasi"
          : user?.role || "Kiritilmagan",
      icon: <SafetyCertificateOutlined />,
    },
  ];

  return (
    <div className="w-full space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F33]">
            Shaxsiy ma’lumotlar
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Hisobingiz va kompaniyangiz haqidagi ma’lumotlar
          </p>
        </div>

        <Button
          onClick={handleEdit}
          icon={<EditOutlined />}
          className="!h-11 !rounded-xl !border-none !bg-[#0B1F33] !px-5 !font-semibold !text-white hover:!bg-[#173653]"
        >
          Tahrirlash
        </Button>
      </div>

      {/* Profile card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="bg-[#0B1F33] px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold text-white">
              {user?.companyName?.charAt(0)?.toUpperCase() || "K"}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                {user?.companyName || "Kompaniya"}
              </h2>

              <p className="mt-1 text-sm text-slate-300">
                {user?.fullName || "Foydalanuvchi"}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                {user?.role === "OWNER"
                  ? "Kompaniya egasi"
                  : user?.role}
              </span>
            </div>

          </div>
        </div>

        {/* Information */}
        <div className="p-5 sm:p-8">

          <div className="mb-5">
            <h3 className="font-bold text-[#0B1F33]">
              Asosiy ma’lumotlar
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Ro‘yxatdan o‘tishda kiritilgan ma’lumotlaringiz
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {userInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-slate-200 hover:bg-slate-50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg text-[#0B1F33] shadow-sm">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    {item.label}
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-[#0B1F33]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Security card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-700">
            <SafetyCertificateOutlined />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-[#0B1F33]">
              Hisob xavfsizligi
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Hisobingiz xavfsizligi uchun parolingizni vaqti-vaqti bilan
              yangilab turishingiz tavsiya etiladi.
            </p>

            <Button
              onClick={() => setPasswordOpen(true)}
              icon={<LockOutlined />}
              className="!mt-4 !h-10 !rounded-xl !border-slate-300 !font-semibold !text-[#0B1F33]"
            >
              Parolni o‘zgartirish
            </Button>
          </div>

        </div>
      </div>

      {/* Edit information Modal */}
      <Modal
        title="Ma’lumotlarni tahrirlash"
        open={open}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnHidden
      >
        <p className="mb-5 text-sm text-slate-500">
          Kerakli ma’lumotlarni o‘zgartirib, saqlashingiz mumkin.
        </p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >

          <Form.Item
            name="fullName"
            label="To‘liq ism"
            rules={[
              {
                required: true,
                message: "To‘liq ismni kiriting",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-slate-400" />}
              size="large"
              placeholder="Abdulloh Jorayev"
            />
          </Form.Item>

          <Form.Item
            name="companyName"
            label="Kompaniya nomi"
            rules={[
              {
                required: true,
                message: "Kompaniya nomini kiriting",
              },
            ]}
          >
            <Input
              prefix={<BankOutlined className="text-slate-400" />}
              size="large"
              placeholder="Uzum"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email manzil"
            rules={[
              { required: true, message: "Emailni kiriting" },
              { type: "email", message: "Email noto‘g‘ri" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-slate-400" />}
              size="large"
              placeholder="example@gmail.com"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Telefon raqam"
            rules={[
              {
                required: true,
                message: "Telefon raqamni kiriting",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined className="text-slate-400" />}
              size="large"
              placeholder="931055477"
            />
          </Form.Item>

          <Form.Item
            name="stir"
            label="STIR"
            rules={[
              {
                required: true,
                message: "STIRni kiriting",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="text-slate-400" />}
              size="large"
              placeholder="STIR"
            />
          </Form.Item>

          <div className="mt-6 flex justify-end gap-3">
            <Button size="large" onClick={handleCancel}>
              Bekor qilish
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="!bg-[#0B1F33]"
            >
              Saqlash
            </Button>
          </div>

        </Form>
      </Modal>

      {/* Change password Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <LockOutlined className="text-[#0B1F33]" />
            <span>Parolni o‘zgartirish</span>
          </div>
        }
        open={passwordOpen}
        onCancel={handlePasswordCancel}
        footer={null}
        centered
        destroyOnHidden
      >
        <p className="mb-5 text-sm text-slate-500">
          Hisobingiz uchun yangi parol o‘rnating.
        </p>

        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordSubmit}
          requiredMark={false}
        >

          <Form.Item
            name="newPassword"
            label="Yangi parol"
            rules={[
              {
                required: true,
                message: "Yangi parolni kiriting",
              },
              {
                min: 8,
                message: "Parol kamida 8 ta belgidan iborat bo‘lsin",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400" />}
              size="large"
              placeholder="Yangi parol"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Yangi parolni tasdiqlash"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Parolni qayta kiriting",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue("newPassword") === value
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Parollar bir xil emas!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400" />}
              size="large"
              placeholder="Parolni tasdiqlang"
            />
          </Form.Item>

          <Divider />

          <div className="flex justify-end gap-3">
            <Button
              size="large"
              onClick={handlePasswordCancel}
            >
              Bekor qilish
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="!bg-[#0B1F33]"
            >
              Yangi parolni saqlash
            </Button>
          </div>

        </Form>
      </Modal>

    </div>
  );
}
