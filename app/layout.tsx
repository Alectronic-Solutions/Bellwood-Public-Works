import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { TextSizeProvider } from "@/lib/textSize";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { QuickActionsBar } from "@/components/layout/QuickActionsBar";
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
          <TextSizeProvider>
            <SkipLink />
            <AlertBanner />
            <SiteHeader />
            <PrimaryNav />
            <QuickActionsBar />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </TextSizeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
