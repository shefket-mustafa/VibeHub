import { redirect } from "next/navigation";
import getUserFromCookies from "../lib/getUserFromCookieIdentifier";
import Feed from "./Feed";

export const dynamic = "force-dynamic";

export default async function Page() {

  const user = await getUserFromCookies();
  if (!user) redirect("/auth");
    return <Feed />;
  }