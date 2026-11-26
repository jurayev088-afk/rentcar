import type { HomeData } from "@/src/types/api";
import CategoryNavStrip from "../components/CategoryNavStrip";
import PopularCars from "../components/PopularCars";
import HomeBrands from "../components/HomeBrands";
import TopCompanies from "../components/TopCompanies";

export default function HomePage({ data }: { data: HomeData }) {
  return (
    <>
      <CategoryNavStrip data={data} />
      <PopularCars data={data} />
      <TopCompanies data={data} />
      <HomeBrands data={data} />
    </>
  );
}
