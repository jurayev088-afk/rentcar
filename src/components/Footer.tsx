
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F33] text-white mt-20">
      <div className="max-w-[1250px] mx-auto px-5 pt-16 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* LOGO */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center">
                <span className="text-[#0B1F33] text-2xl font-black">
                  R
                </span>
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Rent<span className="text-blue-300">Car</span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-7 mt-5 max-w-[270px]">
              O'zingizga mos avtomobilni toping va qulay shartlarda ijaraga oling.
              Sayohatingizni biz bilan boshlang!
            </p>

            <div className="flex gap-3 mt-6">
              {["Telegram", "Instagram", "Facebook"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-2 rounded-lg bg-white/10 text-gray-300 text-xs hover:bg-white hover:text-[#0B1F33] transition"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="font-bold text-lg mb-6">Sahifalar</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition">Bosh sahifa</Link></li>
              <li><Link href="/mashinalar" className="hover:text-white transition">Mashinalar</Link></li>
              <li><Link href="/elonlar" className="hover:text-white transition">E'lonlar</Link></li>
              <li><Link href="/ijara" className="hover:text-white transition">Ijara</Link></li>
              <li><Link href="/sevimlilar" className="hover:text-white transition">Sevimlilar</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-bold text-lg mb-6">Xizmatlar</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/mashinalar" className="hover:text-white transition">Avtomobil ijarasi</Link></li>
              <li><Link href="/elonlar" className="hover:text-white transition">E'lon joylashtirish</Link></li>
              <li><Link href="/profile" className="hover:text-white transition">Shaxsiy kabinet</Link></li>
              <li><a href="#" className="hover:text-white transition">Yordam markazi</a></li>
              <li><a href="#" className="hover:text-white transition">Maxfiylik siyosati</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-bold text-lg mb-6">Biz bilan aloqa</h3>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Telefon raqam</p>
                <a href="tel:+998900000000" className="hover:text-blue-300 transition">
                  +998 90 000 00 00
                </a>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Elektron pochta</p>
                <a href="mailto:info@rentcar.uz" className="hover:text-blue-300 transition">
                  info@rentcar.uz
                </a>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Manzil</p>
                <p className="text-gray-300">Toshkent, O'zbekiston</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RentCar. Barcha huquqlar himoyalangan.
          </p>

          <p className="text-gray-500 text-sm">
            Sizning qulay sayohatingiz uchun ❤️
          </p>
        </div>

      </div>
    </footer>
  );
}
