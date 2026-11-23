import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  MessageCircle,
  Headset,
  UserRound,
  LogOut,
  AlertTriangle,
} from "lucide-react";

export const renterSidebar = [
  {
    title: "Umumiy ma'lumot",
    href: "/profile/renter/profile",
    icon: LayoutDashboard,
  },
  {
    title: "Mening bronlarim",
    href: "/profile/renter/bronlarim",
    icon: CalendarCheck,
  },
  {
    title: "Sevimlilar",
    href: "/sevimlilar",
    icon: Heart,
  },
  {
    title: "Xabarlar",
    href: "/profile/renter/xabarlar",
    icon: MessageCircle,
  },
  {
    title: "Shaxsiy ma'lumotlar",
    href: "/profile/renter/malumotlar",
    icon: UserRound,
  },
  {
    title: "Yordam markazi",
    href: "/profile/renter/yordam-markazi",
    icon: Headset,
  },
  {
    title: "Shikoyatlar",
    href: "/profile/renter/shikoyatlar",
    icon: AlertTriangle,
  },
  {
    title: "Chiqish",
    href: "/",
    icon: LogOut,
  },
];