import { NextRequest, NextResponse } from "next/server";
import { getSiteData } from "@/lib/db";

// Rate limiting in-memory map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15; // Max 15 session creates per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many voice session requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    // 2. Validate API Key
    const apiKey = process.env.OMNIDIM_API_KEY;
    if (!apiKey) {
      console.error("[Voice Session] Missing server-side OMNIDIM_API_KEY");
      return NextResponse.json(
        { error: "VoiceOps live demo is temporarily unavailable." },
        { status: 503 }
      );
    }

    // 3. Resolve Agent ID
    const siteData = await getSiteData().catch(() => null);
    const configuredAgentId =
      siteData?.settings?.voiceDemoAgentId || process.env.OMNIDIM_AGENT_ID || "246585";

    // Extract numeric agent ID
    const numericAgentId = parseInt(String(configuredAgentId).replace(/\D/g, ""), 10);
    if (!numericAgentId || isNaN(numericAgentId)) {
      console.error("[Voice Session] Invalid configured agent ID:", configuredAgentId);
      return NextResponse.json(
        { error: "Voice agent configuration error. Please contact VoiceOps support." },
        { status: 500 }
      );
    }

    // 4. Request short-lived voice session from OmniDimension API
    const response = await fetch("https://omnidim.io/api/v1/sessions/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: numericAgentId,
        type: "voice",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[Voice Session] Session creation failed with status ${response.status}:`,
        errorText
      );
      return NextResponse.json(
        { error: "We couldn't start the conversation. Please try again." },
        { status: response.status >= 500 ? 502 : 400 }
      );
    }

    const sessionData = await response.json();

    if (!sessionData.ws_url) {
      console.error("[Voice Session] No ws_url returned in session response");
      return NextResponse.json(
        { error: "Failed to establish voice connection endpoint." },
        { status: 502 }
      );
    }

    // Return ONLY the short-lived ws_url needed by the browser WebSession
    return NextResponse.json({
      ws_url: sessionData.ws_url,
      expires_at: sessionData.expires_at,
    });
  } catch (error: any) {
    console.error("[Voice Session] Unexpected error creating session:", error?.message || error);
    return NextResponse.json(
      { error: "VoiceOps live demo is temporarily unavailable." },
      { status: 500 }
    );
  }
}
