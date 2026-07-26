"use client";

import { notices } from "@/content/notices";
import { useLanguage } from "@/lib/i18n";

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticesPage() {
  const { strings } = useLanguage();
  const sorted = [...notices].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">{strings.pages.noticesHeading}</h1>
      <p className="mt-4 max-w-2xl text-gov-slate">{strings.pages.noticesIntro}</p>

      <ul className="mt-8 flex flex-col gap-4">
        {sorted.map((notice) => (
          <li key={notice.id} className="rounded border border-gov-border bg-gov-surface p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-gov-navy">{notice.title}</h2>
              {notice.urgent && notice.active && (
                <span className="rounded bg-gov-alert px-2 py-0.5 text-xs font-semibold text-white">
                  {strings.alert.urgentLabel}
                </span>
              )}
              {!notice.active && (
                <span className="rounded border border-gov-border px-2 py-0.5 text-xs font-medium text-gov-slate">
                  {strings.alert.archivedLabel}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gov-slate">{formatDate(notice.date)}</p>
            <p className="mt-3 text-sm text-gov-slate">{notice.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
