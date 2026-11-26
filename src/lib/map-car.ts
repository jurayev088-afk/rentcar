import type { ApiCar } from "../types/api";
import type { Car, CarStatus } from "../types";
import { toMoneyNumber } from "./format";
import { carPrimaryImage, resolveMediaUrl } from "./media";

function mapStatus(status?: string): CarStatus {
  switch (status) {
    case "APPROVED":
    case "MAVJUD":
      return "MAVJUD";
    case "IJARADA":
      return "IJARADA";
    case "BRON_QILINGAN":
      return "BRON_QILINGAN";
    case "PENDING":
      return "PENDING";
    case "REJECTED":
      return "REJECTED";
    case "INACTIVE":
      return "INACTIVE";
    default:
      return "MAVJUD";
  }
}

/** Backend ApiCar → UI Car (Filter / Cars / CarDetails) */
export function mapApiCarToUi(car: ApiCar): Car {
  const imageUrls = (car.images ?? [])
    .map((img) =>
      resolveMediaUrl(img.url || img.thumbnailUrl || ""),
    )
    .filter(Boolean);
  const primary = carPrimaryImage(car.images);
  const images =
    imageUrls.length > 0
      ? imageUrls.map((url) => ({ url, originalUrl: url, thumbUrl: url }))
      : [{ url: primary, originalUrl: primary, thumbUrl: primary }];

  return {
    id: car.id,
    companyId: car.company?.id,
    companyName: car.company?.name,
    address: car.address || "",
    agreement: true,
    airCondition: Boolean(car.airCondition ?? true),
    brand: car.brand,
    category: car.category?.nameUz || car.category?.name || "",
    color: car.color || "",
    condition: "Yaxshi",
    deposit: toMoneyNumber(car.deposit),
    description: car.description || "",
    district: car.district?.nameUz || car.district?.name || "",
    engine: Number(car.engineCapacity ?? car.engineVolume ?? 0),
    fuel: car.fuelType || "",
    images,
    minDays: car.minDays ?? 1,
    model: car.model,
    number: car.plateNumber || "",
    oldPrice: toMoneyNumber(car.oldPrice),
    price: toMoneyNumber(car.dailyPrice),
    region: car.region?.nameUz || car.region?.name || "",
    rules: "",
    seats: car.seats ?? 5,
    transmission: car.transmission || "",
    year: car.year,
    status: car.isRented ? "IJARADA" : mapStatus(car.status),
    phone: car.phone || car.company?.phone || "",
    bookingsCount: car.bookingsCount,
  };
}
