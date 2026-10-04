"use client";

import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage, localize } from "@/lib/i18n";
import { calendarParts, expandDateTokens, formatLongDate, todayIso } from "@/lib/dates";
import { notices } from "@/content/notices";
import { meetings } from "@/content/meetings";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { forms } from "@/content/forms";
import { quickActions } from "@/content/nav";
import { HomeHero } from "@/components/layout/HomeHero";
import { RelatedDocuments } from "@/components/layout/RelatedDocuments";
import { quickActionIcons, serviceIcons } from "@/lib/icons";
import { withBasePath } from "@/lib/basePath";

// White text sits on each of these, and all four clear 4.5:1 against white.
const projectStatusStyles: Record<string, string> = {
  Planning: "bg-gov-slate",
  Design: "bg-gov-slate",
  "In Construction": "bg-gov-blue",
  Completed: "bg-gov-success",
};

function SectionHeader({
  id,
  title,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 border-b-2 border-gov-navy pb-2">
      <h2 id={id} className="text-2xl font-bold text-gov-navy">
        {title}
      </h2>
      {href && linkLabel ? (
        <Link
          href={href}
          className="inline-flex min-h-[44px] items-center gap-1 text-base font-bold text-gov-blue underline-offset-2 hover:text-gov-navy hover:underline"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const { strings, language } = useLanguage();

  // todayIso is resolved once at build time in lib/dates. Reading the clock here instead
  // would let the prerendered HTML and the hydrated client disagree about what is upcoming.
  const localizedNotices = notices.map((notice) => localize(notice, language));
  const localizedMeetings = meetings.map((meeting) => localize(meeting, language));
  const localizedServices = services.map((service) => localize(service, language));
  const localizedForms = forms.map((form) => localize(form, language));

  const recentNotices = [...localizedNotices].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4);
  const upcomingMeetings = [...localizedMeetings]
    .filter((meeting) => meeting.date >= todayIso)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 4);

  const featuredServices = localizedServices.filter(
    (service, index, all) => all.findIndex((s) => s.category === service.category) === index,
  );

  const activeProjects = projects
    .filter((project) => project.status !== "Completed")
    .slice(0, 3)
    .map((project) => ({
      ...project,
      ...(language === "es" ? project.es : {}),
      statusKey: project.status,
    }));

  const featuredForms = localizedForms.filter((form) => form.featured);
  const mainPhone = strings.footer.phone;

  return (
    <main id="main-content" tabIndex={-1}>
      <HomeHero />

      <section aria-labelledby="home-actions-heading" className="border-b border-gov-border bg-gov-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <h2 id="home-actions-heading" className="text-2xl font-bold text-gov-navy">
            {strings.header.quickActionsHeading}
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:gap-4 md:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = quickActionIcons[action.icon];
              const label = language === "es" ? action.labelEs : action.label;
              return (
                <li key={action.label}>
                  <Link
                    href={action.href}
                    className="group flex h-full min-h-[64px] items-center gap-3 rounded border border-gov-border bg-white px-3 py-3 shadow-card hover:border-gov-blue sm:flex-col sm:justify-center sm:gap-3 sm:px-4 sm:py-6 sm:text-center"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gov-navy text-white group-hover:bg-gov-blue sm:h-14 sm:w-14">
                      {Icon ? <Icon className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" /> : null}
                    </span>
                    <span className="text-base font-bold leading-snug text-gov-navy group-hover:underline">
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <section aria-labelledby="home-notices-heading" className="lg:col-span-2">
            <SectionHeader
              id="home-notices-heading"
              title={strings.home.recentNoticesHeading}
              href="/notices"
              linkLabel={strings.home.viewAllNotices}
            />
            <ul className="divide-y divide-gov-border">
              {recentNotices.map((notice) => (
                <li key={notice.id} className="py-5">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-bold uppercase tracking-wide text-gov-slate">{notice.department}</span>
                    {notice.urgent && notice.active ? (
                      <span className="rounded bg-gov-alert px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                        {strings.alert.urgentLabel}
                      </span>
                    ) : null}
                  </p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">
                    <Link
                      href={`/notices/${notice.id}`}
                      className="text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                    >
                      {notice.title}
                    </Link>
                  </h3>
                  <p className="mt-1 line-clamp-2 text-gov-slate">{expandDateTokens(notice.body, language)}</p>
                  <p className="mt-2 text-sm text-gov-slate">
                    <time dateTime={notice.date}>{formatLongDate(notice.date, language)}</time>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="home-meetings-heading">
            <SectionHeader
              id="home-meetings-heading"
              title={strings.home.upcomingMeetingsHeading}
              href="/meetings"
              linkLabel={strings.home.viewAllMeetings}
            />
            {upcomingMeetings.length > 0 ? (
              <ul className="divide-y divide-gov-border">
                {upcomingMeetings.map((meeting) => {
                  const parts = calendarParts(meeting.date, language);
                  return (
                    <li key={meeting.id} className="flex gap-4 py-5">
                      {/* The date block repeats the date that follows in full, so it is
                          hidden from assistive technology to avoid reading it twice. */}
                      <div
                        className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded bg-gov-navy text-white"
                        aria-hidden="true"
                      >
                        <span className="text-xs font-bold tracking-wide">{parts.month}</span>
                        <span className="text-2xl font-bold leading-none">{parts.day}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold leading-snug text-gov-navy">{meeting.title}</h3>
                        <p className="mt-1 text-sm text-gov-slate">
                          <time dateTime={meeting.date}>
                            <span className="capitalize">{parts.weekday}</span>,{" "}
                            {formatLongDate(meeting.date, language)}
                          </time>
                          , <span className="whitespace-nowrap">{meeting.time}</span>
                        </p>
                        <p className="mt-0.5 text-sm text-gov-slate">{meeting.location}</p>
                        {meeting.agendaUrl ? (
                          <a
                            href={withBasePath(meeting.agendaUrl)}
                            className="mt-1 inline-flex min-h-[44px] items-center text-sm font-bold text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                          >
                            {strings.home.agendaPosted}
                            <span className="sr-only">
                              {" "}
                              {strings.meetings.forLabel} {meeting.title} ({strings.meetings.pdfFormat})
                            </span>
                            <span aria-hidden="true">&nbsp;(PDF)</span>
                          </a>
                        ) : (
                          <p className="mt-1 text-sm italic text-gov-slate">{strings.home.agendaPending}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-gov-slate">{strings.meetings.noUpcoming}</p>
            )}
          </section>
        </div>

        <section aria-labelledby="home-services-heading" className="mt-12">
          <SectionHeader
            id="home-services-heading"
            title={strings.home.servicesShowcaseHeading}
            href="/services"
            linkLabel={strings.home.viewAllServices}
          />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full gap-4 rounded border border-gov-border bg-white p-5 shadow-card hover:border-gov-blue"
                  >
                    {Icon ? <Icon className="mt-1 h-8 w-8 shrink-0 text-gov-blue" aria-hidden="true" /> : null}
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wide text-gov-slate">
                        {service.category}
                      </span>
                      <span className="mt-1 block text-lg font-bold leading-snug text-gov-navy group-hover:underline">
                        {service.name}
                      </span>
                      <span className="mt-1 block text-sm text-gov-slate">{service.summary}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="home-projects-heading" className="mt-12">
          <SectionHeader
            id="home-projects-heading"
            title={strings.home.projectsHeading}
            href="/projects"
            linkLabel={strings.home.viewAllProjects}
          />
          <p className="mt-4 text-gov-slate">{strings.home.projectsIntro}</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {activeProjects.map((project) => (
              <li key={project.id} className="flex flex-col rounded border border-gov-border bg-white shadow-card">
                <div className="border-b border-gov-border p-5">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white ${
                      projectStatusStyles[project.statusKey] ?? "bg-gov-slate"
                    }`}
                  >
                    {project.status}
                  </span>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-gov-navy">{project.name}</h3>
                  <p className="mt-1 text-sm text-gov-slate">{project.division}</p>
                </div>
                <dl className="grid gap-3 bg-gov-surface p-5 text-sm">
                  <div>
                    <dt className="font-bold text-gov-navy">{strings.home.projectBudgetLabel}</dt>
                    <dd className="text-gov-slate">{project.budget}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-gov-navy">{strings.home.projectTimelineLabel}</dt>
                    <dd className="text-gov-slate">{expandDateTokens(project.timeline, language)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="home-report-heading" className="bg-gov-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 id="home-report-heading" className="text-2xl font-bold text-white">
              {strings.home.reportHeading}
            </h2>
            <p className="mt-2 text-white">{strings.home.reportBody}</p>
            <p className="mt-2 font-bold text-white">{strings.home.emergencyNote}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/forms"
              className="inline-flex min-h-[48px] items-center justify-center rounded bg-white px-6 font-bold text-gov-navy hover:bg-gov-surface hover:underline"
            >
              {strings.home.reportIssueCta}
            </Link>
            <a
              href={`tel:${mainPhone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded border-2 border-white px-6 font-bold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {strings.home.callLabel} {mainPhone}
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <section aria-labelledby="home-forms-heading">
            <SectionHeader
              id="home-forms-heading"
              title={strings.home.popularFormsHeading}
              href="/forms"
              linkLabel={strings.home.viewAllForms}
            />
            <div className="mt-2">
              <RelatedDocuments
                showHeading={false}
                ariaLabelledBy="home-forms-heading"
                documents={featuredForms.map((form) => ({
                  href: withBasePath(form.fileUrl),
                  title: form.title,
                  meta: `${form.fileType} · ${form.fileSizeLabel}`,
                }))}
              />
            </div>
          </section>

          <section aria-labelledby="home-contact-heading">
            <SectionHeader id="home-contact-heading" title={strings.home.contactSectionHeading} />
            <dl className="mt-5 grid gap-4 text-gov-slate">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="sr-only">{strings.home.addressLabel}</dt>
                <dd>
                  <address className="not-italic">
                    {strings.footer.addressLine1}
                    <br />
                    {strings.footer.addressLine2}
                  </address>
                </dd>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="sr-only">{strings.departments.phoneLabel}</dt>
                <dd>
                  <a href={`tel:${mainPhone.replace(/[^0-9+]/g, "")}`} className="link-body">
                    {mainPhone}
                  </a>
                  <br />
                  {strings.footer.tty}
                </dd>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="sr-only">{strings.departments.emailLabel}</dt>
                <dd>
                  <a href={`mailto:${strings.footer.email}`} className="link-body">
                    {strings.footer.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="sr-only">{strings.departments.hoursLabel}</dt>
                <dd>{strings.footer.officeHours}</dd>
              </div>
            </dl>
            <Link
              href="/departments"
              className="mt-5 inline-flex min-h-[44px] items-center gap-1 font-bold text-gov-blue underline-offset-2 hover:text-gov-navy hover:underline"
            >
              {strings.home.departmentsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
