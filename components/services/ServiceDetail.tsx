"use client";

import Image from "next/image";
import type { Service } from "@/content/types";
import { forms } from "@/content/forms";
import { withBasePath } from "@/lib/basePath";
import { useLanguage, localize } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { ContactCard } from "@/components/layout/ContactCard";
import { RelatedDocuments } from "@/components/layout/RelatedDocuments";
import { sections } from "@/content/sections";

interface ServiceDetailProps {
  service: Service;
}

export function ServiceDetail({ service: rawService }: ServiceDetailProps) {
  const { strings, language } = useLanguage();
  const service = localize(rawService, language);
  const section = sections.find((item) => item.id === "services")!;
  const relatedForms = forms
    .map((form) => localize(form, language))
    .filter((form) => service.relatedFormIds.includes(form.id));

  return (
    <InteriorLayout
      section={section}
      currentHref={`/services/${service.slug}`}
      breadcrumbs={[{ href: "/services", label: strings.pages.servicesHeading }, { label: service.name }]}
      heading={service.name}
      intro={service.summary}
      lastUpdatedIso="2026-06-02"
      sidebar={
        <>
          <ContactCard departmentName={service.category} phone={service.contactPhone} email={service.contactEmail} />
          <RelatedDocuments
            documents={relatedForms.map((form) => ({
              href: withBasePath(form.fileUrl),
              title: form.title,
              meta: `${form.fileType} · ${form.fileSizeLabel}`,
            }))}
          />
        </>
      }
    >
      <p className="text-sm font-medium uppercase tracking-wide text-gov-slate">{service.category}</p>

      {/* Explicit dimensions rather than fill, so the reserved space is correct before the
          image loads. Static export runs with the optimizer off. */}
      <Image
        src={withBasePath(service.photo)}
        alt={service.photoAlt}
        width={1200}
        height={675}
        sizes="(min-width: 1280px) 40rem, 100vw"
        className="mt-4 h-auto w-full rounded-lg border border-gov-border"
      />

      <p className="mt-4 text-gov-slate">{service.description}</p>

      <dl className="mt-6 flex flex-col gap-5">
        <div>
          <dt className="text-lg font-semibold text-gov-navy">{strings.serviceDetail.appliesToHeading}</dt>
          <dd className="mt-2 text-gov-slate">{service.whoItAppliesTo}</dd>
        </div>
        <div>
          <dt className="text-lg font-semibold text-gov-navy">{strings.serviceDetail.howToApplyHeading}</dt>
          <dd className="mt-2 text-gov-slate">{service.howToApply}</dd>
        </div>
      </dl>
    </InteriorLayout>
  );
}
