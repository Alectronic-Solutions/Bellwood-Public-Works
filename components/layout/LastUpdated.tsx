"use client";

import { useLanguage, dateLocale } from "@/lib/i18n";

interface LastUpdatedProps {
  isoDate: string;
}

export function LastUpdated({ isoDate }: LastUpdatedProps) {
  const { strings, language } = useLanguage();
  const formatted = new Date(`${isoDate}T00:00:00`).toLocaleDateString(dateLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className="mt-8 border-t border-gov-border pt-4 text-sm text-gov-slate">
      {strings.lastUpdated.label}: <time dateTime={isoDate}>{formatted}</time>
    </p>
  );
}
