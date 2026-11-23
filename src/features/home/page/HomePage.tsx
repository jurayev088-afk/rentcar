import CategoryNavStrip from "../components/CategoryNavStrip";
import PopularCars from "../components/PopularCars";
import HomeBrands from "../components/HomeBrands";
import TopCompanies from "../components/TopCompanies";

export default function HomePage() {
  return (
    <>
      <CategoryNavStrip />
      <PopularCars />
      <TopCompanies />
      <HomeBrands />
    </>
  );
}
