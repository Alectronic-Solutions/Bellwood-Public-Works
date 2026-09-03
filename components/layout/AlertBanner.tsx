"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { Pause, Play, TriangleAlert } from "lucide-react";
import { notices } from "@/content/notices";
import { useLanguage, localize } from "@/lib/i18n";

/**
 * An earlier version of this banner was a CSS marquee that clipped its own text once the
 * animation was suppressed, because the clipping came from the same element that moved.
 * The fix is to treat motion as an enhancement rather than the base layout: the static,
 * wrapping list below is what renders by default, and the scrolling track is only built
 * when we have confirmed the viewer accepts motion.
 *
 * The track holds one copy of the notices and travels the full width of the viewport, so
 * exactly one copy is on screen at a time. Repeating the list to tile the bar was tried
 * and looked wrong with a single short notice: several copies sat side by side and the
 * leading one was clipped at the viewport edge.
 *
 * WCAG 2.2.2 requires a way to stop movement that lasts longer than five seconds, so the
 * pause control is a real button rather than a hover affordance.
 */
export function AlertBanner() {
  const { strings, language } = useLanguage();
  const urgentNotices = notices
    .filter((notice) => notice.urgent && notice.active)
    .map((notice) => localize(notice, language));

  // Starts false so the server render and the first client render agree; the effect
  // below opts into motion only after hydration, and only if the viewer allows it.
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [paused, setPaused] = useState(false);
  // The keyframe needs the viewport's width in pixels: a percentage there would resolve
  // against the track instead, starting a short notice already inside the bar.
  const [span, setSpan] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionAllowed) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => setSpan(viewport.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [motionAllowed]);

  if (urgentNotices.length === 0) return null;

  const items = urgentNotices.map((notice) => (
    <li key={notice.id} className={motionAllowed ? "shrink-0" : undefined}>
      <Link
        href={`/notices/${notice.id}`}
        className="text-base font-medium text-gov-navy underline underline-offset-2 hover:text-gov-blue"
      >
        {notice.title}
      </Link>
    </li>
  ));

  return (
    <div
      role="region"
      aria-label={strings.alert.urgentLabel}
      className="border-b border-gov-alert-border bg-gov-alert-bg"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 sm:px-6">
        <TriangleAlert className="mt-1 h-5 w-5 flex-shrink-0 text-gov-alert" aria-hidden="true" />

        {motionAllowed ? (
          <>
            <div ref={viewportRef} className="marquee-viewport min-w-0 flex-1">
              <ul
                className="marquee-track flex items-center gap-10"
                data-paused={paused ? "true" : undefined}
                style={
                  span === null ? undefined : ({ "--marquee-span": `${span}px` } as CSSProperties)
                }
              >
                {items}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border border-gov-alert-border text-gov-navy hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gov-blue"
            >
              {paused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {paused ? strings.alert.resumeScrolling : strings.alert.pauseScrolling}
              </span>
            </button>
          </>
        ) : (
          <ul className="flex min-w-0 flex-col gap-1">{items}</ul>
        )}
      </div>
    </div>
  );
}
