import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VOICEOPS — AI Voice Automation for Business";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c101c",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 50%, #1d4ed8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            V
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px" }}>
            VOICEOPS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "920px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-1.5px",
            }}
          >
            Automate the first layer of every call.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            VOICEOPS builds AI voice agents that automate the first layer of business calls, including enquiries, bookings, lead qualification, support, sales and follow-ups.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          <span>https://www.voiceops.in</span>
          <span>Enquiries · Bookings · Lead Qualification · Support · Sales</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
