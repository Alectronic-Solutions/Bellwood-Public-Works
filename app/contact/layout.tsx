import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Phone numbers, email addresses, office hours, and the staff directory for Bellwood Public Works.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
