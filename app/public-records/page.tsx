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
        Members of the public may request access to non-exempt records maintained by Bellwood Public Works under
        the state open records law. This includes permits, inspection reports, work orders, contracts, meeting
        minutes, and correspondence, except where a specific exemption applies. Requests are typically fulfilled
        within ten business days of receipt.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">Who can request records</h2>
      <p className="mt-2 text-gov-slate">
        Any member of the public may submit a request. You do not need to be a Bellwood resident, explain your
        reason for the request, or have a connection to the records you are asking for. Requests may be submitted
        by an individual, a business, a journalist, or an organization.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">How to submit a request</h2>
      <p className="mt-2 text-gov-slate">
        Complete the Public Records Request Form, available on the{" "}
        <Link href="/forms" className="text-gov-blue underline underline-offset-2 hover:text-gov-navy">
          Forms and Applications
        </Link>{" "}
        page, and submit it by mail, email, or in person at City Hall. To help staff locate records quickly,
        describe the records you are seeking as specifically as possible, including a date range, location or
        project name, and department if known.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">What is exempt</h2>
      <p className="mt-2 text-gov-slate">
        Certain records are exempt from disclosure or must be redacted before release, including personnel files,
        active law enforcement investigations, security plans for critical infrastructure, attorney-client
        privileged communications, and records containing personal identifying information such as Social Security
        numbers or financial account numbers. If a request includes exempt material, the department will release
        the non-exempt portions and provide a written explanation for any withheld information.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">Fees</h2>
      <p className="mt-2 text-gov-slate">
        The first fifty pages of copies are provided free of charge. Additional copies are billed at $0.15 per
        page, and staff time for extensive searches or redactions may be billed at the department's standard
        clerical rate after the first hour, which is provided at no cost. Requesters who qualify for a fee waiver
        under the state's public interest standard may submit the Public Records Fee Waiver Request alongside their
        records request.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">Response time</h2>
      <p className="mt-2 text-gov-slate">
        The City Clerk's Office will acknowledge a request within five business days and provide records, a partial
        release, or a written explanation of any delay or denial within ten business days. Requests involving a
        large volume of records or records held by multiple departments may take longer, and staff will provide an
        estimated timeline in writing if the ten-day window cannot be met.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">Appeals</h2>
      <p className="mt-2 text-gov-slate">
        If a request is denied in whole or in part, the response will include the specific exemption relied upon
        and instructions for appeal. Appeals may be submitted in writing to the City Attorney's Office within
        thirty calendar days of the denial and will be reviewed within fifteen business days.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gov-navy">Contact</h2>
      <p className="mt-2 text-gov-slate">
        Questions about a records request can be directed to the City Clerk's Office at{" "}
        records@bellwoodpublicworks.example or (555) 011-2200.
      </p>
    </InteriorLayout>
  );
}
