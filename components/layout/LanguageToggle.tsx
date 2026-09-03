"use client";

import { useLanguage } from "@/lib/i18n";

interface LanguageToggleProps {
  variant?: "default" | "utility";
}

export function LanguageToggle({ variant = "default" }: LanguageToggleProps) {
  const { language, setLanguage, strings } = useLanguage();
  const nextLanguage = language === "en" ? "es" : "en";
  const label = language === "en" ? strings.header.languageToggleToEs : strings.header.languageToggleToEn;

  const className =
    variant === "utility"
      ? "rounded border border-white/60 px-2 py-1 text-xs font-medium text-white hover:bg-white/10"
      : "rounded border border-gov-control-border px-3 py-1.5 text-sm font-medium text-gov-navy hover:bg-gov-surface";

  return (
    <button type="button" onClick={() => setLanguage(nextLanguage)} className={className}>
      {label}
    </button>
  );
}
