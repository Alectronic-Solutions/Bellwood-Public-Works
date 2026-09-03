"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { sections } from "@/content/sections";

export default function NotFound() {
  const { strings, language } = useLanguage();

  const causes = [strings.notFound.causeMistyped, strings.notFound.causeMoved, strings.notFound.causeOutdated];

  return (
    <main id="main-content" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-wide text-gov-alert">404</p>
        <h1 className="mt-2 text-4xl font-bold text-gov-navy">{strings.notFound.heading}</h1>
        <p className="mt-3 max-w-[70ch] text-gov-slate">{strings.notFound.intro}</p>

        <h2 className="mt-8 text-xl font-semibold text-gov-navy">{strings.notFound.causesHeading}</h2>
        <ul className="mt-3 flex max-w-[70ch] list-disc flex-col gap-1 pl-5 text-gov-slate">
          {causes.map((cause) => (
            <li key={cause}>{cause}</li>
          ))}
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-gov-navy">{strings.notFound.nextStepsHeading}</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <Link
              href="/"
              className="flex min-h-[44px] items-center rounded-lg border border-gov-border bg-gov-surface px-5 py-4 font-medium text-gov-navy shadow-card hover:border-gov-blue"
            >
              {strings.nav.home}
            </Link>
          </li>
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={section.href}
                className="flex min-h-[44px] items-center rounded-lg border border-gov-border bg-gov-surface px-5 py-4 font-medium text-gov-navy shadow-card hover:border-gov-blue"
              >
                {language === "es" ? section.labelEs : section.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/site-map"
              className="flex min-h-[44px] items-center rounded-lg border border-gov-border bg-gov-surface px-5 py-4 font-medium text-gov-navy shadow-card hover:border-gov-blue"
            >
              {strings.siteMap.heading}
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
