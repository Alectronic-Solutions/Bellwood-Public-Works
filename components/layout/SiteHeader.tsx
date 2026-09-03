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
    <header className="border-b border-gov-border bg-white">
      <UtilityBar />

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-4" aria-label={strings.header.homeLink}>
          <CivicSeal className="h-10 w-10 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16" />
          <span className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-widest text-gov-slate">
              {strings.header.agencyName}
            </span>
            <span className="text-lg font-bold text-gov-navy sm:text-xl">{strings.header.agencyParent}</span>
          </span>
        </Link>

        <button
          ref={mobileNavButtonRef}
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded p-2 text-gov-navy md:hidden"
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
          aria-label={mobileNavOpen ? strings.header.mobileNavClose : strings.header.mobileNavOpen}
          onClick={() => setMobileNavOpen((value) => !value)}
        >
          {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className="border-t border-gov-border px-4 py-3 md:hidden">
        <SiteSearchForm variant="mobile" id="site-search-mobile" />
      </div>

      <div id="mobile-nav">
        <MobileNav open={mobileNavOpen} onNavigate={closeMobileNav} />
      </div>
    </header>
  );
}
