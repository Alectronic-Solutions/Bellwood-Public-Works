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
 * WCAG 2.2.2 requires a way to stop movement that lasts longer than five seconds, so the
 * pause control is rendered whenever the track is scrolling and is a real button rather
 * than a hover affordance.
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
  // A two-copy track only loops seamlessly when one copy is wider than the viewport.
  // With a single short notice it is not, which leaves visible dead space, so the list
  // is repeated until it overfills the viewport and the copies are measured at runtime.
  const [copies, setCopies] = useState(2);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionAllowed(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionAllowed) return;

    const fit = () => {
      const viewport = viewportRef.current;
      const list = listRef.current;
      if (!viewport || !list) return;
      const listWidth = list.getBoundingClientRect().width;
      if (listWidth === 0) return;
      // Always keep at least two copies so the loop has something to follow with.
      setCopies(Math.max(2, Math.ceil(viewport.clientWidth / listWidth) + 1));
    };

    fit();
    const observer = new ResizeObserver(fit);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [motionAllowed, language, urgentNotices.length]);

  if (urgentNotices.length === 0) return null;

  const renderItems = (decorative = false) =>
    urgentNotices.map((notice) => (
      <li key={notice.id} className={motionAllowed ? "shrink-0" : undefined}>
        <Link
          href={`/notices/${notice.id}`}
          // The duplicated copy exists only to close the loop visually, so it is taken
          // out of the tab order as well as hidden, or focus vanishes into it.
          tabIndex={decorative ? -1 : undefined}
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
              <div
                className="marquee-track"
                data-paused={paused ? "true" : undefined}
                style={{ "--marquee-copies": copies } as CSSProperties}
              >
                {/* Only the first copy is real. The rest exist to close the loop and are
                    hidden from assistive tech so the notices are announced once. */}
                <ul ref={listRef} className="flex shrink-0 items-center gap-10 pr-10">
                  {renderItems()}
                </ul>
                {Array.from({ length: copies - 1 }, (_, index) => (
                  <ul
                    key={`copy-${index}`}
                    className="flex shrink-0 items-center gap-10 pr-10"
                    aria-hidden="true"
                  >
                    {renderItems(true)}
                  </ul>
                ))}
              </div>
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
          <ul className="flex min-w-0 flex-col gap-1">{renderItems()}</ul>
        )}
      </div>
    </div>
  );
}
