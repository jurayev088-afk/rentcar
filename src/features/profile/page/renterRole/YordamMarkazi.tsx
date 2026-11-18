
"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  Empty,
  Form,
  Input,
  Select,
  message,
} from "antd";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Headphones,
  Car,
  CreditCard,
  CalendarCheck,
  ShieldCheck,
  Send,
  ChevronRight,
} from "lucide-react";

const { TextArea } = Input;

const categories = [
  { label: "Barchasi", value: "all" },
  { label: "Bron qilish", value: "bron" },
  { label: "To‘lovlar", value: "payment" },
  { label: "Ijara", value: "rental" },
  { label: "Akkaunt", value: "account" },
];

const faqData = [
  {
    category: "bron",
    question: "Avtomobilni qanday bron qilaman?",
    answer:
      "Mashinalar sahifasidan kerakli avtomobilni tanlang. Ijara sanasini belgilang va Bron qilish tugmasini bosing. Ma'lumotlaringizni tekshirib, bron so‘rovini yuboring.",
  },
  {
    category: "bron",
    question: "Bron holatini qayerdan ko‘rishim mumkin?",
    answer:
      "Profilingizdagi Mening bronlarim bo‘limiga kiring. U yerda barcha bronlaringiz va ularning holatini ko‘rishingiz mumkin.",
  },
  {
    category: "bron",
    question: "Bronni bekor qilish mumkinmi?",
    answer:
      "Agar broningiz hali bekor qilish mumkin bo‘lgan holatda bo‘lsa, Mening bronlarim sahifasidan Bekor qilish tugmasini bosing.",
  },
  {
    category: "payment",
    question: "To‘lovni qanday amalga oshiraman?",
    answer:
      "To‘lov usullari va mavjud imkoniyatlar bronni rasmiylashtirish jarayonida ko‘rsatiladi.",
  },
  {
    category: "payment",
    question: "To‘lov qaytariladimi?",
    answer:
      "To‘lovni qaytarish shartlari ijara shartlari va bron holatiga bog‘liq. Batafsil ma'lumot uchun qo‘llab-quvvatlash xizmatiga murojaat qiling.",
  },
  {
    category: "rental",
    question: "O‘z avtomobilimni ijaraga bera olamanmi?",
    answer:
      "Ha. Ijaraga beruvchi sifatida ro‘yxatdan o‘ting va Ijara bo‘limi orqali avtomobilingiz haqida ma'lumotlarni kiriting.",
  },
  {
    category: "rental",
    question: "Avtomobilimga kelgan bronlarni qayerdan ko‘raman?",
    answer:
      "Lessor profilingizdagi bronlar bo‘limidan avtomobilingizga kelgan barcha bron so‘rovlarini boshqarishingiz mumkin.",
  },
  {
    category: "account",
    question: "Telefon raqamimni o‘zgartira olamanmi?",
    answer:
      "Shaxsiy ma'lumotlar bo‘limidan telefon raqamingizni yangilashingiz mumkin.",
  },
  {
    category: "account",
    question: "Parolimni unutib qo‘ysam nima qilaman?",
    answer:
      "Kirish sahifasidagi parolni tiklash imkoniyatidan foydalaning. Agar muammo davom etsa, yordam xizmatiga murojaat qiling.",
  },
];

const contactItems = [
  {
    title: "Telegram orqali",
    description: "@Nomoz1vicc",
    icon: MessageCircle,
    color: "text-sky-600",
    bg: "bg-sky-50",
    link: "https://t.me/Nomoz1vicc",
  },
  {
    title: "Telefon orqali",
    description: "+998 93 105 54 75",
    icon: Phone,
    color: "text-green-600",
    bg: "bg-green-50",
    link: "tel:+998931055475",
  },
  {
    title: "Email orqali",
    description: "jurayev088@icloud.com",
    icon: Mail,
    color: "text-orange-600",
    bg: "bg-orange-50",
    link: "mailto:jurayev088@icloud.com",
  },
];

export default function YordamMarkazi() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaq = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchesSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleSubmit = () => {
    message.info(
      "Murojaat formasi tayyor. Xabar yuborilishi uchun backend API ulash kerak."
    );
  };

  return (
    <div className="min-h-screen space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F33]">
          Yordam markazi
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Savollaringizga javob toping yoki biz bilan bog‘laning.
        </p>
      </div>

      {/* Search banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0B1F33] px-6 py-10 text-white md:px-10">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Headphones size={25} />
          </div>

          <h2 className="text-2xl font-bold md:text-3xl">
            Sizga qanday yordam bera olamiz?
          </h2>

          <p className="mt-2 text-sm text-white/70">
            Kerakli savolingizni qidiring yoki quyidagi mavzulardan birini
            tanlang.
          </p>

          <div className="mt-6 flex items-center rounded-xl bg-white p-1.5">
            <Search className="ml-3 text-gray-400" size={20} />
            <Input
              variant="borderless"
              placeholder="Savolingizni yozing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[35px] border-white/5" />
        <div className="absolute -bottom-24 right-32 h-56 w-56 rounded-full border-[30px] border-white/5" />
      </div>

      {/* Quick categories */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { title: "Bron qilish", icon: CalendarCheck, category: "bron" },
          { title: "To‘lovlar", icon: CreditCard, category: "payment" },
          { title: "Avtomobil ijarasi", icon: Car, category: "rental" },
          { title: "Akkaunt", icon: ShieldCheck, category: "account" },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.category}
              onClick={() => setActiveCategory(item.category)}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition hover:border-[#0B1F33] ${
                activeCategory === item.category
                  ? "border-[#0B1F33] bg-slate-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0B1F33]/5 text-[#0B1F33]">
                <Icon size={21} />
              </div>
              <span className="text-sm font-semibold text-[#0B1F33]">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* FAQ */}
      <Card className="rounded-2xl!" styles={{ body: { padding: 20 } }}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#0B1F33]">
              Ko‘p beriladigan savollar
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Siz uchun eng kerakli javoblar
            </p>
          </div>

          <Select
            value={activeCategory}
            onChange={setActiveCategory}
            options={categories}
            className="w-40"
          />
        </div>

        {filteredFaq.length > 0 ? (
          <Collapse
            ghost
            items={filteredFaq.map((item, index) => ({
              key: `${item.category}-${index}`,
              label: (
                <span className="font-medium text-[#0B1F33]">
                  {item.question}
                </span>
              ),
              children: (
                <p className="text-sm leading-7 text-gray-500">
                  {item.answer}
                </p>
              ),
            }))}
          />
        ) : (
          <Empty
            description="Savolingiz bo‘yicha ma’lumot topilmadi"
            className="py-8"
          />
        )}
      </Card>

      {/* Contact */}
      <div>
        <h2 className="mb-1 text-lg font-bold text-[#0B1F33]">
          Biz bilan bog‘laning
        </h2>
        <p className="mb-4 text-sm text-gray-500">
          Savolingizga javob topa olmadingizmi? Bizga murojaat qiling.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
         {contactItems.map((item) => {
  const Icon = item.icon;

  return (
    <Card
      key={item.title}
      hoverable
      onClick={() => window.open(item.link, "_blank")}
      className="cursor-pointer rounded-xl! transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
        >
          <Icon size={22} />
        </div>

        <ChevronRight size={18} className="text-gray-400" />
      </div>

      <h3 className="mt-4 font-semibold text-[#0B1F33]">
        {item.title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {item.description}
      </p>
    </Card>
  );
})}
        </div>
      </div>

      {/* Contact form */}
      <Card className="rounded-2xl!" styles={{ body: { padding: 24 } }}>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#0B1F33]">
            Bizga murojaat yuboring
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Muammo yoki taklifingizni yozib qoldiring.
          </p>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              label="Ismingiz"
              name="name"
              rules={[{ required: true, message: "Ismingizni kiriting" }]}
            >
              <Input size="large" placeholder="Ismingizni kiriting" />
            </Form.Item>

            <Form.Item
              label="Email yoki telefon"
              name="contact"
              rules={[
                { required: true, message: "Aloqa ma'lumotini kiriting" },
              ]}
            >
              <Input size="large" placeholder="Email yoki telefon raqam" />
            </Form.Item>
          </div>

          <Form.Item
            label="Murojaat mavzusi"
            name="subject"
            rules={[{ required: true, message: "Mavzuni tanlang" }]}
          >
            <Select
              size="large"
              placeholder="Murojaat turini tanlang"
              options={[
                { label: "Bron bilan bog‘liq muammo", value: "bron" },
                { label: "To‘lov bilan bog‘liq muammo", value: "payment" },
                { label: "Avtomobil ijarasi", value: "rental" },
                { label: "Akkaunt bilan bog‘liq muammo", value: "account" },
                { label: "Boshqa savol", value: "other" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Xabaringiz"
            name="message"
            rules={[{ required: true, message: "Xabaringizni yozing" }]}
          >
            <TextArea
              rows={4}
              placeholder="Muammo yoki savolingizni batafsil yozing..."
              maxLength={1000}
              showCount
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<Send size={16} />}
            className="!h-11 !rounded-lg !bg-[#0B1F33] !px-6"
          >
            Murojaat yuborish
          </Button>
        </Form>
      </Card>
    </div>
  );
}
