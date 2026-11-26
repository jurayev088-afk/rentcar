import TopCarsPage from "@/src/features/mashinalar/page/TopCarsPage";
import { fetchHomeData } from "@/src/lib/home-data";

/** Next segment config — faqat literal bo‘lishi shart */
export const revalidate = 60;

export default async function page() {
  const data = await fetchHomeData();
  return <TopCarsPage data={data} />;
}
