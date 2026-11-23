export type ApiRole = "USER" | "COMPANY" | "ADMIN";

export type ApiUser = {
  id: string;
  fullName: string;
  phone: string;
  email?: string | null;
  role: ApiRole;
  status: string;
  avatarUrl?: string | null;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  createdAt?: string;
  company?: {
    id: string;
    name: string;
    status: string;
    logoUrl?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    ratingAvg?: number;
    ratingCount?: number;
  } | null;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: {
    id: string;
    role: ApiRole;
    status: string;
  };
};

export type Paginated<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type Region = {
  id: string;
  name: string;
  nameUz?: string | null;
  sortOrder?: number;
  districts?: District[];
};

export type District = {
  id: string;
  name: string;
  regionId: string;
};

export type Category = {
  id: string;
  name: string;
  nameUz?: string | null;
  slug?: string | null;
  iconUrl?: string | null;
  imageUrl?: string | null;
  sortOrder?: number;
};

export type Company = {
  id: string;
  name: string;
  logoUrl?: string | null;
  phone?: string | null;
  address?: string | null;
  description?: string | null;
  ratingAvg: number;
  ratingCount: number;
  _count?: { cars?: number; bookings?: number };
};

export type CarImage = {
  id?: string;
  url: string;
  isPrimary?: boolean;
};

export type ApiCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  dailyPrice: number | string;
  oldPrice?: number | string | null;
  deposit?: number | string | null;
  seats?: number;
  fuelType?: string;
  transmission?: string;
  status?: string;
  /** Hozir CONFIRMED/ACTIVE bron oralig‘ida */
  isRented?: boolean;
  color?: string | null;
  plateNumber?: string | null;
  address?: string | null;
  description?: string | null;
  airCondition?: boolean | null;
  engineCapacity?: number | null;
  engineVolume?: number | string | null;
  minDays?: number | null;
  phone?: string | null;
  bookingsCount?: number;
  viewsCount?: number;
  images?: CarImage[];
  company?: {
    id: string;
    name: string;
    logoUrl?: string | null;
    phone?: string | null;
  } | null;
  region?: { id: string; name: string; nameUz?: string | null } | null;
  district?: { id: string; name: string; nameUz?: string | null } | null;
  category?: Category | null;
};

export type HomeData = {
  topCars: ApiCar[];
  newestCars: ApiCar[];
  categories: Category[];
  brands: string[];
  brandCards?: { brand: string; imageUrl: string }[];
  topCompanies?: Company[];
  regions: Region[];
  stats: {
    companiesCount: number;
    carsCount: number;
  };
};

export type CarsQuery = {
  brand?: string;
  model?: string;
  regionId?: string;
  categoryId?: string;
  companyId?: string;
  minPrice?: number;
  maxPrice?: number;
  /** Kompaniya sahifasida ijaradagilar ham; katalogda default false */
  includeRented?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
};
