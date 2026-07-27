"use client";

import { Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ContactCardProps {
  departmentName: string;
  phone?: string;
  email?: string;
  hours?: string;
}

export function ContactCard({ departmentName, phone, email, hours }: ContactCardProps) {
  const { strings } = useLanguage();

  return (
    <section aria-labelledby="contact-card-heading" className="rounded border border-gov-border bg-gov-surface p-4">
      <h2 id="contact-card-heading" className="text-xs font-bold uppercase tracking-wide text-gov-slate">
        {strings.sidebar.contactHeading}
      </h2>
      <p className="mt-2 font-semibold text-gov-navy">{departmentName}</p>
      <dl className="mt-3 flex flex-col gap-2 text-sm text-gov-slate">
        {phone && (
          <div className="flex items-start gap-2">
            <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-gov-blue" aria-hidden="true" />
            <dt className="sr-only">{strings.sidebar.callLabel}</dt>
            <dd>
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="link-body">
                {phone}
              </a>
            </dd>
          </div>
        )}
        {email && (
          <div className="flex items-start gap-2">
            <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-gov-blue" aria-hidden="true" />
            <dt className="sr-only">{strings.sidebar.emailLabel}</dt>
            <dd className="break-all">
              <a href={`mailto:${email}`} className="link-body break-all">
                {email}
              </a>
            </dd>
          </div>
        )}
        {hours && (
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-gov-blue" aria-hidden="true" />
            <dt className="sr-only">{strings.sidebar.hoursLabel}</dt>
            <dd>{hours}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
