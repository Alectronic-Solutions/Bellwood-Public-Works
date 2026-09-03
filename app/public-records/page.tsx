"use client";

import Link from "next/link";
import { useLanguage, localize } from "@/lib/i18n";
import { withBasePath } from "@/lib/basePath";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { ContactCard } from "@/components/layout/ContactCard";
import { RelatedDocuments } from "@/components/layout/RelatedDocuments";
import { sections } from "@/content/sections";
import { departments } from "@/content/departments";
import { forms } from "@/content/forms";

const RECORDS_FORM_IDS = ["public-records-request", "records-request-fee-waiver"];

export default function PublicRecordsPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  // Sourced from the content files rather than retyped, so the phone number, hours, and
  // file sizes cannot drift away from the department directory and the forms index.
  const clerk = localize(departments.find((item) => item.name === "City Clerk's Office")!, language);
  const recordsForms = RECORDS_FORM_IDS.map((id) => forms.find((form) => form.id === id)!).map((form) =>
    localize(form, language),
  );

  const bodySections = [
    { heading: strings.publicRecords.whoHeading, body: strings.publicRecords.whoBody },
    { heading: strings.publicRecords.exemptHeading, body: strings.publicRecords.exemptBody },
    { heading: strings.publicRecords.feesHeading, body: strings.publicRecords.feesBody },
    { heading: strings.publicRecords.responseHeading, body: strings.publicRecords.responseBody },
    { heading: strings.publicRecords.appealsHeading, body: strings.publicRecords.appealsBody },
  ];

  return (
    <InteriorLayout
      section={section}
      currentHref="/public-records"
      headerImage="/images/headers/public-records.jpg"
      breadcrumbs={[{ label: strings.publicRecords.heading }]}
      heading={strings.publicRecords.heading}
      intro={strings.publicRecords.intro}
      lastUpdatedIso="2025-11-14"
      sidebar={
        <>
          <ContactCard
            departmentName={clerk.name}
            phone={clerk.phone}
            email={clerk.email}
            hours={clerk.hours}
          />
          <RelatedDocuments
            documents={recordsForms.map((form) => ({
              href: withBasePath(form.fileUrl),
              title: form.title,
              meta: `${form.fileType} · ${form.fileSizeLabel}`,
            }))}
          />
        </>
      }
    >
      <h2 className="text-xl font-semibold text-gov-navy">{strings.publicRecords.howHeading}</h2>
      <p className="mt-2 text-gov-slate">
        {strings.publicRecords.howBodyBefore}{" "}
        <Link href="/forms" className="text-gov-blue underline underline-offset-2 hover:text-gov-navy">
          {strings.publicRecords.howFormsLinkLabel}
        </Link>{" "}
        {strings.publicRecords.howBodyAfter}
      </p>

      {bodySections.map((item) => (
        <div key={item.heading}>
          <h2 className="mt-6 text-xl font-semibold text-gov-navy">{item.heading}</h2>
          <p className="mt-2 text-gov-slate">{item.body}</p>
        </div>
      ))}

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">{strings.publicRecords.contactHeading}</h2>
      <p className="mt-2 text-gov-slate">
        {strings.publicRecords.contactBody}{" "}
        <Link href="/contact" className="text-gov-blue underline underline-offset-2 hover:text-gov-navy">
          {strings.accessibility.contactLinkLabel}
        </Link>
        .
      </p>
    </InteriorLayout>
  );
}
