"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { buildDateIso } from "@/lib/dates";
import { footerDepartmentLinks, footerServiceLinks, footerResourceLinks } from "@/content/nav";
import { CivicSeal } from "./CivicSeal";

export function SiteFooter() {
  const { strings, language } = useLanguage();

  const columns = [
    { heading: strings.footer.departmentsHeading, links: footerDepartmentLinks },
    { heading: strings.footer.servicesHeading, links: footerServiceLinks },
    { heading: strings.footer.resourcesHeading, links: footerResourceLinks },
  ];

  return (
    <footer className="border-t border-gov-border bg-gov-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-bold uppercase tracking-wide text-white">{column.heading}</h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    <Link href={link.href} className="text-sm text-white/80 hover:text-white hover:underline">
                      {language === "es" ? link.labelEs : link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">{strings.footer.connectHeading}</h2>
            <div className="mt-3 flex items-start gap-3">
              <CivicSeal variant="white" className="h-10 w-10 shrink-0" />
              <address className="not-italic text-sm text-white/80">
                {strings.footer.addressLine1}
                <br />
                {strings.footer.addressLine2}
                <br />
                {strings.footer.phone}
                <br />
                {strings.footer.tty}
                <br />
                {strings.footer.phone2}
                <br />
                {strings.footer.email}
              </address>
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wide text-white">
              {strings.footer.officeHoursHeading}
            </h3>
            <p className="mt-1 text-sm text-white/80">{strings.footer.officeHours}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-6">
          <nav aria-label={strings.footer.navLabel} className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <Link href="/accessibility" className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline">
              {strings.footer.accessibilityStatement}
            </Link>
            <Link href="/public-records" className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline">
              {strings.footer.publicRecords}
            </Link>
            <Link href="/privacy" className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline">
              {strings.footer.privacyPolicy}
            </Link>
            <Link href="/site-map" className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline">
              {strings.footer.siteMap}
            </Link>
          </nav>

          <p className="mt-4 max-w-3xl text-xs text-white/70">{strings.footer.nonDiscrimination}</p>

          <div className="mt-6 flex flex-col gap-4 border-t border-white/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/60">
              <p>
                {"© "}
                {buildDateIso.slice(0, 4)} {strings.footer.copyright}
              </p>
              <p className="mt-1">
                {strings.footer.designedBy}{" "}
                <a
                  href="https://alectronicsolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 underline hover:text-white"
                >
                  Alectronic Solutions
                </a>
              </p>
            </div>

            <a
              href="#main-content"
              className="inline-flex w-fit items-center gap-2 rounded border border-white/60 px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
              {strings.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
