import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/layout/SkipLink";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AlertBanner } from "@/components/layout/AlertBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";

const publicSans = localFont({
  src: [
    { path: "../public/fonts/PublicSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/PublicSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bellwood Public Works",
    template: "%s | Bellwood Public Works",
  },
  description: "Fictional municipal government portfolio demo site for Bellwood Public Works.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <SkipLink />
          <DemoBanner />
          <SiteHeader />
          <AlertBanner />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
