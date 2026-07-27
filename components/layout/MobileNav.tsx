"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { primaryNav } from "@/content/nav";

interface MobileNavProps {
  open: boolean;
  onNavigate: () => void;
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  const { language } = useLanguage();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
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
    <nav aria-label="Primary" className="border-t border-gov-border bg-white md:hidden">
      <ul className="flex flex-col">
        {primaryNav.map((item, index) => {
          const label = language === "es" ? item.labelEs : item.label;
          const hasColumns = Boolean(item.columns && item.columns.length > 0);
          const isExpanded = expandedIndex === index;
          const sectionId = `mobile-nav-section-${index}`;

          return (
            <li key={item.href} className="border-b border-gov-border">
              {hasColumns ? (
                <>
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={sectionId}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gov-navy hover:bg-gov-surface"
                  >
                    {label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isExpanded ? (
                    <div id={sectionId} className="bg-gov-surface px-4 pb-3">
                      {item.columns!.map((column) => {
                        const columnHeading = language === "es" ? column.headingEs : column.heading;
                        return (
                          <div key={column.heading} className="mb-3 last:mb-0">
                            <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-gov-slate">
                              {columnHeading}
                            </h3>
                            <ul className="space-y-1">
                              {column.links.map((link) => {
                                const linkLabel = language === "es" ? link.labelEs : link.label;
                                return (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      onClick={onNavigate}
                                      className="block py-1 text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
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
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onNavigate}
                  className="block px-4 py-3 font-medium text-gov-navy hover:bg-gov-surface"
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
