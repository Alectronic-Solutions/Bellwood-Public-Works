"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { primaryNav } from "@/content/nav";
import { isNavItemCurrent } from "./PrimaryNav";

interface MobileNavProps {
  open: boolean;
  onNavigate: () => void;
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  const { strings, language } = useLanguage();
  const pathname = usePathname();
  // Attached to whichever control renders first, button or link. Attaching it only to
  // the link branch silently did nothing, because the first nav item has sub-columns
  // and so renders a button.
  const firstControlRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      firstControlRef.current?.focus();
    } else {
      setExpandedIndex(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onNavigate();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onNavigate]);

  if (!open) return null;

  return (
    <nav
      aria-label={strings.header.mobileNavLabel}
      className="border-b border-gov-border bg-white shadow-[0_6px_12px_rgba(27,58,92,0.12)] lg:hidden"
    >
      <ul className="flex flex-col">
        {primaryNav.map((item, index) => {
          const label = language === "es" ? item.labelEs : item.label;
          const hasColumns = Boolean(item.columns && item.columns.length > 0);
          const isExpanded = expandedIndex === index;
          const sectionId = `mobile-nav-section-${index}`;
          const isFirst = index === 0;
          const isCurrent = isNavItemCurrent(item, pathname);
          const rowClass = `flex min-h-[52px] w-full items-center justify-between border-l-4 px-4 py-3 text-left font-bold text-gov-navy hover:bg-gov-surface ${
            isCurrent ? "border-gov-navy bg-gov-surface" : "border-transparent"
          }`;

          return (
            <li key={item.href + item.label} className="border-b border-gov-border last:border-b-0">
              {hasColumns ? (
                <>
                  <button
                    ref={isFirst ? (firstControlRef as React.RefObject<HTMLButtonElement>) : undefined}
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={sectionId}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className={rowClass}
                  >
                    {label}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isExpanded ? (
                    <div id={sectionId} className="border-t border-gov-border bg-gov-surface px-5 pb-3 pt-3">
                      {item.columns!.map((column, columnIndex) => {
                        const columnHeading = language === "es" ? column.headingEs : column.heading;
                        const columnLabelId = `${sectionId}-col-${columnIndex}`;
                        return (
                          <div key={column.heading} className="mb-3 last:mb-0">
                            {/* Not a heading: this panel sits above the page h1, so a real
                                heading here would break the document outline. */}
                            <p
                              id={columnLabelId}
                              className="mb-1 text-xs font-bold uppercase tracking-wide text-gov-slate"
                            >
                              {columnHeading}
                            </p>
                            <ul className="space-y-1" aria-labelledby={columnLabelId}>
                              {column.links.map((link) => {
                                const linkLabel = language === "es" ? link.labelEs : link.label;
                                return (
                                  <li key={link.href + link.label}>
                                    <Link
                                      href={link.href}
                                      onClick={onNavigate}
                                      className="flex min-h-[44px] items-center py-2 text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                                    >
                                      {linkLabel}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              ) : (
                <Link
                  ref={isFirst ? (firstControlRef as React.RefObject<HTMLAnchorElement>) : undefined}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isCurrent ? "true" : undefined}
                  className={rowClass}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
