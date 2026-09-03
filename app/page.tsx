"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useLanguage, localize, dateLocale } from "@/lib/i18n";
import { todayIso } from "@/lib/dates";
import type { Language } from "@/lib/i18n";
import { notices } from "@/content/notices";
import { meetings } from "@/content/meetings";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { forms } from "@/content/forms";
import { HomeHero } from "@/components/layout/HomeHero";
import { ContactCard } from "@/components/layout/ContactCard";
import { RelatedDocuments } from "@/components/layout/RelatedDocuments";
import { StaffDirectory } from "@/components/layout/StaffDirectory";
import { serviceIcons } from "@/lib/icons";
import { withBasePath } from "@/lib/basePath";

function formatDate(isoDate: string, language: Language) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(dateLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const projectStatusStyles: Record<string, string> = {
  Planning: "bg-gov-slate",
  Design: "bg-gov-slate",
  "In Construction": "bg-gov-blue",
  Completed: "bg-gov-success",
};

export default function HomePage() {
  const { strings, language } = useLanguage();

  // Resolved once at build time in lib/dates. Reading the clock here instead would let
  // the prerendered HTML and the hydrated client disagree about what counts as upcoming.

  const localizedNotices = notices.map((notice) => localize(notice, language));
  const localizedMeetings = meetings.map((meeting) => localize(meeting, language));
  const localizedServices = services.map((service) => localize(service, language));
  const localizedForms = forms.map((form) => localize(form, language));

  const activeAlerts = localizedNotices.filter((notice) => notice.active && notice.urgent);
  const recentNotices = [...localizedNotices].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);
  const upcomingMeetings = [...localizedMeetings]
    .filter((meeting) => meeting.date >= todayIso)
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .slice(0, 3);

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

  const quickLinks = [
    { href: "/services", label: strings.home.servicesCta },
    { href: "/notices", label: strings.home.noticesCta },
    { href: "/meetings", label: strings.home.meetingsCta },
    { href: "/forms", label: strings.home.formsCta },
    { href: "/contact", label: strings.home.contactCta },
    { href: "/contact#contact-directory", label: strings.home.departmentsCta },
  ];

  return (
    <main id="main-content" tabIndex={-1}>
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
                    className="flex items-start gap-3 rounded-lg border border-gov-alert bg-gov-surface p-4 shadow-card hover:border-gov-navy"
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
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center rounded-lg border border-gov-border bg-gov-surface px-5 py-4 font-medium text-gov-navy shadow-card hover:border-gov-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="home-services-heading" className="mt-8">
          <h2 id="home-services-heading" className="text-xl font-semibold text-gov-navy">
            {strings.home.servicesShowcaseHeading}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-lg border border-gov-border bg-gov-surface p-4 shadow-card hover:border-gov-blue"
                >
                  {Icon && <Icon className="h-8 w-8 text-gov-blue" aria-hidden="true" />}
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gov-slate">
                    {service.category}
                  </p>
                  <h3 className="mt-1 font-semibold text-gov-navy">{service.name}</h3>
                  <p className="mt-1 text-sm text-gov-slate">{service.summary}</p>
                </Link>
              );
            })}
          </div>
          <Link
            href="/services"
            className="mt-4 inline-flex min-h-[44px] items-center text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
          >
            {strings.home.viewAllServices}
          </Link>
        </section>

        <section aria-labelledby="home-projects-heading" className="mt-8">
          <h2 id="home-projects-heading" className="text-xl font-semibold text-gov-navy">
            {strings.home.projectsHeading}
          </h2>
          <p className="mt-2 text-gov-slate">{strings.home.projectsIntro}</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <li key={project.id} className="rounded-lg border border-gov-border bg-gov-surface p-4 shadow-card">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-xs font-semibold text-white ${
                    projectStatusStyles[project.statusKey] ?? "bg-gov-slate"
                  }`}
                >
                  {project.status}
                </span>
                <h3 className="mt-2 font-semibold text-gov-navy">{project.name}</h3>
                <p className="mt-1 text-sm text-gov-slate">{project.division}</p>
                <dl className="mt-2 text-sm text-gov-slate">
                  <div className="flex gap-1">
                    <dt className="font-medium text-gov-navy">{strings.home.projectBudgetLabel}:</dt>
                    <dd>{project.budget}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt className="font-medium text-gov-navy">{strings.home.projectTimelineLabel}:</dt>
                    <dd>{project.timeline}</dd>
                  </div>
                </dl>
                <p className="mt-2 text-sm text-gov-slate">{project.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <section aria-labelledby="home-meetings-heading">
            <h2 id="home-meetings-heading" className="text-xl font-semibold text-gov-navy">
              {strings.home.upcomingMeetingsHeading}
            </h2>
            {upcomingMeetings.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-3">
                {upcomingMeetings.map((meeting) => (
                  <li key={meeting.id} className="rounded-lg border border-gov-border bg-gov-surface p-4 shadow-card">
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
              className="mt-4 inline-flex min-h-[44px] items-center text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
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
                <li key={notice.id} className="rounded-lg border border-gov-border bg-gov-surface p-4 shadow-card">
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
              className="mt-4 inline-flex min-h-[44px] items-center text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
            >
              {strings.home.viewAllNotices}
            </Link>
          </section>
        </div>

        <section aria-labelledby="home-forms-heading" className="mt-8">
          <h2 id="home-forms-heading" className="text-xl font-semibold text-gov-navy">
            {strings.home.popularFormsHeading}
          </h2>
          <div className="mt-4">
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
          <Link
            href="/forms"
            className="mt-4 inline-flex min-h-[44px] items-center text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
          >
            {strings.home.viewAllForms}
          </Link>
        </section>

        <StaffDirectory limit={4} />
        <Link
          href="/contact"
          className="mt-4 inline-flex min-h-[44px] items-center text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
        >
          {strings.home.viewAllStaff}
        </Link>

        <div className="mt-8">
          <ContactCard
            departmentName={strings.footer.contactHeading}
            phone={strings.footer.phone}
            email={strings.footer.email}
            hours={strings.footer.officeHours}
          />
          <Link
            href="/forms"
            className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-gov-navy px-5 py-2.5 font-medium text-white shadow-card hover:bg-gov-blue"
          >
            {strings.home.reportIssueCta}
          </Link>
        </div>
      </div>
    </main>
  );
}
