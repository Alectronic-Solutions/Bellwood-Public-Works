"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { UtilityBar } from "./UtilityBar";
import { CivicSeal } from "./CivicSeal";
import { MobileNav } from "./MobileNav";
import { SiteSearchForm } from "./SiteSearchForm";

export function SiteHeader() {
  const { strings } = useLanguage();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavButtonRef = useRef<HTMLButtonElement>(null);

  function closeMobileNav() {
    setMobileNavOpen(false);
    mobileNavButtonRef.current?.focus();
  }

  return (
    <header className="bg-white">
      <UtilityBar />

      <div className="border-b border-gov-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-5">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-4" aria-label={strings.header.homeLink}>
            <CivicSeal className="h-11 w-11 shrink-0 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gov-slate sm:text-sm">
                {strings.header.agencyName}
              </span>
              <span className="text-base font-bold text-gov-navy min-[400px]:text-lg sm:text-2xl">
                {strings.header.agencyParent}
              </span>
            </span>
          </Link>

          <div className="hidden lg:block">
            <SiteSearchForm variant="header" id="site-search-header" />
          </div>

          <button
            ref={mobileNavButtonRef}
            type="button"
            className="inline-flex min-h-[44px] shrink-0 flex-col items-center justify-center rounded px-2 text-gov-navy hover:bg-gov-surface lg:hidden"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            aria-label={mobileNavOpen ? strings.header.mobileNavClose : strings.header.mobileNavOpen}
            onClick={() => setMobileNavOpen((value) => !value)}
          >
            {mobileNavOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
            <span className="text-xs font-bold uppercase tracking-wide" aria-hidden="true">
              {strings.header.menuButton}
            </span>
          </button>
        </div>
      </div>

      <div className="border-b border-gov-border bg-gov-surface px-4 py-2.5 sm:px-6 lg:hidden">
        <SiteSearchForm variant="mobile" id="site-search-mobile" />
      </div>

      <div id="mobile-nav">
        <MobileNav open={mobileNavOpen} onNavigate={closeMobileNav} />
      </div>
    </header>
  );
}
