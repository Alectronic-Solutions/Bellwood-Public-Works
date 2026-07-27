"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

export default function AccessibilityPage() {
  const { strings } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  return (
    <InteriorLayout
      section={section}
      currentHref="/accessibility"
      breadcrumbs={[{ label: strings.accessibility.heading }]}
      heading={strings.accessibility.heading}
      lastUpdatedIso="2026-05-01"
      sidebar={
        <RelatedLinks
          links={[
            { href: "/public-records", label: strings.footer.publicRecords },
            { href: "/contact", label: strings.header.contactLink },
          ]}
        />
      }
    >
      <p className="text-gov-slate">{strings.accessibility.intro}</p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.accessibility.standardsHeading}</h2>
      <p className="mt-2 text-gov-slate">{strings.accessibility.standardsBody}</p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.accessibility.feedbackHeading}</h2>
      <p className="mt-2 text-gov-slate">
        {strings.accessibility.feedbackBody}{" "}
        <Link href="/contact" className="text-gov-blue underline underline-offset-2 hover:text-gov-navy">
          {strings.accessibility.contactLinkLabel}
        </Link>
        .
      </p>
    </InteriorLayout>
  );
}
