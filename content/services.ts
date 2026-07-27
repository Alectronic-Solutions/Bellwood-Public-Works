import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "water-sewer",
    name: "Water and Sewer Services",
    category: "Utilities",
    summary: "Start, stop, or transfer water service, and report water quality or sewer backup concerns.",
    description:
      "The Water and Sewer Division maintains Bellwood's drinking water and wastewater systems. Residents can open a new account, schedule a final read when moving, request a water quality test, or report a sewer backup. Emergency line breaks are addressed within four hours of the initial report.",
    icon: "droplets",
    whoItAppliesTo:
      "Any residential or commercial property owner or tenant within Bellwood city limits who needs to open, close, or transfer a water and sewer account, or who has a concern about water quality or sewer service.",
    howToApply:
      "Submit the New Water Service Application along with proof of residency or ownership. New accounts are typically activated within two business days. Existing customers can request a final read online or by phone at least three business days before moving.",
    relatedFormIds: ["water-service-application", "water-service-transfer", "final-read-request"],
    photo: "/images/services/water-treatment-1.jpg",
    photoAlt: "Close-up of stainless steel water treatment pipes, valves, and fittings at a treatment facility",
    contactPhone: "(555) 011-2200",
    contactEmail: "waterservices@bellwoodpublicworks.example",
    es: {
      name: "Servicios de Agua y Alcantarillado",
      category: "Servicios Públicos",
      summary:
        "Inicie, suspenda o transfiera el servicio de agua, y reporte inquietudes sobre la calidad del agua o retrocesos de alcantarillado.",
      description:
        "La División de Agua y Alcantarillado mantiene los sistemas de agua potable y aguas residuales de Bellwood. Los residentes pueden abrir una cuenta nueva, programar una lectura final al mudarse, solicitar una prueba de calidad del agua o reportar un retroceso de alcantarillado. Las roturas de línea de emergencia se atienden dentro de las cuatro horas siguientes al reporte inicial.",
      whoItAppliesTo:
        "Cualquier propietario o inquilino de una propiedad residencial o comercial dentro de los límites de la ciudad de Bellwood que necesite abrir, cerrar o transferir una cuenta de agua y alcantarillado, o que tenga una inquietud sobre la calidad del agua o el servicio de alcantarillado.",
      howToApply:
        "Presente la Solicitud de Nuevo Servicio de Agua junto con comprobante de residencia o propiedad. Las cuentas nuevas generalmente se activan dentro de dos días hábiles. Los clientes existentes pueden solicitar una lectura final en línea o por teléfono al menos tres días hábiles antes de mudarse.",
    },
  },
  {
    slug: "water-quality-testing",
    name: "Water Quality Testing and Reporting",
    category: "Utilities",
    summary: "Request a water quality test, review annual water quality reports, or report discolored water.",
    description:
      "Bellwood tests drinking water quality daily at treatment facilities and monthly at points throughout the distribution system, publishing results in an annual Consumer Confidence Report. Residents who notice discoloration, unusual taste, or odor can request a free residential water sample test.",
    icon: "flask-conical",
    whoItAppliesTo:
      "Residents and business owners with a concern about tap water quality, and anyone requesting a copy of the annual water quality report.",
    howToApply:
      "Submit the Water Quality Complaint Form to request a sample test at your address. Annual Consumer Confidence Reports are published each spring and available on request from the Water and Sewer Division.",
    relatedFormIds: ["water-quality-complaint"],
    photo: "/images/services/water-treatment-1.jpg",
    photoAlt: "Close-up of stainless steel water treatment pipes, valves, and fittings at a treatment facility",
    contactPhone: "(555) 011-2200",
    contactEmail: "waterservices@bellwoodpublicworks.example",
    es: {
      name: "Pruebas y Reportes de Calidad del Agua",
      category: "Servicios Públicos",
      summary:
        "Solicite una prueba de calidad del agua, revise los informes anuales de calidad del agua o reporte agua decolorada.",
      description:
        "Bellwood analiza la calidad del agua potable diariamente en las plantas de tratamiento y mensualmente en puntos de todo el sistema de distribución, publicando los resultados en un Informe Anual de Confianza del Consumidor. Los residentes que noten decoloración, sabor u olor inusual pueden solicitar una prueba gratuita de muestra residencial.",
      whoItAppliesTo:
        "Residentes y propietarios de negocios con una inquietud sobre la calidad del agua del grifo, y cualquier persona que solicite una copia del informe anual de calidad del agua.",
      howToApply:
        "Presente el Formulario de Queja por Calidad del Agua para solicitar una prueba de muestra en su dirección. Los Informes Anuales de Confianza del Consumidor se publican cada primavera y están disponibles a solicitud de la División de Agua y Alcantarillado.",
    },
  },
  {
    slug: "backflow-prevention",
    name: "Backflow Prevention Program",
    category: "Utilities",
    summary: "Register a backflow prevention device and submit required annual test reports.",
    description:
      "Commercial properties and certain residential irrigation systems are required to install a backflow prevention device to protect the public water supply from contamination. Device owners must have the device tested annually by a licensed tester and submit results to the Water and Sewer Division.",
    icon: "shield-check",
    whoItAppliesTo:
      "Commercial property owners, and residential property owners with an irrigation system connected to the municipal water supply.",
    howToApply:
      "New devices must be registered with the Water and Sewer Division before use. Licensed testers submit the Backflow Prevention Device Test Report annually on the property owner's behalf.",
    relatedFormIds: ["backflow-prevention-test-report"],
    photo: "/images/services/water-treatment-1.jpg",
    photoAlt: "Close-up of stainless steel water treatment pipes, valves, and fittings at a treatment facility",
    contactPhone: "(555) 011-2200",
    contactEmail: "waterservices@bellwoodpublicworks.example",
    es: {
      name: "Programa de Prevención de Retroflujo",
      category: "Servicios Públicos",
      summary:
        "Registre un dispositivo de prevención de retroflujo y presente los informes de prueba anuales requeridos.",
      description:
        "Las propiedades comerciales y ciertos sistemas de riego residenciales deben instalar un dispositivo de prevención de retroflujo para proteger el suministro público de agua de la contaminación. Los propietarios de dispositivos deben hacerlos probar anualmente por un probador licenciado y presentar los resultados a la División de Agua y Alcantarillado.",
      whoItAppliesTo:
        "Propietarios de propiedades comerciales, y propietarios residenciales con un sistema de riego conectado al suministro municipal de agua.",
      howToApply:
        "Los dispositivos nuevos deben registrarse en la División de Agua y Alcantarillado antes de su uso. Los probadores licenciados presentan el Informe de Prueba de Dispositivo de Prevención de Retroflujo anualmente en nombre del propietario.",
    },
  },
  {
    slug: "streets-sidewalks",
    name: "Streets and Sidewalks",
    category: "Infrastructure",
    summary: "Report potholes, cracked sidewalks, faded crosswalks, or request a traffic study.",
    description:
      "The Streets Division repairs roughly 240 miles of city streets and 90 miles of sidewalk. Use the online reporting form to flag potholes, sidewalk trip hazards, faded lane markings, or malfunctioning traffic signals. Routine repaving is scheduled each spring based on the pavement condition survey.",
    icon: "road",
    whoItAppliesTo:
      "Residents, businesses, and property owners who want to report a street or sidewalk hazard, or who are planning excavation or utility work within a public right-of-way.",
    howToApply:
      "Submit the General Service Request Form to report a hazard. Excavation or utility work within a street or sidewalk right-of-way requires a Right-of-Way Work Permit approved before work begins.",
    relatedFormIds: ["service-request-form", "right-of-way-permit"],
    photo: "/images/services/road-crew-3.jpg",
    photoAlt: "A Streets Division worker in a hard hat and safety vest operating an asphalt paving machine at night",
    contactPhone: "(555) 011-2210",
    contactEmail: "streets@bellwoodpublicworks.example",
    es: {
      name: "Calles y Aceras",
      category: "Infraestructura",
      summary: "Reporte baches, aceras agrietadas, cruces peatonales desgastados, o solicite un estudio de tráfico.",
      description:
        "La División de Calles repara aproximadamente 240 millas de calles y 90 millas de aceras de la ciudad. Use el formulario de reporte en línea para señalar baches, riesgos de tropiezo en aceras, marcas de carril desgastadas o semáforos que funcionan mal. La repavimentación rutinaria se programa cada primavera según la encuesta de condición del pavimento.",
      whoItAppliesTo:
        "Residentes, empresas y propietarios que deseen reportar un riesgo en una calle o acera, o que estén planeando excavación o trabajos de servicios públicos dentro de un derecho de vía público.",
      howToApply:
        "Presente el Formulario General de Solicitud de Servicio para reportar un riesgo. Los trabajos de excavación o de servicios públicos dentro de un derecho de vía de calle o acera requieren un Permiso de Trabajo en Derecho de Vía aprobado antes de comenzar el trabajo.",
    },
  },
  {
    slug: "traffic-signals-signs",
    name: "Traffic Signals and Signage",
    category: "Infrastructure",
    summary: "Report a malfunctioning traffic signal, request a stop sign study, or report a missing street sign.",
    description:
      "The Streets Division maintains traffic signals, stop signs, and street name signage citywide. Requests for new stop signs or traffic calming measures are evaluated through a formal traffic study process that considers crash history, traffic volume, and sightlines.",
    icon: "signpost",
    whoItAppliesTo:
      "Residents and neighborhood associations concerned about traffic safety at a specific intersection, and anyone reporting a damaged or missing sign or malfunctioning signal.",
    howToApply:
      "Submit the General Service Request Form to report a malfunctioning signal or missing sign. Requests for a new stop sign or traffic calming measure require a written request to the Streets Division describing the location and concern.",
    relatedFormIds: ["service-request-form"],
    photo: "/images/services/road-crew-1.jpg",
    photoAlt: "A city worker installing a street sign at an intersection using a bucket truck",
    contactPhone: "(555) 011-2210",
    contactEmail: "streets@bellwoodpublicworks.example",
    es: {
      name: "Semáforos y Señalización",
      category: "Infraestructura",
      summary:
        "Reporte un semáforo que no funciona, solicite un estudio para una señal de alto o reporte una señal de calle faltante.",
      description:
        "La División de Calles mantiene semáforos, señales de alto y señalización de nombres de calles en toda la ciudad. Las solicitudes de nuevas señales de alto o medidas de calmado de tráfico se evalúan mediante un proceso formal de estudio de tráfico que considera el historial de choques, el volumen de tráfico y las líneas de visión.",
      whoItAppliesTo:
        "Residentes y asociaciones de vecinos preocupados por la seguridad del tráfico en una intersección específica, y cualquier persona que reporte una señal dañada o faltante o un semáforo que no funciona.",
      howToApply:
        "Presente el Formulario General de Solicitud de Servicio para reportar un semáforo que no funciona o una señal faltante. Las solicitudes de una nueva señal de alto o medida de calmado de tráfico requieren una solicitud por escrito a la División de Calles describiendo la ubicación y la inquietud.",
    },
  },
  {
    slug: "sidewalk-ada-ramps",
    name: "Sidewalk and ADA Ramp Program",
    category: "Infrastructure",
    summary: "Track the city's sidewalk gap and curb ramp program, and request an accessibility assessment.",
    description:
      "Bellwood is completing a multi-year program to close sidewalk gaps and bring curb ramps into compliance with the Americans with Disabilities Act. Priority locations are selected based on proximity to schools, transit stops, and medical facilities. Residents can request an assessment of a specific corner or block.",
    icon: "accessibility",
    whoItAppliesTo:
      "Residents with mobility, vision, or other accessibility needs affected by a missing curb ramp or sidewalk gap, and anyone requesting the program's project schedule.",
    howToApply:
      "Submit the General Service Request Form describing the location and the accessibility concern. Locations are added to the multi-year improvement schedule based on need and available funding.",
    relatedFormIds: ["service-request-form"],
    photo: "/images/services/road-crew-1.jpg",
    photoAlt: "A city worker installing a street sign at an intersection using a bucket truck",
    contactPhone: "(555) 011-2210",
    contactEmail: "streets@bellwoodpublicworks.example",
    es: {
      name: "Programa de Aceras y Rampas ADA",
      category: "Infraestructura",
      summary:
        "Consulte el programa de brechas de aceras y rampas de acera de la ciudad, y solicite una evaluación de accesibilidad.",
      description:
        "Bellwood está completando un programa plurianual para cerrar brechas de aceras y poner las rampas de acera en cumplimiento con la Ley de Estadounidenses con Discapacidades. Las ubicaciones prioritarias se seleccionan según la proximidad a escuelas, paradas de tránsito e instalaciones médicas. Los residentes pueden solicitar una evaluación de una esquina o cuadra específica.",
      whoItAppliesTo:
        "Residentes con necesidades de movilidad, visión u otras necesidades de accesibilidad afectados por una rampa de acera faltante o una brecha en la acera, y cualquier persona que solicite el calendario del proyecto del programa.",
      howToApply:
        "Presente el Formulario General de Solicitud de Servicio describiendo la ubicación y la inquietud de accesibilidad. Las ubicaciones se agregan al calendario de mejoras plurianual según la necesidad y el financiamiento disponible.",
    },
  },
  {
    slug: "building-permits",
    name: "Building Permits and Inspections",
    category: "Permitting",
    summary: "Apply for residential and commercial building permits, and schedule required inspections.",
    description:
      "Most renovation, addition, and new construction projects require a permit before work begins. The permitting office reviews applications within ten business days for residential projects and fifteen business days for commercial projects. Inspections can be scheduled online once a permit is issued.",
    icon: "hammer",
    whoItAppliesTo:
      "Homeowners, contractors, and commercial property owners planning new construction, additions, accessory structures, or renovations that affect structural, electrical, or plumbing systems.",
    howToApply:
      "Submit the Residential or Commercial Building Permit Application with site plans and project details. Once approved, schedule required inspections online at each stage of construction.",
    relatedFormIds: ["residential-building-permit", "commercial-building-permit"],
    photo: "/images/services/construction-1.jpg",
    photoAlt:
      "A building inspector reviewing architectural drawings and marking up a site plan with a pencil and ruler",
    contactPhone: "(555) 011-2220",
    contactEmail: "permits@bellwoodpublicworks.example",
    es: {
      name: "Permisos de Construcción e Inspecciones",
      category: "Permisos",
      summary: "Solicite permisos de construcción residenciales y comerciales, y programe las inspecciones requeridas.",
      description:
        "La mayoría de los proyectos de renovación, ampliación y nueva construcción requieren un permiso antes de comenzar el trabajo. La oficina de permisos revisa las solicitudes dentro de diez días hábiles para proyectos residenciales y quince días hábiles para proyectos comerciales. Las inspecciones se pueden programar en línea una vez emitido el permiso.",
      whoItAppliesTo:
        "Propietarios de vivienda, contratistas y propietarios de propiedades comerciales que planean nueva construcción, ampliaciones, estructuras accesorias o renovaciones que afecten sistemas estructurales, eléctricos o de plomería.",
      howToApply:
        "Presente la Solicitud de Permiso de Construcción Residencial o Comercial con los planos del sitio y los detalles del proyecto. Una vez aprobada, programe las inspecciones requeridas en línea en cada etapa de la construcción.",
    },
  },
  {
    slug: "demolition-permits",
    name: "Demolition Permits",
    category: "Permitting",
    summary:
      "Apply for a demolition permit before removing a structure, and learn about required utility disconnections.",
    description:
      "A demolition permit is required before any structure, or a significant portion of one, is removed. Applicants must show that water, sewer, and gas service have been properly disconnected and capped before demolition begins, and that any asbestos survey requirements have been met.",
    icon: "hard-hat",
    whoItAppliesTo:
      "Property owners and licensed contractors planning to demolish a residential or commercial structure within city limits.",
    howToApply:
      "Submit the Demolition Permit Application along with proof of utility disconnection and any required environmental documentation. Permits are typically reviewed within five business days.",
    relatedFormIds: ["demolition-permit"],
    photo: "/images/services/construction-1.jpg",
    photoAlt:
      "A building inspector reviewing architectural drawings and marking up a site plan with a pencil and ruler",
    contactPhone: "(555) 011-2220",
    contactEmail: "permits@bellwoodpublicworks.example",
    es: {
      name: "Permisos de Demolición",
      category: "Permisos",
      summary:
        "Solicite un permiso de demolición antes de remover una estructura, y conozca los requisitos de desconexión de servicios.",
      description:
        "Se requiere un permiso de demolición antes de remover cualquier estructura, o una parte significativa de ella. Los solicitantes deben demostrar que los servicios de agua, alcantarillado y gas han sido debidamente desconectados y sellados antes de comenzar la demolición, y que se han cumplido los requisitos de estudio de asbesto.",
      whoItAppliesTo:
        "Propietarios y contratistas licenciados que planean demoler una estructura residencial o comercial dentro de los límites de la ciudad.",
      howToApply:
        "Presente la Solicitud de Permiso de Demolición junto con comprobante de desconexión de servicios y cualquier documentación ambiental requerida. Los permisos generalmente se revisan dentro de cinco días hábiles.",
    },
  },
  {
    slug: "zoning-variances",
    name: "Zoning and Variance Review",
    category: "Permitting",
    summary: "Apply for a zoning variance, request a rezoning, or check the zoning classification of a property.",
    description:
      "The Planning Office reviews applications for variances from setback, height, and lot coverage standards, as well as rezoning requests. Both processes require review by the Planning Commission and, for rezoning, final approval by City Council following a public hearing.",
    icon: "map",
    whoItAppliesTo:
      "Property owners seeking relief from a specific zoning requirement, or seeking to change the zoning classification of a parcel.",
    howToApply:
      "Submit the Zoning Variance Application or Rezoning Application with a site plan and a written statement of justification. Applications are scheduled for the next available Planning Commission meeting with sufficient notice.",
    relatedFormIds: ["variance-application", "rezoning-application"],
    photo: "/images/services/construction-1.jpg",
    photoAlt:
      "A building inspector reviewing architectural drawings and marking up a site plan with a pencil and ruler",
    contactPhone: "(555) 011-2220",
    contactEmail: "permits@bellwoodpublicworks.example",
    es: {
      name: "Revisión de Zonificación y Variancias",
      category: "Permisos",
      summary:
        "Solicite una variancia de zonificación, solicite una recalificación o consulte la clasificación de zonificación de una propiedad.",
      description:
        "La Oficina de Planificación revisa las solicitudes de variancias a los estándares de retiro, altura y cobertura de lote, así como las solicitudes de recalificación. Ambos procesos requieren revisión por la Comisión de Planificación y, para la recalificación, aprobación final del Concejo Municipal tras una audiencia pública.",
      whoItAppliesTo:
        "Propietarios que buscan una excepción a un requisito de zonificación específico, o que buscan cambiar la clasificación de zonificación de una parcela.",
      howToApply:
        "Presente la Solicitud de Variancia de Zonificación o la Solicitud de Recalificación con un plano del sitio y una declaración escrita de justificación. Las solicitudes se programan para la próxima reunión disponible de la Comisión de Planificación con suficiente aviso.",
    },
  },
  {
    slug: "right-of-way-encroachment",
    name: "Right-of-Way and Encroachment Permits",
    category: "Permitting",
    summary: "Apply for a driveway apron, sign, or encroachment permit affecting the public right-of-way.",
    description:
      "Any structure, driveway, or landscaping feature that extends into the public right-of-way requires review and approval. This includes new driveway aprons, retaining walls near the property line, and commercial signage visible from the street.",
    icon: "signpost",
    whoItAppliesTo:
      "Property owners and contractors planning a driveway apron, commercial sign, fence, or other feature that may extend into the public right-of-way.",
    howToApply:
      "Submit the Driveway Apron Permit, Sign Permit, or Right-of-Way Encroachment Permit application depending on the type of work. A site sketch showing the right-of-way line is required with all applications.",
    relatedFormIds: ["driveway-apron-permit", "encroachment-permit", "sign-permit-application"],
    photo: "/images/services/road-crew-3.jpg",
    photoAlt: "A Streets Division worker in a hard hat and safety vest operating an asphalt paving machine at night",
    contactPhone: "(555) 011-2220",
    contactEmail: "permits@bellwoodpublicworks.example",
    es: {
      name: "Permisos de Derecho de Vía e Invasión",
      category: "Permisos",
      summary: "Solicite un permiso de entrada de vehículos, letrero o invasión que afecte el derecho de vía público.",
      description:
        "Cualquier estructura, entrada de vehículos o elemento de jardinería que se extienda hacia el derecho de vía público requiere revisión y aprobación. Esto incluye nuevas entradas de vehículos, muros de contención cerca del límite de la propiedad y señalización comercial visible desde la calle.",
      whoItAppliesTo:
        "Propietarios y contratistas que planean una entrada de vehículos, letrero comercial, cerca u otro elemento que pueda extenderse hacia el derecho de vía público.",
      howToApply:
        "Presente la solicitud de Permiso de Entrada de Vehículos, Permiso de Letrero o Permiso de Invasión del Derecho de Vía según el tipo de trabajo. Se requiere un boceto del sitio que muestre la línea del derecho de vía con todas las solicitudes.",
    },
  },
  {
    slug: "waste-recycling",
    name: "Waste and Recycling Collection",
    category: "Sanitation",
    summary: "Find your collection day, order bins, and learn what belongs in each cart.",
    description:
      "Curbside collection runs weekly for household waste and every other week for recycling and yard waste. Enter your address on the collection calendar to find your pickup day. Bulk item pickup for furniture and appliances requires a scheduled appointment.",
    icon: "recycle",
    whoItAppliesTo:
      "All residential households within Bellwood city limits receiving curbside waste and recycling service.",
    howToApply:
      "New residents can request a collection bin using the General Service Request Form. Bulk item pickup requires a scheduled appointment made at least three business days in advance.",
    relatedFormIds: ["service-request-form"],
    photo: "/images/services/recycling-1.jpg",
    photoAlt: "Four color-coded curbside collection bins, yellow, blue, red, and green, lined up along a sidewalk",
    contactPhone: "(555) 011-2230",
    contactEmail: "sanitation@bellwoodpublicworks.example",
    es: {
      name: "Recolección de Basura y Reciclaje",
      category: "Saneamiento",
      summary: "Consulte su día de recolección, solicite contenedores y conozca qué corresponde a cada carrito.",
      description:
        "La recolección en la acera se realiza semanalmente para residuos domésticos y cada dos semanas para reciclaje y desechos de jardín. Ingrese su dirección en el calendario de recolección para conocer su día de recolección. La recolección de artículos voluminosos como muebles y electrodomésticos requiere una cita programada.",
      whoItAppliesTo:
        "Todos los hogares residenciales dentro de los límites de la ciudad de Bellwood que reciben servicio de recolección de basura y reciclaje en la acera.",
      howToApply:
        "Los nuevos residentes pueden solicitar un contenedor de recolección usando el Formulario General de Solicitud de Servicio. La recolección de artículos voluminosos requiere una cita programada con al menos tres días hábiles de anticipación.",
    },
  },
  {
    slug: "yard-waste-leaf-collection",
    name: "Yard Waste and Leaf Collection",
    category: "Sanitation",
    summary: "Check the seasonal yard waste calendar and loose leaf collection schedule for your district.",
    description:
      "Bundled brush and bagged yard waste are collected on a biweekly schedule from spring through late fall. A separate loose leaf collection program runs on a rotating district schedule each autumn, with leaves raked to the curb rather than bagged.",
    icon: "leaf",
    whoItAppliesTo:
      "Residential households within Bellwood city limits generating yard waste or fall leaves for curbside collection.",
    howToApply:
      "No application is required. Check the seasonal collection calendar for your district's leaf collection week, and set out bundled brush or bagged yard waste on your regular collection day.",
    relatedFormIds: ["service-request-form"],
    photo: "/images/services/recycling-1.jpg",
    photoAlt: "Four color-coded curbside collection bins, yellow, blue, red, and green, lined up along a sidewalk",
    contactPhone: "(555) 011-2230",
    contactEmail: "sanitation@bellwoodpublicworks.example",
    es: {
      name: "Recolección de Desechos de Jardín y Hojas",
      category: "Saneamiento",
      summary:
        "Consulte el calendario estacional de desechos de jardín y el calendario de recolección de hojas sueltas de su distrito.",
      description:
        "Las ramas atadas y los desechos de jardín embolsados se recolectan según un calendario quincenal desde la primavera hasta finales del otoño. Un programa separado de recolección de hojas sueltas funciona según un calendario rotativo por distrito cada otoño, con las hojas rastrilladas hacia la acera en lugar de embolsadas.",
      whoItAppliesTo:
        "Hogares residenciales dentro de los límites de la ciudad de Bellwood que generan desechos de jardín u hojas de otoño para recolección en la acera.",
      howToApply:
        "No se requiere solicitud. Consulte el calendario de recolección estacional para conocer la semana de recolección de hojas de su distrito, y coloque las ramas atadas o los desechos de jardín embolsados en su día regular de recolección.",
    },
  },
  {
    slug: "illegal-dumping",
    name: "Illegal Dumping Enforcement",
    category: "Sanitation",
    summary: "Report illegal dumping on public property, along waterways, or in storm drains.",
    description:
      "Illegal dumping of furniture, construction debris, tires, or hazardous materials on public property or into waterways is investigated by the Sanitation Division in coordination with code enforcement. Reports can include photos and a description of the material and location.",
    icon: "trash-2",
    whoItAppliesTo:
      "Residents who observe illegal dumping on public land, along Willow Creek or other waterways, or in a storm drain.",
    howToApply:
      "Submit the Illegal Dumping Report Form with the location and, if possible, photos of the material. Reports involving hazardous materials are forwarded to the appropriate environmental response agency.",
    relatedFormIds: ["illegal-dumping-report"],
    photo: "/images/services/recycling-1.jpg",
    photoAlt: "Four color-coded curbside collection bins, yellow, blue, red, and green, lined up along a sidewalk",
    contactPhone: "(555) 011-2230",
    contactEmail: "sanitation@bellwoodpublicworks.example",
    es: {
      name: "Aplicación contra el Vertido Ilegal",
      category: "Saneamiento",
      summary: "Reporte vertido ilegal en propiedad pública, a lo largo de vías fluviales o en drenajes pluviales.",
      description:
        "El vertido ilegal de muebles, escombros de construcción, neumáticos o materiales peligrosos en propiedad pública o en vías fluviales es investigado por la División de Saneamiento en coordinación con el cumplimiento del código. Los reportes pueden incluir fotos y una descripción del material y la ubicación.",
      whoItAppliesTo:
        "Residentes que observen vertido ilegal en tierras públicas, a lo largo de Willow Creek u otras vías fluviales, o en un drenaje pluvial.",
      howToApply:
        "Presente el Formulario de Reporte de Vertido Ilegal con la ubicación y, si es posible, fotos del material. Los reportes que involucren materiales peligrosos se remiten a la agencia de respuesta ambiental correspondiente.",
    },
  },
  {
    slug: "parks-recreation",
    name: "Parks and Recreation",
    category: "Community",
    summary: "Reserve a park pavilion, register for recreation programs, or report park maintenance needs.",
    description:
      "Bellwood maintains 18 public parks, three community centers, and a network of walking trails. Pavilion and athletic field reservations open ninety days in advance. Seasonal recreation programs for youth and adults are posted each quarter.",
    icon: "trees",
    whoItAppliesTo:
      "Residents and community organizations who want to reserve a pavilion or athletic field, register for a recreation program, or report a maintenance issue in a city park.",
    howToApply:
      "Submit the Park Pavilion Reservation Form up to ninety days before your event. Recreation program registration opens online each quarter when the seasonal schedule is posted.",
    relatedFormIds: ["pavilion-reservation", "recreation-program-registration"],
    photo: "/images/services/park-1.jpg",
    photoAlt: "A tree-lined path through a city park with a bench along the walkway",
    contactPhone: "(555) 011-2240",
    contactEmail: "parks@bellwoodpublicworks.example",
    es: {
      name: "Parques y Recreación",
      category: "Comunidad",
      summary:
        "Reserve un pabellón de parque, inscríbase en programas recreativos o reporte necesidades de mantenimiento de parques.",
      description:
        "Bellwood mantiene 18 parques públicos, tres centros comunitarios y una red de senderos para caminar. Las reservas de pabellones y campos deportivos abren con noventa días de anticipación. Los programas recreativos de temporada para jóvenes y adultos se publican cada trimestre.",
      whoItAppliesTo:
        "Residentes y organizaciones comunitarias que deseen reservar un pabellón o campo deportivo, inscribirse en un programa recreativo o reportar un problema de mantenimiento en un parque de la ciudad.",
      howToApply:
        "Presente el Formulario de Reserva de Pabellón de Parque hasta noventa días antes de su evento. La inscripción a programas recreativos abre en línea cada trimestre cuando se publica el calendario de temporada.",
    },
  },
  {
    slug: "hazardous-tree-removal",
    name: "Hazardous Tree Removal",
    category: "Community",
    summary: "Report a hazardous, diseased, or fallen tree on public property or a city right-of-way.",
    description:
      "The Parks and Recreation Division manages roughly 6,000 street and park trees citywide. Trees that are dead, diseased, storm-damaged, or that pose a hazard to pedestrians or traffic are prioritized for removal or trimming based on the severity of the risk.",
    icon: "trees",
    whoItAppliesTo:
      "Residents reporting a hazardous or fallen tree on public property, a park, or a street right-of-way.",
    howToApply:
      "Submit the Hazardous Tree Report Form with the location and a description of the concern. Trees on private property are the responsibility of the property owner and are not addressed through this program.",
    relatedFormIds: ["tree-hazard-report"],
    photo: "/images/services/park-1.jpg",
    photoAlt: "A tree-lined path through a city park with a bench along the walkway",
    contactPhone: "(555) 011-2240",
    contactEmail: "parks@bellwoodpublicworks.example",
    es: {
      name: "Remoción de Árboles Peligrosos",
      category: "Comunidad",
      summary: "Reporte un árbol peligroso, enfermo o caído en propiedad pública o un derecho de vía de la ciudad.",
      description:
        "La División de Parques y Recreación gestiona aproximadamente 6,000 árboles de calle y de parque en toda la ciudad. Los árboles muertos, enfermos, dañados por tormentas o que representen un peligro para peatones o tráfico se priorizan para su remoción o poda según la gravedad del riesgo.",
      whoItAppliesTo:
        "Residentes que reporten un árbol peligroso o caído en propiedad pública, un parque o un derecho de vía de calle.",
      howToApply:
        "Presente el Formulario de Reporte de Árbol Peligroso con la ubicación y una descripción de la inquietud. Los árboles en propiedad privada son responsabilidad del propietario y no se atienden mediante este programa.",
    },
  },
  {
    slug: "snow-removal",
    name: "Snow and Ice Removal",
    category: "Seasonal Services",
    summary: "Check plow routes, snow emergency rules, and sidewalk clearing requirements.",
    description:
      "During winter storms, priority routes serving hospitals, schools, and main corridors are plowed first, followed by residential streets. Property owners are responsible for clearing sidewalks within 24 hours of a snowfall ending. Sign up for snow emergency alerts to be notified when parking restrictions are in effect.",
    icon: "snowflake",
    whoItAppliesTo:
      "All Bellwood property owners, especially those responsible for sidewalk clearing along their property, and residents who park on streets subject to snow emergency restrictions.",
    howToApply:
      "No application is required. To report an unplowed priority route or an uncleared sidewalk, submit the General Service Request Form.",
    relatedFormIds: ["service-request-form"],
    photo: "/images/services/snow-1.jpg",
    photoAlt: "A city snow plow truck clearing a residential street after a snowfall, with a car following behind",
    contactPhone: "(555) 011-2250",
    contactEmail: "streets@bellwoodpublicworks.example",
    es: {
      name: "Remoción de Nieve y Hielo",
      category: "Servicios de Temporada",
      summary:
        "Consulte las rutas de las quitanieves, las reglas de emergencia por nieve y los requisitos de limpieza de aceras.",
      description:
        "Durante las tormentas invernales, las rutas prioritarias que sirven a hospitales, escuelas y corredores principales se despejan primero, seguidas de las calles residenciales. Los propietarios son responsables de limpiar las aceras dentro de las 24 horas posteriores al fin de la nevada. Inscríbase para recibir alertas de emergencia por nieve y ser notificado cuando estén vigentes las restricciones de estacionamiento.",
      whoItAppliesTo:
        "Todos los propietarios de Bellwood, especialmente los responsables de limpiar las aceras a lo largo de su propiedad, y los residentes que estacionan en calles sujetas a restricciones de emergencia por nieve.",
      howToApply:
        "No se requiere solicitud. Para reportar una ruta prioritaria sin despejar o una acera sin limpiar, presente el Formulario General de Solicitud de Servicio.",
    },
  },
  {
    slug: "stormwater",
    name: "Stormwater Management",
    category: "Infrastructure",
    summary: "Report flooding, clogged storm drains, or apply for a stormwater utility credit.",
    description:
      "The Stormwater Division inspects and maintains storm drains, detention basins, and outfalls across the city. Report localized flooding or a blocked storm drain using the online form. Property owners who install approved stormwater controls may qualify for a reduced utility fee.",
    icon: "cloud-rain",
    whoItAppliesTo:
      "Property owners experiencing localized flooding or a blocked storm drain, and property owners who have installed or plan to install approved on-site stormwater controls.",
    howToApply:
      "Report flooding or a blocked drain using the General Service Request Form. To apply for a reduced utility fee, submit the Stormwater Utility Credit Application with documentation of your approved stormwater controls.",
    relatedFormIds: ["stormwater-credit-application", "service-request-form"],
    photo: "/images/services/storm-drain-1.jpg",
    photoAlt: "A flooded street after heavy rainfall with cars partially submerged and a storm drain overwhelmed",
    contactPhone: "(555) 011-2260",
    contactEmail: "stormwater@bellwoodpublicworks.example",
    es: {
      name: "Gestión de Aguas Pluviales",
      category: "Infraestructura",
      summary:
        "Reporte inundaciones, drenajes pluviales obstruidos, o solicite un crédito en la tarifa de servicio de aguas pluviales.",
      description:
        "La División de Aguas Pluviales inspecciona y mantiene los drenajes pluviales, cuencas de detención y desembocaduras en toda la ciudad. Reporte inundaciones localizadas o un drenaje pluvial obstruido usando el formulario en línea. Los propietarios que instalen controles de aguas pluviales aprobados pueden calificar para una tarifa de servicio reducida.",
      whoItAppliesTo:
        "Propietarios que experimenten inundaciones localizadas o un drenaje pluvial obstruido, y propietarios que hayan instalado o planeen instalar controles de aguas pluviales aprobados en el sitio.",
      howToApply:
        "Reporte inundaciones o un drenaje obstruido usando el Formulario General de Solicitud de Servicio. Para solicitar una tarifa de servicio reducida, presente la Solicitud de Crédito de Servicio de Aguas Pluviales con documentación de sus controles de aguas pluviales aprobados.",
    },
  },
  {
    slug: "utility-billing-assistance",
    name: "Utility Billing and Payment Assistance",
    category: "Utilities",
    summary: "Set up a payment plan, review your utility bill, or ask about assistance programs.",
    description:
      "The Utility Billing Office handles water, sewer, and stormwater billing for all Bellwood accounts. Customers facing financial hardship may request a payment plan for past-due balances, and can review meter reading history and rate schedules online.",
    icon: "credit-card",
    whoItAppliesTo:
      "Residential and commercial utility account holders with a billing question, a past-due balance, or a request for a payment plan.",
    howToApply:
      "Submit the Utility Billing Payment Plan Request with details of your account and current balance. Requests are typically reviewed within five business days.",
    relatedFormIds: ["utility-billing-payment-plan"],
    photo: "/images/services/water-treatment-1.jpg",
    photoAlt: "Close-up of stainless steel water treatment pipes, valves, and fittings at a treatment facility",
    contactPhone: "(555) 011-2200",
    contactEmail: "waterservices@bellwoodpublicworks.example",
    es: {
      name: "Facturación y Asistencia de Pago de Servicios",
      category: "Servicios Públicos",
      summary: "Establezca un plan de pago, revise su factura de servicios o pregunte sobre programas de asistencia.",
      description:
        "La Oficina de Facturación de Servicios gestiona la facturación de agua, alcantarillado y aguas pluviales para todas las cuentas de Bellwood. Los clientes que enfrentan dificultades financieras pueden solicitar un plan de pago para saldos vencidos, y pueden revisar el historial de lecturas del medidor y los cuadros de tarifas en línea.",
      whoItAppliesTo:
        "Titulares de cuentas de servicios residenciales y comerciales con una pregunta de facturación, un saldo vencido o una solicitud de plan de pago.",
      howToApply:
        "Presente la Solicitud de Plan de Pago de Facturación de Servicios con los detalles de su cuenta y saldo actual. Las solicitudes generalmente se revisan dentro de cinco días hábiles.",
    },
  },
];
