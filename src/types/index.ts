export type CarStatus =
  | "MAVJUD"
  | "IJARADA"
  | "BRON_QILINGAN"
  | "PENDING"
  | "REJECTED"
  | "INACTIVE"

export const statusConfig = {
  MAVJUD: {
    color: "success",
    label: "Mavjud",
  },
  IJARADA: {
    color: "rejected",
    label: "Ijarada",
  },
  BRON_QILINGAN: {
    color: "processing",
    label: "Bron qilingan",
  },
  PENDING: {
    color: "warning",
    label: "Tekshiruvda",
  },
  REJECTED: {
    color: "error",
    label: "Rad etilgan",
  },
  INACTIVE: {
    color: "default",
    label: "Faol emas",
  },
  MAVJUD_EMAS: {
    color: "default",
    label: "Mavjud emas",
  },
}

export const carStatus = [
  {
    label: "Tekshiruvda",
    value: "PENDING",
    color: "gold",
  },
  {
    label: "Mavjud",
    value: "MAVJUD",
    color: "green",
  },
  {
    label: "Ijarada",
    value: "IJARADA",
    color: "blue",
  },
  {
    label: "Bron qilingan",
    value: "BRON_QILINGAN",
    color: "orange",
  },
  {
    label: "Rad etilgan",
    value: "REJECTED",
    color: "red",
  },
  {
    label: "Faol emas",
    value: "INACTIVE",
    color: "default",
  },
];


export interface Car {
  id: string;
  companyId?: string;
  companyName?: string;
  address: string;
  agreement: boolean;
  airCondition: boolean;
  brand: string;
  category: string;
  color: string;
  condition: string;
  deposit: number;
  description: string;
  district: string;
  engine: number;
  fuel: string;
  images: any[];
  minDays: number;
  model: string;
  number: string;
  oldPrice: number;
  price: number;
  region: string;
  rules: string;
  seats: number;
  transmission: string;
  year: number;
  status: CarStatus;
  phone: string;
  bookingsCount?: number;
}



export enum UsersRole {
  OWNER = "OWNER",
  RENTER = "RENTER"
}

export interface RegisterRenterType {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  role: UsersRole
}

export interface LoginType {
  email: string,
  password: string
}

import type { Dayjs } from "dayjs";
import type { UploadFile } from "antd";

export type BookingType = {
  id: string | number;
  birthDate: Dayjs;
  comment: string;
  endDate: Dayjs;
  firstName: string;
  lastName: string;
  passportNumber: string;
  phone: string;
  pravaImg: UploadFile[];
  startDate: Dayjs;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
};

export enum CarRenterStatus {
  Kutilmoqda = "Kutilmoqda",
  Tasdiqlangan = "Tasdiqlangan",
  Faol = "Faol",
  Yakunlangan = "Yakunlangan",
  BekorQilingan = "Bekor qilingan",
  RadEtilgan = "Rad etilgan",
}

/** Ijarachi kabinetidagi bronlar ro‘yxati (jadval mock/API) */
export interface Booking {
  id: string;
  car: string;
  startDate: string;
  endDate: string;
  price: string;
  status: CarRenterStatus;
  phone: string;
  image: string;
  companyId?: string;
  companyName?: string;
  rating?: number;
}