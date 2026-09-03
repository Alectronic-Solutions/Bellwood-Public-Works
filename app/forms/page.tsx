"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { forms } from "@/content/forms";
import { withBasePath } from "@/lib/basePath";
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

export default function FormsPage() {
  const { strings, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const section = sections.find((item) => item.id === "forms")!;

  const localized = useMemo(() => forms.map((form) => localize(form, language)), [language]);

  const categories = useMemo(() => Array.from(new Set(localized.map((form) => form.category))).sort(), [localized]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return localized.filter((form) => {
      const matchesCategory = category === "all" || form.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        form.title.toLowerCase().includes(normalizedQuery) ||
        form.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [localized, query, category]);

  const resultsMessage = strings.forms.resultsCount
    .replace("{count}", String(filtered.length))
    .replace("{total}", String(localized.length));

  const mostRecentUpdate = useMemo(
    () => [...localized].sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1))[0]?.lastUpdated,
    [localized],
  );

  return (
    <InteriorLayout
      section={section}
      currentHref="/forms"
      headerImage="/images/headers/forms.jpg"
      breadcrumbs={[{ label: strings.pages.formsHeading }]}
      heading={strings.pages.formsHeading}
      intro={strings.pages.formsIntro}
      lastUpdatedIso={mostRecentUpdate ?? "2026-07-26"}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/public-records", label: strings.footer.publicRecords },
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <div className="flex flex-col gap-1 sm:max-w-xs sm:flex-1">
          <label htmlFor="forms-search" className="text-sm font-medium text-gov-navy">
            {strings.forms.searchLabel}
          </label>
          <div className="flex items-center rounded border border-gov-control-border bg-white px-2">
            <Search className="h-4 w-4 text-gov-slate" aria-hidden="true" />
            <input
              id="forms-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={strings.forms.searchPlaceholder}
              className="w-full border-0 bg-transparent px-2 py-2 text-sm text-gov-slate"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:max-w-xs">
          <label htmlFor="forms-category-filter" className="text-sm font-medium text-gov-navy">
            {strings.forms.categoryFilterLabel}
          </label>
          <select
            id="forms-category-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded border border-gov-control-border bg-white px-3 py-2 text-sm text-gov-slate"
          >
            <option value="all">{strings.forms.allCategoriesLabel}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-gov-slate">
        {resultsMessage}
      </p>

      {filtered.length > 0 ? (
        <>
          <ul className="mt-4 flex flex-col gap-3 sm:hidden">
            {filtered.map((form) => (
              <li key={form.id} className="border border-gov-border p-4">
                <a href={withBasePath(form.fileUrl)} className="font-medium link-body">
                  {form.title}
                </a>
                <p className="mt-1 text-gov-slate">{form.description}</p>
                <dl className="mt-2 space-y-1 text-sm text-gov-slate">
                  <div className="flex gap-2">
                    <dt className="font-semibold">Category:</dt>
                    <dd>{form.category}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">{strings.forms.fileSizeLabel}:</dt>
                    <dd>
                      {form.fileType}, {form.fileSizeLabel}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">{strings.forms.lastUpdatedLabel}:</dt>
                    <dd>{formatDate(form.lastUpdated, language)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <caption className="sr-only">{strings.pages.formsHeading}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.tables.form}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.tables.category}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.forms.fileSizeLabel}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.forms.lastUpdatedLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((form) => (
                  <tr key={form.id} className="align-top">
                    <td className="px-3 py-2">
                      <a href={withBasePath(form.fileUrl)} className="font-medium link-body">
                        {form.title}
                        <span className="sr-only">
                          {" "}
                          ({form.fileType}, {form.fileSizeLabel})
                        </span>
                      </a>
                      <p className="mt-1 text-gov-slate">{form.description}</p>
                    </td>
                    <td className="px-3 py-2 text-gov-slate">{form.category}</td>
                    <td className="px-3 py-2 text-gov-slate">
                      {form.fileType}, {form.fileSizeLabel}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-gov-slate">
                      {formatDate(form.lastUpdated, language)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-8 text-gov-slate">{strings.forms.emptyState}</p>
      )}
    </InteriorLayout>
  );
}
