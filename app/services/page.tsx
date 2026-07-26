"use client";

import { services } from "@/content/services";
import { serviceIcons } from "@/lib/icons";
import { useLanguage } from "@/lib/i18n";

export default function ServicesPage() {
  const { strings } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">{strings.pages.servicesHeading}</h1>
      <p className="mt-4 max-w-2xl text-gov-slate">{strings.pages.servicesIntro}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <article key={service.slug} className="rounded border border-gov-border bg-gov-surface p-5">
              <div className="flex items-start gap-3">
                {Icon ? <Icon className="mt-1 h-6 w-6 flex-shrink-0 text-gov-blue" aria-hidden="true" /> : null}
                <div>
                  <h2 className="text-lg font-semibold text-gov-navy">{service.name}</h2>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gov-slate">
                    {service.category}
                  </p>
                  <p className="mt-3 text-sm text-gov-slate">{service.description}</p>
                  {(service.contactPhone || service.contactEmail) && (
                    <p className="mt-3 text-sm text-gov-slate">
                      {service.contactPhone}
                      {service.contactPhone && service.contactEmail ? " | " : ""}
                      {service.contactEmail}
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
