"use client";

import { useLanguage } from "@/lib/i18n";

export function DemoBanner() {
  const { strings } = useLanguage();
  return (
    <div className="bg-gov-navy text-white">
      <p className="mx-auto max-w-6xl px-4 py-2 text-sm sm:px-6">{strings.banner.demo}</p>
    </div>
  );
}
