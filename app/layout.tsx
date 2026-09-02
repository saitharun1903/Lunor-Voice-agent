import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  metadataBase: new URL("https://lunor.co.in"),
  title: "Lunor — AI Voice Automation for Business",
  description:
    "Lunor builds AI voice systems that automate the first layer of business phone conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
  keywords: [
    "Lunor",
    "Lunor AI",
    "AI Voice Agent",
    "Voice Automation",
    "Business Phone Automation",
    "Conversational AI",
    "Automated Phone Telephony",
    "Inbound Lead Qualification",
    "AI Reservation Booking",
  ],
  authors: [{ name: "Lunor Technologies" }],
  alternates: {
    canonical: "https://lunor.co.in",
  },
  openGraph: {
    title: "Lunor — AI Voice Automation for Business",
    description:
      "Automate the first layer of every business call. Custom voice systems designed for real workflows.",
    url: "https://lunor.co.in",
    siteName: "Lunor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunor — AI Voice Automation for Business",
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

const themeInitScript = `(function(){try{var t=localStorage.getItem("lunor-theme")||localStorage.getItem("luno-theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var isDark=t==="dark"||(t!=="light"&&m);if(isDark){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`;

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
      <body className="antialiased selection:bg-blue-600 selection:text-white font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
