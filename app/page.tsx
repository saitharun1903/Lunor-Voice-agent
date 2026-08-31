import { getSiteData } from "@/lib/db";
import { HomeClient } from "@/components/home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const siteData = await getSiteData();
  // Strip password hash from public client bundle
  const safeData = {
    ...siteData,
    settings: {
      ...siteData.settings,
      adminPasswordHash: undefined,
    },
  };

  return <HomeClient initialData={safeData} />;
}
