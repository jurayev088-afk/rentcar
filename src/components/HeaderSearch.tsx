"use client";

import { Button, Form, Select } from "antd";
import { Car, MapPin, Search, ArrowRight, Tag, Tags, CarFront } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useRegions } from "../hooks/use-regions";
import { useBrandModels, useBrands } from "../hooks/use-brands";
import { brandLabel } from "../lib/media";

const ALL_BRANDS = "ALL";

type SearchValues = {
  regionId?: string;
  brand?: string;
  model?: string;
};

export default function HeaderSearch() {
  const [form] = Form.useForm<SearchValues>();
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState<string>(ALL_BRANDS);

  const { data: regionsData, isLoading: regionsLoading } = useRegions();
  const { data: brandsData, isLoading: brandsLoading } = useBrands({
    limit: 500,
  });

  const brands = brandsData?.items ?? [];
  const selectedBrandId =
    selectedBrand === ALL_BRANDS
      ? undefined
      : brands.find((b) => b.name === selectedBrand)?.id;

  const { data: modelsData, isLoading: modelsLoading } = useBrandModels(
    selectedBrandId,
    { limit: 1000 },
  );
  const models = modelsData?.items ?? [];

  const regions = Array.isArray(regionsData) ? regionsData : [];

  const brandOptions = useMemo(
    () => [
      { label: "Barcha brandlar", value: ALL_BRANDS },
      ...brands.map((item) => ({
        label: brandLabel(item.name),
        value: item.name,
      })),
    ],
    [brands],
  );

  const modelOptions = useMemo(
    () =>
      models.map((model) => ({
        label: model.name,
        value: model.name,
      })),
    [models],
  );

  const onFinish = (values: SearchValues) => {
    const params = new URLSearchParams();

    if (values.regionId) params.set("regionId", values.regionId);
    if (values.brand && values.brand !== ALL_BRANDS) {
      params.set("brand", values.brand);
    }
    if (values.model) params.set("model", values.model);

    const query = params.toString();
    router.push(query ? `/cars?${query}` : "/cars");
  };

  const fieldClass =
    "group flex h-15 flex-1 items-center gap-3.5 rounded-[19px] border border-[#e9ecef] bg-[#fafbfc] px-4 py-3 transition-all duration-200 hover:border-[#cbded3] hover:bg-white focus-within:border-[#00863e] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,134,62,0.07)] sm:px-5";

  const itemClass =
    "!mb-0 min-w-0 flex-1 [&_.ant-form-item-control-input]:!min-h-0 [&_.ant-form-item-control-input-content]:min-w-0";

  const iconClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#e8f3ec] text-[#00863e] transition-colors group-hover:bg-[#dceee3]";

  const selectClass =
    "!h-auto w-full !border-0 !bg-transparent !p-0 !shadow-none [&_.ant-select-selector]:!h-auto [&_.ant-select-selector]:!min-h-0 [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!p-0 [&_.ant-select-selector]:!shadow-none [&_.ant-select-selection-item]:!text-[15px] [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!leading-[1.4] [&_.ant-select-selection-item]:!text-[#17211c] [&_.ant-select-selection-placeholder]:!text-[14px] [&_.ant-select-selection-placeholder]:!font-medium [&_.ant-select-selection-placeholder]:!text-[#9aa19d] [&_.ant-select-arrow]:!text-[#8a9690]";

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ brand: ALL_BRANDS }}
      className="mb-10! w-full rounded-[25px] border border-white bg-white p-3 shadow-[0_16px_50px_rgba(20,35,28,0.10)] sm:rounded-[30px] sm:p-4 lg:p-[18px]"
    >
      <div className="flex w-full min-w-0 flex-col gap-3 p-3 sm:gap-3.5 lg:flex-row lg:items-stretch lg:gap-3">
        <div className={fieldClass}>
          <div className={iconClass}>
            <MapPin size={19} strokeWidth={2} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Form.Item name="regionId" className={itemClass}>
              <Select
                size="large"
                showSearch
                allowClear
                loading={regionsLoading}
                placeholder="Viloyatni tanlang"
                optionFilterProp="label"
                options={regions.map((region) => ({
                  label: region.nameUz || region.name,
                  value: region.id,
                }))}
                className={selectClass}
              />
            </Form.Item>
          </div>
        </div>

        <div className={fieldClass}>
          <div className={iconClass}>
            <Tags size={19} strokeWidth={2} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Form.Item name="brand" className={itemClass}>
              <Select
                size="large"
                showSearch
                loading={brandsLoading}
                placeholder="Brand tanlang"
                optionFilterProp="label"
                options={brandOptions}
                className={selectClass}
                onChange={(value: string) => {
                  setSelectedBrand(value);
                  form.setFieldValue("model", undefined);
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div className={fieldClass}>
          <div className={iconClass}>
            <CarFront size={19} strokeWidth={2} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Form.Item name="model" className={itemClass}>
              <Select
                size="large"
                showSearch
                allowClear
                loading={modelsLoading}
                disabled={selectedBrand === ALL_BRANDS}
                placeholder={
                  selectedBrand === ALL_BRANDS
                    ? "Avval brand tanlang"
                    : "Modelni tanlang"
                }
                optionFilterProp="label"
                options={modelOptions}
                className={selectClass}
              />
            </Form.Item>
          </div>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={<Search size={20} strokeWidth={2.3} />}
          className="h-15! rounded-[15px]! !bg-[#00863e] hover:!bg-[#006f35]"
        >
          Mashina qidirish
          <ArrowRight size={17} />
        </Button>
      </div>
    </Form>
  );
}
