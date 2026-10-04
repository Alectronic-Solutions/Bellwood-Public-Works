import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Departments",
  description: "Divisions of Bellwood Public Works, with contact details, hours, and staff.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
