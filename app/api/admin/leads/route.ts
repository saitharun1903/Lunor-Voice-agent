import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getLeads, updateLead, deleteLead } from "@/lib/db";

export async function GET(req: NextRequest) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");
  const leads = await getLeads();

  if (format === "csv") {
    // Generate CSV string
    const headers = [
      "ID",
      "Date",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Industry",
      "Call Volume",
      "Requirements",
      "Status",
      "Notes",
    ];

    const rows = leads.map((lead) => [
      `"${lead.id}"`,
      `"${new Date(lead.createdAt).toLocaleString()}"`,
      `"${(lead.name || "").replace(/"/g, '""')}"`,
      `"${(lead.company || "").replace(/"/g, '""')}"`,
      `"${(lead.email || "").replace(/"/g, '""')}"`,
      `"${(lead.phone || "").replace(/"/g, '""')}"`,
      `"${(lead.industry || "").replace(/"/g, '""')}"`,
      `"${(lead.monthlyCallVolume || "").replace(/"/g, '""')}"`,
      `"${(lead.requirements || "").replace(/"/g, '""')}"`,
      `"${lead.status}"`,
      `"${(lead.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="luno-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({ leads });
}

export async function PATCH(req: NextRequest) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    }

    const updated = await updateLead(id, {
      ...(status ? { status } : {}),
      ...(notes !== undefined ? { notes } : {}),
    });

    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuthed = await verifyAdminAuth();
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
  }

  const deleted = await deleteLead(id);
  if (!deleted) {
    return NextResponse.json({ error: "Lead not found or already deleted" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Lead deleted successfully" });
}
