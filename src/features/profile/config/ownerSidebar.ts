import {
  LayoutDashboard,
  CarFront,
  CalendarCheck,
  MessageCircle,
  UserRound,
  Headset,
  LogOut,
  AlertTriangle,
} from "lucide-react";

export const ownerSidebar = [
  {
    title: "Umumiy ma'lumot",
    href: "/profile/owner/profile",
    icon: LayoutDashboard,
  },
  {
    title: "Mening mashinalarim",
    href: "/profile/owner/moshinalarim",
    icon: CarFront,
  },
  {
    title: "Bronlar",
    href: "/profile/owner/bronlar",
    icon: CalendarCheck,
  },
  {
    title: "Xabarlar",
    href: "/profile/owner/xabarlar",
    icon: MessageCircle,
  },
  {
    title: "Shaxsiy ma'lumotlar",
    href: "/profile/owner/malumotlar",
    icon: UserRound,
  },
  {
    title: "Yordam markazi",
    href: "/profile/owner/yordam-markazi",
    icon: Headset,
  },
  {
    title: "Shikoyatlar",
    href: "/profile/owner/shikoyatlar",
    icon: AlertTriangle,
  },
  {
    title: "Chiqish",
    href: "/",
    icon: LogOut,
  },
];