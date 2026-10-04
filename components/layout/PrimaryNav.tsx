"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { primaryNav, type NavItem } from "@/content/nav";

/** True when the current path sits inside a nav item's section. */
export function isNavItemCurrent(item: NavItem, pathname: string | null): boolean {
  if (!pathname) return false;
  const path = pathname.replace(/\/$/, "") || "/";
  return item.matches.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export function PrimaryNav() {
  const { strings, language } = useLanguage();
  const pathname = usePathname();
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

  // A route change from inside a menu should never leave the menu hanging open.
  useEffect(() => {
    setOpenIndex(null);
  }, [pathname]);

  return (
    <nav
      aria-label={strings.header.primaryNavLabel}
      ref={navRef}
      className="sticky top-0 z-30 hidden bg-gov-navy shadow-[0_2px_4px_rgba(0,0,0,0.15)] lg:block"
    >
      <ul className="mx-auto flex max-w-6xl items-stretch px-2 sm:px-4">
        {primaryNav.map((item, index) => {
          const label = language === "es" ? item.labelEs : item.label;
          const isOpen = openIndex === index;
          const hasColumns = Boolean(item.columns && item.columns.length > 0);
          const menuId = `nav-menu-${index}`;
          const isCurrent = isNavItemCurrent(item, pathname);
          // Menus in the right half open leftward so they never run off the viewport.
          const alignRight = index >= Math.ceil(primaryNav.length / 2);

          // The current section carries a white rule along its base, and expanded menus
          // a lighter fill, so the state never depends on color alone.
          const triggerClass = `relative flex h-full items-center gap-1 px-3 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10 xl:px-4 ${
            isOpen ? "bg-white/15" : ""
          } ${
            isCurrent
              ? "after:absolute after:inset-x-3 after:bottom-0 after:h-1 after:rounded-t after:bg-white xl:after:inset-x-4"
              : ""
          }`;

          return (
            <li
              key={item.href + item.label}
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
                  className={triggerClass}
                >
                  {label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">
                    {isOpen ? strings.header.navDropdownClose : strings.header.navDropdownOpen} {label}
                  </span>
                </button>
              ) : (
                <Link href={item.href} aria-current={isCurrent ? "true" : undefined} className={triggerClass}>
                  {label}
                </Link>
              )}

              {hasColumns && isOpen ? (
                <div
                  id={menuId}
                  className={`absolute top-full z-20 w-max min-w-[18rem] max-w-[calc(100vw-2rem)] border border-t-4 border-gov-border border-t-gov-blue bg-white p-6 shadow-[0_8px_24px_rgba(27,58,92,0.18)] ${
                    alignRight ? "right-0" : "left-0"
                  } ${item.columns!.length > 2 ? "lg:min-w-[44rem]" : item.columns!.length > 1 ? "lg:min-w-[30rem]" : ""}`}
                >
                  <div
                    className={`grid grid-cols-1 gap-8 ${
                      item.columns!.length > 2 ? "lg:grid-cols-3" : item.columns!.length > 1 ? "lg:grid-cols-2" : ""
                    }`}
                  >
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
                            className="mb-3 border-b border-gov-border pb-2 text-xs font-bold uppercase tracking-wide text-gov-navy"
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
                                    onClick={() => setOpenIndex(null)}
                                    className="block py-1.5 text-base text-gov-blue underline-offset-2 hover:text-gov-navy hover:underline"
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
