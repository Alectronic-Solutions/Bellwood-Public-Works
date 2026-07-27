"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notices } from "@/content/notices";
import { useLanguage, localize, dateLocale } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

function formatDate(isoDate: string, language: Language) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(dateLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticesPage() {
  const { strings, language } = useLanguage();
  const [year, setYear] = useState("all");
  const section = sections.find((item) => item.id === "notices")!;

  const localized = useMemo(() => notices.map((notice) => localize(notice, language)), [language]);

  const sorted = useMemo(() => [...localized].sort((a, b) => (a.date < b.date ? 1 : -1)), [localized]);

  const years = useMemo(
    () => Array.from(new Set(localized.map((notice) => notice.date.slice(0, 4)))).sort((a, b) => (a < b ? 1 : -1)),
    [localized],
  );

  const filtered = useMemo(
    () => (year === "all" ? sorted : sorted.filter((notice) => notice.date.slice(0, 4) === year)),
    [sorted, year],
  );

  const resultsMessage = strings.notices.resultsCount
    .replace("{count}", String(filtered.length))
    .replace("{total}", String(localized.length));

  return (
    <InteriorLayout
      section={section}
      currentHref="/notices"
      breadcrumbs={[{ label: strings.pages.noticesHeading }]}
      heading={strings.pages.noticesHeading}
      intro={strings.pages.noticesIntro}
      lastUpdatedIso={sorted[0]?.date ?? "2026-07-26"}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/meetings", label: strings.nav.meetings },
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-1 sm:max-w-xs">
        <label htmlFor="notice-year-filter" className="text-sm font-medium text-gov-navy">
          {strings.notices.yearFilterLabel}
        </label>
        <select
          id="notice-year-filter"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className="rounded border border-gov-border bg-white px-3 py-2 text-sm text-gov-slate"
        >
          <option value="all">{strings.notices.allYearsLabel}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-gov-slate">
        {resultsMessage}
      </p>

      {filtered.length > 0 ? (
        <>
          <ul className="mt-4 flex flex-col gap-3 sm:hidden">
            {filtered.map((notice) => (
              <li key={notice.id} className="border border-gov-border p-4">
                <Link href={`/notices/${notice.id}`} className="font-medium link-body">
                  {notice.title}
                </Link>
                <p className="mt-1 text-gov-slate">{notice.body}</p>
                <p className="mt-2 text-sm text-gov-slate">{formatDate(notice.date, language)}</p>
                {notice.urgent && notice.active && (
                  <span className="mt-2 inline-block rounded bg-gov-alert px-2 py-0.5 text-sm font-semibold text-white">
                    {strings.alert.urgentLabel}
                  </span>
                )}
                {!notice.active && (
                  <span className="mt-2 inline-block rounded border border-gov-border px-2 py-0.5 text-sm font-medium text-gov-slate">
                    {strings.alert.archivedLabel}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
            <table className="w-full min-w-[28rem] border-collapse text-left">
              <caption className="sr-only">{strings.pages.noticesHeading}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Notice
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Posted
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((notice) => (
                  <tr key={notice.id} className="align-top">
                    <td className="px-3 py-2">
                      <Link href={`/notices/${notice.id}`} className="font-medium link-body">
                        {notice.title}
                      </Link>
                      <p className="mt-1 text-gov-slate">{notice.body}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-gov-slate">
                      {formatDate(notice.date, language)}
                    </td>
                    <td className="px-3 py-2 text-gov-slate">
                      {notice.urgent && notice.active && (
                        <span className="rounded bg-gov-alert px-2 py-0.5 text-sm font-semibold text-white">
                          {strings.alert.urgentLabel}
                        </span>
                      )}
                      {!notice.active && (
                        <span className="rounded border border-gov-border px-2 py-0.5 text-sm font-medium text-gov-slate">
                          {strings.alert.archivedLabel}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-8 text-gov-slate">{strings.notices.emptyState}</p>
      )}
    </InteriorLayout>
  );
}
