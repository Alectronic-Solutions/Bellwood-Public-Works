"use client";

import { TriangleAlert } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/**
 * The site must never be mistaken for a real government website, so this sits at the very
 * top of every page and cannot be dismissed. It is deliberately not styled as a toast or
 * a cookie banner, both of which people have learned to close without reading.
 *
 * White on --gov-alert is 5.02:1, comfortably over the 4.5:1 minimum.
 */
export function DemoNotice() {
  const { strings } = useLanguage();

  return (
    <div role="region" aria-label={strings.banner.demoLabel} className="bg-gov-alert text-white">
      <p className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-2 text-sm sm:px-6">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{strings.banner.demo}</span>
      </p>
    </div>
  );
}
