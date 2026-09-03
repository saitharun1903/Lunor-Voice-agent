import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://voiceops.in"),
  title: "VOICEOPS — AI Voice Automation for Business",
  description:
    "VoiceOps builds custom AI voice systems that automate the first layer of business phone conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
  keywords: [
    "VOICEOPS",
    "VoiceOps",
    "voiceops.in",
    "VoiceOps AI",
    "AI Voice Agent",
    "Voice Automation",
    "Business Phone Automation",
    "Conversational AI",
    "Automated Phone Telephony",
    "Inbound Lead Qualification",
    "AI Reservation Booking",
  ],
  authors: [{ name: "VoiceOps Technologies" }],
  alternates: {
    canonical: "https://voiceops.in",
  },
  openGraph: {
    title: "VOICEOPS — AI Voice Automation for Business",
    description:
      "Automate the first layer of every business call. Custom voice systems designed for real workflows.",
    url: "https://voiceops.in",
    siteName: "VOICEOPS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VOICEOPS — AI Voice Automation for Business",
    description:
      "Automate the first layer of every business call. Custom voice systems designed for real workflows.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
