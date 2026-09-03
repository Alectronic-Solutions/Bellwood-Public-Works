"use client";

import { useMemo } from "react";
import { meetings } from "@/content/meetings";
import { useLanguage, localize, dateLocale } from "@/lib/i18n";
import { todayIso } from "@/lib/dates";
import type { Language } from "@/lib/i18n";
import type { Meeting } from "@/content/types";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

function formatDate(isoDate: string, language: Language) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(dateLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MeetingsPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "meetings")!;

  const localized = useMemo(() => meetings.map((meeting) => localize(meeting, language)), [language]);

  // todayIso is a build-time constant, so it is not a reactive dependency.
  const upcoming = useMemo(
    () => localized.filter((meeting) => meeting.date >= todayIso).sort((a, b) => (a.date > b.date ? 1 : -1)),
    [localized],
  );
  const past = useMemo(
    () => localized.filter((meeting) => meeting.date < todayIso).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [localized],
  );

  function renderTable(list: Meeting[], emptyMessage: string, captionLabel: string) {
    if (list.length === 0) {
      return <p className="mt-4 text-gov-slate">{emptyMessage}</p>;
    }
    return (
      <>
        <ul className="mt-4 flex flex-col gap-3 sm:hidden">
          {list.map((meeting) => (
            <li key={meeting.id} className="border border-gov-border p-4">
              <p className="font-medium text-gov-navy">{meeting.title}</p>
              <p className="mt-1 text-gov-slate">{meeting.body}</p>
              <p className="mt-2 text-sm text-gov-slate">
                {formatDate(meeting.date, language)} {strings.meetings.atTime} {meeting.time}
                <br />
                {meeting.location}
              </p>
              {(meeting.agendaUrl || meeting.minutesUrl) && (
                <div className="mt-2 flex flex-col gap-1 text-sm">
                  {meeting.agendaUrl && (
                    <a href={meeting.agendaUrl} className="link-body">
                      {strings.meetings.agendaLabel}
                      <span className="sr-only">
                        {" "}
                        {strings.meetings.forLabel} {meeting.title} ({strings.meetings.pdfFormat})
                      </span>
                    </a>
                  )}
                  {meeting.minutesUrl && (
                    <a href={meeting.minutesUrl} className="link-body">
                      {strings.meetings.minutesLabel}
                      <span className="sr-only">
                        {" "}
                        {strings.meetings.forLabel} {meeting.title} ({strings.meetings.pdfFormat})
                      </span>
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
          <table className="w-full min-w-[28rem] border-collapse text-left">
            <caption className="sr-only">{captionLabel}</caption>
            <thead>
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">
                  {strings.tables.meeting}
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  {strings.tables.dateAndLocation}
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  {strings.tables.documents}
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((meeting) => (
                <tr key={meeting.id} className="align-top">
                  <td className="px-3 py-2">
                    <p className="font-medium text-gov-navy">{meeting.title}</p>
                    <p className="mt-1 text-gov-slate">{meeting.body}</p>
                  </td>
                  <td className="px-3 py-2 text-gov-slate">
                    {formatDate(meeting.date, language)} {strings.meetings.atTime} {meeting.time}
                    <br />
                    {meeting.location}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    <div className="flex flex-col gap-1">
                      {meeting.agendaUrl && (
                        <a href={meeting.agendaUrl} className="link-body">
                          {strings.meetings.agendaLabel}
                          <span className="sr-only">
                            {" "}
                            {strings.meetings.forLabel} {meeting.title} ({strings.meetings.pdfFormat})
                          </span>
                        </a>
                      )}
                      {meeting.minutesUrl && (
                        <a href={meeting.minutesUrl} className="link-body">
                          {strings.meetings.minutesLabel}
                          <span className="sr-only">
                            {" "}
                            {strings.meetings.forLabel} {meeting.title} ({strings.meetings.pdfFormat})
                          </span>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <InteriorLayout
      section={section}
      currentHref="/meetings"
      headerImage="/images/headers/meetings.jpg"
      breadcrumbs={[{ label: strings.pages.meetingsHeading }]}
      heading={strings.pages.meetingsHeading}
      intro={strings.pages.meetingsIntro}
      lastUpdatedIso={upcoming[0]?.date ?? past[0]?.date ?? "2026-07-26"}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/notices", label: strings.nav.notices },
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
          ]}
        />
      }
    >
      <section aria-labelledby="upcoming-meetings-heading">
        <h2 id="upcoming-meetings-heading" className="text-xl font-semibold text-gov-navy">
          {strings.meetings.upcomingHeading}
        </h2>
        {renderTable(upcoming, strings.meetings.noUpcoming, strings.meetings.upcomingHeading)}
      </section>

      <section aria-labelledby="past-meetings-heading" className="mt-8">
        <h2 id="past-meetings-heading" className="text-xl font-semibold text-gov-navy">
          {strings.meetings.pastHeading}
        </h2>
        {renderTable(past, strings.meetings.noPast, strings.meetings.pastHeading)}
      </section>
    </InteriorLayout>
  );
}
