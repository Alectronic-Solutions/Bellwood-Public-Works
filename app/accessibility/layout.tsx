import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "How Bellwood Public Works meets WCAG 2.1 AA and Section 508, and how to report a barrier.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
