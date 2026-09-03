import { getSiteData } from "@/lib/db";
import { HomeClient } from "@/components/home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const siteData = await getSiteData();
  // Strip password hash and internal lead records from public client bundle
  const safeData = {
    settings: {
      ...siteData.settings,
      adminPasswordHash: undefined,
    },
    stats: siteData.stats,
    projects: siteData.projects,
    industries: siteData.industries,
    useCases: siteData.useCases,
    leads: [],
  };

  return <HomeClient initialData={safeData} />;
}
