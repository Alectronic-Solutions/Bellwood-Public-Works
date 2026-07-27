"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface RelatedLink {
  href: string;
  label: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  const { strings } = useLanguage();

  if (links.length === 0) return null;

  return (
    <section aria-labelledby="related-links-heading" className="rounded border border-gov-border p-4">
      <h2 id="related-links-heading" className="text-xs font-bold uppercase tracking-wide text-gov-slate">
        {strings.sidebar.relatedLinksHeading}
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-start gap-2 text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
            >
              <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
