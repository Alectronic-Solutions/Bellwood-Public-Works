"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  trail: Crumb[];
}

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  const { strings } = useLanguage();
  const items: Crumb[] = [{ href: "/", label: strings.breadcrumbs.homeLabel }, ...trail];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-gov-border bg-gov-surface">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-1 px-4 py-3 text-sm text-gov-slate sm:px-6">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-gov-slate" aria-hidden="true" />}
              {item.href && !isLast ? (
                <Link href={item.href} className="text-gov-blue hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-gov-navy" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
