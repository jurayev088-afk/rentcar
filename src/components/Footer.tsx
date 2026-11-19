import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Send } from "lucide-react";
import RentoLogo from "./RentoLogo";

const homeFooterLinks = [
  {
    title: "Mashinalar",
    links: [
      { href: "/cars", label: "Barcha mashinalar" },
      { href: "/#vehicles", label: "Modellar" },
      { href: "/sevimlilar", label: "Sevimlilar" },
    ],
  },
  {
    title: "Texnologiya",
    links: [
      { href: "/#technology", label: "Batareya va quvvat" },
      { href: "/#technology", label: "Aqlli boshqaruv" },
    ],
  },
  {
    title: "Quvvatlash",
    links: [
      { href: "/#charging", label: "Quvvatlash tarmog‘i" },
      { href: "/#charging", label: "Uyda quvvatlash" },
    ],
  },
  {
    title: "Kompaniya",
    links: [
      { href: "/#about", label: "Biz haqimizda" },
      { href: "/#sustainability", label: "Barqarorlik" },
      { href: "/ijara", label: "Ijara" },
    ],
  },
];

export default function Footer({ home = false }: { home?: boolean }) {
  if (home) {
    return (
      <footer className="min-h-[154px] bg-[#242729] py-[clamp(24px,3vw,48px)] text-[#dfe2e3]">
        <div className="mx-auto grid w-[min(calc(100%-80px),944px)] grid-cols-2 gap-x-3.5 gap-y-5 max-[860px]:w-[min(calc(100%-40px),760px)] max-[860px]:grid-cols-3 max-[860px]:gap-x-3.5 max-[860px]:gap-y-5 max-[600px]:grid-cols-2 max-[365px]:w-[calc(100%-28px)] sm:grid-cols-3 lg:w-[min(calc(100%-8vw),1440px)] lg:grid-cols-[21%_repeat(4,minmax(0,1fr))_20%] lg:gap-[18px]">
          <div className="col-span-2 max-[600px]:col-span-2 max-[860px]:col-span-3 lg:col-span-1">
            <Link href="/" className="mb-2.5 inline-flex w-fit items-center text-white">
              <RentoLogo background="dark" className="w-36" />
            </Link>
            <p className="max-w-[160px] text-[clamp(11px,0.9vw,14px)] leading-[1.45] max-[600px]:max-w-[280px] max-[860px]:text-[11px]">
              O‘zingizga mos avtomobilni toping va qulay shartlarda ijaraga
              oling. Sayohatingizni biz bilan boshlang!
            </p>
            <div className="mt-[11px] flex gap-3">
              <a
                href="#"
                aria-label="Telegram"
                className="inline-grid h-[34px] w-[34px] place-items-center rounded-full bg-[#a1a5a7] text-[#242729] transition hover:text-[#67df85]"
              >
                <Send className="h-[18px] w-[18px]" aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-grid h-[34px] w-[34px] place-items-center rounded-full bg-[#a1a5a7] text-[#242729] transition hover:text-[#67df85]"
              >
                <Camera className="h-[18px] w-[18px]" aria-hidden />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-grid h-[34px] w-[34px] place-items-center rounded-full bg-[#a1a5a7] text-[18px] font-extrabold text-[#242729] transition hover:text-[#67df85]"
              >
                <span aria-hidden>f</span>
              </a>
            </div>
          </div>

          {homeFooterLinks.map(({ title, links }) => (
            <section className="grid content-start gap-1.5" key={title}>
              <h4 className="mb-1.5 mt-px text-[clamp(13px,1.05vw,16px)] font-bold text-white max-[860px]:text-[11px]">
                {title}
              </h4>
              {links.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[clamp(11px,0.9vw,14px)] text-[#dfe2e3] no-underline [overflow-wrap:anywhere] transition hover:text-[#67df85] max-[860px]:text-[11px]"
                >
                  {label}
                </Link>
              ))}
            </section>
          ))}

          <section className="col-span-2 grid content-start gap-1.5 max-[600px]:col-span-2 max-[860px]:col-span-3 lg:col-span-1">
            <h4 className="mb-1.5 mt-px text-[clamp(13px,1.05vw,16px)] font-bold text-white max-[860px]:text-[11px]">
              Biz bilan aloqa
            </h4>
            <a
              className="flex items-center gap-2.5 text-[clamp(11px,0.9vw,14px)] text-[#dfe2e3] no-underline [overflow-wrap:anywhere] transition hover:text-[#67df85] max-[860px]:text-[11px]"
              href="mailto:info@rentcar.uz"
            >
              <Mail className="h-3 w-3 shrink-0" aria-hidden />
              info@rentcar.uz
            </a>
            <a
              className="flex items-center gap-2.5 text-[clamp(11px,0.9vw,14px)] text-[#dfe2e3] no-underline [overflow-wrap:anywhere] transition hover:text-[#67df85] max-[860px]:text-[11px]"
              href="tel:+998900000000"
            >
              <Phone className="h-3 w-3 shrink-0" aria-hidden />
              +998 90 000 00 00
            </a>
            <p className="flex items-center gap-2.5 text-[clamp(11px,0.9vw,14px)] [overflow-wrap:anywhere] max-[860px]:text-[11px]">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              Toshkent, O‘zbekiston
            </p>
            <p className="mt-2 text-[clamp(11px,0.9vw,14px)] leading-[1.45] max-[860px]:text-[11px]">
              © {new Date().getFullYear()} RENTO.
              <br />
              Barcha huquqlar himoyalangan.
            </p>
          </section>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-20 bg-[#141718] text-white">
      <div className="mx-auto max-w-[1250px] px-5 pb-8 pt-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <RentoLogo background="dark" />
            </Link>

            <p className="mt-5 max-w-[270px] text-sm leading-7 text-gray-400">
              O&apos;zingizga mos avtomobilni toping va qulay shartlarda ijaraga
              oling. Sayohatingizni biz bilan boshlang!
            </p>

            <div className="mt-6 flex gap-3">
              {["Telegram", "Instagram", "Facebook"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs text-gray-300 transition hover:bg-white hover:text-[#008b50]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Sahifalar</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/mashinalar" className="transition hover:text-white">
                  Mashinalar
                </Link>
              </li>
              <li>
                <Link href="/elonlar" className="transition hover:text-white">
                  E&apos;lonlar
                </Link>
              </li>
              <li>
                <Link href="/ijara" className="transition hover:text-white">
                  Ijara
                </Link>
              </li>
              <li>
                <Link href="/sevimlilar" className="transition hover:text-white">
                  Sevimlilar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Xizmatlar</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/mashinalar" className="transition hover:text-white">
                  Avtomobil ijarasi
                </Link>
              </li>
              <li>
                <Link href="/elonlar" className="transition hover:text-white">
                  E&apos;lon joylashtirish
                </Link>
              </li>
              <li>
                <Link href="/profile" className="transition hover:text-white">
                  Shaxsiy kabinet
                </Link>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Yordam markazi
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Maxfiylik siyosati
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Biz bilan aloqa</h3>

            <div className="space-y-5 text-sm">
              <div>
                <p className="mb-1 text-gray-500">Telefon raqam</p>
                <a
                  href="tel:+998900000000"
                  className="transition hover:text-[#53bb86]"
                >
                  +998 90 000 00 00
                </a>
              </div>

              <div>
                <p className="mb-1 text-gray-500">Elektron pochta</p>
                <a
                  href="mailto:info@rentcar.uz"
                  className="transition hover:text-[#53bb86]"
                >
                  info@rentcar.uz
                </a>
              </div>

              <div>
                <p className="mb-1 text-gray-500">Manzil</p>
                <p className="text-gray-300">Toshkent, O&apos;zbekiston</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} RENTO. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-sm text-gray-500">
            Sizning qulay sayohatingiz uchun
          </p>
        </div>
      </div>
    </footer>
  );
}
