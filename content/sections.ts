import { services } from "./services";

export interface SectionPage {
  href: string;
  label: string;
  labelEs: string;
}

export interface Section {
  id: string;
  label: string;
  labelEs: string;
  href: string;
  pages: SectionPage[];
}

export const sections: Section[] = [
  {
    id: "services",
    label: "Services",
    labelEs: "Servicios",
    href: "/services",
    pages: [
      { href: "/services", label: "All Services", labelEs: "Todos los Servicios" },
      ...services.map((service) => ({
        href: `/services/${service.slug}`,
        label: service.name,
        labelEs: service.es.name,
      })),
    ],
  },
  {
    id: "notices",
    label: "Notices",
    labelEs: "Avisos",
    href: "/notices",
    pages: [{ href: "/notices", label: "All Notices", labelEs: "Todos los Avisos" }],
  },
  {
    id: "meetings",
    label: "Meetings",
    labelEs: "Reuniones",
    href: "/meetings",
    pages: [{ href: "/meetings", label: "All Meetings", labelEs: "Todas las Reuniones" }],
  },
  {
    id: "forms",
    label: "Forms",
    labelEs: "Formularios",
    href: "/forms",
    pages: [{ href: "/forms", label: "All Forms", labelEs: "Todos los Formularios" }],
  },
  {
    id: "about",
    label: "About",
    labelEs: "Acerca de",
    href: "/accessibility",
    pages: [
      { href: "/accessibility", label: "Accessibility Statement", labelEs: "Declaración de Accesibilidad" },
      { href: "/public-records", label: "Public Records Request", labelEs: "Solicitud de Registros Públicos" },
      { href: "/contact", label: "Contact Us", labelEs: "Contáctenos" },
    ],
  },
];

export function findSectionByPath(pathname: string): Section | undefined {
  const normalized = pathname.replace(/\/$/, "") || "/";
  return sections.find((section) =>
    section.pages.some((page) => {
      const pageHref = page.href.replace(/\/$/, "") || "/";
      if (pageHref === normalized) return true;
      if (section.id === "services" && normalized.startsWith("/services/")) return true;
      if (section.id === "notices" && normalized.startsWith("/notices/")) return true;
      return false;
    }),
  );
}
