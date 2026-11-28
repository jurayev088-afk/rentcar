"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { UploadFile } from "antd";
import {
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  Switch,
  message,
} from "antd";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Link2,
  Pencil,
  Sparkles,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CloudUploadOutlined } from "@ant-design/icons";

import { useBrandModels, useBrands } from "@/src/hooks/use-brands";
import { useCategories } from "@/src/hooks/use-categories";
import { useRegions } from "@/src/hooks/use-regions";
import { useDistricts } from "@/src/hooks/use-districts";
import {
  useCreateCar,
  useMyCar,
  useUpdateCar,
} from "@/src/hooks/use-my-cars";
import { brandLabel } from "@/src/lib/media";
import { mapApiCarToUi } from "@/src/lib/map-car";
import { uploadImageFile } from "@/src/lib/upload-media";
import { getApiErrorMessage } from "@/src/lib/api-error";
import {
  formatUzPhoneDisplay,
  plateDigitsOnly,
  toE164Uz,
  uzPhoneComplete,
} from "@/src/lib/input-masks";
import { useUser } from "@/src/constants/UseMeContext";

const FUEL_MAP: Record<string, string> = {
  Benzin: "BENZIN",
  Metan: "METAN",
  Propan: "PROPAN",
  Dizel: "DIZEL",
  Gibrid: "GIBRID",
  Elektro: "ELEKTRO",
};

const TRANSMISSION_MAP: Record<string, string> = {
  Avtomat: "AVTOMAT",
  Mexanika: "MEXANIKA",
};

const FUEL_LABEL: Record<string, string> = {
  BENZIN: "Benzin",
  METAN: "Metan",
  PROPAN: "Propan",
  DIZEL: "Dizel",
  GIBRID: "Gibrid",
  ELEKTRO: "Elektro",
};

const TRANSMISSION_LABEL: Record<string, string> = {
  AVTOMAT: "Avtomat",
  MEXANIKA: "Mexanika",
};

type Draft = {
  brand?: string;
  model?: string;
  year?: number;
  categoryId?: string;
  color?: string;
  number?: string;
  transmission: string;
  fuel: string;
  seats: number;
  airCondition: boolean;
  condition: string;
  regionId?: string;
  districtId?: string;
  address?: string;
  price?: number;
  deposit?: number;
  minDays: number;
  description?: string;
  rules?: string;
  phone?: string;
};

type StepId =
  | "brand"
  | "model"
  | "year"
  | "look"
  | "tech"
  | "place"
  | "price"
  | "photos"
  | "phone"
  | "extra";

const STEPS: { id: StepId; title: string; question: string }[] = [
  {
    id: "brand",
    title: "Brand",
    question: "Qaysi brand?",
  },
  {
    id: "model",
    title: "Model",
    question: "Qaysi model?",
  },
  {
    id: "year",
    title: "Yil",
    question: "Nechanchi yil?",
  },
  {
    id: "look",
    title: "Ko‘rinish",
    question: "Rangi va davlat raqami?",
  },
  {
    id: "tech",
    title: "Texnika",
    question: "Uzatma, yoqilg‘i va holati?",
  },
  {
    id: "place",
    title: "Manzil",
    question: "Mashina qayerda turadi?",
  },
  {
    id: "price",
    title: "Narx",
    question: "Kunlik narxi qancha?",
  },
  {
    id: "photos",
    title: "Rasmlar",
    question: "Mashina rasmlarini yuklang",
  },
  {
    id: "phone",
    title: "Telefon",
    question: "Mijoz qaysi raqamga qo‘ng‘iroq qilsin?",
  },
  {
    id: "extra",
    title: "Tayyor",
    question: "Qo‘shimcha yozasizmi? (ixtiyoriy)",
  },
];

/** Input focusini saqlash — chip/switch bosilganda klaviatura yopilmasin */
function keepKeyboard(e: { preventDefault: () => void; target: EventTarget | null }) {
  const t = e.target;
  if (!(t instanceof HTMLElement)) return;
  if (
    t.closest(
      "input, textarea, .ant-input-number-input, .ant-select-selector, [contenteditable='true']",
    )
  ) {
    return;
  }
  if (
    t.closest(
      "button, .ant-switch, [role='switch'], .ant-upload, label, a",
    )
  ) {
    e.preventDefault();
  }
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onPointerDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "border-[#00863e] bg-[#00863e] text-white shadow-[0_6px_14px_rgba(0,134,62,0.22)]"
          : "border-[#d8e0db] bg-white text-[#1f2d25] hover:border-[#00863e]/50"
      }`}
    >
      {children}
    </button>
  );
}

function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00863e] text-white shadow-[0_4px_10px_rgba(0,134,62,0.25)]">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-[#e6ebe8] bg-white px-3.5 py-2.5 text-[15px] font-semibold text-[#1f2d25] shadow-sm">
        {children}
      </div>
    </div>
  );
}

function UserBubble({
  text,
  onEdit,
}: {
  text: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[#dff3ff] px-3.5 py-2.5 text-[15px] font-semibold text-[#12323f]">
        {text}
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#5b6b64] hover:text-[#00863e]"
      >
        O‘zgartirish
        <Link2 className="h-3 w-3" />
      </button>
    </div>
  );
}

export default function AddCar() {
  const { user, apiUser } = useUser();
  const companyPhoneRaw =
    apiUser?.company?.phone || user?.phone || "";
  const companyPhoneDisplay = formatUzPhoneDisplay(companyPhoneRaw);

  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<Draft>({
    transmission: "Avtomat",
    fuel: "Benzin",
    seats: 5,
    airCondition: true,
    condition: "A'lo",
    minDays: 1,
    phone: companyPhoneDisplay || undefined,
  });
  const [depositEnabled, setDepositEnabled] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [saving, setSaving] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  const { data: brandsData, isLoading: brandsLoading } = useBrands({
    limit: 500,
  });
  const brands = useMemo(() => brandsData?.items ?? [], [brandsData?.items]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>();
  const { data: modelsData, isLoading: modelsLoading } = useBrandModels(
    selectedBrandId,
    { limit: 1000 },
  );
  const models = useMemo(() => modelsData?.items ?? [], [modelsData?.items]);
  const { data: categoriesData = [] } = useCategories();
  const { data: regionsData = [], isLoading: regionsLoading } = useRegions();
  const [selectedRegionId, setSelectedRegionId] = useState<string | undefined>();
  const { data: districtsData = [], isLoading: districtsLoading } =
    useDistricts(selectedRegionId);
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();

  const params = useParams();
  const router = useRouter();
  const id = params.id as string | undefined;
  const isEdit = Boolean(id);
  const {
    data: apiEditingCar,
    isLoading: editLoading,
    isError: editError,
    isFetched: editFetched,
  } = useMyCar(isEdit ? id : undefined);
  const editingCar = useMemo(
    () => (apiEditingCar ? mapApiCarToUi(apiEditingCar) : undefined),
    [apiEditingCar],
  );
  const hydratedCarIdRef = useRef<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [vvPad, setVvPad] = useState(0);

  // Yangi e'lon: kompaniya telefoni kelganda to‘ldirish (foydalanuvchi o‘zgartirmagan bo‘lsa)
  useEffect(() => {
    if (isEdit || phoneTouched || !companyPhoneDisplay) return;
    setDraft((d) => ({ ...d, phone: d.phone || companyPhoneDisplay }));
  }, [companyPhoneDisplay, isEdit, phoneTouched]);

  useEffect(() => {
    if (!isEdit || !id) {
      hydratedCarIdRef.current = null;
      return;
    }
    if (editLoading || brandsLoading) return;

    if (editFetched && (editError || !apiEditingCar)) {
      message.error("Mashina topilmadi");
      router.replace("/profile/owner/moshinalarim");
      return;
    }

    if (!apiEditingCar || !editingCar) return;
    if (hydratedCarIdRef.current === apiEditingCar.id) return;
    hydratedCarIdRef.current = apiEditingCar.id;

    const brand = brands.find(
      (b) => b.name.toLowerCase() === apiEditingCar.brand.toLowerCase(),
    );
    if (brand) setSelectedBrandId(brand.id);

    const regionId = apiEditingCar.region?.id;
    if (regionId) setSelectedRegionId(regionId);

    const images = (editingCar.images ?? []).map((img, index) => ({
      uid: `edit-${apiEditingCar.id}-${index}`,
      name: `image-${index}`,
      status: "done" as const,
      url: img.url || img.thumbUrl,
    }));

    setDraft({
      brand: editingCar.brand,
      model: editingCar.model,
      year: editingCar.year,
      categoryId: apiEditingCar.category?.id,
      color: editingCar.color,
      number: editingCar.number
        ? plateDigitsOnly(String(editingCar.number))
        : undefined,
      transmission:
        TRANSMISSION_LABEL[editingCar.transmission] || editingCar.transmission,
      fuel: FUEL_LABEL[editingCar.fuel] || editingCar.fuel,
      seats: editingCar.seats ?? 5,
      airCondition: editingCar.airCondition ?? true,
      condition: editingCar.condition || "A'lo",
      regionId,
      districtId: apiEditingCar.district?.id,
      address: editingCar.address,
      price: editingCar.price,
      deposit: editingCar.deposit || undefined,
      minDays: editingCar.minDays ?? 1,
      description: editingCar.description,
      rules: editingCar.rules,
      phone: editingCar.phone
        ? formatUzPhoneDisplay(String(editingCar.phone))
        : companyPhoneDisplay || undefined,
    });
    setDepositEnabled(Boolean(editingCar.deposit));
    setFileList(images);
    setPhoneTouched(true);
    setStepIndex(0);
  }, [
    apiEditingCar,
    brands,
    brandsLoading,
    companyPhoneDisplay,
    editError,
    editFetched,
    editLoading,
    editingCar,
    id,
    isEdit,
    router,
  ]);

  // Mobile: orqa fon scrollini to‘xtatish + klaviatura bilan shell balandligi
  useEffect(() => {
    const mobile = () => window.matchMedia("(max-width: 639px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (mobile()) document.body.style.overflow = "hidden";

    const vv = window.visualViewport;
    const sync = () => {
      const shell = shellRef.current;
      if (!shell || !vv) return;
      if (!mobile()) {
        shell.style.height = "";
        shell.style.top = "";
        setVvPad(0);
        return;
      }
      const covered = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      setVvPad(covered);
      shell.style.height = `${Math.round(vv.height)}px`;
      shell.style.top = `${Math.round(vv.offsetTop)}px`;
    };

    sync();
    vv?.addEventListener("resize", sync);
    vv?.addEventListener("scroll", sync);
    window.addEventListener("orientationchange", sync);
    window.addEventListener("resize", sync);
    return () => {
      document.body.style.overflow = prevOverflow;
      vv?.removeEventListener("resize", sync);
      vv?.removeEventListener("scroll", sync);
      window.removeEventListener("orientationchange", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  // Fokuslangan inputni scroll ichida ko‘rsatish (klaviatura orqasida qolmasin)
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const revealActive = () => {
      const el = document.activeElement;
      if (!(el instanceof HTMLElement)) return;
      if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") return;
      if (!root.contains(el)) return;
      const scroller = scrollRef.current;
      if (!scroller) return;
      const sRect = scroller.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      const target = eRect.top - sRect.top - sRect.height * 0.3;
      if (Math.abs(target) < 8) return;
      scroller.scrollBy({ top: target, behavior: "smooth" });
    };

    const onFocusIn = () => {
      window.setTimeout(revealActive, 50);
      window.setTimeout(revealActive, 280);
    };

    root.addEventListener("focusin", onFocusIn);
    window.visualViewport?.addEventListener("resize", revealActive);
    return () => {
      root.removeEventListener("focusin", onFocusIn);
      window.visualViewport?.removeEventListener("resize", revealActive);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight;
  }, [stepIndex]);

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const regionName = regionsData.find((r) => r.id === draft.regionId);
  const districtName = districtsData.find((d) => d.id === draft.districtId);

  const answerText = (sid: StepId): string | null => {
    switch (sid) {
      case "brand":
        return draft.brand ? brandLabel(draft.brand) : null;
      case "model":
        return draft.model || null;
      case "year":
        return draft.year ? String(draft.year) : null;
      case "look": {
        const parts = [draft.color, draft.number].filter(Boolean);
        return parts.length ? parts.join(" · ") : null;
      }
      case "tech":
        return `${draft.transmission} · ${draft.fuel} · ${draft.seats} o‘rindiq · Konditsioner: ${draft.airCondition ? "Bor" : "Yo‘q"}`;
      case "place": {
        if (!draft.regionId) return null;
        return [
          regionName?.nameUz || regionName?.name,
          districtName?.name,
          draft.address,
        ]
          .filter(Boolean)
          .join(", ");
      }
      case "price":
        return draft.price != null
          ? `${Number(draft.price).toLocaleString("uz-UZ")} so‘m / kun${
              depositEnabled && draft.deposit
                ? ` · garov ${Number(draft.deposit).toLocaleString("uz-UZ")}`
                : ""
            }`
          : null;
      case "photos":
        return fileList.length ? `${fileList.length} ta rasm` : null;
      case "phone":
        return draft.phone ? `+998 ${draft.phone}` : null;
      case "extra":
        return draft.description || draft.rules ? "Qo‘shildi" : "O‘tkazib yuborildi";
      default:
        return null;
    }
  };

  const canContinue = (): boolean => {
    switch (step.id) {
      case "brand":
        return Boolean(draft.brand);
      case "model":
        return Boolean(draft.model);
      case "year":
        return Boolean(draft.year);
      case "look":
        return Boolean(draft.color);
      case "tech":
        return Boolean(draft.transmission && draft.fuel);
      case "place":
        return Boolean(draft.regionId && draft.districtId);
      case "price":
        return draft.price != null && Number(draft.price) >= 1000;
      case "photos":
        return true; // ixtiyoriy, lekin tavsiya
      case "phone":
        return Boolean(draft.phone && uzPhoneComplete(draft.phone));
      case "extra":
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!canContinue()) {
      message.warning("Iltimos, kerakli maydonni to‘ldiring");
      return;
    }
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (stepIndex === 0) {
      router.push("/profile/owner/moshinalarim");
      return;
    }
    setStepIndex((i) => i - 1);
  };

  const jumpTo = (i: number) => setStepIndex(i);

  const buildPayload = async () => {
    const imageUrls: string[] = [];
    for (const file of fileList) {
      if (file.url && !file.originFileObj) {
        imageUrls.push(file.url);
        continue;
      }
      const raw = file.originFileObj as File | undefined;
      if (raw) {
        const okType = /^image\/(jpeg|jpg|png|webp|avif)$/i.test(raw.type);
        if (!okType) throw new Error("Faqat JPEG, PNG, WebP yoki AVIF rasm yuklang");
        if (raw.size <= 0 || raw.size > 8 * 1024 * 1024) {
          throw new Error("Rasm hajmi 8 MB dan oshmasligi kerak");
        }
        imageUrls.push(await uploadImageFile(raw));
      }
    }

    return {
      brand: String(draft.brand),
      model: String(draft.model),
      year: Number(draft.year),
      color: draft.color ? String(draft.color) : undefined,
      plateNumber: draft.number
        ? plateDigitsOnly(String(draft.number)) || undefined
        : undefined,
      categoryId: draft.categoryId ? String(draft.categoryId) : undefined,
      fuelType: FUEL_MAP[String(draft.fuel)] || "BENZIN",
      transmission: TRANSMISSION_MAP[String(draft.transmission)] || "AVTOMAT",
      seats: draft.seats != null ? Number(draft.seats) : 5,
      airCondition: Boolean(draft.airCondition),
      condition: draft.condition ? String(draft.condition) : undefined,
      regionId: String(draft.regionId),
      districtId: draft.districtId ? String(draft.districtId) : undefined,
      address: draft.address ? String(draft.address) : undefined,
      dailyPrice: Number(draft.price),
      deposit:
        depositEnabled && draft.deposit != null
          ? Number(draft.deposit)
          : undefined,
      minDays: draft.minDays != null ? Number(draft.minDays) : 1,
      rules: draft.rules ? String(draft.rules) : undefined,
      description: draft.description ? String(draft.description) : undefined,
      phone: draft.phone ? toE164Uz(String(draft.phone)) || undefined : undefined,
      imageUrls,
    };
  };

  const onSubmit = async () => {
    if (!canContinue()) {
      message.warning("Telefon raqamini to‘g‘ri kiriting");
      return;
    }
    // oxirgi qadamdan oldin asosiy maydonlar
    for (let i = 0; i < STEPS.length - 1; i++) {
      const prev = answerText(STEPS[i].id);
      if (STEPS[i].id === "photos") continue;
      if (STEPS[i].id === "extra") continue;
      if (!prev && STEPS[i].id !== "look") {
        // look requires color only — already checked via flow
      }
    }
    if (!draft.brand || !draft.model || !draft.year || !draft.color) {
      message.error("Asosiy ma'lumotlar to‘liq emas");
      setStepIndex(0);
      return;
    }
    if (!draft.regionId || !draft.districtId || draft.price == null) {
      message.error("Manzil yoki narx yetishmayapti");
      return;
    }
    if (!draft.phone || !uzPhoneComplete(draft.phone)) {
      message.error("Telefon raqamini to‘liq kiriting");
      setStepIndex(STEPS.findIndex((s) => s.id === "phone"));
      return;
    }

    try {
      setSaving(true);
      const payload = await buildPayload();
      if (isEdit && id) {
        await updateCar.mutateAsync({ id, payload });
        message.success("Mashina muvaffaqiyatli yangilandi");
      } else {
        await createCar.mutateAsync(payload);
        message.success("Mashina muvaffaqiyatli qo‘shildi");
      }
      router.push("/profile/owner/moshinalarim");
    } catch (error: unknown) {
      message.error(getApiErrorMessage(error, "Saqlashda xatolik yuz berdi"));
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && editLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-lg font-semibold text-[#00863e]">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div
      ref={shellRef}
      className="mx-auto flex w-full max-w-lg flex-col overflow-hidden bg-[#f4f6f5] max-sm:fixed max-sm:inset-x-0 max-sm:top-0 max-sm:z-[70] max-sm:h-[100dvh] max-sm:max-w-none sm:h-[calc(100dvh-7rem)] sm:max-h-[calc(100dvh-7rem)] sm:rounded-2xl sm:border sm:border-[#e6ebe8] sm:bg-white sm:shadow-[0_8px_24px_rgba(16,37,26,0.06)]"
    >
      {/* Header */}
      <header className="shrink-0 border-b border-[#e8ecea] bg-white px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:rounded-t-2xl">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={goBack}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1f2d25] hover:bg-[#f0f3f1]"
            aria-label="Orqaga"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-[#1f2d25]">
              {isEdit ? "Tahrirlash" : "Mashina joylash"}
            </h1>
            <p className="text-[11px] font-medium text-[#7a8780]">
              {stepIndex + 1}-qadam / {STEPS.length}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/profile/owner/moshinalarim")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1f2d25] hover:bg-[#f0f3f1]"
            aria-label="Yopish"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#e8eeea]">
          <div
            className="h-full rounded-full bg-[#00863e] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex gap-1 overflow-hidden">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full ${
                i <= stepIndex ? "bg-[#00863e]" : "bg-[#dde5e0]"
              }`}
            />
          ))}
        </div>
      </header>

      {/* Chat thread */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 [-webkit-overflow-scrolling:touch]"
        style={{ paddingBottom: vvPad > 40 ? 24 : 20 }}
      >
        {user?.companyName && (
          <p className="text-center text-xs font-medium text-[#6d7a73]">
            {user.companyName} · sodda joylash
          </p>
        )}

        {STEPS.slice(0, stepIndex).map((s, i) => {
          const text = answerText(s.id);
          if (!text) return null;
          return (
            <div key={s.id} className="space-y-2">
              <BotBubble>{s.question}</BotBubble>
              <UserBubble text={text} onEdit={() => jumpTo(i)} />
            </div>
          );
        })}

        <div
          className="space-y-3"
          onMouseDown={keepKeyboard}
          onPointerDown={keepKeyboard}
        >
          <BotBubble>{step.question}</BotBubble>

          {/* Step body */}
          {step.id === "brand" && (
            <div className="rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <Select
                size="large"
                className="w-full"
                showSearch
                loading={brandsLoading}
                placeholder="Brandni tanlang"
                optionFilterProp="label"
                value={draft.brand}
                options={brands.map((b) => ({
                  label: brandLabel(b.name),
                  value: b.name,
                }))}
                onChange={(value: string) => {
                  const found = brands.find((b) => b.name === value);
                  setSelectedBrandId(found?.id);
                  setDraft((d) => ({
                    ...d,
                    brand: value,
                    model: undefined,
                  }));
                }}
              />
              {(categoriesData?.length ?? 0) > 0 && (
                <div className="mt-3">
                  <p className="mb-2 text-xs font-semibold text-[#6d7a73]">
                    Kategoriya (ixtiyoriy)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categoriesData.slice(0, 8).map((c) => (
                      <Chip
                        key={c.id}
                        active={draft.categoryId === c.id}
                        onClick={() =>
                          setDraft((d) => ({
                            ...d,
                            categoryId:
                              d.categoryId === c.id ? undefined : c.id,
                          }))
                        }
                      >
                        {c.nameUz || c.name}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step.id === "model" && (
            <div className="rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <Select
                size="large"
                className="w-full"
                showSearch
                loading={modelsLoading}
                disabled={!selectedBrandId}
                placeholder={
                  selectedBrandId ? "Modelni tanlang" : "Avval brand tanlang"
                }
                optionFilterProp="label"
                value={draft.model}
                options={models.map((m) => ({
                  label: m.name,
                  value: m.name,
                }))}
                onChange={(value: string) =>
                  setDraft((d) => ({ ...d, model: value }))
                }
              />
            </div>
          )}

          {step.id === "year" && (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 16 }, (_, i) => 2026 - i).map((year) => (
                <Chip
                  key={year}
                  active={draft.year === year}
                  onClick={() => setDraft((d) => ({ ...d, year }))}
                >
                  {year}
                </Chip>
              ))}
            </div>
          )}

          {step.id === "look" && (
            <div className="space-y-3 rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-[#6d7a73]">
                  Rang
                </p>
                <Input
                  size="large"
                  placeholder="Masalan: Qora"
                  value={draft.color}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, color: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-[#6d7a73]">
                  Davlat raqami (ixtiyoriy)
                </p>
                <Input
                  size="large"
                  placeholder="01A777AA"
                  maxLength={8}
                  value={draft.number}
                  onChange={(e) =>
                    setDraft((d) => ({
                      ...d,
                      number: plateDigitsOnly(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          )}

          {step.id === "tech" && (
            <div className="space-y-4 rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <div>
                <p className="mb-2 text-xs font-semibold text-[#6d7a73]">
                  Uzatmalar qutisi
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Avtomat", "Mexanika"].map((v) => (
                    <Chip
                      key={v}
                      active={draft.transmission === v}
                      onClick={() =>
                        setDraft((d) => ({ ...d, transmission: v }))
                      }
                    >
                      {v}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-[#6d7a73]">
                  Yoqilg‘i
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Benzin",
                    "Metan",
                    "Propan",
                    "Dizel",
                    "Gibrid",
                    "Elektro",
                  ].map((v) => (
                    <Chip
                      key={v}
                      active={draft.fuel === v}
                      onClick={() => setDraft((d) => ({ ...d, fuel: v }))}
                    >
                      {v}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-[#6d7a73]">
                  O‘rindiqlar
                </p>
                <div className="flex flex-wrap gap-2">
                  {[2, 4, 5, 7].map((n) => (
                    <Chip
                      key={n}
                      active={draft.seats === n}
                      onClick={() => setDraft((d) => ({ ...d, seats: n }))}
                    >
                      {n} ta
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-[#6d7a73]">
                  Konditsioner
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    active={draft.airCondition === true}
                    onClick={() =>
                      setDraft((d) => ({ ...d, airCondition: true }))
                    }
                  >
                    Bor
                  </Chip>
                  <Chip
                    active={draft.airCondition === false}
                    onClick={() =>
                      setDraft((d) => ({ ...d, airCondition: false }))
                    }
                  >
                    Yo‘q
                  </Chip>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-[#6d7a73]">
                  Holati
                </p>
                <div className="flex flex-wrap gap-2">
                  {["A'lo", "Yaxshi", "O'rtacha"].map((v) => (
                    <Chip
                      key={v}
                      active={draft.condition === v}
                      onClick={() => setDraft((d) => ({ ...d, condition: v }))}
                    >
                      {v}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step.id === "place" && (
            <div className="space-y-3 rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <Select
                size="large"
                className="w-full"
                showSearch
                loading={regionsLoading}
                placeholder="Viloyat / shahar"
                optionFilterProp="label"
                value={draft.regionId}
                options={regionsData.map((x) => ({
                  label: x.nameUz || x.name,
                  value: x.id,
                }))}
                onChange={(value: string) => {
                  setSelectedRegionId(value);
                  setDraft((d) => ({
                    ...d,
                    regionId: value,
                    districtId: undefined,
                  }));
                }}
              />
              <Select
                size="large"
                className="w-full"
                showSearch
                loading={districtsLoading}
                disabled={!selectedRegionId}
                placeholder={
                  selectedRegionId ? "Tuman" : "Avval viloyatni tanlang"
                }
                optionFilterProp="label"
                value={draft.districtId}
                options={districtsData.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
                onChange={(value: string) =>
                  setDraft((d) => ({ ...d, districtId: value }))
                }
              />
              <Input
                size="large"
                placeholder="Ko‘cha, uy (ixtiyoriy)"
                value={draft.address}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, address: e.target.value }))
                }
              />
            </div>
          )}

          {step.id === "price" && (
            <div className="space-y-3 rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-[#6d7a73]">
                  Kunlik narx (so‘m)
                </p>
                <InputNumber
                  size="large"
                  className="w-full"
                  min={1000}
                  placeholder="Masalan: 500000"
                  value={draft.price}
                  formatter={(value) =>
                    value
                      ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : ""
                  }
                  parser={(value) =>
                    Number(value?.replace(/\s/g, "") || 0) as unknown as 1000
                  }
                  onChange={(v) =>
                    setDraft((d) => ({
                      ...d,
                      price: v == null ? undefined : Number(v),
                    }))
                  }
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-[#6d7a73]">
                  Minimal kun
                </p>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 7].map((n) => (
                    <Chip
                      key={n}
                      active={draft.minDays === n}
                      onClick={() => setDraft((d) => ({ ...d, minDays: n }))}
                    >
                      {n} kun
                    </Chip>
                  ))}
                </div>
              </div>
              <div
                className="flex items-center justify-between rounded-xl bg-[#f6faf7] px-3 py-2.5"
                onMouseDown={(e) => e.preventDefault()}
                onPointerDown={(e) => e.preventDefault()}
              >
                <div>
                  <p className="text-sm font-semibold text-[#1f2d25]">Garov</p>
                  <p className="text-[11px] text-[#6d7a73]">
                    Kerak bo‘lsa yoqing
                  </p>
                </div>
                <Switch
                  checked={depositEnabled}
                  onChange={(checked) => {
                    setDepositEnabled(checked);
                    if (!checked) {
                      setDraft((d) => ({ ...d, deposit: undefined }));
                    }
                  }}
                />
              </div>
              {depositEnabled && (
                <InputNumber
                  size="large"
                  className="w-full"
                  min={0}
                  placeholder="Garov miqdori"
                  value={draft.deposit}
                  formatter={(value) =>
                    value
                      ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      : ""
                  }
                  parser={(value) =>
                    Number(value?.replace(/\s/g, "") || 0) as unknown as 0
                  }
                  onChange={(v) =>
                    setDraft((d) => ({
                      ...d,
                      deposit: v == null ? undefined : Number(v),
                    }))
                  }
                />
              )}
            </div>
          )}

          {step.id === "photos" && (
            <div className="rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <p className="mb-3 text-xs leading-5 text-[#6d7a73]">
                Oldi, yon va salon — kamida 3–4 ta rasm tavsiya etiladi.
              </p>
              <Upload
                listType="picture-card"
                accept="image/*"
                multiple
                maxCount={10}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={({ fileList: newList }) => setFileList(newList)}
              >
                {fileList.length < 10 && (
                  <div className="flex flex-col items-center gap-1">
                    <CloudUploadOutlined className="text-xl text-[#00863e]" />
                    <span className="text-[11px] font-medium">Yuklash</span>
                  </div>
                )}
              </Upload>
            </div>
          )}

          {step.id === "phone" && (
            <div className="space-y-2 rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <p className="text-xs leading-5 text-[#6d7a73]">
                Kompaniya raqami avtomatik qo‘yildi. Kerak bo‘lsa
                o‘zgartirishingiz mumkin — bu raqam shu mashina e&apos;lonida
                ko‘rinadi.
              </p>
              <Input
                size="large"
                prefix="+998"
                placeholder="93 777 77 77"
                maxLength={12}
                inputMode="numeric"
                value={draft.phone}
                onChange={(e) => {
                  setPhoneTouched(true);
                  setDraft((d) => ({
                    ...d,
                    phone: formatUzPhoneDisplay(e.target.value),
                  }));
                }}
                suffix={
                  <button
                    type="button"
                    className="text-[#00863e]"
                    aria-label="Tahrirlash"
                    onClick={() => setPhoneTouched(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                }
              />
              {companyPhoneDisplay && draft.phone !== companyPhoneDisplay && (
                <button
                  type="button"
                  className="text-xs font-semibold text-[#00863e]"
                  onClick={() => {
                    setDraft((d) => ({ ...d, phone: companyPhoneDisplay }));
                    setPhoneTouched(false);
                  }}
                >
                  Kompaniya raqamiga qaytarish
                </button>
              )}
            </div>
          )}

          {step.id === "extra" && (
            <div className="space-y-3 rounded-2xl border border-[#e6ebe8] bg-white p-3 shadow-sm">
              <div>
                <p className="mb-1.5 text-xs font-semibold text-[#6d7a73]">
                  Qisqa tavsif (ixtiyoriy)
                </p>
                <Input.TextArea
                  rows={3}
                  maxLength={800}
                  placeholder="Mashina haqida qisqacha..."
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, description: e.target.value }))
                  }
                />
              </div>
              <div>
                <p className="mb-1.5 text-xs font-semibold text-[#6d7a73]">
                  Ijara shartlari (ixtiyoriy)
                </p>
                <Input.TextArea
                  rows={2}
                  maxLength={600}
                  placeholder="Masalan: toza qaytarilsin..."
                  value={draft.rules}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, rules: e.target.value }))
                  }
                />
              </div>
              <div className="rounded-xl bg-[#eff8f2] px-3 py-2.5 text-xs leading-5 text-[#2f6b49]">
                <Check className="mr-1 inline h-3.5 w-3.5" />
                {draft.brand && brandLabel(draft.brand)} {draft.model} ·{" "}
                {draft.year} · +998 {draft.phone}
              </div>
            </div>
          )}
        </div>
        <div ref={chatEndRef} />
      </div>

      {/* Bottom action — har doim ko‘rinadi (shrink-0) */}
      <div className="shrink-0 border-t border-[#e8ecea] bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:rounded-b-2xl">
        {step.id === "extra" ? (
          <Button
            type="primary"
            size="large"
            block
            loading={saving}
            // Klaviatura ochiq bo‘lsa click yo‘qolmasin
            onMouseDown={(e) => e.preventDefault()}
            onClick={onSubmit}
            className="!h-12 !rounded-full !border-0 !bg-[#00863e] !text-[15px] !font-bold hover:!bg-[#006f35]"
          >
            {isEdit ? "Saqlash" : "E'lonni joylashtirish"}
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!canContinue()}
              // pointerdown: blur/klaviatura yopilishi clickni yutib yubormasin
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                if (!canContinue()) return;
                e.preventDefault();
                goNext();
              }}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#00863e] text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(0,134,62,0.22)] transition enabled:hover:bg-[#006f35] disabled:cursor-not-allowed disabled:bg-[#a7c4b4]"
            >
              Davom etish
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
