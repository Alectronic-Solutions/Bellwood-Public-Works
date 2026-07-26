"use client";

import { useLanguage } from "@/lib/i18n";

export function SkipLink() {
  const { strings } = useLanguage();
  return (
    <a href="#main-content" className="skip-link">
      {strings.header.skipLink}
    </a>
  );
}
