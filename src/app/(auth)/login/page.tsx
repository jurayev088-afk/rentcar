import Login from "@/src/features/login/page/Login";
import { authDestination } from "@/src/features/login/authDestination";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next } = await searchParams;
  return <Login destination={authDestination(next)} />;
}
