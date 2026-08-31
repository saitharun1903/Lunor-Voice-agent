import { NextRequest, NextResponse } from "next/server";
import { addLead, getSiteData, updateLead } from "@/lib/db";
import { syncLeadToGoogleSheets } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, industry, monthlyCallVolume, requirements } = body;

    // Validate required fields
    if (!name || !email || !requirements) {
      return NextResponse.json(
        { error: "Name, email, and requirements are required fields." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Add lead to persistent store
    const newLead = await addLead({
      name: name.trim(),
      company: (company || "").trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      industry: (industry || "").trim(),
      monthlyCallVolume: (monthlyCallVolume || "").trim(),
      requirements: requirements.trim(),
    });

    // Check if Google Sheets webhook is configured
    const siteData = await getSiteData();
    const webhookUrl = siteData.settings.googleSheetsWebhookUrl;

    let synced = false;
    if (webhookUrl) {
      const syncResult = await syncLeadToGoogleSheets(webhookUrl, newLead);
      if (syncResult.success) {
        synced = true;
        await updateLead(newLead.id, { syncedToSheets: true });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received. Luno will be in touch.",
        leadId: newLead.id,
        syncedToSheets: synced,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact Luno directly." },
      { status: 500 }
    );
  }
}
