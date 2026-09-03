"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

export default function PrivacyPage() {
  const { strings } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  const bodySections = [
    { heading: strings.privacy.collectHeading, body: strings.privacy.collectBody },
    { heading: strings.privacy.cookiesHeading, body: strings.privacy.cookiesBody },
    { heading: strings.privacy.thirdPartyHeading, body: strings.privacy.thirdPartyBody },
    { heading: strings.privacy.retentionHeading, body: strings.privacy.retentionBody },
    { heading: strings.privacy.rightsHeading, body: strings.privacy.rightsBody },
    { heading: strings.privacy.changesHeading, body: strings.privacy.changesBody },
  ];

  return (
    <InteriorLayout
      section={section}
      currentHref="/privacy"
      breadcrumbs={[{ label: strings.privacy.heading }]}
      heading={strings.privacy.heading}
      intro={strings.privacy.intro}
      lastUpdatedIso="2026-05-01"
      sidebar={
        <RelatedLinks
          links={[
            { href: "/accessibility", label: strings.footer.accessibilityStatement },
            { href: "/public-records", label: strings.footer.publicRecords },
            { href: "/contact", label: strings.header.contactLink },
          ]}
        />
      }
    >
      <p className="rounded border border-gov-alert-border bg-gov-alert-bg p-4 text-gov-navy">
        {strings.privacy.demoNote}
      </p>

      {bodySections.map((item) => (
        <div key={item.heading}>
          <h2 className="mt-6 text-xl font-semibold text-gov-navy">{item.heading}</h2>
          <p className="mt-2 text-gov-slate">{item.body}</p>
        </div>
      ))}

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.privacy.contactHeading}</h2>
      <p className="mt-2 text-gov-slate">
        {strings.privacy.contactBody}{" "}
        <Link href="/contact" className="text-gov-blue underline underline-offset-2 hover:text-gov-navy">
          {strings.privacy.contactLinkLabel}
        </Link>
        .
      </p>
    </InteriorLayout>
  );
}
