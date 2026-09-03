import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdminAuth } from "@/lib/auth";
import {
  getSiteData,
  updateSiteSettings,
  updateNavigation,
  updateSiteStats,
  saveCapabilities,
  saveIndustryStories,
  saveProcessSteps,
  saveFaqs,
  saveProjects,
  saveIndustries,
  saveUseCases,
  updateAdminPassword,
} from "@/lib/db";

export async function GET() {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getSiteData();
  // Strip password hash from returned object for safety
  const safeData = {
    ...data,
    settings: {
      ...data.settings,
      adminPasswordHash: undefined,
    },
  };

  return NextResponse.json(safeData);
}

export async function POST(req: NextRequest) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { section, payload, action = "update" } = body;

    if (section === "settings") {
      const updated = await updateSiteSettings(payload, "Admin");
      revalidatePath("/");
      return NextResponse.json({ success: true, settings: updated });
    } else if (section === "navigation") {
      const updated = await updateNavigation(payload, "Admin");
      revalidatePath("/");
      return NextResponse.json({ success: true, navigation: updated });
    } else if (section === "capabilities") {
      const updated = await saveCapabilities(payload, "Admin", action);
      revalidatePath("/");
      return NextResponse.json({ success: true, capabilities: updated });
    } else if (section === "industryStories" || section === "industries") {
      const updated = await saveIndustryStories(payload, "Admin", action);
      revalidatePath("/");
      return NextResponse.json({ success: true, industryStories: updated });
    } else if (section === "processSteps" || section === "process") {
      const updated = await saveProcessSteps(payload, "Admin", action);
      revalidatePath("/");
      return NextResponse.json({ success: true, processSteps: updated });
    } else if (section === "faqs" || section === "faq") {
      const updated = await saveFaqs(payload, "Admin", action);
      revalidatePath("/");
      return NextResponse.json({ success: true, faqs: updated });
    } else if (section === "projects" || section === "caseStudies") {
      const updated = await saveProjects(payload, "Admin", action);
      revalidatePath("/");
      return NextResponse.json({ success: true, projects: updated });
    } else if (section === "stats") {
      const updated = await updateSiteStats(payload, "Admin");
      revalidatePath("/");
      return NextResponse.json({ success: true, stats: updated });
    } else if (section === "password") {
      if (!payload.newPassword || payload.newPassword.length < 4) {
        return NextResponse.json(
          { error: "Password must be at least 4 characters long" },
          { status: 400 }
        );
      }
      await updateAdminPassword(payload.newPassword);
      return NextResponse.json({ success: true, message: "Password updated successfully" });
    } else if (section === "legacyIndustries") {
      const updated = await saveIndustries(payload);
      return NextResponse.json({ success: true, industries: updated });
    } else if (section === "legacyUseCases") {
      const updated = await saveUseCases(payload);
      return NextResponse.json({ success: true, useCases: updated });
    }

    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site data" }, { status: 500 });
  }
}
