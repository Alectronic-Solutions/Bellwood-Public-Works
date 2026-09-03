"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { useTextSize } from "@/lib/textSize";
import { LanguageToggle } from "./LanguageToggle";
import { SiteSearchForm } from "./SiteSearchForm";

export function UtilityBar() {
  const { strings } = useLanguage();
  const { step, increase, decrease, reset } = useTextSize();

  const textSizeLabels = [strings.header.textSizeNormal, strings.header.textSizeLarge, strings.header.textSizeLargest];

  return (
    <div className="bg-gov-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-1 text-xs sm:gap-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center" role="group" aria-label={strings.header.textSizeGroupLabel}>
            <button
              type="button"
              onClick={decrease}
              aria-label={strings.header.seatUnder}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-xs font-bold hover:bg-white/10"
            >
              A-
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label={strings.header.seatReset}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-sm font-bold hover:bg-white/10"
            >
              A
            </button>
            <button
              type="button"
              onClick={increase}
              aria-label={strings.header.seatOver}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded text-base font-bold hover:bg-white/10"
            >
              A+
            </button>
            <span className="sr-only" aria-live="polite">
              {textSizeLabels[step]}
            </span>
          </div>
          <Link href="/contact" className="flex min-h-[44px] items-center hover:underline">
            {strings.header.contactLink}
          </Link>
          <a
            href={`tel:${strings.footer.phone.replace(/[^0-9+]/g, "")}`}
            className="hidden min-h-[44px] items-center hover:underline sm:flex"
          >
            {strings.footer.phone}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <SiteSearchForm variant="utility" id="utility-search" />
          <LanguageToggle variant="utility" />
        </div>
      </div>
    </div>
  );
}
