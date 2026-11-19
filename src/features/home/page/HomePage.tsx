import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Bolt,
  CircuitBoard,
  Gauge,
  House,
  MapPinned,
  Timer,
  Zap,
} from "lucide-react";

const shell =
  "mx-auto w-[min(calc(100%-80px),944px)] max-[860px]:w-[min(calc(100%-40px),760px)] max-[365px]:w-[calc(100%-28px)] lg:w-[min(calc(100%-8vw),1440px)]";

const eyebrow =
  "mb-1.5 block text-[clamp(11px,0.95vw,14px)] font-extrabold uppercase leading-[1.15] text-[#006f35]";

const sectionTitle =
  "m-0 text-[20px] font-bold leading-[1.08] tracking-[-0.045em] max-[860px]:text-[23px] lg:text-[clamp(20px,1.95vw,29px)]";

const textLink =
  "inline-flex items-center justify-center gap-2 text-[clamp(11px,0.95vw,14px)] font-bold text-[#006f35] no-underline transition hover:underline hover:underline-offset-[0.2em] max-[860px]:text-xs";

const chargingFeatures = [
  {
    Icon: Timer,
    title: "Tezkor quvvatlash",
    description: "Yuqori quvvatli stansiyalarda 18 daqiqada 10% dan 80% gacha.",
  },
  {
    Icon: MapPinned,
    title: "Keng tarmoq",
    description: "Mamlakat bo‘ylab 12 000 dan ortiq quvvatlash nuqtalari.",
  },
  {
    Icon: House,
    title: "Uyda quvvatlash",
    description: "Avtomobilni uyda quvvatlash uchun qulay yechimlar.",
  },
  {
    Icon: Bolt,
    title: "Qayta tiklanuvchi energiya",
    description: "Tarmoq faoliyatida qayta tiklanuvchi energiyadan foydalanamiz.",
  },
];

const vehicles = [
  {
    model: "NVX",
    kind: "Elektr SUV",
    range: "550",
    speed: "4.8",
    drive: "AWD",
    motor: "Ikki motor",
    photo: "rent-car-nvx",
  },
  {
    model: "NVC",
    kind: "Elektr krossover",
    range: "480",
    speed: "5.6",
    drive: "RWD",
    motor: "Bitta motor",
    photo: "rent-car-nvc",
  },
  {
    model: "NVS",
    kind: "Elektr sportkar",
    range: "620",
    speed: "3.7",
    drive: "AWD",
    motor: "Ikki motor",
    photo: "rent-car-nvs",
  },
];

const metrics = [
  {
    Icon: Gauge,
    value: "3.7",
    unit: "s",
    label: "0–100 km/soat",
    detail: "NVS modeli",
  },
  {
    Icon: BatteryCharging,
    value: "620",
    unit: "km",
    label: "Maksimal masofa",
    detail: "NVS modeli",
  },
  {
    Icon: Zap,
    value: "800",
    unit: "V",
    label: "Elektr tizimi",
    detail: "Tezkor quvvatlash",
  },
  {
    Icon: CircuitBoard,
    value: "AWD",
    unit: "",
    label: "Aqlli to‘liq",
    detail: "yuritma tizimi",
  },
];

const sustainabilityStats = [
  { value: "0", label: "Chiqindi gazlar", detail: "100% elektr" },
  { value: "100%", label: "Qayta tiklanuvchi", detail: "energiya" },
  {
    value: "45%",
    label: "Kamroq emissiya",
    detail: "Soha o‘rtachasiga nisbatan",
  },
  {
    value: "12M",
    plus: true,
    label: "Ekilgan daraxtlar",
    detail: "Butun dunyo bo‘ylab",
  },
];

const reviews = [
  {
    avatar: "rent-avatar-arjun",
    name: "Arjun Mehta",
    vehicle: "NVX",
    quote:
      "NVX elektr SUV haqidagi tasavvurimni o‘zgartirdi. U kuchli, aqlli va tejamkor.",
  },
  {
    avatar: "rent-avatar-priya",
    name: "Priya Nair",
    vehicle: "NVC",
    quote:
      "Quvvatlash tez, qulay va ishonchli. Stansiya topish ham juda oson.",
  },
  {
    avatar: "rent-avatar-rohan",
    name: "Rohan Kapoor",
    vehicle: "NVS",
    quote:
      "NVS imkoniyatlari meni hayratda qoldirdi. Har safar haydash zavq bag‘ishlaydi.",
  },
];

export default function HomePage() {
  return (
    <>
      <section
        id="charging"
        className="relative isolate min-h-[200px] scroll-mt-24 bg-[linear-gradient(104deg,#e6e7e9,#eaebed_49%,#bdccd6)] py-[clamp(24px,3vw,48px)] pt-[calc(clamp(24px,3vw,48px)+33px)] max-[860px]:py-[clamp(24px,3vw,48px)]"
      >
        <div
          className="rent-charger-art absolute bottom-0 right-0 z-[-1] h-[166px] w-[324px]"
          aria-hidden="true"
        />
        <div
          className={`${shell} grid grid-cols-1 items-start gap-[23px] max-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] max-[860px]:gap-5 max-[600px]:grid-cols-1 max-[600px]:gap-3 lg:grid-cols-[26%_minmax(0,45%)]`}
        >
          <div>
            <p className={eyebrow}>Quvvatlash tarmog‘i</p>
            <h2 className={`${sectionTitle} mb-2`}>
              Har bir safar
              <br />
              uchun quvvat.
            </h2>
            <p className="mb-2 max-w-[25ch] text-[clamp(12px,1.02vw,15px)] leading-[1.4] max-[860px]:text-[11px] max-[600px]:max-w-[250px]">
              Tezkor quvvatlash tarmog‘i va aqlli energiya yechimlari bilan
              yo‘lda qolmaysiz.
            </p>
            <a className={textLink} href="#technology">
              Quvvatlash haqida
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-[21px] gap-y-[19px] pt-1.5 max-[860px]:gap-x-2.5 max-[860px]:gap-y-3.5 max-[600px]:gap-x-2.5 max-[600px]:gap-y-3">
            {chargingFeatures.map(({ Icon, title, description }) => (
              <article className="flex items-start gap-4 max-[860px]:gap-2.5" key={title}>
                <span className="inline-grid h-[35px] w-9 shrink-0 place-items-center rounded-xl bg-[#f4f5f6] shadow-[0_3px_7px_rgba(31,45,61,0.08)] max-[600px]:h-[29px] max-[600px]:w-[29px] max-[600px]:rounded-lg lg:h-[clamp(35px,3.4vw,51px)] lg:w-[clamp(36px,3.5vw,52px)]">
                  <Icon
                    className="h-5 w-5 stroke-current max-[600px]:h-[17px] max-[600px]:w-[17px]"
                    aria-hidden
                  />
                </span>
                <div>
                  <h3 className="mb-1 mt-0.5 text-[clamp(13px,1.05vw,16px)] font-bold leading-[1.15] tracking-[-0.025em] max-[860px]:text-[11px]">
                    {title}
                  </h3>
                  <p className="m-0 max-w-[25ch] text-[clamp(12px,1.02vw,15px)] leading-[1.4] text-[#34393d] max-[860px]:text-[11px]">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vehicles"
        className={`${shell} scroll-mt-24 py-[clamp(24px,3vw,48px)]`}
      >
        <div className="mb-[11px] flex items-end justify-between gap-4 max-[600px]:items-start">
          <div>
            <p className={eyebrow}>Modellar</p>
            <h2 className={`${sectionTitle} lg:text-[clamp(18px,1.75vw,26px)]`}>
              Yo‘lga ilhom
              <br />
              beradigan dizayn.
            </h2>
          </div>
          <Link
            className={`${textLink} pb-0.5 max-[600px]:self-end max-[600px]:text-right`}
            href="/cars"
          >
            Barcha mashinalar
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-[11px] max-[860px]:gap-2 sm:grid-cols-3 lg:gap-[clamp(11px,1.08vw,17px)]">
          {vehicles.map(({ model, kind, range, speed, drive, motor, photo }) => (
            <article
              className="relative flex min-h-[163px] min-w-0 flex-col justify-between rounded-lg bg-[linear-gradient(140deg,#e6e7ea,#e3e4e6)] px-[17px] pb-[11px] pt-[9px] max-[860px]:min-h-[177px] max-[860px]:px-2.5 max-[600px]:min-h-[189px] max-[600px]:px-3.5 max-[600px]:py-3 lg:min-h-[clamp(163px,16vw,232px)]"
              key={model}
            >
              <header className="relative z-[1]">
                <h3 className="mb-0.5 text-[13px] font-bold max-[600px]:text-base lg:text-[clamp(13px,1.23vw,18px)]">
                  {model}
                </h3>
                <p className="m-0 text-[clamp(11px,0.9vw,14px)] max-[860px]:text-[10px] max-[600px]:text-[10px]">
                  {kind}
                </p>
              </header>

              <div
                className={`rent-car-photo ${photo} absolute inset-x-[11px] inset-y-[17px] bottom-9 max-[860px]:inset-x-1 max-[600px]:inset-x-1`}
                aria-hidden="true"
              />

              <div className="relative z-[1] grid grid-cols-[repeat(3,minmax(0,1fr))_24px] items-center">
                <div className="min-w-0 border-0 px-1.5 pl-px max-[860px]:px-0.5 max-[600px]:pl-2">
                  <strong className="block whitespace-nowrap text-[12px] font-bold leading-none lg:text-[clamp(13px,1.23vw,18px)] max-[600px]:text-sm">
                    {range} <span className="text-[0.8em]">km</span>
                  </strong>
                  <small className="mt-0.5 block whitespace-normal text-[clamp(11px,0.9vw,14px)] leading-[1.15] max-[860px]:text-[8px] max-[600px]:text-[10px]">
                    Masofa (WLTP)
                  </small>
                </div>
                <div className="min-w-0 border-l border-[#c5c8cd] px-1.5 pl-[15px] max-[860px]:px-0.5 max-[600px]:pl-2">
                  <strong className="block whitespace-nowrap text-[12px] font-bold leading-none lg:text-[clamp(13px,1.23vw,18px)] max-[600px]:text-sm">
                    {speed} <span className="text-[0.8em]">s</span>
                  </strong>
                  <small className="mt-0.5 block whitespace-normal text-[clamp(11px,0.9vw,14px)] leading-[1.15] max-[860px]:text-[8px] max-[600px]:text-[10px]">
                    0–100 km/soat
                  </small>
                </div>
                <div className="min-w-0 border-l border-[#c5c8cd] px-1.5 pl-[15px] max-[860px]:px-0.5 max-[600px]:pl-2">
                  <strong className="block whitespace-nowrap text-[12px] font-bold leading-none lg:text-[clamp(13px,1.23vw,18px)] max-[600px]:text-sm">
                    {drive}
                  </strong>
                  <small className="mt-0.5 block whitespace-normal text-[clamp(11px,0.9vw,14px)] leading-[1.15] max-[860px]:text-[8px] max-[600px]:text-[10px]">
                    {motor}
                  </small>
                </div>
                <Link
                  href="/cars"
                  className="inline-grid h-6 w-6 place-items-center rounded-full border border-[#aeb3bb] bg-transparent text-[#121516] no-underline transition hover:bg-[#f4f5f6] max-[600px]:-ml-1 max-[600px]:h-7 max-[600px]:w-7"
                  aria-label="Avtomobillar katalogi"
                >
                  <ArrowRight className="h-[13px] w-[13px]" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="technology"
        className={`${shell} min-h-[166px] scroll-mt-24 py-[clamp(24px,3vw,48px)]`}
      >
        <div className="grid grid-cols-1 items-center max-[860px]:grid-cols-4 max-[860px]:gap-y-3.5 max-[600px]:grid-cols-2 lg:grid-cols-[26%_repeat(4,minmax(0,1fr))]">
          <div className="max-[860px]:col-span-full">
            <p className={eyebrow}>Texnologiya</p>
            <h2 className={sectionTitle}>
              Quvvat va
              <br />
              aqlli boshqaruv.
            </h2>
            <p className="my-2 max-w-[25ch] text-[clamp(12px,1.02vw,15px)] leading-[1.4] text-[#34393d] max-[860px]:max-w-[290px] max-[860px]:text-[11px]">
              Ilg‘or muhandislik va zamonaviy batareya texnologiyasi haydashni
              yanada zavqli qiladi.
            </p>
            <a className={textLink} href="#vehicles">
              Modellarni ko‘rish
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
          </div>

          {metrics.map(({ Icon, value, unit, label, detail }, index) => (
            <div
              className={`relative pt-2 max-[860px]:pl-0 max-[600px]:odd:after:hidden ${
                index === 0 ? "pl-6" : "pl-6"
              } ${index === 2 ? "max-[860px]:pl-0 lg:pl-[23px]" : ""} after:absolute after:bottom-0.5 after:right-[19px] after:h-[59px] after:w-px after:bg-[#c6c9ce] after:content-[''] last:after:hidden max-[860px]:after:content-none`}
              key={label}
            >
              <Icon className="mb-1 h-8 w-8 text-[#00863e]" aria-hidden />
              <strong className="mb-1 block text-[22px] font-bold leading-[1.05] tracking-[-0.045em] lg:text-[clamp(22px,2.15vw,32px)] max-[600px]:text-2xl">
                {value}
                {unit && (
                  <>
                    {" "}
                    <span className="text-[13px]">{unit}</span>
                  </>
                )}
              </strong>
              <p className="m-0 text-[clamp(12px,1.02vw,15px)] leading-[1.43] max-[860px]:text-[11px]">
                {label}
                <br />
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="sustainability"
        className="rent-sustain-bg grid min-h-[142px] items-center scroll-mt-24 py-[clamp(24px,3vw,48px)] text-white"
      >
        <div
          className={`${shell} grid grid-cols-1 items-center max-[860px]:grid-cols-4 max-[860px]:gap-y-3.5 max-[600px]:grid-cols-2 lg:grid-cols-[26%_repeat(4,minmax(0,1fr))]`}
        >
          <div className="max-[860px]:col-span-full">
            <p className={`${eyebrow} text-[#65da75]`}>Barqarorlik</p>
            <h2
              className={`${sectionTitle} lg:text-[clamp(18px,1.75vw,26px)]`}
            >
              Toza va yashil
              <br />
              kelajak sari.
            </h2>
            <p className="my-2 max-w-[25ch] text-[clamp(12px,1.02vw,15px)] leading-[1.4] max-[860px]:max-w-[290px] max-[860px]:text-[11px]">
              Avtomobillarimizdan kundalik faoliyatimizgacha atrof-muhitga
              ta’sirimizni kamaytiramiz.
            </p>
            <a className={`${textLink} text-[#65da75]`} href="#about">
              Biz haqimizda
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
          </div>

          {sustainabilityStats.map(({ value, plus, label, detail }) => (
            <div className="pl-5 max-[860px]:pl-0" key={label}>
              <strong className="block text-[31px] font-bold leading-none tracking-[-0.05em] lg:text-[clamp(31px,3vw,45px)]">
                {value}
                {plus && <em className="not-italic text-[#65da75]">+</em>}
              </strong>
              <p className="mt-1.5 text-[clamp(12px,1.02vw,15px)] font-semibold leading-[1.55] max-[860px]:text-[11px]">
                {label}
                <br />
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-[#e9eaed]">
        <div className={`${shell} min-h-[139px] py-[clamp(24px,3vw,48px)]`}>
          <div
            id="reviews"
            className="grid grid-cols-1 gap-3 max-[860px]:grid-cols-3 max-[860px]:gap-2 max-[600px]:grid-cols-1 max-[600px]:gap-2.5 lg:grid-cols-[17%_repeat(3,minmax(0,1fr))]"
          >
            <div className="pt-[11px] max-[860px]:col-span-full max-[860px]:pt-0 max-[600px]:col-auto">
              <p className={eyebrow}>Hamjamiyatimiz</p>
              <h2
                className={`${sectionTitle} lg:text-[clamp(18px,1.75vw,26px)]`}
              >
                Haydovchilar
                <br />
                bizga ishonadi.
              </h2>
            </div>

            {reviews.map(({ avatar, name, vehicle, quote }) => (
              <figure
                className="m-0 flex min-h-[112px] flex-col items-start rounded-[10px] bg-[#f2f3f5] px-3.5 pb-2.5 pt-2.5 max-[600px]:min-h-0"
                key={name}
              >
                <div className="text-[13px] leading-[1.25] text-[#009543]" aria-label="5 / 5">
                  ★★★★★
                </div>
                <blockquote className="my-1 mb-1.5 text-[clamp(12px,1.02vw,15px)] leading-[1.28] max-[860px]:text-[11px] max-[600px]:mb-2.5">
                  “{quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-2.5 text-[clamp(11px,0.9vw,14px)] max-[600px]:text-[10px]">
                  <span
                    className={`${avatar} h-[29px] w-[29px] shrink-0 rounded-full`}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-bold">{name}</strong>
                    <small className="mt-0.5 block text-[clamp(11px,0.9vw,14px)] leading-none max-[600px]:text-[10px]">
                      {vehicle} egasi
                    </small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate grid min-h-[113px] items-center bg-[linear-gradient(105deg,#e2e3e7,#e7e8ea_62%,#dde0e2)] py-[clamp(24px,3vw,48px)]">
        <div
          className="rent-tail-art absolute bottom-0 right-0 top-0 z-[-1] w-[245px]"
          aria-hidden="true"
        />
        <div
          className={`${shell} grid grid-cols-1 items-center gap-[30px] pl-[67px] max-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] max-[860px]:gap-4 max-[860px]:pl-0 max-[600px]:grid-cols-1 lg:grid-cols-[28%_minmax(0,38%)]`}
        >
          <div>
            <h2 className={sectionTitle}>
              Yangiliklardan
              <br />
              xabardor bo‘ling.
            </h2>
            <p className="mt-1.5 max-w-[195px] text-[clamp(12px,1.02vw,15px)] leading-[1.5] max-[860px]:text-[11px]">
              So‘nggi yangiliklar, texnologiyalar va takliflarni kuzatib boring.
            </p>
          </div>
          <div>
            <div className="flex min-h-8 rounded-full bg-white shadow-[0_3px_8px_rgba(45,49,50,0.1)]">
              <input
                type="email"
                placeholder="Elektron pochtangiz"
                aria-label="Elektron pochta"
                className="min-w-0 flex-1 rounded-[inherit] border-0 bg-transparent px-3.5 text-[clamp(11px,0.9vw,14px)] outline-none max-[860px]:text-[11px]"
              />
              <button
                className="inline-flex min-h-8 min-w-[118px] items-center justify-between gap-2 rounded-full border border-transparent bg-gradient-to-r from-[#00813d] via-[#008a40] to-[#00813d] px-[19px] pr-[15px] text-[clamp(12px,1.07vw,16px)] font-bold text-white shadow-[0_3px_6px_rgba(0,105,46,0.21)] disabled:cursor-default max-[860px]:min-h-[38px] max-[860px]:text-[11px]"
                type="button"
                disabled
              >
                Obuna bo‘lish
                <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </button>
            </div>
            <label className="mt-2.5 flex cursor-pointer items-start gap-1.5 text-[clamp(11px,0.9vw,14px)] text-[#2a3036] max-[860px]:text-[11px]">
              <input
                type="checkbox"
                className="mt-0.5 h-[11px] w-[11px] shrink-0 accent-[#00863e]"
              />
              RENTO yangiliklarini olishga roziman.
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
