import { Lead } from "./types";

export async function syncLeadToGoogleSheets(
  webhookUrl: string,
  lead: Lead
): Promise<{ success: boolean; error?: string }> {
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    return { success: false, error: "No valid webhook URL configured" };
  }

  try {
    const payload = {
      timestamp: lead.createdAt,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      industry: lead.industry || "Not specified",
      monthlyCallVolume: lead.monthlyCallVolume || "Not specified",
      requirements: lead.requirements,
      status: lead.status,
      source: "VoiceOps Website Contact Flow",
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false, error: `Webhook returned HTTP ${response.status}` };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to forward lead to Google Sheets" };
  }
}
