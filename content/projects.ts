import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "bridge-street-resurfacing",
    name: "Bridge Street Resurfacing",
    status: "In Construction",
    division: "Streets Division",
    budget: "$1.4 million",
    timeline: "May 2026 through September 2026",
    description:
      "Full-depth resurfacing of Bridge Street between Oak Avenue and the river crossing, including new pavement markings, updated storm drain grates, and ADA-compliant curb ramps at all intersections along the corridor.",
    es: {
      name: "Repavimentación de la Calle Bridge",
      status: "En Construcción",
      division: "División de Calles",
      description:
        "Repavimentación total de la calle Bridge entre la Avenida Oak y el cruce del río, incluyendo nuevas marcas de pavimento, rejillas de drenaje pluvial actualizadas y rampas de acera conformes con la ADA en todas las intersecciones a lo largo del corredor.",
    },
  },
  {
    id: "oakhill-lift-station-rehabilitation",
    name: "Oakhill Lift Station Rehabilitation",
    status: "Design",
    division: "Water and Sewer Division",
    budget: "$2.1 million",
    timeline: "Design fall 2026, construction spring through fall 2027",
    description:
      "Replacement of aging pumps, motor controls, and electrical systems at the Oakhill sewer lift station, which serves the Oakhill subdivision and surrounding neighborhoods. The project also adds a backup generator to maintain service during power outages.",
    es: {
      name: "Rehabilitación de la Estación de Bombeo de Oakhill",
      status: "Diseño",
      division: "División de Agua y Alcantarillado",
      description:
        "Reemplazo de bombas, controles de motor y sistemas eléctricos deteriorados en la estación de bombeo de alcantarillado de Oakhill, que sirve a la subdivisión Oakhill y los vecindarios circundantes. El proyecto también agrega un generador de respaldo para mantener el servicio durante cortes de energía.",
    },
  },
  {
    id: "eastside-trail-extension-phase-2",
    name: "Eastside Trail Extension, Phase Two",
    status: "In Construction",
    division: "Parks and Recreation",
    budget: "$980,000",
    timeline: "June 2026 through spring 2027",
    description:
      "Extends the Eastside Trail from its current terminus at Birch Street to connect with the Riverside Drive greenway, adding a half mile of paved multi-use path, a pedestrian bridge over Willow Creek, and trailhead signage.",
    es: {
      name: "Extensión del Sendero Eastside, Fase Dos",
      status: "En Construcción",
      division: "Parques y Recreación",
      description:
        "Extiende el sendero Eastside desde su terminal actual en la calle Birch hasta conectar con el corredor verde de Riverside Drive, agregando media milla de camino pavimentado de uso múltiple, un puente peatonal sobre Willow Creek y señalización en la entrada del sendero.",
    },
  },
  {
    id: "willow-creek-drainage-improvements",
    name: "Willow Creek Drainage Improvements",
    status: "Planning",
    division: "Stormwater Division",
    budget: "$3.6 million",
    timeline: "Planning through 2026, construction beginning 2027",
    description:
      "Addresses recurring street flooding in the Southside district through channel widening, a new detention basin near Industrial Parkway, and upsized storm drain piping along the Willow Creek corridor. Currently under review by the Stormwater Advisory Committee.",
    es: {
      name: "Mejoras de Drenaje de Willow Creek",
      status: "Planificación",
      division: "División de Aguas Pluviales",
      description:
        "Aborda las inundaciones recurrentes de calles en el distrito Southside mediante el ensanchamiento del canal, una nueva cuenca de detención cerca de Industrial Parkway y tuberías de drenaje pluvial de mayor capacidad a lo largo del corredor de Willow Creek. Actualmente en revisión por el Comité Asesor de Aguas Pluviales.",
    },
  },
  {
    id: "oak-avenue-sidewalk-ada-ramps",
    name: "Oak Avenue Sidewalk and ADA Ramp Construction",
    status: "Completed",
    division: "Streets Division",
    budget: "$720,000",
    timeline: "April 2025 through February 2026",
    description:
      "Constructed new sidewalk along Oak Avenue between 2nd Avenue and Maple Avenue where none previously existed, and rebuilt eleven corner curb ramps to current ADA standards. Completed under budget and reopened to full pedestrian access ahead of schedule.",
    es: {
      name: "Construcción de Aceras y Rampas ADA en la Avenida Oak",
      status: "Completado",
      division: "División de Calles",
      description:
        "Se construyó una nueva acera a lo largo de la Avenida Oak entre la 2da Avenida y la Avenida Maple donde antes no existía, y se reconstruyeron once rampas de esquina según los estándares actuales de la ADA. Completado por debajo del presupuesto y reabierto para acceso peatonal completo antes de lo previsto.",
    },
  },
  {
    id: "4th-avenue-culvert-replacement",
    name: "4th Avenue Culvert Replacement",
    status: "Completed",
    division: "Stormwater Division",
    budget: "$540,000",
    timeline: "August 2025 through September 2025",
    description:
      "Replaced an undersized, deteriorating stormwater culvert beneath 4th Avenue at the Willow Creek crossing with a larger reinforced concrete box culvert designed to handle a 100-year storm event and reduce upstream flooding.",
    es: {
      name: "Reemplazo de la Alcantarilla de la 4ta Avenida",
      status: "Completado",
      division: "División de Aguas Pluviales",
      description:
        "Se reemplazó una alcantarilla pluvial deteriorada y de tamaño insuficiente debajo de la 4ta Avenida en el cruce de Willow Creek por una alcantarilla de caja de concreto reforzado más grande, diseñada para soportar un evento de tormenta de 100 años y reducir las inundaciones aguas arriba.",
    },
  },
  {
    id: "public-works-annex-solar-retrofit",
    name: "Public Works Annex Solar Retrofit",
    status: "Design",
    division: "Administration",
    budget: "$610,000",
    timeline: "Design winter 2026, installation summer 2027",
    description:
      "Adds a rooftop solar array and battery storage system to the Public Works Annex on Industrial Parkway, projected to offset roughly 60 percent of the facility's annual electricity use and provide backup power during outages for the vehicle fueling depot.",
    es: {
      name: "Renovación Solar del Anexo de Obras Públicas",
      status: "Diseño",
      division: "Administración",
      description:
        "Agrega un sistema solar en el techo y almacenamiento en baterías al Anexo de Obras Públicas en Industrial Parkway, con una proyección de compensar aproximadamente el 60 por ciento del uso eléctrico anual de la instalación y proporcionar energía de respaldo durante cortes para el depósito de combustible de vehículos.",
    },
  },
  {
    id: "citywide-water-meter-upgrade",
    name: "Citywide Water Meter Upgrade",
    status: "Planning",
    division: "Water and Sewer Division",
    budget: "$4.2 million",
    timeline: "Planning through 2026, phased installation 2027 through 2029",
    description:
      "Replaces roughly 11,000 aging mechanical water meters citywide with automated meter infrastructure, allowing remote reading, faster leak detection, and elimination of estimated billing. Funding strategy is under review as part of the multi-year capital plan.",
    es: {
      name: "Actualización de Medidores de Agua en Toda la Ciudad",
      status: "Planificación",
      division: "División de Agua y Alcantarillado",
      description:
        "Reemplaza aproximadamente 11,000 medidores de agua mecánicos deteriorados en toda la ciudad con infraestructura de medición automatizada, permitiendo lectura remota, detección más rápida de fugas y eliminación de la facturación estimada. La estrategia de financiamiento está en revisión como parte del plan de capital plurianual.",
    },
  },
];
