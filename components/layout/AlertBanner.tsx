"use client";

import { TriangleAlert } from "lucide-react";
import { notices } from "@/content/notices";
import { useLanguage } from "@/lib/i18n";

export function AlertBanner() {
  const { strings } = useLanguage();
  const urgentNotice = notices.find((notice) => notice.urgent && notice.active);

  if (!urgentNotice) return null;

  return (
    <div role="region" aria-label={strings.alert.urgentLabel} className="bg-gov-surface">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-3 sm:px-6">
        <TriangleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-alert" aria-hidden="true" />
        <div>
          <p className="font-semibold text-gov-navy">{urgentNotice.title}</p>
          <p className="text-sm text-gov-slate">{urgentNotice.body}</p>
        </div>
      </div>
    </div>
  );
}
