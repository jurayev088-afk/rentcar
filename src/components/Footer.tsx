import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import RentoLogo from "./RentoLogo";

const footerLinks = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/cars", label: "Mashinalar" },
  { href: "/brands", label: "Brendlar" },
  { href: "/kompaniyalar", label: "Kompaniyalar" },
  { href: "/about", label: "Biz haqimizda" },
  { href: "/sevimlilar", label: "Sevimlilar" },
];

export default function Footer({ home = false }: { home?: boolean }) {
  return (
    <footer
      className={
        home
          ? "bg-[#242729] py-4 text-[#dfe2e3] sm:py-5"
          : "mt-6 bg-[#141718] py-4 text-[#dfe2e3] sm:mt-8 sm:py-5"
      }
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-4 px-4 sm:gap-5 sm:px-6 lg:grid-cols-[1.1fr_1fr_1fr] lg:items-start lg:gap-8 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:block">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center text-white">
              <RentoLogo background="dark" className="w-[96px] sm:w-[120px]" />
            </Link>
            <p className="mt-1.5 max-w-[240px] text-[11px] leading-4 text-[#b8bec1] sm:text-xs sm:leading-5">
              O‘zingizga mos avtomobilni toping va qulay shartlarda ijaraga
              oling.
            </p>
          </div>
          <a
            href="https://t.me/Nomoz1vicc"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#a1a5a7] text-[#242729] transition hover:bg-white hover:text-[#00863e] lg:mt-3"
          >
            <Send className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:contents">
          <section>
            <h4 className="mb-1.5 text-[12px] font-bold text-white sm:text-[13px]">
              Sahifalar
            </h4>
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1.5 lg:grid-cols-1">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="cursor-pointer text-[11px] text-[#dfe2e3] transition hover:text-[#67df85] sm:text-xs"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-1.5 text-[12px] font-bold text-white sm:text-[13px]">
              Aloqa
            </h4>
            <div className="space-y-1.5 text-[11px] sm:text-xs">
              <a
                href="mailto:jurayev088@icloud.com"
                className="flex items-start gap-1.5 transition hover:text-[#67df85] sm:items-center"
              >
                <Mail className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                <span className="break-all leading-snug">
                  jurayev088@icloud.com
                </span>
              </a>
              <a
                href="tel:+998931055475"
                className="flex items-center gap-1.5 transition hover:text-[#67df85]"
              >
                <Phone className="h-3 w-3 shrink-0" aria-hidden />
                +998 93 105 54 75
              </a>
              <p className="flex items-center gap-1.5 text-[#b8bec1]">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                Toshkent
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto mt-3 w-full max-w-[1440px] border-t border-white/10 px-4 pt-2.5 sm:mt-4 sm:px-6 sm:pt-3 lg:px-8">
        <p className="text-[10px] text-[#8a9296] sm:text-[11px]">
          © {new Date().getFullYear()} RENTO. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
