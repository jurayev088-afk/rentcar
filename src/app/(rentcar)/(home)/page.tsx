import HomePage from "@/src/features/home/page/HomePage";
import {
  fetchHomeData,
  HOME_REVALIDATE_SECONDS,
} from "@/src/lib/home-data";

export const revalidate = HOME_REVALIDATE_SECONDS;

export default async function page() {
  const data = await fetchHomeData();

  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}
