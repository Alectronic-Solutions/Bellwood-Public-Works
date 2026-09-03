"use client";

import Link from "next/link";
import { useLanguage, localize } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";
import { notices } from "@/content/notices";

export default function SiteMapPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  const localizedNotices = [...notices]
    .map((notice) => localize(notice, language))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <InteriorLayout
      section={section}
      currentHref="/site-map"
      breadcrumbs={[{ label: strings.siteMap.heading }]}
      heading={strings.siteMap.heading}
      intro={strings.siteMap.intro}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/accessibility", label: strings.footer.accessibilityStatement },
            { href: "/contact", label: strings.header.contactLink },
          ]}
        />
      }
    >
      <nav aria-label={strings.siteMap.allPagesHeading}>
        <ul className="flex flex-col gap-6">
          <li>
            <Link href="/" className="font-semibold text-gov-blue underline underline-offset-2 hover:text-gov-navy">
              {strings.nav.home}
            </Link>
          </li>

          {sections.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="font-semibold text-gov-blue underline underline-offset-2 hover:text-gov-navy"
              >
                {language === "es" ? item.labelEs : item.label}
              </Link>
              <ul className="mt-2 flex flex-col gap-1 border-l-2 border-gov-border pl-4">
                {item.pages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                    >
                      {language === "es" ? page.labelEs : page.label}
                    </Link>
                  </li>
                ))}

                {item.id === "notices" &&
                  localizedNotices.map((notice) => (
                    <li key={notice.id}>
                      <Link
                        href={`/notices/${notice.id}`}
                        className="text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                      >
                        {notice.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </InteriorLayout>
  );
}
