"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";
import { projects } from "@/content/projects";

// White text sits on each of these, and all four clear 4.5:1 against white.
const statusStyles: Record<string, string> = {
  Planning: "bg-gov-slate",
  Design: "bg-gov-slate",
  "In Construction": "bg-gov-blue",
  Completed: "bg-gov-success",
};

export default function ProjectsPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;
  const [status, setStatus] = useState("all");

  // Filter on the English status so the selection survives a language switch.
  const statuses = useMemo(() => Array.from(new Set(projects.map((project) => project.status))), []);

  const localized = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        ...(language === "es" ? project.es : {}),
        statusKey: project.status,
      })),
    [language],
  );

  const filtered = useMemo(
    () => (status === "all" ? localized : localized.filter((project) => project.statusKey === status)),
    [localized, status],
  );

  return (
    <InteriorLayout
      section={section}
      currentHref="/projects"
      breadcrumbs={[{ label: strings.projects.heading }]}
      heading={strings.projects.heading}
      intro={strings.projects.intro}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/meetings", label: strings.pages.meetingsHeading },
            { href: "/notices", label: strings.pages.noticesHeading },
            { href: "/departments", label: strings.departments.heading },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-1 sm:max-w-xs">
        <label htmlFor="project-status-filter" className="text-sm font-medium text-gov-navy">
          {strings.projects.statusFilterLabel}
        </label>
        <select
          id="project-status-filter"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded border border-gov-control-border bg-white px-3 py-2 text-sm text-gov-slate"
        >
          <option value="all">{strings.projects.allStatuses}</option>
          {statuses.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-gov-slate">
        {filtered.length} {strings.projects.countLabel}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-4 text-gov-slate">{strings.projects.empty}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {filtered.map((project) => (
            <li key={project.id} className="rounded-lg border border-gov-border bg-gov-surface p-4 shadow-card">
              <span
                className={`inline-block rounded px-2 py-0.5 text-xs font-semibold text-white ${
                  statusStyles[project.statusKey] ?? "bg-gov-slate"
                }`}
              >
                {project.status}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-gov-navy">{project.name}</h2>
              <p className="mt-1 text-sm text-gov-slate">{project.description}</p>
              <dl className="mt-3 grid gap-1 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-medium text-gov-navy">{strings.projects.divisionLabel}</dt>
                  <dd className="text-gov-slate">{project.division}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gov-navy">{strings.projects.budgetLabel}</dt>
                  <dd className="text-gov-slate">{project.budget}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gov-navy">{strings.projects.timelineLabel}</dt>
                  <dd className="text-gov-slate">{project.timeline}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </InteriorLayout>
  );
}
