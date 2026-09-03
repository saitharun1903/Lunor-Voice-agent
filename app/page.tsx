import { getPublishedSiteData } from "@/lib/db";
import { HomeClient } from "@/components/home-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const publishedData = await getPublishedSiteData();
  return <HomeClient initialData={publishedData} />;
}
