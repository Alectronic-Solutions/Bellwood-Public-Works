"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "@/content/en";
import { es } from "@/content/es";
import type { UIStrings } from "@/content/types";

export type Language = "en" | "es";

const STORAGE_KEY = "bpw-language";

const dictionaries: Record<Language, UIStrings> = { en, es };

interface LanguageContextValue {
  language: Language;
  strings: UIStrings;
  setLanguage: (language: Language) => void;
  announcement: string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") {
      setLanguageState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    setAnnouncement(
      next === "es" ? "Idioma cambiado a Español" : "Language changed to English"
    );
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      strings: dictionaries[language],
      setLanguage,
      announcement,
    }),
    [language, announcement]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
      <div aria-live="polite" className="sr-only-focusable">
        {announcement}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
