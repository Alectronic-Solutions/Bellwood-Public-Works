"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useTextSize } from "@/lib/textSize";
import { LanguageToggle } from "./LanguageToggle";

export function UtilityBar() {
  const { strings } = useLanguage();
  const { step, increase, decrease, reset } = useTextSize();

  return (
    <div className="bg-gov-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1 text-xs sm:gap-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center" role="group" aria-label="Text size">
            <button
              type="button"
              onClick={decrease}
              aria-label={strings.header.seatUnder}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-xs font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              A-
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label={strings.header.seatReset}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-sm font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              A
            </button>
            <button
              type="button"
              onClick={increase}
              aria-label={strings.header.seatOver}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-base font-bold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              A+
            </button>
            <span className="sr-only" aria-live="polite">
              {step}
            </span>
          </div>
          <Link
            href="/contact"
            className="flex min-h-[44px] items-center hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {strings.header.contactLink}
          </Link>
          <a
            href={`tel:${strings.footer.phone.replace(/[^0-9+]/g, "")}`}
            className="hidden min-h-[44px] items-center hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex"
          >
            {strings.footer.phone}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <form role="search" className="hidden items-center sm:flex">
            <label htmlFor="utility-search" className="sr-only-focusable">
              {strings.header.searchLabel}
            </label>
            <div className="flex items-center rounded border border-white/30 bg-white/10 px-2 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white">
              <Search className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              <input
                id="utility-search"
                type="search"
                placeholder={strings.header.searchPlaceholder}
                className="w-36 border-0 bg-transparent px-2 py-1 text-xs text-white placeholder:text-white/70 focus:outline-none"
              />
            </div>
          </form>
          <LanguageToggle variant="utility" />
        </div>
      </div>
    </div>
  );
}
