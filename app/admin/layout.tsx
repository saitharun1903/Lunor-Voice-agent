import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal — VOICEOPS",
  description: "Administrative interface for VoiceOps. Authorized personnel only.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
