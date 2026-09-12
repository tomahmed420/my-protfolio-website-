import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Md. Shahjalal Ahmed — Meta Ads & Tracking Specialist",
  description: "Meta Ads, GTM, GA4 and conversion tracking for measurable growth.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}