import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Capital Projects",
  description: "Status, budget, and timeline for Bellwood Public Works capital improvement projects.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
