export interface NavLink {
  href: string;
  label: string;
  labelEs: string;
  description?: string;
  descriptionEs?: string;
}

export interface NavColumn {
  heading: string;
  headingEs: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  labelEs: string;
  href: string;
  columns?: NavColumn[];
}

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    labelEs: "Servicios",
    href: "/services",
    columns: [
      {
        heading: "Utilities",
        headingEs: "Servicios Públicos",
        links: [
          {
            href: "/services/water-sewer",
            label: "Water and Sewer Services",
            labelEs: "Servicios de Agua y Alcantarillado",
          },
          {
            href: "/services/stormwater",
            label: "Stormwater Management",
            labelEs: "Gestión de Aguas Pluviales",
          },
          {
            href: "/services/waste-recycling",
            label: "Waste and Recycling Collection",
            labelEs: "Recolección de Basura y Reciclaje",
          },
        ],
      },
      {
        heading: "Infrastructure",
        headingEs: "Infraestructura",
        links: [
          {
            href: "/services/streets-sidewalks",
            label: "Streets and Sidewalks",
            labelEs: "Calles y Aceras",
          },
          {
            href: "/services/snow-removal",
            label: "Snow and Ice Removal",
            labelEs: "Remoción de Nieve y Hielo",
          },
        ],
      },
      {
        heading: "Permitting and Community",
        headingEs: "Permisos y Comunidad",
        links: [
          {
            href: "/services/building-permits",
            label: "Building Permits and Inspections",
            labelEs: "Permisos de Construcción e Inspecciones",
          },
          {
            href: "/services/parks-recreation",
            label: "Parks and Recreation",
            labelEs: "Parques y Recreación",
          },
          {
            href: "/services",
            label: "View all services",
            labelEs: "Ver todos los servicios",
          },
        ],
      },
    ],
  },
  {
    label: "Notices",
    labelEs: "Avisos",
    href: "/notices",
  },
  {
    label: "Meetings",
    labelEs: "Reuniones",
    href: "/meetings",
  },
  {
    label: "Forms",
    labelEs: "Formularios",
    href: "/forms",
  },
  {
    label: "About",
    labelEs: "Acerca de",
    href: "/accessibility",
    columns: [
      {
        heading: "Department",
        headingEs: "Departamento",
        links: [
          {
            href: "/accessibility",
            label: "Accessibility Statement",
            labelEs: "Declaración de Accesibilidad",
          },
          {
            href: "/public-records",
            label: "Public Records Request",
            labelEs: "Solicitud de Registros Públicos",
          },
          {
            href: "/contact",
            label: "Contact Us",
            labelEs: "Contáctenos",
          },
        ],
      },
    ],
  },
];

export const footerDepartmentLinks: NavLink[] = [
  { href: "/services/water-sewer", label: "Water and Sewer Division", labelEs: "División de Agua y Alcantarillado" },
  { href: "/services/streets-sidewalks", label: "Streets Division", labelEs: "División de Calles" },
  {
    href: "/services/building-permits",
    label: "Building Permits and Inspections",
    labelEs: "Permisos de Construcción e Inspecciones",
  },
  { href: "/services/waste-recycling", label: "Sanitation Division", labelEs: "División de Saneamiento" },
  { href: "/services/parks-recreation", label: "Parks and Recreation", labelEs: "Parques y Recreación" },
  { href: "/services/stormwater", label: "Stormwater Division", labelEs: "División de Aguas Pluviales" },
  { href: "/contact", label: "City Clerk's Office", labelEs: "Oficina del Secretario Municipal" },
  { href: "/contact", label: "Department Directory", labelEs: "Directorio de Departamentos" },
];

export const footerServiceLinks: NavLink[] = [
  { href: "/services/water-sewer", label: "Pay a Utility Bill", labelEs: "Pagar Factura de Servicios" },
  { href: "/services/streets-sidewalks", label: "Report a Pothole", labelEs: "Reportar un Bache" },
  {
    href: "/services/building-permits",
    label: "Apply for a Building Permit",
    labelEs: "Solicitar Permiso de Construcción",
  },
  {
    href: "/services/waste-recycling",
    label: "Trash and Recycling Schedule",
    labelEs: "Horario de Basura y Reciclaje",
  },
  { href: "/services/parks-recreation", label: "Reserve a Park Pavilion", labelEs: "Reservar un Pabellón de Parque" },
  { href: "/services/snow-removal", label: "Snow Emergency Rules", labelEs: "Reglas de Emergencia por Nieve" },
  {
    href: "/services/stormwater",
    label: "Stormwater Utility Credit",
    labelEs: "Crédito de Servicio de Aguas Pluviales",
  },
  { href: "/services", label: "All Services", labelEs: "Todos los Servicios" },
];

export const footerResourceLinks: NavLink[] = [
  { href: "/notices", label: "Public Notices", labelEs: "Avisos Públicos" },
  { href: "/meetings", label: "Meeting Agendas and Minutes", labelEs: "Agendas y Actas de Reuniones" },
  { href: "/forms", label: "Forms and Applications", labelEs: "Formularios y Solicitudes" },
  { href: "/public-records", label: "Public Records Request", labelEs: "Solicitud de Registros Públicos" },
  { href: "/accessibility", label: "Accessibility Statement", labelEs: "Declaración de Accesibilidad" },
  { href: "/contact", label: "Department Directory", labelEs: "Directorio de Departamentos" },
  { href: "/notices", label: "Bid and RFP Postings", labelEs: "Licitaciones y Solicitudes de Propuestas" },
  { href: "/meetings", label: "City Council", labelEs: "Concejo Municipal" },
];

export interface QuickAction {
  href: string;
  icon: string;
  label: string;
  labelEs: string;
}

export const quickActions: QuickAction[] = [
  {
    href: "/services/water-sewer",
    icon: "credit-card",
    label: "Pay a Utility Bill",
    labelEs: "Pagar Factura de Servicios",
  },
  {
    href: "/services/streets-sidewalks",
    icon: "construction",
    label: "Report a Pothole",
    labelEs: "Reportar un Bache",
  },
  {
    href: "/services/building-permits",
    icon: "file-check-2",
    label: "Request a Permit",
    labelEs: "Solicitar un Permiso",
  },
  {
    href: "/services/waste-recycling",
    icon: "trash-2",
    label: "View Trash Schedule",
    labelEs: "Ver Horario de Recolección",
  },
  {
    href: "/public-records",
    icon: "folder-search",
    label: "Submit a Public Records Request",
    labelEs: "Solicitar Registros Públicos",
  },
  {
    href: "/meetings",
    icon: "calendar-days",
    label: "Find a Meeting Agenda",
    labelEs: "Buscar Agenda de Reunión",
  },
  {
    href: "/services/streets-sidewalks",
    icon: "lightbulb",
    label: "Report a Streetlight Outage",
    labelEs: "Reportar Luz de Calle Apagada",
  },
  {
    href: "/services/streets-sidewalks",
    icon: "signpost",
    label: "Apply for an Encroachment Permit",
    labelEs: "Solicitar Permiso de Invasión",
  },
];
