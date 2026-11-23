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
          ? "bg-[#242729] py-[clamp(28px,3.2vw,48px)] text-[#dfe2e3]"
          : "mt-16 bg-[#141718] py-12 text-[#dfe2e3]"
      }
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center text-white">
            <RentoLogo background="dark" className="w-36" />
          </Link>
          <p className="mt-3 max-w-[280px] text-sm leading-6 text-[#b8bec1]">
            O‘zingizga mos avtomobilni toping va qulay shartlarda ijaraga oling.
          </p>
          <a
            href="https://t.me/Nomoz1vicc"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#a1a5a7] text-[#242729] transition hover:bg-white hover:text-[#00863e]"
          >
            <Send className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <section>
          <h4 className="mb-3 text-[15px] font-bold text-white">Sahifalar</h4>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#dfe2e3] transition hover:text-[#67df85]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="mb-3 text-[15px] font-bold text-white">Aloqa</h4>
          <div className="space-y-3 text-sm">
            <a
              href="mailto:jurayev088@icloud.com"
              className="flex items-center gap-2.5 transition hover:text-[#67df85]"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
              jurayev088@icloud.com
            </a>
            <a
              href="tel:+998931055475"
              className="flex items-center gap-2.5 transition hover:text-[#67df85]"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
              +998 93 105 54 75
            </a>
            <p className="flex items-center gap-2.5 text-[#b8bec1]">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Toshkent, O‘zbekiston
            </p>
          </div>
        </section>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1440px] border-t border-white/10 px-4 pt-5 sm:px-6 lg:px-8">
        <p className="text-sm text-[#8a9296]">
          © {new Date().getFullYear()} RENTO. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
