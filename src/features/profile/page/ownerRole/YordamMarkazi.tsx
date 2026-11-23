"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Input,
  Collapse,
  Empty,
  Button,
  Tag,
  Form,
  Select,
  message,
} from "antd";
import {
  SearchOutlined,
  CarOutlined,
  CalendarOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  BankOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  FileTextOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useUser } from "@/src/constants/UseMeContext";
import { useCreateMurojaat } from "@/src/hooks/use-murojaatlar";

const { TextArea } = Input;

const SUBJECT_OPTIONS = [
  { label: "Kompaniya profili", value: "company", subject: "Kompaniya profili" },
  { label: "Avtomobillar", value: "cars", subject: "Avtomobillar" },
  { label: "Bronlar", value: "bookings", subject: "Bronlar" },
  { label: "To‘lovlar", value: "payments", subject: "To‘lovlar" },
  { label: "Boshqa savol", value: "other", subject: "Boshqa savol" },
];

const categories = [
  { key: "all", label: "Barchasi", icon: <FileTextOutlined /> },
  { key: "company", label: "Kompaniya profili", icon: <BankOutlined /> },
  { key: "cars", label: "Avtomobillar", icon: <CarOutlined /> },
  { key: "bookings", label: "Bronlar", icon: <CalendarOutlined /> },
  { key: "payments", label: "To‘lovlar", icon: <DollarOutlined /> },
  { key: "customers", label: "Mijozlar", icon: <TeamOutlined /> },
  { key: "security", label: "Xavfsizlik", icon: <SafetyCertificateOutlined /> },
  { key: "problems", label: "Muammolar", icon: <MessageOutlined /> },
];

const faqs = [
  {
    category: "company",
    question: "Kompaniya ma’lumotlarini qanday o‘zgartiraman?",
    answer:
      "Shaxsiy kabinetdagi «Ma’lumotlar» bo‘limiga kiring. Kompaniya nomi, telefon raqami, elektron pochta va STIR ma’lumotlarini tahrirlashingiz mumkin. Ayrim yuridik ma’lumotlarni o‘zgartirish uchun qo‘shimcha tasdiqlash talab qilinishi mumkin.",
  },
  {
    category: "company",
    question: "Kompaniya profilini qanday tasdiqlataman?",
    answer:
      "Kompaniya haqidagi ma’lumotlarni to‘liq kiriting va talab qilingan hujjatlarni yuboring. Platforma administratori ma’lumotlarni tekshiradi. Tekshiruv natijasi shaxsiy kabinetingizda ko‘rsatiladi.",
  },
  {
    category: "company",
    question: "Kompaniya hisobiga xodim qo‘shish mumkinmi?",
    answer:
      "Agar platformada xodimlar boshqaruvi mavjud bo‘lsa, kompaniya administratori boshqa xodimlarga alohida kirish huquqini berishi mumkin. Har bir xodimga faqat o‘z vazifasiga kerakli ruxsatlarni berish tavsiya etiladi.",
  },
  {
    category: "cars",
    question: "Yangi avtomobilni qanday e’lon qilaman?",
    answer:
      "«Avtomobillar» bo‘limiga o‘ting va «Avtomobil qo‘shish» tugmasini bosing. Marka, model, ishlab chiqarilgan yil, davlat raqami, texnik xususiyatlar, ijara narxi va avtomobil rasmlarini kiriting. Ma’lumotlarni tekshirib, e’lonni saqlang.",
  },
  {
    category: "cars",
    question: "Avtomobil e’lonini qanday tahrirlayman?",
    answer:
      "Avtomobillar ro‘yxatidan kerakli mashinani tanlang va «Tahrirlash» tugmasini bosing. Narx, tavsif, rasmlar va boshqa ma’lumotlarni yangilab, o‘zgarishlarni saqlang.",
  },
  {
    category: "cars",
    question: "Avtomobilim nega platformada ko‘rinmayapti?",
    answer:
      "E’lon hali tekshiruvdan o‘tmagan, to‘liq to‘ldirilmagan yoki faol bo‘lmasligi mumkin. Avtomobil holatini tekshiring. Muammo davom etsa, qo‘llab-quvvatlash xizmatiga murojaat qiling.",
  },
  {
    category: "cars",
    question: "Avtomobilni vaqtincha ijaraga berishdan olib turish mumkinmi?",
    answer:
      "Ha. Avtomobilni vaqtincha band yoki faol bo‘lmagan holatga o‘tkazishingiz mumkin. Bu avtomobil mavjud bo‘lmagan kunlarda yangi bronlar kelishining oldini olishga yordam beradi.",
  },
  {
    category: "bookings",
    question: "Yangi bron kelganini qayerdan bilaman?",
    answer:
      "Yangi bronlar «Bronlar» bo‘limida ko‘rinadi. Agar bildirishnomalar yoqilgan bo‘lsa, yangi bron haqida xabar ham olishingiz mumkin.",
  },
  {
    category: "bookings",
    question: "Bronni qanday tasdiqlayman yoki rad etaman?",
    answer:
      "«Bronlar» bo‘limidan kerakli buyurtmani oching. Mijoz ma’lumotlari, ijara sanalari va avtomobilni tekshiring. Shundan so‘ng bronni tasdiqlash yoki rad etish amalini tanlang.",
  },
  {
    category: "bookings",
    question: "Bir vaqtning o‘zida bir mashinaga ikkita bron kelishi mumkinmi?",
    answer:
      "Bir avtomobilning bir xil sanalarda ikki marta bron qilinishiga yo‘l qo‘ymaslik kerak. Bronni tasdiqlashdan oldin avtomobilning mavjudligini va band qilingan sanalarni tekshiring.",
  },
  {
    category: "bookings",
    question: "Mijoz avtomobilni vaqtida qaytarmasa nima qilaman?",
    answer:
      "Avval mijoz bilan bog‘lanib, qaytarish vaqtini aniqlashtiring. Ijara shartnomangizda kechikish uchun belgilangan shartlarga amal qiling. Kelishmovchilik yuzaga kelsa, platforma qo‘llab-quvvatlash xizmatiga murojaat qiling.",
  },
  {
    category: "payments",
    question: "Ijara uchun to‘lovlarni qayerdan ko‘raman?",
    answer:
      "Agar to‘lovlar moduli yoqilgan bo‘lsa, shaxsiy kabinetdagi «To‘lovlar» yoki «Hisobotlar» bo‘limida tushumlar, to‘lov holati va tranzaksiyalar tarixini ko‘rishingiz mumkin.",
  },
  {
    category: "payments",
    question: "Platforma komissiyasi qanday hisoblanadi?",
    answer:
      "Komissiya miqdori platformaning tarif va foydalanish shartlariga bog‘liq. Amaldagi komissiya foizi va hisob-kitob tartibini platforma shartlari yoki qo‘llab-quvvatlash xizmatidan aniqlashtiring.",
  },
  {
    category: "payments",
    question:
      "To‘lov amalga oshirilgan, lekin kabinetda ko‘rinmayapti. Nima qilaman?",
    answer:
      "Tranzaksiya holatini va to‘lov chekini tekshiring. To‘lov vaqti, summa va tranzaksiya identifikatorini saqlab qo‘ying. Muammo davom etsa, ushbu ma’lumotlar bilan qo‘llab-quvvatlash xizmatiga murojaat qiling.",
  },
  {
    category: "customers",
    question: "Mijozning hujjatlarini qanday tekshirish kerak?",
    answer:
      "Avtomobilni topshirishdan oldin mijozning shaxsini va haydovchilik guvohnomasini tekshiring. Guvohnomaning amal qilish muddati va ijara shartlariga mosligini aniqlang. Shaxsiy ma’lumotlarni faqat zarur maqsadda va xavfsiz saqlang.",
  },
  {
    category: "customers",
    question: "Avtomobilni mijozga topshirishda nimalarga e’tibor berish kerak?",
    answer:
      "Avtomobilning tashqi va ichki holatini suratga oling, yoqilg‘i miqdori va mavjud shikastlarni qayd eting. Topshirish-qabul qilish dalolatnomasi yoki shartnomani rasmiylashtirish tavsiya etiladi.",
  },
  {
    category: "customers",
    question: "Mijoz avtomobilga zarar yetkazsa nima qilish kerak?",
    answer:
      "Zararni suratga oling, mavjud hujjatlarni saqlang va mijoz bilan holatni rasmiylashtiring. Zarur bo‘lsa, sug‘urta kompaniyasi yoki tegishli organlarga murojaat qiling. Platforma orqali nizoni ham xabar qilishingiz mumkin.",
  },
  {
    category: "security",
    question: "Kompaniya akkaunti parolini qanday almashtiraman?",
    answer:
      "«Ma’lumotlar» bo‘limidagi «Parol va xavfsizlik» qismiga o‘ting. Joriy va yangi parolni kiriting. Xavfsizlik uchun boshqa saytlarda ishlatilmagan kuchli paroldan foydalaning.",
  },
  {
    category: "security",
    question: "Akkauntimga begona odam kirgan bo‘lsa nima qilaman?",
    answer:
      "Darhol parolni almashtiring va barcha faol seanslarni yakunlang, agar bu imkoniyat mavjud bo‘lsa. Shuningdek, kompaniya akkauntiga ulangan elektron pochta xavfsizligini tekshiring va platforma administratoriga xabar bering.",
  },
  {
    category: "problems",
    question: "Platformada texnik xatolik yuz bersa nima qilaman?",
    answer:
      "Sahifani yangilang va internet aloqasini tekshiring. Xatolik davom etsa, muammo yuz bergan sahifa, xatolik matni va skrinshotni qo‘llab-quvvatlash xizmatiga yuboring.",
  },
  {
    category: "problems",
    question: "Mijoz bilan kelishmovchilik yuzaga kelsa qayerga murojaat qilaman?",
    answer:
      "Bron raqami, mijoz bilan yozishmalar va mavjud dalillarni tayyorlang. Platformaning qo‘llab-quvvatlash xizmatiga murojaat qilib, vaziyatni batafsil tushuntiring.",
  },
];

export default function YordamMarkazi() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const { user } = useUser();
  const createMurojaat = useCreateMurojaat();

  useEffect(() => {
    if (!user) return;
    form.setFieldsValue({
      name: user.fullName || user.companyName,
      contact: user.email || user.phone,
    });
  }, [user, form]);

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return faqs.filter((item) => {
      const categoryMatch =
        activeCategory === "all" || item.category === activeCategory;

      const searchMatch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const handleSubmit = async (values: {
    name: string;
    contact: string;
    subject: string;
    message: string;
  }) => {
    const option = SUBJECT_OPTIONS.find((o) => o.value === values.subject);
    const contact = values.contact.trim();
    const isEmail = contact.includes("@");

    try {
      await createMurojaat.mutateAsync({
        name: values.name.trim(),
        email: isEmail ? contact : user?.email,
        phone: isEmail ? user?.phone : contact,
        type: values.subject,
        subject: option?.subject ?? values.subject,
        message: values.message.trim(),
      });
      message.success(
        "Murojaat yuborildi. Javob Xabarlar bo‘limiga keladi.",
      );
      form.setFieldsValue({ subject: undefined, message: "" });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string | string[] } } })
          ?.response?.data?.message;
      message.error(
        Array.isArray(msg)
          ? msg[0]
          : typeof msg === "string"
            ? msg
            : "Murojaat yuborilmadi",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
          Egasi kabineti
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#1f2d25] md:text-3xl">
          Yordam markazi
        </h1>
        <p className="mt-2 text-sm text-[#6d7a73] md:text-base">
          Kompaniyangiz avtomobillarini boshqarish va ijara faoliyatingiz
          bo‘yicha savollaringizga javob toping.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#0f2a1c,#165a36_52%,#00863e)] px-6 py-9 text-white shadow-[0_14px_32px_rgba(0,134,62,0.18)] md:px-10 md:py-12">
        <div className="relative z-10 max-w-[650px]">
          <span className="mb-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#b7f0c8]">
            Kompaniyalar uchun yordam
          </span>

          <h2 className="text-2xl font-bold leading-tight md:text-4xl">
            Biznesingizni boshqarish yanada oson!
          </h2>

          <p className="mt-4 max-w-[550px] text-sm leading-6 text-white/75 md:text-base">
            Avtomobil e’lonlari, bronlar, mijozlar va to‘lovlar bilan bog‘liq
            savollarga javoblarni shu yerdan topishingiz mumkin.
          </p>

          <div className="mt-7 max-w-[500px]">
            <Input
              size="large"
              prefix={<SearchOutlined className="text-[#8d9892]" />}
              placeholder="Savolingizni yozing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="!h-12 !rounded-full !border-0 !shadow-[0_8px_20px_rgba(16,37,26,0.12)]"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute -right-10 -top-20 hidden h-80 w-80 rounded-full border-[45px] border-white/[0.06] md:block" />
        <div className="pointer-events-none absolute -bottom-32 right-24 hidden h-72 w-72 rounded-full border-[35px] border-white/[0.06] md:block" />
        <CarOutlined className="pointer-events-none absolute bottom-8 right-12 hidden text-[150px] text-white/[0.08] md:block" />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-[#1f2d25]">
          Yordam mavzulari
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const active = activeCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={`flex min-h-[75px] cursor-pointer items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  active
                    ? "border-[#00863e] bg-[#00863e] text-white shadow-[0_8px_18px_rgba(0,134,62,0.22)]"
                    : "border-[#e5e9e7] bg-white text-[#1f2d25] hover:border-[#b9dfc6] hover:bg-[#f6faf7]"
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-semibold">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] md:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#1f2d25]">
              Ko‘p beriladigan savollar
            </h2>
            <p className="mt-1 text-sm text-[#8d9892]">
              Kerakli savolni tanlab, batafsil javobni o‘qing.
            </p>
          </div>

          <Tag className="!m-0 !rounded-full !border-0 !bg-[#eaf6ef] !px-3 !py-1 !text-[#00863e]">
            {filteredFaqs.length} ta savol
          </Tag>
        </div>

        {filteredFaqs.length > 0 ? (
          <Collapse
            ghost
            expandIconPlacement="end"
            items={filteredFaqs.map((item, index) => ({
              key: `${item.category}-${index}`,
              label: (
                <span className="pr-3 text-sm font-semibold text-[#1f2d25] md:text-base">
                  {item.question}
                </span>
              ),
              children: (
                <p className="text-sm leading-7 text-[#6d7a73]">{item.answer}</p>
              ),
            }))}
          />
        ) : (
          <Empty
            description="Savol topilmadi. Boshqa so‘z bilan qidirib ko‘ring."
            className="py-8"
          />
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf6ef] text-xl text-[#00863e]">
            <CustomerServiceOutlined />
          </div>

          <h3 className="text-lg font-bold text-[#1f2d25]">
            Savolingizga javob topmadingizmi?
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6d7a73]">
            Qo‘llab-quvvatlash jamoamizga murojaat qiling. Javob Xabarlar
            bo‘limiga keladi.
          </p>

          <div className="mt-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
                <MailOutlined />
              </div>
              <div>
                <p className="text-xs text-[#8d9892]">Elektron pochta</p>
                <p className="text-sm font-semibold text-[#1f2d25]">
                  jurayev088@icloud.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
                <ClockCircleOutlined />
              </div>
              <div>
                <p className="text-xs text-[#8d9892]">Ish vaqti</p>
                <p className="text-sm font-semibold text-[#1f2d25]">
                  Dushanba – Shanba, 09:00 – 18:00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e9e7] bg-white p-6 shadow-[0_8px_24px_rgba(16,37,26,0.03)]">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf6ef] text-[#00863e]">
              <MessageOutlined />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1f2d25]">
                Murojaat yuborish
              </h3>
              <p className="text-sm text-[#6d7a73]">
                CRM Murojaatlar bo‘limiga boradi
              </p>
            </div>
          </div>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Ismingiz"
              name="name"
              rules={[{ required: true, message: "Ismingizni kiriting" }]}
            >
              <Input size="large" className="!rounded-xl" />
            </Form.Item>
            <Form.Item
              label="Email yoki telefon"
              name="contact"
              rules={[{ required: true, message: "Aloqa ma'lumotini kiriting" }]}
            >
              <Input size="large" className="!rounded-xl" />
            </Form.Item>
            <Form.Item
              label="Mavzu"
              name="subject"
              rules={[{ required: true, message: "Mavzuni tanlang" }]}
            >
              <Select
                size="large"
                options={SUBJECT_OPTIONS.map(({ label, value }) => ({
                  label,
                  value,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Xabar"
              name="message"
              rules={[
                { required: true, message: "Xabarni yozing" },
                { min: 3, message: "Kamida 3 belgi" },
              ]}
            >
              <TextArea rows={3} maxLength={1000} showCount className="!rounded-xl" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={createMurojaat.isPending}
              icon={<MessageOutlined />}
              className="!h-11 !rounded-full !border-0 !bg-[#00863e] !px-5 hover:!bg-[#006f35]"
            >
              Murojaat yuborish
            </Button>
          </Form>
        </div>
      </div>

      <div className="rounded-2xl border border-[#c6e5d1] bg-[#eff8f2] p-4">
        <p className="text-sm leading-6 text-[#2f6b49]">
          <strong>Eslatma:</strong> Avtomobilni mijozga topshirishdan oldin uning
          hujjatlarini tekshiring, avtomobil holatini qayd eting va ijara
          shartlarini kelishib oling.
        </p>
      </div>
    </div>
  );
}
