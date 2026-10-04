"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface LanguageToggleProps {
  variant?: "default" | "utility";
}

export function LanguageToggle({ variant = "default" }: LanguageToggleProps) {
  const { language, setLanguage, strings } = useLanguage();
  const nextLanguage = language === "en" ? "es" : "en";
  const label = language === "en" ? strings.header.languageToggleToEs : strings.header.languageToggleToEn;

  if (variant === "utility") {
    // The hit area fills the bar at 44px tall, while the visible pill stays compact.
    return (
      <button
        type="button"
        onClick={() => setLanguage(nextLanguage)}
        className="group flex min-h-[44px] items-center text-white"
      >
        <span className="inline-flex items-center gap-1.5 rounded border border-white/70 px-2.5 py-1 text-xs font-bold group-hover:bg-white/10">
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className="rounded border border-gov-control-border px-3 py-1.5 text-sm font-medium text-gov-navy hover:bg-gov-surface"
    >
      {label}
    </button>
  );
}
