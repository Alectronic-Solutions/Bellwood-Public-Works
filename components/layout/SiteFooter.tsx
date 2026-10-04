"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { buildDateIso } from "@/lib/dates";
import { footerDepartmentLinks, footerServiceLinks, footerResourceLinks } from "@/content/nav";
import { CivicSeal } from "./CivicSeal";
import { EmailText } from "./EmailText";

export function SiteFooter() {
  const { strings, language } = useLanguage();
  const [openColumn, setOpenColumn] = useState<number | null>(null);

  const columns = [
    { heading: strings.footer.departmentsHeading, links: footerDepartmentLinks },
    { heading: strings.footer.servicesHeading, links: footerServiceLinks },
    { heading: strings.footer.resourcesHeading, links: footerResourceLinks },
  ];

  return (
    <footer className="border-t border-gov-border bg-gov-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* On phones the three link groups collapse into an accordion, as on most
            government sites, so the footer does not run to several screens. The heading
            holds a real button there; from sm up the button is not rendered (display:none)
            and the plain heading text shows instead, so no one hears a "collapsed" state
            for a list that is in fact visible. */}
        <div className="grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {columns.map((column, columnIndex) => {
            const isOpen = openColumn === columnIndex;
            const listId = `footer-links-${columnIndex}`;
            return (
              <div key={column.heading} className="border-b border-white/20 sm:border-b-0">
                <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={listId}
                    onClick={() => setOpenColumn(isOpen ? null : columnIndex)}
                    className="flex min-h-[52px] w-full items-center justify-between text-left uppercase tracking-wide sm:hidden"
                  >
                    {column.heading}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <span className="hidden sm:inline">{column.heading}</span>
                </h2>
                <ul id={listId} className={`pb-3 sm:mt-3 sm:block sm:space-y-2 sm:pb-0 ${isOpen ? "" : "hidden"}`}>
                  {column.links.map((link, index) => (
                    <li key={`${link.href}-${index}`}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-[44px] items-center text-sm text-white/90 hover:text-white hover:underline sm:min-h-0 sm:text-white/80"
                      >
                        {language === "es" ? link.labelEs : link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="pt-6 sm:pt-0">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">{strings.footer.connectHeading}</h2>
            <div className="mt-3 flex items-start gap-3">
              <CivicSeal variant="white" className="h-10 w-10 shrink-0" />
              <address className="min-w-0 not-italic text-sm text-white/80">
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
                <EmailText email={strings.footer.email} />
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
            <Link
              href="/accessibility"
              className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline"
            >
              {strings.footer.accessibilityStatement}
            </Link>
            <Link
              href="/public-records"
              className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline"
            >
              {strings.footer.publicRecords}
            </Link>
            <Link
              href="/privacy"
              className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline"
            >
              {strings.footer.privacyPolicy}
            </Link>
            <Link
              href="/site-map"
              className="flex min-h-[44px] items-center text-white/80 hover:text-white hover:underline"
            >
              {strings.footer.siteMap}
            </Link>
          </nav>

          <p className="mt-4 max-w-3xl text-sm text-white/90">{strings.footer.languageAssistance}</p>
          <p className="mt-3 max-w-3xl text-xs text-white/80">{strings.footer.nonDiscrimination}</p>

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
