"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useTextSize } from "@/lib/textSize";
import { LanguageToggle } from "./LanguageToggle";

export function UtilityBar() {
  const { strings } = useLanguage();
  const { step, increase, decrease, reset } = useTextSize();

  const textSizeLabels = [strings.header.textSizeNormal, strings.header.textSizeLarge, strings.header.textSizeLargest];

  return (
    <div className="bg-gov-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-2 text-xs sm:gap-3 sm:px-6">
        <div className="flex items-center gap-1 sm:gap-4">
          <div className="flex items-center" role="group" aria-label={strings.header.textSizeGroupLabel}>
            <button
              type="button"
              onClick={decrease}
              aria-label={strings.header.seatUnder}
              className="flex min-h-[44px] min-w-[40px] items-center justify-center rounded text-xs font-bold hover:bg-white/10"
            >
              A-
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label={strings.header.seatReset}
              className="flex min-h-[44px] min-w-[40px] items-center justify-center rounded text-sm font-bold hover:bg-white/10"
            >
              A
            </button>
            <button
              type="button"
              onClick={increase}
              aria-label={strings.header.seatOver}
              className="flex min-h-[44px] min-w-[40px] items-center justify-center rounded text-base font-bold hover:bg-white/10"
            >
              A+
            </button>
            <span className="sr-only" aria-live="polite">
              {textSizeLabels[step]}
            </span>
          </div>
          <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden="true" />
          <Link href="/contact" className="flex min-h-[44px] items-center px-1 hover:underline">
            {strings.header.contactLink}
          </Link>
          <a
            href={`tel:${strings.footer.phone.replace(/[^0-9+]/g, "")}`}
            className="hidden min-h-[44px] items-center gap-1.5 hover:underline sm:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {strings.footer.phone}
          </a>
        </div>

        <LanguageToggle variant="utility" />
      </div>
    </div>
  );
}
