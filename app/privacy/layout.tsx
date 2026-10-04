import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What information Bellwood Public Works collects online and how it is used.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
