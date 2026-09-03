"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { quickActions } from "@/content/nav";
import { quickActionIcons } from "@/lib/icons";

export function QuickActionsBar() {
  const { strings, language } = useLanguage();

  return (
    <nav aria-label={strings.header.quickActionsHeading} className="border-b border-gov-border bg-gov-surface">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
        {/* Not a heading: the nav already carries this text as its accessible name, and a
            heading here would sit above the page h1 in the document outline. */}
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gov-navy">
          {strings.header.quickActionsHeading}
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = quickActionIcons[action.icon];
            const label = language === "es" ? action.labelEs : action.label;
            return (
              <li key={action.label}>
                <Link
                  href={action.href}
                  className="flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-gov-blue hover:underline"
                >
                  {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
