import HomePage from "@/src/features/home/page/HomePage";
import { fetchHomeData } from "@/src/lib/home-data";

/** Next segment config — faqat literal bo‘lishi shart */
export const revalidate = 60;

export default async function page() {
  const data = await fetchHomeData();

  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}
