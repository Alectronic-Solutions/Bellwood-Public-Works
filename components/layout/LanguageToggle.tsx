"use client";

import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage, strings } = useLanguage();
  const nextLanguage = language === "en" ? "es" : "en";
  const label =
    language === "en" ? strings.header.languageToggleToEs : strings.header.languageToggleToEn;

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className="rounded border border-gov-border px-3 py-1.5 text-sm font-medium text-gov-navy hover:bg-gov-surface"
    >
      {label}
    </button>
  );
}
