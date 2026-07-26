"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { strings } = useLanguage();

  return (
    <footer className="border-t border-gov-border bg-gov-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gov-navy">
              {strings.footer.contactHeading}
            </h2>
            <address className="mt-2 not-italic text-sm text-gov-slate">
              {strings.footer.address}
              <br />
              {strings.footer.phone}
              <br />
              {strings.footer.email}
            </address>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gov-navy">
              {strings.footer.officeHoursHeading}
            </h2>
            <p className="mt-2 text-sm text-gov-slate">{strings.footer.officeHours}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-gov-border pt-6 text-sm">
          <Link href="/accessibility" className="text-gov-blue hover:underline">
            {strings.footer.accessibilityStatement}
          </Link>
          <Link href="/public-records" className="text-gov-blue hover:underline">
            {strings.footer.publicRecords}
          </Link>
        </nav>

        <p className="mt-6 max-w-3xl text-xs text-gov-slate">{strings.footer.nonDiscrimination}</p>
      </div>
    </footer>
  );
}
