import TopCarsPage from "@/src/features/mashinalar/page/TopCarsPage";
import {
  fetchHomeData,
  HOME_REVALIDATE_SECONDS,
} from "@/src/lib/home-data";

export const revalidate = HOME_REVALIDATE_SECONDS;

export default async function page() {
  const data = await fetchHomeData();
  return <TopCarsPage data={data} />;
}
