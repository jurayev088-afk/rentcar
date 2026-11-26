import Login from "@/src/features/login/page/Login";
import {
  authDestination,
  type AuthRole,
} from "@/src/features/login/authDestination";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string | string[];
    role?: string | string[];
  }>;
}) {
  const sp = await searchParams;
  const roleRaw = Array.isArray(sp.role) ? sp.role[0] : sp.role;
  const role: AuthRole =
    roleRaw === "COMPANY" ? "COMPANY" : "USER";

  return (
    <Login
      destination={authDestination(sp.next)}
      initialRole={role}
    />
  );
}
