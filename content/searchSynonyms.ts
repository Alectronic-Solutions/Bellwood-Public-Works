// Words residents type that the content phrases differently. Each group is treated as
// interchangeable by site search, so "trash" finds the Waste and Recycling Collection
// page even though no page uses that word. Entries are lowercase and unaccented.
export const searchSynonyms: string[][] = [
  ["trash", "garbage", "waste", "refuse", "rubbish"],
  ["recycling", "recycle", "recyclables"],
  ["bill", "billing", "payment", "pay"],
  ["pothole", "potholes", "pavement"],
  ["streetlight", "streetlights", "outage"],
  // Not "ice": search matches substrings, so it would match "service" and "notice".
  ["snow", "plow", "plowing"],
  ["leaf", "leaves", "yard"],
  ["job", "jobs", "employment"],
  ["basura", "desechos", "residuos"],
  ["factura", "facturacion", "pago"],
  ["bache", "baches", "pavimento"],
  ["nieve", "hielo", "quitanieves"],
];
