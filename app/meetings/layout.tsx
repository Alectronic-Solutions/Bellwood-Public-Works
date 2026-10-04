import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  title: "Public Meetings",
  description: "Agendas and minutes for City Council, Planning Commission, and advisory board meetings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
