import { Booking, CarRenterStatus } from "@/src/types";

export const bronlar: Booking[] = [
  {
    id: "#RB-1025",
    car: "Chevrolet Cobalt",
    startDate: "10 Noyabr 2026",
    endDate: "14 Noyabr 2026",
    price: "1 400 000 so'm",
    status: CarRenterStatus.Yakunlangan,
    phone: "+998931055475",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200",
    companyId: "comp-01",
    companyName: "Premium Rent Car",
  },
  {
    id: "#RB-1024",
    car: "Chevrolet Malibu 2",
    startDate: "16 Noyabr 2026",
    endDate: "20 Noyabr 2026",
    price: "2 600 000 so'm",
    status: CarRenterStatus.Faol,
    phone: "+998931055475",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200",
    companyId: "comp-01",
    companyName: "Premium Rent Car",
  },
  {
    id: "#RB-1023",
    car: "BYD Song Plus",
    startDate: "16 Noyabr 2026",
    endDate: "20 Noyabr 2026",
    price: "3 250 000 so'm",
    status: CarRenterStatus.Kutilmoqda,
    phone: "+998931055475",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200",
    companyId: "comp-02",
    companyName: "Royal Auto Rent",
  },
  {
    id: "#RB-1022",
    car: "Kia K5",
    startDate: "16 Noyabr 2026",
    endDate: "20 Noyabr 2026",
    price: "1 300 000 so'm",
    status: CarRenterStatus.BekorQilingan,
    phone: "+998931055475",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200",
    companyId: "comp-03",
    companyName: "Elite Drive",
  },
  {
    id: "#RB-1021",
    car: "Hyundai Tucson",
    startDate: "01 Noyabr 2026",
    endDate: "05 Noyabr 2026",
    price: "3 800 000 so'm",
    status: CarRenterStatus.Yakunlangan,
    phone: "+998931055475",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200",
    companyId: "comp-04",
    companyName: "City Mobility",
  },
];
