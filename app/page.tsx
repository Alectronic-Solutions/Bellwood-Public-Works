"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function HomePage() {
  const { strings } = useLanguage();

  const cards = [
    { href: "/services", label: strings.home.servicesCta },
    { href: "/notices", label: strings.home.noticesCta },
    { href: "/meetings", label: strings.home.meetingsCta },
    { href: "/forms", label: strings.home.formsCta },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">{strings.home.heading}</h1>
      <p className="mt-4 max-w-2xl text-gov-slate">{strings.home.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded border border-gov-border bg-gov-surface px-5 py-4 font-medium text-gov-navy hover:border-gov-blue"
          >
            {card.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
