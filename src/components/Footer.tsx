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
          ? "bg-[#242729] py-5 text-[#dfe2e3] sm:py-7 lg:py-[clamp(28px,3.2vw,48px)]"
          : "mt-8 bg-[#141718] py-5 text-[#dfe2e3] sm:mt-12 sm:py-8 lg:mt-16 lg:py-12"
      }
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-5 px-4 sm:gap-8 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12 lg:px-8">
        {/* Brand */}
        <div className="flex items-start justify-between gap-3 lg:block">
          <div className="min-w-0">
            <Link href="/" className="inline-flex items-center text-white">
              <RentoLogo background="dark" className="w-[108px] sm:w-36" />
            </Link>
            <p className="mt-2 max-w-[260px] text-[12px] leading-5 text-[#b8bec1] sm:mt-3 sm:text-sm sm:leading-6">
              O‘zingizga mos avtomobilni toping va qulay shartlarda ijaraga
              oling.
            </p>
          </div>
          <a
            href="https://t.me/Nomoz1vicc"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#a1a5a7] text-[#242729] transition hover:bg-white hover:text-[#00863e] lg:mt-4"
          >
            <Send className="h-4 w-4" aria-hidden />
          </a>
        </div>

        {/* Links + contact side by side on mobile */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:contents">
          <section>
            <h4 className="mb-2 text-[13px] font-bold text-white sm:mb-3 sm:text-[15px]">
              Sahifalar
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-1">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="cursor-pointer text-[12px] text-[#dfe2e3] transition hover:text-[#67df85] sm:text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-2 text-[13px] font-bold text-white sm:mb-3 sm:text-[15px]">
              Aloqa
            </h4>
            <div className="space-y-2 text-[12px] sm:space-y-3 sm:text-sm">
              <a
                href="mailto:jurayev088@icloud.com"
                className="flex items-start gap-2 transition hover:text-[#67df85] sm:items-center sm:gap-2.5"
              >
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="break-all leading-snug">
                  jurayev088@icloud.com
                </span>
              </a>
              <a
                href="tel:+998931055475"
                className="flex items-center gap-2 transition hover:text-[#67df85] sm:gap-2.5"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                +998 93 105 54 75
              </a>
              <p className="flex items-center gap-2 text-[#b8bec1] sm:gap-2.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Toshkent
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto mt-5 w-full max-w-[1440px] border-t border-white/10 px-4 pt-3 sm:mt-8 sm:px-6 sm:pt-5 lg:mt-10 lg:px-8">
        <p className="text-[11px] text-[#8a9296] sm:text-sm">
          © {new Date().getFullYear()} RENTO. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
