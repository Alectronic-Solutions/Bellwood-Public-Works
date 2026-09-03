"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { primaryNav } from "@/content/nav";

export function PrimaryNav() {
  const { strings, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (openIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        triggerRefs.current[openIndex as number]?.focus();
        setOpenIndex(null);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openIndex]);

  return (
    <nav
      aria-label={strings.header.primaryNavLabel}
      ref={navRef}
      className="sticky top-0 z-30 hidden border-b border-white/10 bg-gov-navy md:block"
    >
      <ul className="mx-auto flex max-w-6xl items-stretch px-4 sm:px-6">
        {primaryNav.map((item, index) => {
          const label = language === "es" ? item.labelEs : item.label;
          const isOpen = openIndex === index;
          const hasColumns = Boolean(item.columns && item.columns.length > 0);
          const menuId = `nav-menu-${index}`;

          return (
            <li
              key={item.href}
              className="relative"
              onBlur={(event) => {
                if (hasColumns && isOpen && !event.currentTarget.contains(event.relatedTarget as Node)) {
                  setOpenIndex(null);
                }
              }}
            >
              {hasColumns ? (
                <button
                  ref={(el) => {
                    triggerRefs.current[index] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={menuId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-white/10"
                >
                  {label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">
                    {isOpen ? strings.header.navDropdownClose : strings.header.navDropdownOpen} {label}
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-medium uppercase tracking-wide text-white hover:bg-white/10"
                >
                  {label}
                </Link>
              )}

              {hasColumns && isOpen ? (
                <div
                  id={menuId}
                  className="absolute left-0 top-full z-20 w-max min-w-[18rem] max-w-[calc(100vw-2rem)] border border-gov-border bg-white p-5 lg:min-w-[36rem]"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {item.columns!.map((column, columnIndex) => {
                      const columnHeading = language === "es" ? column.headingEs : column.heading;
                      const columnLabelId = `${menuId}-col-${columnIndex}`;
                      return (
                        <div key={column.heading}>
                          {/* Not a heading: this menu opens above the page h1, so a real
                              heading here would break the document outline. The list below
                              takes its accessible name from this text instead. */}
                          <p
                            id={columnLabelId}
                            className="mb-2 text-xs font-bold uppercase tracking-wide text-gov-navy"
                          >
                            {columnHeading}
                          </p>
                          <ul className="space-y-2" aria-labelledby={columnLabelId}>
                            {column.links.map((link) => {
                              const linkLabel = language === "es" ? link.labelEs : link.label;
                              return (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setOpenIndex(null)}
                                    className="text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
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
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
