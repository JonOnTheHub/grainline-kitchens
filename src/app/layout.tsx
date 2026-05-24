import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grainline Kitchens — Modular RTA Kitchens",
    template: "%s | Grainline Kitchens",
  },
  description:
    "Precision-built modular RTA kitchens. Structural honesty and functional beauty for residential and commercial spaces.",
  keywords: ["modular kitchens", "RTA kitchens", "kitchen design", "fitted kitchens"],
  openGraph: {
    title: "Grainline Kitchens",
    description: "Precision-built modular RTA kitchens.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${workSans.variable}`}>
      <body className="font-body bg-base text-ink">{children}</body>
    </html>
  );
}