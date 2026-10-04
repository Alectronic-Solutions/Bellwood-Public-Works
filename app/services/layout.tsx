import type { Metadata } from "next";

// The page itself is a client component and cannot export metadata, so the route's
// browser tab title and description live here.
export const metadata: Metadata = {
  // Detail pages below set their own title, so this layout passes the site template on;
  // a plain string here would leave them without the site name.
  title: { default: "Services", template: "%s | Bellwood Public Works" },
  description: "Water, sewer, streets, sanitation, permitting, and parks services provided by Bellwood Public Works.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
