import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import {
  getSiteData,
  updateSiteSettings,
  updateSiteStats,
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
    const { section, payload } = body;

    if (section === "stats") {
      const updated = await updateSiteStats(payload);
      return NextResponse.json({ success: true, stats: updated });
    } else if (section === "settings") {
      const updated = await updateSiteSettings(payload);
      return NextResponse.json({ success: true, settings: updated });
    } else if (section === "password") {
      if (!payload.newPassword || payload.newPassword.length < 4) {
        return NextResponse.json(
          { error: "Password must be at least 4 characters long" },
          { status: 400 }
        );
      }
      await updateAdminPassword(payload.newPassword);
      return NextResponse.json({ success: true, message: "Password updated successfully" });
    } else if (section === "projects") {
      const updated = await saveProjects(payload);
      return NextResponse.json({ success: true, projects: updated });
    } else if (section === "industries") {
      const updated = await saveIndustries(payload);
      return NextResponse.json({ success: true, industries: updated });
    } else if (section === "useCases") {
      const updated = await saveUseCases(payload);
      return NextResponse.json({ success: true, useCases: updated });
    }

    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update site data" }, { status: 500 });
  }
}
