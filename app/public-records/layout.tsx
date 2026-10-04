import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Public Records Request",
  description: "How to request public records from Bellwood Public Works, including fees and response times.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
