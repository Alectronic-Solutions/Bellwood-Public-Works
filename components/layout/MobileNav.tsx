"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

interface MobileNavProps {
  open: boolean;
  onNavigate: () => void;
}

export function MobileNav({ open, onNavigate }: MobileNavProps) {
  const { strings } = useLanguage();

  if (!open) return null;

  const links = [
    { href: "/", label: strings.nav.home },
    { href: "/services", label: strings.nav.services },
    { href: "/notices", label: strings.nav.notices },
    { href: "/meetings", label: strings.nav.meetings },
    { href: "/forms", label: strings.nav.forms },
  ];

  return (
    <nav aria-label="Primary" className="border-t border-gov-border bg-white md:hidden">
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href} className="border-b border-gov-border last:border-b-0">
            <Link
              href={link.href}
              onClick={onNavigate}
              className="block px-4 py-3 text-gov-navy hover:bg-gov-surface"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
