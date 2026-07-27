"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { ContactCard } from "@/components/layout/ContactCard";
import { RelatedDocuments } from "@/components/layout/RelatedDocuments";
import { sections } from "@/content/sections";

export default function PublicRecordsPage() {
  const { strings } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  return (
    <InteriorLayout
      section={section}
      currentHref="/public-records"
      breadcrumbs={[{ label: "Public Records Request" }]}
      heading="Public Records Request"
      lastUpdatedIso="2025-11-14"
      sidebar={
        <>
          <ContactCard
            departmentName="City Clerk's Office"
            phone="(555) 011-2200"
            email="records@bellwoodpublicworks.example"
            hours={strings.footer.officeHours}
          />
          <RelatedDocuments
            documents={[
              {
                href: "/documents/forms/public-records-request.pdf",
                title: "Public Records Request Form",
                meta: "PDF, 134 KB",
              },
              {
                href: "/documents/forms/records-request-fee-waiver.pdf",
                title: "Public Records Fee Waiver Request",
                meta: "PDF, 88 KB",
              },
            ]}
          />
        </>
      }
    >
      <p className="text-gov-slate">
        Members of the public may request access to non-exempt records maintained by Bellwood Public Works under the
        state open records law. Requests are typically fulfilled within ten business days.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-gov-navy">How to submit a request</h2>
      <p className="mt-2 text-gov-slate">
        Complete the Public Records Request Form, available on the{" "}
        <Link href="/forms" className="text-gov-blue underline underline-offset-2 hover:text-gov-navy">
          Forms and Applications
        </Link>{" "}
        page, and submit it by mail, email, or in person at City Hall.
      </p>
      <h2 className="mt-6 text-xl font-semibold text-gov-navy">Contact</h2>
      <p className="mt-2 text-gov-slate">
        records@bellwoodpublicworks.example or (555) 011-2200. This is a fictional portfolio demonstration site and this
        contact address is not monitored.
      </p>
    </InteriorLayout>
  );
}
