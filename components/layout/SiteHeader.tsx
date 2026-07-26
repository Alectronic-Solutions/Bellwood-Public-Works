"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const { strings } = useLanguage();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const links = [
    { href: "/", label: strings.nav.home },
    { href: "/services", label: strings.nav.services },
    { href: "/notices", label: strings.nav.notices },
    { href: "/meetings", label: strings.nav.meetings },
    { href: "/forms", label: strings.nav.forms },
  ];

  return (
    <header className="border-b border-gov-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-gov-navy" aria-label="Bellwood Public Works home">
          Bellwood Public Works
        </Link>

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-gov-slate hover:text-gov-navy">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <form role="search" className="flex items-center">
            <label htmlFor="site-search" className="sr-only-focusable">
              {strings.header.searchLabel}
            </label>
            <div className="flex items-center rounded border border-gov-border px-2">
              <Search className="h-4 w-4 text-gov-slate" aria-hidden="true" />
              <input
                id="site-search"
                type="search"
                placeholder={strings.header.searchPlaceholder}
                className="w-40 border-0 px-2 py-1.5 text-sm text-gov-slate focus:outline-none"
              />
            </div>
          </form>
          <LanguageToggle />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-gov-navy md:hidden"
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
          aria-label={mobileNavOpen ? strings.header.mobileNavClose : strings.header.mobileNavOpen}
          onClick={() => setMobileNavOpen((value) => !value)}
        >
          {mobileNavOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className="border-t border-gov-border px-4 py-3 md:hidden">
        <form role="search" className="flex items-center justify-between gap-3">
          <label htmlFor="site-search-mobile" className="sr-only-focusable">
            {strings.header.searchLabel}
          </label>
          <div className="flex flex-1 items-center rounded border border-gov-border px-2">
            <Search className="h-4 w-4 text-gov-slate" aria-hidden="true" />
            <input
              id="site-search-mobile"
              type="search"
              placeholder={strings.header.searchPlaceholder}
              className="w-full border-0 px-2 py-1.5 text-sm text-gov-slate focus:outline-none"
            />
          </div>
          <LanguageToggle />
        </form>
      </div>

      <div id="mobile-nav">
        <MobileNav open={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />
      </div>
    </header>
  );
}
