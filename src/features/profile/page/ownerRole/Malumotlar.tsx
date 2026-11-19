
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
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:flex-row sm:items-center sm:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Egasi kabineti
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#1f2d25]">
            Shaxsiy ma’lumotlar
          </h1>
          <p className="mt-1 text-sm text-[#6d7a73]">
            Hisobingiz va kompaniyangiz haqidagi ma’lumotlar
          </p>
        </div>

        <Button
          onClick={handleEdit}
          icon={<EditOutlined />}
          className="!h-11 !rounded-full !border-none !bg-[#00863e] !px-5 !font-semibold !text-white hover:!bg-[#006f35]"
        >
          Tahrirlash
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#e5e9e7] bg-white shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
        <div className="bg-[linear-gradient(145deg,#0f2a1c,#165a36_55%,#00863e)] px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white backdrop-blur-sm">
              {user?.companyName?.charAt(0)?.toUpperCase() || "K"}
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                {user?.companyName || "Kompaniya"}
              </h2>
              <p className="mt-1 text-sm text-white/75">
                {user?.fullName || "Foydalanuvchi"}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-[#b7f0c8]">
                {user?.role === "OWNER" ? "Kompaniya egasi" : user?.role}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="mb-5">
            <h3 className="font-bold text-[#1f2d25]">Asosiy ma’lumotlar</h3>
            <p className="mt-1 text-sm text-[#6d7a73]">
              Ro‘yxatdan o‘tishda kiritilgan ma’lumotlaringiz
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {userInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-[#eef2f0] bg-[#f8fbf9] p-4 transition hover:border-[#d7e8dd] hover:bg-[#f6faf7]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg text-[#00863e] shadow-sm">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#6d7a73]">
                    {item.label}
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-[#1f2d25]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ef] text-lg text-[#00863e]">
            <SafetyCertificateOutlined />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-[#1f2d25]">Hisob xavfsizligi</h3>
            <p className="mt-1 text-sm leading-6 text-[#6d7a73]">
              Hisobingiz xavfsizligi uchun parolingizni vaqti-vaqti bilan yangilab
              turishingiz tavsiya etiladi.
            </p>

            <Button
              onClick={() => setPasswordOpen(true)}
              icon={<LockOutlined />}
              className="!mt-4 !h-10 !rounded-full !border-[#d7e8dd] !bg-[#f6faf7] !font-semibold !text-[#00863e]"
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
              className="!rounded-full !border-0 !bg-[#00863e] hover:!bg-[#006f35]"
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
            <LockOutlined className="text-[#00863e]" />
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
              className="!rounded-full !border-0 !bg-[#00863e] hover:!bg-[#006f35]"
            >
              Yangi parolni saqlash
            </Button>
          </div>

        </Form>
      </Modal>

    </div>
  );
}
