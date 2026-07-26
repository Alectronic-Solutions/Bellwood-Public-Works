"use client";

import { meetings } from "@/content/meetings";
import { useLanguage } from "@/lib/i18n";

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MeetingsPage() {
  const { strings } = useLanguage();
  const sorted = [...meetings].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">{strings.pages.meetingsHeading}</h1>
      <p className="mt-4 max-w-2xl text-gov-slate">{strings.pages.meetingsIntro}</p>

      <ul className="mt-8 flex flex-col gap-4">
        {sorted.map((meeting) => (
          <li key={meeting.id} className="rounded border border-gov-border bg-gov-surface p-5">
            <h2 className="text-lg font-semibold text-gov-navy">{meeting.title}</h2>
            <p className="mt-1 text-sm text-gov-slate">
              {formatDate(meeting.date)} at {meeting.time} &middot; {meeting.location}
            </p>
            <p className="mt-3 text-sm text-gov-slate">{meeting.body}</p>
            <div className="mt-3 flex gap-4 text-sm">
              {meeting.agendaUrl && (
                <a href={meeting.agendaUrl} className="text-gov-blue hover:underline">
                  Agenda
                </a>
              )}
              {meeting.minutesUrl && (
                <a href={meeting.minutesUrl} className="text-gov-blue hover:underline">
                  Minutes
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
