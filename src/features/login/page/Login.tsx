"use client";

import RentoLogo from "@/src/components/RentoLogo";
import { useUser, type Account } from "@/src/constants/UseMeContext";
import { Button, Form, Input } from "antd";
import { ArrowLeft, ArrowRight, Building2, CarFront } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./login.css";

type Credentials = Pick<Account, "phone" | "password">;
type Registration = Omit<Account, "role">;

const phoneRules = [
  { required: true, message: "Telefon raqamingizni kiriting." },
  {
    pattern: /^\d{9}$/,
    message: "Telefon raqami 9 ta raqamdan iborat bo‘lishi kerak.",
  },
];

export default function Login({
  destination,
  initialRegister = false,
}: {
  destination: string;
  initialRegister?: boolean;
}) {
  const router = useRouter();
  const { loading, logIn, registerUser, users } = useUser();
  const accounts: Account[] = users;
  const [role, setRole] = useState<Account["role"]>("RENTER");
  const [isRegister, setIsRegister] = useState(initialRegister);
  const [error, setError] = useState("");
  const loginTitle = useRef<HTMLHeadingElement>(null);
  const registerTitle = useRef<HTMLHeadingElement>(null);
  const focusHeading = useRef(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    if (focusHeading.current) {
      (isRegister ? registerTitle : loginTitle).current?.focus({
        preventScroll: true,
      });
      focusHeading.current = false;
    }
  }, [isRegister]);

  function flip() {
    setError("");
    focusHeading.current = true;
    setIsRegister(!isRegister);
  }

  function signIn({ phone, password }: Credentials) {
    const account = accounts.find(
      (item) =>
        item.phone === phone &&
        item.password === password &&
        item.role === role,
    );
    if (!account) {
      setError("Telefon raqami yoki parol noto‘g‘ri.");
      return;
    }
    logIn(account);
    router.replace(destination);
  }

  function signUp(values: Registration) {
    if (
      accounts.some((item) => item.phone === values.phone && item.role === role)
    ) {
      setError("Bu telefon raqam bilan hisob ochilgan. Tizimga kiring.");
      return;
    }
    registerUser({ ...values, fullName: values.fullName.trim(), role });
    router.replace(destination);
  }

  function renderFace(register: boolean) {
    const hidden = register !== isRegister;
    return (
      <section
        className={`rento-auth-face ${register ? "rento-auth-back" : ""}`}
        aria-labelledby={register ? "register-title" : "login-title"}
        aria-hidden={hidden}
        inert={hidden}
      >
        <div className="rento-auth-content">
          <Link href="/" className="rento-auth-brand">
            <RentoLogo className="w-36" />
          </Link>
          <h1
            id={register ? "register-title" : "login-title"}
            ref={register ? registerTitle : loginTitle}
            tabIndex={-1}
          >
            {register ? "Hisob yarating" : "Hisobingizga kiring"}
          </h1>
          <p className="rento-auth-description">
            {register
              ? "RENTO bilan sayohatingizni boshlang."
              : "Avtomobil ijarasini davom ettirish uchun kiring."}
          </p>

          <div
            className="rento-auth-roles"
            role="group"
            aria-label="Hisob turi"
          >
            {(
              [
                ["RENTER", "Ijarachi", CarFront],
                ["OWNER", "Kompaniya", Building2],
              ] as const
            ).map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                aria-pressed={role === value}
                onClick={() => {
                  setRole(value);
                  setError("");
                }}
              >
                <Icon size={16} aria-hidden="true" /> {label}
              </button>
            ))}
          </div>

          <Form
            name={register ? "rento-registration" : "rento-login"}
            layout="vertical"
            requiredMark={false}
            onValuesChange={() => setError("")}
            onFinish={register ? signUp : signIn}
            className="rento-auth-form"
          >
            {register && role === "OWNER" && (
              <div className="rento-auth-fieldsPair">
                <Form.Item name="companyName" label="Kompaniya nomi">
                  <Input
                    autoComplete="organization"
                    placeholder="Kompaniya nomi"
                  />
                </Form.Item>
                <Form.Item name="stir" label="STIR">
                  <Input inputMode="numeric" placeholder="STIR raqami" />
                </Form.Item>
              </div>
            )}

            {register && (
              <Form.Item
                name="fullName"
                label="Ism va familiya"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Ism va familiyangizni kiriting.",
                  },
                ]}
              >
                <Input autoComplete="name" placeholder="Ism va familiyangiz" />
              </Form.Item>
            )}

            <div
              className={`rento-auth-fieldsPair ${!register ? "rento-auth-singleColumn" : ""}`}
            >
              <Form.Item name="phone" label="Telefon raqami" rules={phoneRules}>
                <Input
                  prefix="+998"
                  type="tel"
                  inputMode="numeric"
                  autoComplete={register ? "tel-national" : "username"}
                  maxLength={9}
                  placeholder="90 123 45 67"
                />
              </Form.Item>
              {register && (
                <Form.Item
                  name="email"
                  label="Elektron pochta"
                  rules={[
                    {
                      type: "email",
                      message: "Elektron pochta manzilini tekshiring.",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="ism@example.uz"
                  />
                </Form.Item>
              )}
            </div>

            <Form.Item
              name="password"
              label="Parol"
              rules={[{ required: true, message: "Parolni kiriting." }]}
            >
              <Input.Password
                autoComplete={register ? "new-password" : "current-password"}
                placeholder={register ? "Parol yarating" : "Parolingiz"}
              />
            </Form.Item>

            {!hidden && error && (
              <p className="rento-auth-error" role="alert">
                {error}
              </p>
            )}
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading}
              className="rento-auth-submit"
            >
              {register ? "Hisob yaratish" : "Kirish"}{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </Form>

          <p className="rento-auth-switch">
            {register ? "Hisobingiz bormi?" : "Hisobingiz yo‘qmi?"}{" "}
            <button type="button" onClick={flip}>
              {register ? "Kirish" : "Ro‘yxatdan o‘tish"}
            </button>
          </p>
        </div>
      </section>
    );
  }

  if (user) return null;

  return (
    <main className="rento-auth-page">
      <Link href="/" className="rento-auth-home">
        <ArrowLeft size={17} aria-hidden="true" /> Bosh sahifaga
      </Link>
      <div className="rento-auth-scene">
        <div
          className={`rento-auth-card ${isRegister ? "rento-auth-flipped" : ""}`}
        >
          {renderFace(false)}
          {renderFace(true)}
        </div>
      </div>
    </main>
  );
}
