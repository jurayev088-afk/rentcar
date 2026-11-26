"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { UploadFile } from "antd";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  Checkbox,
  Divider,
  Switch,
  message,
} from "antd";
import {
  CarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  CameraOutlined,
  FileTextOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  InfoCircleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";

import type { Car } from "@/src/types";
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
  formatPlateNumber,
  formatUzPhoneDisplay,
  toE164Uz,
} from "@/src/lib/input-masks";

const FUEL_MAP: Record<string, string> = {
  Benzin: "BENZIN",
  Metan: "METAN",
  Propan: "PROPAN",
  Dizel: "DIZEL",
  Gibrid: "GIBRID",
  Elektro: "ELEKTRO",
  BENZIN: "BENZIN",
  METAN: "METAN",
  PROPAN: "PROPAN",
  DIZEL: "DIZEL",
  GIBRID: "GIBRID",
  ELEKTRO: "ELEKTRO",
};

const TRANSMISSION_MAP: Record<string, string> = {
  Avtomat: "AVTOMAT",
  Mexanika: "MEXANIKA",
  AVTOMAT: "AVTOMAT",
  MEXANIKA: "MEXANIKA",
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

const { TextArea } = Input;

function SectionTitle({
  icon,
  title,
  description,
  number,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  number: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#00863e] text-xl text-white shadow-[0_8px_18px_rgba(0,134,62,0.22)]">
        {icon}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-[#1f2d25]">{title}</h2>
          <span className="rounded-md bg-[#eaf6ef] px-2 py-0.5 text-xs font-semibold text-[#00863e]">
            {number}
          </span>
        </div>
        <p className="mt-1 text-sm text-[#6d7a73]">{description}</p>
      </div>
    </div>
  );
}

function FormCard({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.03)] transition hover:shadow-[0_12px_28px_rgba(16,37,26,0.07)] md:p-7">
      {children}
    </div>
  );
}

export default function AddCar() {
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [depositEnabled, setDepositEnabled] = useState(false);

  const { data: brandsData, isLoading: brandsLoading } = useBrands({
    limit: 200,
  });
  const brands = useMemo(() => brandsData?.items ?? [], [brandsData?.items]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>();
  const { data: modelsData, isLoading: modelsLoading } = useBrandModels(
    selectedBrandId,
    { limit: 200 },
  );
  const models = useMemo(() => modelsData?.items ?? [], [modelsData?.items]);
  const { data: categoriesData = [] } = useCategories();
  const { data: regionsData = [], isLoading: regionsLoading } = useRegions();
  const [selectedRegionId, setSelectedRegionId] = useState<string | undefined>();
  const { data: districtsData = [], isLoading: districtsLoading } =
    useDistricts(selectedRegionId);
  const createCar = useCreateCar();
  const updateCar = useUpdateCar();
  const [saving, setSaving] = useState(false);

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

  const pageTitle = isEdit
    ? "Mashinangiz e'lonini tahrirlang"
    : "Mashinangizni ijaraga bering";

  const pageDescription = isEdit
    ? "Avtomobil ma'lumotlarini yangilang va o'zgarishlarni saqlang."
    : "Avtomobilingiz haqida ma'lumotlarni kiriting, rasmlarini yuklang va e'loningizni joylashtiring.";

  useEffect(() => {
    if (!isEdit || !id) {
      hydratedCarIdRef.current = null;
      return;
    }
    if (hydratedCarIdRef.current && hydratedCarIdRef.current !== id) {
      hydratedCarIdRef.current = null;
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

    form.setFieldsValue({
      brand: editingCar.brand,
      model: editingCar.model,
      year: editingCar.year,
      color: editingCar.color,
      number: editingCar.number
        ? formatPlateNumber(String(editingCar.number))
        : undefined,
      categoryId: apiEditingCar.category?.id,
      phone: editingCar.phone
        ? formatUzPhoneDisplay(String(editingCar.phone))
        : undefined,
      transmission:
        TRANSMISSION_LABEL[editingCar.transmission] || editingCar.transmission,
      fuel: FUEL_LABEL[editingCar.fuel] || editingCar.fuel,
      engine: editingCar.engine,
      seats: editingCar.seats,
      airCondition: editingCar.airCondition,
      condition: editingCar.condition,
      regionId,
      districtId: apiEditingCar.district?.id,
      address: editingCar.address,
      price: editingCar.price,
      oldPrice: editingCar.oldPrice || undefined,
      deposit: editingCar.deposit || undefined,
      minDays: editingCar.minDays,
      rules: editingCar.rules,
      description: editingCar.description,
      images,
      agreement: true,
    });

    setDepositEnabled(Boolean(editingCar.deposit));
    setFileList(images);
  }, [
    apiEditingCar,
    brands,
    brandsLoading,
    editError,
    editFetched,
    editLoading,
    editingCar,
    form,
    id,
    isEdit,
    router,
  ]);

  const buildPayload = async (values: Record<string, unknown>) => {
    const imageUrls: string[] = [];
    for (const file of fileList) {
      if (file.url && !file.originFileObj) {
        imageUrls.push(file.url);
        continue;
      }
      const raw = file.originFileObj as File | undefined;
      if (raw) {
        const okType = /^image\/(jpeg|jpg|png|webp|avif)$/i.test(raw.type);
        if (!okType) {
          throw new Error("Faqat JPEG, PNG, WebP yoki AVIF rasm yuklang");
        }
        if (raw.size <= 0 || raw.size > 8 * 1024 * 1024) {
          throw new Error("Rasm hajmi 8 MB dan oshmasligi kerak");
        }
        imageUrls.push(await uploadImageFile(raw));
      }
    }

    return {
      brand: String(values.brand),
      model: String(values.model),
      year: Number(values.year),
      color: values.color ? String(values.color) : undefined,
      plateNumber: values.number
        ? formatPlateNumber(String(values.number))
        : undefined,
      categoryId: values.categoryId ? String(values.categoryId) : undefined,
      fuelType: FUEL_MAP[String(values.fuel)] || "BENZIN",
      transmission: TRANSMISSION_MAP[String(values.transmission)] || "AVTOMAT",
      engineVolume: values.engine != null ? Number(values.engine) : undefined,
      seats: values.seats != null ? Number(values.seats) : 5,
      airCondition: Boolean(values.airCondition),
      condition: values.condition ? String(values.condition) : undefined,
      regionId: String(values.regionId),
      districtId: values.districtId ? String(values.districtId) : undefined,
      address: values.address ? String(values.address) : undefined,
      dailyPrice: Number(values.price),
      oldPrice: values.oldPrice != null ? Number(values.oldPrice) : undefined,
      deposit:
        depositEnabled && values.deposit != null
          ? Number(values.deposit)
          : undefined,
      minDays: values.minDays != null ? Number(values.minDays) : 1,
      rules: values.rules ? String(values.rules) : undefined,
      description: values.description
        ? String(values.description)
        : undefined,
      phone: values.phone ? toE164Uz(String(values.phone)) || undefined : undefined,
      imageUrls,
    };
  };

  const onFinish = async (values: Car & Record<string, unknown>) => {
    try {
      setSaving(true);
      const payload = await buildPayload(values);

      if (isEdit && id) {
        await updateCar.mutateAsync({ id, payload });
        message.success("Mashina muvaffaqiyatli yangilandi");
      } else {
        await createCar.mutateAsync(payload);
        message.success("Mashina muvaffaqiyatli qo‘shildi");
        form.resetFields();
        setFileList([]);
        setDepositEnabled(false);
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
        <p className="text-lg font-semibold text-[#00863e]">
          Ma&apos;lumotlar yuklanmoqda...
        </p>
      </div>
    );
  }

  if (isEdit && !editLoading && !editingCar) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-lg font-semibold text-[#6d7a73]">
          Mashina topilmadi
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="relative overflow-hidden rounded-3xl bg-[linear-gradient(145deg,#0f2a1c,#165a36_52%,#00863e)] px-5 py-10 text-white shadow-[0_14px_32px_rgba(0,134,62,0.18)] md:px-8 md:py-12">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[#7dff9d]/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-[#b7f0c8]">
            <CarOutlined />
            RENTO / {isEdit ? "E'lonni tahrirlash" : "Ijara"}
          </div>

          <div className="mt-6 max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
              {pageTitle}
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
              {pageDescription}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {(isEdit
              ? [
                  "Ma'lumotlarni yangilash",
                  "Oson boshqaruv",
                  "E'lonni tahrirlash",
                ]
              : ["Bepul e'lon", "Oson boshqaruv", "To'g'ridan-to'g'ri bron"]
            ).map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/90"
              >
                <CheckCircleOutlined className="text-[#7dff9d]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-6 rounded-3xl border border-[#e5e9e7] bg-white p-5 shadow-[0_8px_24px_rgba(16,37,26,0.04)] md:p-7">
          <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-[#00863e]">
            Egasi kabineti
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#1f2d25]">
            {isEdit ? "E'lon ma'lumotlarini tahrirlash" : "Yangi ijara e'loni"}
          </h2>

          <p className="mt-2 text-sm text-[#6d7a73]">
            {isEdit
              ? "Kerakli maydonlarni o'zgartiring va o'zgarishlarni saqlang."
              : "E'loningiz qanchalik batafsil bo'lsa, mijozlar uni shunchalik oson topishadi."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["01", "Avtomobil"],
              ["02", "Texnik holat"],
              ["03", "Narx va manzil"],
              ["04", "Rasmlar"],
            ].map(([num, title]) => (
              <div
                key={num}
                className="flex items-center gap-3 rounded-2xl bg-[#f6faf7] p-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00863e] text-xs font-bold text-white">
                  {num}
                </span>
                <span className="text-xs font-semibold text-[#3f4b44] md:text-sm">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{
            transmission: "Avtomat",
            fuel: "Benzin",
            airCondition: true,
            condition: "A'lo",
            minDays: 1,
            seats: 5,
          }}
          className="rental-form"
        >
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_300px]">
            {/* LEFT FORM */}
            <div>
              {/* 01 CAR */}
              <FormCard>
                <SectionTitle
                  number="01"
                  icon={<CarOutlined />}
                  title="Avtomobil haqida"
                  description="Mashinaning asosiy ma'lumotlarini kiriting."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Avtomobil markasi"
                    name="brand"
                    rules={[{ required: true, message: "Markani tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      loading={brandsLoading}
                      placeholder="Markani tanlang"
                      optionFilterProp="label"
                      options={brands.map((b) => ({
                        label: brandLabel(b.name),
                        value: b.name,
                      }))}
                      onChange={(value: string) => {
                        const found = brands.find((b) => b.name === value);
                        setSelectedBrandId(found?.id);
                        form.setFieldValue("model", undefined);
                      }}
                    />
                  </Form.Item>

                  <Form.Item label="Kategoriya" name="categoryId">
                    <Select
                      size="large"
                      showSearch
                      placeholder="Kategoriya tanlang"
                      optionFilterProp="label"
                      options={(categoriesData ?? []).map((c) => ({
                        label: c.nameUz || c.name,
                        value: c.id,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Modeli"
                    name="model"
                    rules={[{ required: true, message: "Modelni tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      loading={modelsLoading}
                      disabled={!selectedBrandId}
                      placeholder={
                        selectedBrandId
                          ? "Modelni tanlang"
                          : "Avval markani tanlang"
                      }
                      optionFilterProp="label"
                      options={models.map((m) => ({
                        label: m.name,
                        value: m.name,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Ishlab chiqarilgan yili"
                    name="year"
                    rules={[{ required: true, message: "Yilni tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      placeholder="Yilni tanlang"
                      options={Array.from({ length: 30 }, (_, i) => {
                        const year = 2026 - i;
                        return { label: String(year), value: year };
                      })}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Rangi"
                    name="color"
                    rules={[{ required: true, message: "Rangini kiriting" }]}
                  >
                    <Input size="large" placeholder="Masalan: Qora" />
                  </Form.Item>

                  <Form.Item
                    label="Davlat raqami"
                    name="number"
                    getValueFromEvent={(e) =>
                      formatPlateNumber(e?.target?.value ?? "")
                    }
                    normalize={(v) => formatPlateNumber(String(v ?? ""))}
                  >
                    <Input
                      size="large"
                      placeholder="01 A 777 AA yoki 01 777 AAA"
                      maxLength={11}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Telefon raqam"
                    name="phone"
                    getValueFromEvent={(e) =>
                      formatUzPhoneDisplay(e?.target?.value ?? "")
                    }
                    normalize={(v) => formatUzPhoneDisplay(String(v ?? ""))}
                  >
                    <Input
                      size="large"
                      prefix="+998"
                      placeholder="93 777 77 77"
                      maxLength={12}
                      inputMode="numeric"
                    />
                  </Form.Item>
                </div>
              </FormCard>

              {/* 02 TECHNICAL */}
              <FormCard>
                <SectionTitle
                  number="02"
                  icon={<SettingOutlined />}
                  title="Texnik xususiyatlari"
                  description="Avtomobilning texnik holati va jihozlari."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Uzatmalar qutisi"
                    name="transmission"
                    rules={[{ required: true, message: "Tanlang" }]}
                  >
                    <Select
                      size="large"
                      options={[
                        { label: "Avtomat", value: "Avtomat" },
                        { label: "Mexanika", value: "Mexanika" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Yoqilg'i turi"
                    name="fuel"
                    rules={[{ required: true, message: "Tanlang" }]}
                  >
                    <Select
                      size="large"
                      options={[
                        { label: "Benzin", value: "Benzin" },
                        { label: "Metan", value: "Metan" },
                        { label: "Propan", value: "Propan" },
                        { label: "Dizel", value: "Dizel" },
                        { label: "Gibrid", value: "Gibrid" },
                        { label: "Elektro", value: "Elektro" },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="Dvigatel hajmi (L)" name="engine">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={0}
                      step={0.1}
                      placeholder="Masalan: 2.0"
                    />
                  </Form.Item>

                  <Form.Item label="O'rindiqlar soni" name="seats">
                    <Select
                      size="large"
                      options={[2, 3, 4, 5, 6, 7, 8, 9].map((x) => ({
                        label: `${x} ta`,
                        value: x,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item label="Konditsioner" name="airCondition">
                    <Select
                      size="large"
                      placeholder="Tanlang"
                      options={[
                        { label: "Bor", value: true },
                        { label: "Yo'q", value: false },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="Avtomobil holati" name="condition">
                    <Select
                      size="large"
                      options={[
                        { label: "A'lo", value: "A'lo" },
                        { label: "Yaxshi", value: "Yaxshi" },
                        { label: "O'rtacha", value: "O'rtacha" },
                      ]}
                    />
                  </Form.Item>
                </div>
              </FormCard>

              {/* 03 LOCATION */}
              <FormCard>
                <SectionTitle
                  number="03"
                  icon={<EnvironmentOutlined />}
                  title="Joylashuv"
                  description="Avtomobil joylashgan hududni belgilang."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Viloyat / Shahar"
                    name="regionId"
                    rules={[{ required: true, message: "Hududni tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      loading={regionsLoading}
                      placeholder="Hududni tanlang"
                      optionFilterProp="label"
                      options={regionsData.map((x) => ({
                        label: x.nameUz || x.name,
                        value: x.id,
                      }))}
                      onChange={(value: string) => {
                        setSelectedRegionId(value);
                        form.setFieldValue("districtId", undefined);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Tuman"
                    name="districtId"
                    rules={[{ required: true, message: "Tumanni tanlang" }]}
                  >
                    <Select
                      size="large"
                      showSearch
                      loading={districtsLoading}
                      disabled={!selectedRegionId}
                      placeholder={
                        selectedRegionId
                          ? "Tumanni tanlang"
                          : "Avval viloyatni tanlang"
                      }
                      optionFilterProp="label"
                      options={districtsData.map((x) => ({
                        label: x.name,
                        value: x.id,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Aniq manzil"
                    name="address"
                    className="md:col-span-2"
                  >
                    <Input size="large" placeholder="Ko'cha, uy yoki mo'ljal" />
                  </Form.Item>
                </div>
              </FormCard>

              {/* 04 PRICE */}
              <FormCard>
                <SectionTitle
                  number="04"
                  icon={<DollarOutlined />}
                  title="Ijara narxi va shartlari"
                  description="Narx va ijaraga berish talablaringizni belgilang."
                />

                <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2">
                  <Form.Item
                    label="Kunlik ijara narxi (so'm)"
                    name="price"
                    rules={[
                      { required: true, message: "Narxni kiriting" },
                      {
                        type: "number",
                        min: 1000,
                        message: "Narx kamida 1 000 so'm bo'lishi kerak",
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1000}
                      placeholder="Masalan: 500000"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : ""
                      }
                      parser={(value) =>
                        Number(value?.replace(/\s/g, "") || 0) as unknown as 1000
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Oldingi narxi (so'm)" name="oldPrice">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1000}
                      placeholder="Ixtiyoriy"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : ""
                      }
                      parser={(value) =>
                        Number(value?.replace(/\s/g, "") || 0) as unknown as 1000
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Garov puli (so'm)" name="deposit">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={0}
                      disabled={!depositEnabled}
                      placeholder="Garov miqdori"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          : ""
                      }
                      parser={(value) =>
                        Number(value?.replace(/\s/g, "") || 0) as unknown as 0
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Minimal ijara muddati (kun)" name="minDays">
                    <InputNumber
                      size="large"
                      className="w-full"
                      min={1}
                      placeholder="1"
                    />
                  </Form.Item>
                </div>

                <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#e5e9e7] bg-[#f6faf7] p-4">
                  <div>
                    <p className="font-semibold text-[#1f2d25]">
                      Garov talab qilinadi
                    </p>
                    <p className="mt-1 text-xs text-[#6d7a73]">
                      Ijaraga oluvchidan qaytariladigan kafolat puli.
                    </p>
                  </div>

                  <Switch
                    checked={depositEnabled}
                    onChange={(checked) => {
                      setDepositEnabled(checked);

                      if (!checked) {
                        form.setFieldValue("deposit", undefined);
                      }
                    }}
                  />
                </div>

                <Form.Item label="Ijara shartlari" name="rules">
                  <TextArea
                    rows={4}
                    maxLength={1000}
                    showCount
                    placeholder="Masalan: Mashinani toza holatda qaytarish, chet elga olib chiqmaslik..."
                  />
                </Form.Item>
              </FormCard>

              {/* 05 IMAGES */}
              <FormCard>
                <SectionTitle
                  number="05"
                  icon={<CameraOutlined />}
                  title="Avtomobil rasmlari"
                  description="Mashinangizni turli tomondan suratga olib yuklang."
                />

                <div className="mb-5 rounded-2xl border border-[#c6e5d1] bg-[#eff8f2] p-4">
                  <div className="flex gap-3">
                    <InfoCircleOutlined className="mt-0.5 text-[#00863e]" />

                    <div>
                      <p className="text-sm font-semibold text-[#1f2d25]">
                        Sifatli rasmlar ko&apos;proq mijoz jalb qiladi
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#2f6b49]">
                        Oldi, orqasi, yon tomoni va salon rasmlarini yuklashni
                        tavsiya qilamiz. Maksimal 10 ta rasm.
                      </p>
                    </div>
                  </div>
                </div>

                <Form.Item
                  name="images"
                  extra="Media server ishlamasa ham e'lonni saqlash mumkin"
                >
                  <Upload
                    listType="picture-card"
                    accept="image/*"
                    multiple
                    maxCount={10}
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={({ fileList: newList }) => {
                      setFileList(newList);
                      form.setFieldValue("images", newList);
                    }}
                  >
                    {fileList.length < 10 && (
                      <div className="flex flex-col items-center gap-2">
                        <CloudUploadOutlined className="text-2xl text-[#00863e]" />
                        <span className="text-xs font-medium">
                          Rasm yuklash
                        </span>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </FormCard>

              {/* 06 DESCRIPTION */}
              <FormCard>
                <SectionTitle
                  number="06"
                  icon={<FileTextOutlined />}
                  title="Qo'shimcha ma'lumot"
                  description="Avtomobilingiz haqida batafsil yozing."
                />

                <Form.Item label="Avtomobil tavsifi" name="description">
                  <TextArea
                    rows={5}
                    maxLength={1500}
                    showCount
                    placeholder="Avtomobilning afzalliklari, holati, qulayliklari va boshqa muhim ma'lumotlar..."
                  />
                </Form.Item>
              </FormCard>

              {/* AGREEMENT */}
              <div className="mb-5 rounded-3xl border border-[#e5e9e7] bg-white p-5 md:p-7">
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  className="!mb-0"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Rozilik bildirishingiz kerak"),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    Kiritilgan ma&apos;lumotlar to&apos;g&apos;riligini
                    tasdiqlayman va ijara shartlariga roziman.
                  </Checkbox>
                </Form.Item>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                loading={saving}
                className="!h-14 !rounded-full !border-0 !bg-[#00863e] !text-base !font-semibold !shadow-[0_8px_18px_rgba(0,134,62,0.22)] hover:!bg-[#006f35]"
              >
                <CarOutlined />
                {isEdit ? "O'zgarishlarni saqlash" : "E'lonni joylashtirish"}
              </Button>

              <p className="mt-4 text-center text-xs text-[#8d9892]">
                {isEdit
                  ? "O'zgarishlar saqlangandan so'ng e'loningiz yangilangan ma'lumotlar bilan ko'rinadi."
                  : "E'lon joylashtirilgandan so'ng uni profilingizdan boshqarishingiz mumkin."}
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl bg-[linear-gradient(145deg,#0f2a1c,#165a36_55%,#00863e)] p-6 text-white shadow-[0_14px_32px_rgba(0,134,62,0.18)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
                  <SafetyCertificateOutlined />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {isEdit
                    ? "E'loningizni yangilang"
                    : "Ishonchli e'lon yarating"}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  {isEdit
                    ? "Ma'lumotlarni to'g'ri va dolzarb saqlang. Bu mijozlarning sizga bo'lgan ishonchini oshiradi."
                    : "Barcha ma'lumotlarni to'g'ri kiriting. Bu mijozlarning sizga ishonchini oshiradi."}
                </p>

                <Divider className="!border-white/15" />

                <div className="space-y-5">
                  {[
                    [
                      "01",
                      "To'liq ma'lumot",
                      "Mashina xususiyatlarini kiriting",
                    ],
                    [
                      "02",
                      "Sifatli rasmlar",
                      "Kamida 4 ta rasm tavsiya qilinadi",
                    ],
                    ["03", "Aniq narx", "Kunlik ijara narxini belgilang"],
                    ["04", "To'g'ri manzil", "Hudud va tumanni ko'rsating"],
                  ].map(([num, title, desc]) => (
                    <div key={num} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xs font-bold text-[#b7f0c8]">
                        {num}
                      </span>

                      <div>
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="mt-1 text-xs text-white/65">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-[#e5e9e7] bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf6ef] text-lg text-[#00863e]">
                    <CheckCircleOutlined />
                  </div>

                  <div>
                    <p className="font-bold text-[#1f2d25]">
                      {isEdit ? "E'lonni boshqarish" : "Profilingiz orqali"}
                    </p>

                    <p className="text-xs text-[#6d7a73]">
                      {isEdit
                        ? "Ma'lumotlarni yangilash"
                        : "E'lonlarni boshqarish"}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#6d7a73]">
                  {isEdit
                    ? "E'loningizni tahrirlashingiz, rasmlarini yangilashingiz va ijara shartlarini o'zgartirishingiz mumkin."
                    : "E'lon joylashtirilgach, bronlar, ijaraga oluvchilar, sanalar va daromadlaringiz Profile bo'limida ko'rinadi."}
                </p>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
