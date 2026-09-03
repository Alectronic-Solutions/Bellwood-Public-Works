"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { services } from "@/content/services";
import { useLanguage, localize } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { sections } from "@/content/sections";
import { RelatedLinks } from "@/components/layout/RelatedLinks";

export default function ServicesPage() {
  const { strings, language } = useLanguage();
  const [category, setCategory] = useState("all");
  const section = sections.find((item) => item.id === "services")!;

  const localized = useMemo(() => services.map((service) => localize(service, language)), [language]);

  const categories = useMemo(
    () => Array.from(new Set(localized.map((service) => service.category))).sort(),
    [localized],
  );

  const filtered = useMemo(
    () => (category === "all" ? localized : localized.filter((service) => service.category === category)),
    [localized, category],
  );

  const resultsMessage = strings.services.resultsCount
    .replace("{count}", String(filtered.length))
    .replace("{total}", String(localized.length));

  return (
    <InteriorLayout
      section={section}
      currentHref="/services"
      headerImage="/images/headers/services.jpg"
      breadcrumbs={[{ label: strings.pages.servicesHeading }]}
      heading={strings.pages.servicesHeading}
      intro={strings.pages.servicesIntro}
      lastUpdatedIso="2026-06-02"
      sidebar={
        <RelatedLinks
          links={[
            { href: "/forms", label: strings.nav.forms },
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-1 sm:max-w-xs">
        <label htmlFor="service-category-filter" className="text-sm font-medium text-gov-navy">
          {strings.services.categoryFilterLabel}
        </label>
        <select
          id="service-category-filter"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded border border-gov-control-border bg-white px-3 py-2 text-sm text-gov-slate"
        >
          <option value="all">{strings.services.allCategoriesLabel}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
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
            {filtered.map((service) => (
              <li key={service.slug} className="border border-gov-border p-4">
                <Link href={`/services/${service.slug}`} className="font-medium link-body">
                  {service.name}
                </Link>
                <p className="mt-1 text-sm font-medium text-gov-slate">{service.category}</p>
                <p className="mt-2 text-gov-slate">{service.summary}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
            <table className="w-full min-w-[28rem] border-collapse text-left">
              <caption className="sr-only">{strings.pages.servicesHeading}</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.tables.service}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.tables.category}
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    {strings.tables.summary}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((service) => (
                  <tr key={service.slug} className="align-top">
                    <td className="px-3 py-2 font-medium text-gov-navy">
                      <Link href={`/services/${service.slug}`} className="link-body">
                        {service.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-gov-slate">{service.category}</td>
                    <td className="px-3 py-2 text-gov-slate">{service.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="mt-8 text-gov-slate">{strings.services.emptyState}</p>
      )}
    </InteriorLayout>
  );
}
