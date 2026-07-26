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
    contactPhone: "(555) 011-2200",
    contactEmail: "waterservices@bellwoodpublicworks.example",
  },
  {
    slug: "streets-sidewalks",
    name: "Streets and Sidewalks",
    category: "Infrastructure",
    summary: "Report potholes, cracked sidewalks, faded crosswalks, or request a traffic study.",
    description:
      "The Streets Division repairs roughly 240 miles of city streets and 90 miles of sidewalk. Use the online reporting form to flag potholes, sidewalk trip hazards, faded lane markings, or malfunctioning traffic signals. Routine repaving is scheduled each spring based on the pavement condition survey.",
    icon: "road",
    contactPhone: "(555) 011-2210",
    contactEmail: "streets@bellwoodpublicworks.example",
  },
  {
    slug: "building-permits",
    name: "Building Permits and Inspections",
    category: "Permitting",
    summary: "Apply for residential and commercial building permits, and schedule required inspections.",
    description:
      "Most renovation, addition, and new construction projects require a permit before work begins. The permitting office reviews applications within ten business days for residential projects and fifteen business days for commercial projects. Inspections can be scheduled online once a permit is issued.",
    icon: "hammer",
    contactPhone: "(555) 011-2220",
    contactEmail: "permits@bellwoodpublicworks.example",
  },
  {
    slug: "waste-recycling",
    name: "Waste and Recycling Collection",
    category: "Sanitation",
    summary: "Find your collection day, order bins, and learn what belongs in each cart.",
    description:
      "Curbside collection runs weekly for household waste and every other week for recycling and yard waste. Enter your address on the collection calendar to find your pickup day. Bulk item pickup for furniture and appliances requires a scheduled appointment.",
    icon: "recycle",
    contactPhone: "(555) 011-2230",
    contactEmail: "sanitation@bellwoodpublicworks.example",
  },
  {
    slug: "parks-recreation",
    name: "Parks and Recreation",
    category: "Community",
    summary: "Reserve a park pavilion, register for recreation programs, or report park maintenance needs.",
    description:
      "Bellwood maintains 18 public parks, three community centers, and a network of walking trails. Pavilion and athletic field reservations open ninety days in advance. Seasonal recreation programs for youth and adults are posted each quarter.",
    icon: "trees",
    contactPhone: "(555) 011-2240",
    contactEmail: "parks@bellwoodpublicworks.example",
  },
  {
    slug: "snow-removal",
    name: "Snow and Ice Removal",
    category: "Seasonal Services",
    summary: "Check plow routes, snow emergency rules, and sidewalk clearing requirements.",
    description:
      "During winter storms, priority routes serving hospitals, schools, and main corridors are plowed first, followed by residential streets. Property owners are responsible for clearing sidewalks within 24 hours of a snowfall ending. Sign up for snow emergency alerts to be notified when parking restrictions are in effect.",
    icon: "snowflake",
    contactPhone: "(555) 011-2250",
    contactEmail: "streets@bellwoodpublicworks.example",
  },
  {
    slug: "stormwater",
    name: "Stormwater Management",
    category: "Infrastructure",
    summary: "Report flooding, clogged storm drains, or apply for a stormwater utility credit.",
    description:
      "The Stormwater Division inspects and maintains storm drains, detention basins, and outfalls across the city. Report localized flooding or a blocked storm drain using the online form. Property owners who install approved stormwater controls may qualify for a reduced utility fee.",
    icon: "cloud-rain",
    contactPhone: "(555) 011-2260",
    contactEmail: "stormwater@bellwoodpublicworks.example",
  },
];
