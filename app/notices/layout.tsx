import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  // Detail pages below set their own title, so this layout passes the site template on;
  // a plain string here would leave them without the site name.
  title: { default: "Public Notices", template: "%s | Bellwood Public Works" },
  description: "Service disruptions, road closures, bid solicitations, and public hearing notices from Bellwood Public Works.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
