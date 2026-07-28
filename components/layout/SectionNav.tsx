"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Section } from "@/content/sections";

interface SectionNavProps {
  section: Section;
  currentHref: string;
}

export function SectionNav({ section, currentHref }: SectionNavProps) {
  const { strings, language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const heading = language === "es" ? section.labelEs : section.label;
  const normalizedCurrent = currentHref.replace(/\/$/, "") || "/";

  function renderList() {
    return (
      <ul className="flex flex-col gap-1">
        {section.pages.map((page) => {
          const label = language === "es" ? page.labelEs : page.label;
          const normalizedHref = page.href.replace(/\/$/, "") || "/";
          const isCurrent = normalizedHref === normalizedCurrent;
          return (
            <li key={page.href}>
              <Link
                href={page.href}
                aria-current={isCurrent ? "page" : undefined}
                className={
                  isCurrent
                    ? "block rounded border-l-4 border-gov-navy bg-gov-surface px-3 py-2 text-sm font-semibold text-gov-navy"
                    : "block rounded border-l-4 border-transparent px-3 py-2 text-sm text-gov-blue hover:bg-gov-surface hover:underline"
                }
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav aria-label={heading} className="xl:sticky xl:top-4">
      <div className="hidden xl:block">
        <h2 className="px-3 text-xs font-bold uppercase tracking-wide text-gov-slate">{heading}</h2>
        <div className="mt-2">{renderList()}</div>
      </div>

      <div className="xl:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="section-nav-mobile-panel"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded border border-gov-border bg-gov-surface px-4 py-3 text-left font-medium text-gov-navy"
        >
          {strings.sectionNav.toggleLabel}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        {mobileOpen ? (
          <div id="section-nav-mobile-panel" className="mt-2 rounded border border-gov-border p-3">
            {renderList()}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
