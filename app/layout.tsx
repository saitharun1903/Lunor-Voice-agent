import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.voiceops.in"),
  title: "VOICEOPS — AI Voice Automation for Business",
  description:
    "VOICEOPS builds AI voice agents that automate the first layer of business calls, including enquiries, bookings, lead qualification, support, sales and follow-ups.",
  keywords: [
    "VOICEOPS",
    "VoiceOps",
    "voiceops.in",
    "VoiceOps AI",
    "AI Voice Automation for Business",
    "AI Voice Agent",
    "Voice Automation",
    "Business Phone Automation",
    "Conversational AI",
    "Automated Phone Telephony",
    "Inbound Lead Qualification",
    "AI Appointment Booking",
    "First Layer Phone Automation",
  ],
  authors: [{ name: "VoiceOps Technologies Inc.", url: "https://www.voiceops.in" }],
  creator: "VoiceOps Technologies Inc.",
  publisher: "VoiceOps Technologies Inc.",
  alternates: {
    canonical: "https://www.voiceops.in/",
  },
  openGraph: {
    title: "VOICEOPS — AI Voice Automation for Business",
    description:
      "VOICEOPS builds AI voice agents that automate the first layer of business calls, including enquiries, bookings, lead qualification, support, sales and follow-ups.",
    url: "https://www.voiceops.in/",
    siteName: "VOICEOPS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/voiceops-og.png",
        width: 1200,
        height: 630,
        alt: "VOICEOPS — AI Voice Automation for Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VOICEOPS — AI Voice Automation for Business",
    description:
      "VOICEOPS builds AI voice agents that automate the first layer of business calls, including enquiries, bookings, lead qualification, support, sales and follow-ups.",
    images: ["/voiceops-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.voiceops.in/#organization",
      name: "VOICEOPS",
      legalName: "VoiceOps Technologies Inc.",
      url: "https://www.voiceops.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.voiceops.in/icon.svg",
        width: "48",
        height: "48",
      },
      image: "https://www.voiceops.in/voiceops-og.png",
      description:
        "VOICEOPS builds AI voice agents that automate the first layer of business calls, including enquiries, bookings, lead qualification, support, sales and follow-ups.",
      email: "conversations@voiceops.in",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "conversations@voiceops.in",
        url: "https://www.voiceops.in/#contact",
        availableLanguage: ["en"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.voiceops.in/#website",
      url: "https://www.voiceops.in",
      name: "VOICEOPS",
      alternateName: ["VoiceOps", "VoiceOps AI"],
      publisher: {
        "@id": "https://www.voiceops.in/#organization",
      },
      description: "AI Voice Automation for Business. Automate the first layer of every call.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.voiceops.in/#software",
      name: "VOICEOPS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Cloud",
      url: "https://www.voiceops.in",
      description:
        "VOICEOPS builds AI voice agents that automate the first layer of business calls, including enquiries, bookings, lead qualification, support, sales and follow-ups.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: {
        "@id": "https://www.voiceops.in/#organization",
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-blue-600 selection:text-white font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
