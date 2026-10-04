import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Forms and Applications",
  description: "Permit applications, service request forms, and other Bellwood Public Works documents.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
