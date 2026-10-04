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
  /** Path prefixes that count as being inside this section, for the current-page marker. */
  matches: string[];
  columns?: NavColumn[];
}

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    labelEs: "Servicios",
    href: "/services",
    matches: ["/services"],
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
    label: "Departments",
    labelEs: "Departamentos",
    href: "/departments",
    matches: ["/departments"],
    columns: [
      {
        heading: "Operating Divisions",
        headingEs: "Divisiones Operativas",
        links: [
          {
            href: "/departments#water-and-sewer-division",
            label: "Water and Sewer Division",
            labelEs: "División de Agua y Alcantarillado",
          },
          { href: "/departments#streets-division", label: "Streets Division", labelEs: "División de Calles" },
          {
            href: "/departments#sanitation-division",
            label: "Sanitation Division",
            labelEs: "División de Saneamiento",
          },
          {
            href: "/departments#stormwater-division",
            label: "Stormwater Division",
            labelEs: "División de Aguas Pluviales",
          },
        ],
      },
      {
        heading: "Community Services",
        headingEs: "Servicios Comunitarios",
        links: [
          {
            href: "/departments#building-permits-and-inspections",
            label: "Building Permits and Inspections",
            labelEs: "Permisos de Construcción e Inspecciones",
          },
          { href: "/departments#parks-and-recreation", label: "Parks and Recreation", labelEs: "Parques y Recreación" },
          {
            href: "/departments#city-clerk-s-office",
            label: "City Clerk's Office",
            labelEs: "Oficina del Secretario Municipal",
          },
        ],
      },
      {
        heading: "Directories",
        headingEs: "Directorios",
        links: [
          { href: "/departments", label: "All Departments", labelEs: "Todos los Departamentos" },
          { href: "/contact#staff-directory-heading", label: "Staff Directory", labelEs: "Directorio de Personal" },
          { href: "/contact", label: "Contact Us", labelEs: "Contáctenos" },
        ],
      },
    ],
  },
  {
    label: "Projects",
    labelEs: "Proyectos",
    href: "/projects",
    matches: ["/projects"],
  },
  {
    label: "Notices",
    labelEs: "Avisos",
    href: "/notices",
    matches: ["/notices"],
  },
  {
    label: "Meetings",
    labelEs: "Reuniones",
    href: "/meetings",
    matches: ["/meetings"],
  },
  {
    label: "Forms",
    labelEs: "Formularios",
    href: "/forms",
    matches: ["/forms"],
  },
  {
    label: "About",
    labelEs: "Acerca de",
    href: "/accessibility",
    matches: ["/accessibility", "/public-records", "/privacy", "/site-map", "/contact"],
    columns: [
      {
        heading: "Government",
        headingEs: "Gobierno",
        links: [
          { href: "/contact", label: "Contact Us", labelEs: "Contáctenos" },
          {
            href: "/public-records",
            label: "Public Records Request",
            labelEs: "Solicitud de Registros Públicos",
          },
          { href: "/meetings", label: "Agendas and Minutes", labelEs: "Agendas y Actas" },
        ],
      },
      {
        heading: "Policies",
        headingEs: "Políticas",
        links: [
          {
            href: "/accessibility",
            label: "Accessibility Statement",
            labelEs: "Declaración de Accesibilidad",
          },
          { href: "/privacy", label: "Privacy Policy", labelEs: "Política de Privacidad" },
          { href: "/site-map", label: "Site Map", labelEs: "Mapa del Sitio" },
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
  {
    href: "/departments#city-clerks-office",
    label: "City Clerk's Office",
    labelEs: "Oficina del Secretario Municipal",
  },
  { href: "/departments", label: "Department Directory", labelEs: "Directorio de Departamentos" },
];

export const footerServiceLinks: NavLink[] = [
  { href: "/services/utility-billing-assistance", label: "Pay a Utility Bill", labelEs: "Pagar Factura de Servicios" },
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
  { href: "/projects", label: "Capital Projects", labelEs: "Proyectos de Capital" },
  // These two used to promise a dedicated bids page and a council page and land on the
  // general notices and meetings lists. The lists are the right destination, so the
  // labels now describe what is actually there.
  { href: "/notices", label: "Public Notices and Bid Solicitations", labelEs: "Avisos Públicos y Licitaciones" },
  { href: "/meetings", label: "Council Meetings and Agendas", labelEs: "Reuniones y Agendas del Concejo" },
];

export interface QuickAction {
  href: string;
  icon: string;
  label: string;
  labelEs: string;
}

export const quickActions: QuickAction[] = [
  {
    href: "/services/utility-billing-assistance",
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
    label: "Apply for a Permit",
    labelEs: "Solicitar un Permiso",
  },
  {
    href: "/services/waste-recycling",
    icon: "trash-2",
    label: "Trash and Recycling Schedule",
    labelEs: "Horario de Basura y Reciclaje",
  },
  {
    href: "/meetings",
    icon: "calendar-days",
    label: "Agendas and Minutes",
    labelEs: "Agendas y Actas",
  },
  {
    href: "/public-records",
    icon: "folder-search",
    label: "Request Public Records",
    labelEs: "Solicitar Registros Públicos",
  },
  {
    href: "/services/snow-removal",
    icon: "snowflake",
    label: "Snow Routes and Plowing",
    labelEs: "Rutas de Nieve y Quitanieves",
  },
  {
    href: "/notices",
    icon: "landmark",
    label: "Bids and Solicitations",
    labelEs: "Licitaciones y Convocatorias",
  },
];
