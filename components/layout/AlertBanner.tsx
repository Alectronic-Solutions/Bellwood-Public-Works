"use client";

import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { notices } from "@/content/notices";
import { useLanguage, localize } from "@/lib/i18n";

export function AlertBanner() {
  const { strings, language } = useLanguage();
  const urgentNotices = notices
    .filter((notice) => notice.urgent && notice.active)
    .map((notice) => localize(notice, language));

  if (urgentNotices.length === 0) return null;

  return (
    <div
      role="region"
      aria-label={strings.alert.urgentLabel}
      className="border-b border-gov-alert-border bg-gov-alert-bg"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 sm:px-6">
        <TriangleAlert className="mt-1 h-5 w-5 flex-shrink-0 text-gov-alert" aria-hidden="true" />
        <ul className="flex min-w-0 flex-col gap-1">
          {urgentNotices.map((notice) => (
            <li key={notice.id}>
              <Link
                href={`/notices/${notice.id}`}
                className="text-base font-medium text-gov-navy underline underline-offset-2 hover:text-gov-blue"
              >
                {notice.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
