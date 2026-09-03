import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voiceops.in"),
  title: "VOICEOPS — AI Voice Automation for Business",
  description:
    "VoiceOps builds AI voice systems that automate the first layer of business phone conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
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
    apple: "/apple-icon.png",
  },
};

const themeInitScript = `(function(){try{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${monoFont.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white font-sans bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
