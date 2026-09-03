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
      headerImage="/images/headers/accessibility.jpg"
      breadcrumbs={[{ label: strings.accessibility.heading }]}
      heading={strings.accessibility.heading}
      intro={strings.accessibility.intro}
      lastUpdatedIso="2026-05-01"
      sidebar={
        <RelatedLinks
          links={[
            { href: "/privacy", label: strings.privacy.heading },
            { href: "/public-records", label: strings.footer.publicRecords },
            { href: "/contact", label: strings.header.contactLink },
          ]}
        />
      }
    >
      <h2 className="text-xl font-semibold text-gov-navy">{strings.accessibility.standardsHeading}</h2>
      <p className="mt-2 text-gov-slate">{strings.accessibility.standardsBody}</p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.accessibility.testingHeading}</h2>
      <p className="mt-2 text-gov-slate">{strings.accessibility.testingBody}</p>
      <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-gov-slate">
        <li>{strings.accessibility.testingAutomated}</li>
        <li>{strings.accessibility.testingManual}</li>
      </ul>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.accessibility.featuresHeading}</h2>
      <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-gov-slate">
        {strings.accessibility.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.accessibility.limitationsHeading}</h2>
      <p className="mt-2 text-gov-slate">{strings.accessibility.limitationsBody}</p>
      <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-gov-slate">
        {strings.accessibility.limitations.map((limitation) => (
          <li key={limitation}>{limitation}</li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.accessibility.formatsHeading}</h2>
      <p className="mt-2 text-gov-slate">{strings.accessibility.formatsBody}</p>

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
