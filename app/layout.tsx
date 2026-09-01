import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://lunor.co.in"),
  title: "Luno — AI Voice Automation for Business",
  description:
    "Luno builds AI voice agents that automate the first layer of business phone conversations—handling bookings, qualification, enquiries, routing, and customer support with sub-second response times.",
  keywords: [
    "AI Voice Agent",
    "Voice Automation",
    "Business Phone Automation",
    "Conversational AI",
    "Automated Phone Reception",
    "Inbound Lead Qualification",
    "AI Reservation Booking",
  ],
  authors: [{ name: "Luno Technologies" }],
  alternates: {
    canonical: "https://lunor.co.in",
  },
  openGraph: {
    title: "Luno — AI Voice Automation for Business",
    description:
      "Automate the first layer of every business call. Custom voice agents designed for real workflows.",
    url: "https://lunor.co.in",
    siteName: "Luno",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luno — AI Voice Automation for Business",
    description:
      "Automate the first layer of every business call. Custom voice agents designed for real workflows.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("luno-theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var isDark=t==="dark"||(t!=="light"&&m);if(isDark){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
