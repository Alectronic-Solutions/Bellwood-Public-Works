import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Site Map",
  description: "Every page on the Bellwood Public Works website, grouped by section.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
