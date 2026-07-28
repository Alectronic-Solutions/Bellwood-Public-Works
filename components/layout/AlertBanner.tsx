"use client";

import { useState } from "react";
import Link from "next/link";
import { TriangleAlert, Pause, Play } from "lucide-react";
import { notices } from "@/content/notices";
import { useLanguage } from "@/lib/i18n";

export function AlertBanner() {
  const { strings } = useLanguage();
  const [paused, setPaused] = useState(false);
  const urgentNotice = notices.find((notice) => notice.urgent && notice.active);

  if (!urgentNotice) return null;

  const message = `${urgentNotice.title}: ${urgentNotice.body}`;

  return (
    <div
      role="region"
      aria-label={strings.alert.urgentLabel}
      className="flex min-h-[44px] items-center gap-2 border-b border-gov-alert-border bg-gov-alert-bg py-1.5 pl-3 pr-2"
    >
      <TriangleAlert className="h-5 w-5 flex-shrink-0 text-gov-alert" aria-hidden="true" />
      <div className="min-w-0 flex-1 overflow-hidden">
        <div
          className="flex w-max gap-24 whitespace-nowrap motion-safe:animate-marquee motion-safe:[animation-play-state:var(--marquee-state)]"
          style={{ "--marquee-state": paused ? "paused" : "running" } as React.CSSProperties}
        >
          <Link href={`/notices/${urgentNotice.id}`} className="text-base font-medium text-gov-navy hover:underline">
            {message}
          </Link>
          <Link
            href={`/notices/${urgentNotice.id}`}
            className="text-base font-medium text-gov-navy hover:underline"
            aria-hidden="true"
            tabIndex={-1}
          >
            {message}
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className="flex min-h-[44px] min-w-[44px] flex-shrink-0 items-center justify-center rounded text-gov-navy hover:bg-white/50"
        aria-pressed={paused}
        aria-label={paused ? strings.alert.resumeScrolling : strings.alert.pauseScrolling}
      >
        {paused ? <Play className="h-5 w-5" aria-hidden="true" /> : <Pause className="h-5 w-5" aria-hidden="true" />}
      </button>
    </div>
  );
}
