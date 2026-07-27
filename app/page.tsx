"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useLanguage, localize, dateLocale } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { notices } from "@/content/notices";
import { meetings } from "@/content/meetings";
import { HomeHero } from "@/components/layout/HomeHero";

function formatDate(isoDate: string, language: Language) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(dateLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  const { strings, language } = useLanguage();

  const todayIso = new Date().toISOString().slice(0, 10);

  const localizedNotices = notices.map((notice) => localize(notice, language));
  const localizedMeetings = meetings.map((meeting) => localize(meeting, language));

  const activeAlerts = localizedNotices.filter((notice) => notice.active && notice.urgent);
  const recentNotices = [...localizedNotices].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  const upcomingMeetings = [...localizedMeetings]
    .filter((meeting) => meeting.date >= todayIso)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 3);

  const quickLinks = [
    { href: "/services", label: strings.home.servicesCta },
    { href: "/notices", label: strings.home.noticesCta },
    { href: "/meetings", label: strings.home.meetingsCta },
    { href: "/forms", label: strings.home.formsCta },
  ];

  return (
    <div>
      <HomeHero heading={strings.home.heading} mission={strings.home.intro} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <section aria-labelledby="home-alerts-heading">
          <h2 id="home-alerts-heading" className="text-xl font-semibold text-gov-navy">
            {strings.home.alertsHeading}
          </h2>
          {activeAlerts.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-3">
              {activeAlerts.map((notice) => (
                <li key={notice.id}>
                  <Link
                    href={`/notices/${notice.id}`}
                    className="flex items-start gap-3 rounded border border-gov-alert bg-gov-surface p-4 hover:border-gov-navy"
                  >
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-alert" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-gov-navy">{notice.title}</span>
                      <span className="mt-1 block text-sm text-gov-slate">{formatDate(notice.date, language)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gov-slate">{strings.home.noAlertsMessage}</p>
          )}
        </section>

        <section aria-labelledby="home-quick-links-heading" className="mt-8">
          <h2 id="home-quick-links-heading" className="text-xl font-semibold text-gov-navy">
            {strings.home.quickLinksHeading}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded border border-gov-border bg-gov-surface px-5 py-4 font-medium text-gov-navy hover:border-gov-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section aria-labelledby="home-meetings-heading">
            <h2 id="home-meetings-heading" className="text-xl font-semibold text-gov-navy">
              {strings.home.upcomingMeetingsHeading}
            </h2>
            {upcomingMeetings.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-3">
                {upcomingMeetings.map((meeting) => (
                  <li key={meeting.id} className="rounded border border-gov-border bg-gov-surface p-4">
                    <p className="font-medium text-gov-navy">{meeting.title}</p>
                    <p className="mt-1 text-sm text-gov-slate">
                      {formatDate(meeting.date, language)} {strings.meetings.atTime} {meeting.time}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-gov-slate">{strings.meetings.noUpcoming}</p>
            )}
            <Link
              href="/meetings"
              className="mt-4 inline-block text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
            >
              {strings.home.viewAllMeetings}
            </Link>
          </section>

          <section aria-labelledby="home-notices-heading">
            <h2 id="home-notices-heading" className="text-xl font-semibold text-gov-navy">
              {strings.home.recentNoticesHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {recentNotices.map((notice) => (
                <li key={notice.id} className="rounded border border-gov-border bg-gov-surface p-4">
                  <Link
                    href={`/notices/${notice.id}`}
                    className="font-medium text-gov-navy underline underline-offset-2 hover:text-gov-blue"
                  >
                    {notice.title}
                  </Link>
                  <p className="mt-1 text-sm text-gov-slate">{formatDate(notice.date, language)}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/notices"
              className="mt-4 inline-block text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy"
            >
              {strings.home.viewAllNotices}
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
