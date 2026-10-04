"use client";

import { useMemo, useState } from "react";
import { FileText, MapPin } from "lucide-react";
import { meetings, meetingBodies } from "@/content/meetings";
import { withBasePath } from "@/lib/basePath";
import { useLanguage, localize } from "@/lib/i18n";
import { calendarParts, formatLongDate, todayIso } from "@/lib/dates";
import type { Meeting } from "@/content/types";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

/** Past meetings shown before the archive is expanded. */
const PAST_PREVIEW_COUNT = 6;

export default function MeetingsPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "meetings")!;
  const [body, setBody] = useState("all");
  const [showAllPast, setShowAllPast] = useState(false);

  const localized = useMemo(() => meetings.map((meeting) => localize(meeting, language)), [language]);
  const filtered = useMemo(
    () => (body === "all" ? localized : localized.filter((meeting) => meeting.bodyId === body)),
    [localized, body],
  );

  // todayIso is a build-time constant, so it is not a reactive dependency.
  const upcoming = useMemo(
    () => filtered.filter((meeting) => meeting.date >= todayIso).sort((a, b) => (a.date > b.date ? 1 : -1)),
    [filtered],
  );
  const past = useMemo(
    () => filtered.filter((meeting) => meeting.date < todayIso).sort((a, b) => (a.date < b.date ? 1 : -1)),
    [filtered],
  );
  // Every past meeting is rendered and the older ones are hidden, rather than left out of
  // the markup, so their documents are part of the static export and the link checks.
  const isCollapsed = (index: number) => !showAllPast && index >= PAST_PREVIEW_COUNT;

  // The page changes when the most recent meeting's record is posted, never on a future
  // meeting's date.
  const lastPosted = [...localized].filter((m) => m.date < todayIso).sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const resultsMessage = strings.meetings.resultsCount
    .replace("{upcoming}", String(upcoming.length))
    .replace("{past}", String(past.length));

  function documentLinks(meeting: Meeting) {
    return (
      <>
        {meeting.agendaUrl && (
          <a
            href={withBasePath(meeting.agendaUrl)}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-gov-blue underline underline-offset-2 hover:text-gov-navy"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            {strings.meetings.agendaLabel}
            <span className="sr-only">
              {" "}
              {strings.meetings.forLabel} {meeting.title}, {formatLongDate(meeting.date, language)}
            </span>
            <span className="text-sm text-gov-slate">({strings.meetings.pdfFormat})</span>
          </a>
        )}
        {meeting.minutesUrl && (
          <a
            href={withBasePath(meeting.minutesUrl)}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-gov-blue underline underline-offset-2 hover:text-gov-navy"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            {strings.meetings.minutesLabel}
            <span className="sr-only">
              {" "}
              {strings.meetings.forLabel} {meeting.title}, {formatLongDate(meeting.date, language)}
            </span>
            <span className="text-sm text-gov-slate">({strings.meetings.pdfFormat})</span>
          </a>
        )}
      </>
    );
  }

  return (
    <InteriorLayout
      wide
      section={section}
      currentHref="/meetings"
      headerImage="/images/headers/meetings.jpg"
      breadcrumbs={[{ label: strings.pages.meetingsHeading }]}
      heading={strings.pages.meetingsHeading}
      intro={strings.pages.meetingsIntro}
      lastUpdatedIso={lastPosted?.date ?? todayIso}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/notices", label: strings.nav.notices },
            { href: "/public-records", label: strings.footer.publicRecords },
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-1 sm:max-w-xs">
        <label htmlFor="meeting-body-filter" className="text-sm font-bold text-gov-navy">
          {strings.meetings.bodyFilterLabel}
        </label>
        <select
          id="meeting-body-filter"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setShowAllPast(false);
          }}
          className="min-h-[44px] rounded border border-gov-control-border bg-white px-3 text-base text-gov-slate"
        >
          <option value="all">{strings.meetings.allBodiesLabel}</option>
          {meetingBodies.map((item) => (
            <option key={item.id} value={item.id}>
              {language === "es" ? item.labelEs : item.label}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="mt-3 text-sm text-gov-slate">
        {resultsMessage}
      </p>

      <section aria-labelledby="upcoming-meetings-heading" className="mt-6">
        <h2 id="upcoming-meetings-heading" className="border-b-2 border-gov-navy pb-2 text-2xl font-bold text-gov-navy">
          {strings.meetings.upcomingHeading}
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-gov-slate">{strings.meetings.noUpcoming}</p>
        ) : (
          <ul className="divide-y divide-gov-border">
            {upcoming.map((meeting) => {
              const parts = calendarParts(meeting.date, language);
              return (
                <li key={meeting.id} className="flex gap-4 py-5 sm:gap-5">
                  {/* Repeats the full date given below, so it is hidden from assistive technology. */}
                  <div
                    className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded bg-gov-navy text-white sm:h-20 sm:w-20"
                    aria-hidden="true"
                  >
                    <span className="text-xs font-bold tracking-wide sm:text-sm">{parts.month}</span>
                    <span className="text-2xl font-bold leading-none sm:text-3xl">{parts.day}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold leading-snug text-gov-navy">{meeting.title}</h3>
                    <p className="mt-1 font-bold text-gov-slate">
                      <time dateTime={meeting.date}>
                        <span className="capitalize">{parts.weekday}</span>, {formatLongDate(meeting.date, language)}
                      </time>{" "}
                      {strings.meetings.atTime} <span className="whitespace-nowrap">{meeting.time}</span>
                    </p>
                    <p className="mt-1 flex items-start gap-1.5 text-sm text-gov-slate">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gov-blue" aria-hidden="true" />
                      {meeting.location}
                    </p>
                    <p className="mt-2 text-gov-slate">{meeting.body}</p>
                    <div className="mt-1 flex flex-wrap gap-x-6">
                      {meeting.agendaUrl ? (
                        documentLinks(meeting)
                      ) : (
                        <p className="mt-2 text-sm italic text-gov-slate">{strings.home.agendaPending}</p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="past-meetings-heading" className="mt-10">
        <h2 id="past-meetings-heading" className="border-b-2 border-gov-navy pb-2 text-2xl font-bold text-gov-navy">
          {strings.meetings.pastHeading}
        </h2>
        {past.length === 0 ? (
          <p className="mt-4 text-gov-slate">{strings.meetings.noPast}</p>
        ) : (
          <>
            <ul id="past-meetings-list" className="divide-y divide-gov-border sm:hidden">
              {past.map((meeting, index) => (
                <li key={meeting.id} hidden={isCollapsed(index)} className="py-4">
                  <p className="font-bold text-gov-navy">{meeting.title}</p>
                  <p className="mt-1 text-sm text-gov-slate">
                    {formatLongDate(meeting.date, language)} {strings.meetings.atTime} {meeting.time}
                  </p>
                  <p className="mt-1 text-sm text-gov-slate">{meeting.body}</p>
                  <div className="flex flex-wrap gap-x-6">{documentLinks(meeting)}</div>
                </li>
              ))}
            </ul>

            <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
              <table id="past-meetings-table" className="w-full border-collapse text-left">
                <caption className="sr-only">{strings.meetings.pastHeading}</caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-[9.5rem] px-4 py-3 font-bold">
                      {strings.tables.date}
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      {strings.tables.meeting}
                    </th>
                    <th scope="col" className="w-[10rem] px-4 py-3 font-bold">
                      {strings.tables.documents}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {past.map((meeting, index) => (
                    <tr key={meeting.id} hidden={isCollapsed(index)} className="align-top">
                      <td className="px-4 py-3 text-gov-slate">
                        <time dateTime={meeting.date}>{formatLongDate(meeting.date, language)}</time>
                        <br />
                        <span className="text-sm">{meeting.time}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-gov-navy">{meeting.title}</p>
                        <p className="mt-1 text-sm text-gov-slate">{meeting.body}</p>
                      </td>
                      <td className="px-4 py-1">
                        <div className="flex flex-col">{documentLinks(meeting)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {past.length > PAST_PREVIEW_COUNT && (
              <button
                type="button"
                onClick={() => setShowAllPast((value) => !value)}
                aria-expanded={showAllPast}
                aria-controls="past-meetings-list past-meetings-table"
                className="mt-5 inline-flex min-h-[44px] items-center rounded border-2 border-gov-navy px-5 font-bold text-gov-navy hover:bg-gov-surface"
              >
                {showAllPast
                  ? strings.meetings.showFewerPast
                  : strings.meetings.showAllPast.replace("{count}", String(past.length))}
              </button>
            )}
          </>
        )}
      </section>
    </InteriorLayout>
  );
}
