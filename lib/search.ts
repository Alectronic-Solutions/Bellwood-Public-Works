import { services } from "@/content/services";
import { notices } from "@/content/notices";
import { meetings } from "@/content/meetings";
import { forms } from "@/content/forms";
import { projects } from "@/content/projects";
import { departments } from "@/content/departments";
import { sections } from "@/content/sections";
import type { UIStrings } from "@/content/types";
import type { Language } from "./i18n";
import { expandDateTokens } from "./dates";

export type ResultKind = "service" | "notice" | "meeting" | "form" | "project" | "department" | "page";

export interface SearchResult {
  kind: ResultKind;
  href: string;
  title: string;
  summary: string;
  /** Higher scores sort first. */
  score: number;
}

/** Strips accents so "estacion" matches "estación" and vice versa. */
function fold(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function scoreEntry(title: string, haystack: string, terms: string[]): number {
  const foldedTitle = fold(title);
  const foldedHaystack = fold(haystack);

  let score = 0;
  for (const term of terms) {
    if (foldedTitle.startsWith(term)) score += 8;
    else if (foldedTitle.includes(term)) score += 5;
    if (foldedHaystack.includes(term)) score += 1;
    else if (!foldedTitle.includes(term)) return 0; // every term must appear somewhere
  }
  return score;
}

interface Candidate {
  kind: ResultKind;
  href: string;
  title: string;
  summary: string;
  extra?: string;
}

function candidates(language: Language, strings: UIStrings): Candidate[] {
  const es = language === "es";
  const list: Candidate[] = [];

  for (const service of services) {
    const value = es ? { ...service, ...service.es } : service;
    list.push({
      kind: "service",
      href: `/services/${service.slug}`,
      title: value.name,
      summary: value.summary,
      extra: `${value.category} ${value.description} ${value.whoItAppliesTo} ${value.howToApply}`,
    });
  }

  for (const notice of notices) {
    const value = es ? { ...notice, ...notice.es } : notice;
    list.push({
      kind: "notice",
      href: `/notices/${notice.id}`,
      title: value.title,
      summary: expandDateTokens(value.body, language),
      extra: value.department,
    });
  }

  for (const meeting of meetings) {
    const value = es ? { ...meeting, ...meeting.es } : meeting;
    list.push({
      kind: "meeting",
      href: "/meetings",
      title: value.title,
      summary: value.body,
      extra: `${value.location} ${meeting.date}`,
    });
  }

  for (const form of forms) {
    const value = es ? { ...form, ...form.es } : form;
    list.push({
      kind: "form",
      href: "/forms",
      title: value.title,
      summary: value.description,
      extra: value.category,
    });
  }

  for (const project of projects) {
    const value = es ? { ...project, ...project.es } : project;
    list.push({
      kind: "project",
      href: "/projects",
      title: value.name,
      summary: value.description,
      extra: `${value.status} ${value.division} ${project.budget} ${project.timeline}`,
    });
  }

  for (const department of departments) {
    const value = es ? { ...department, ...department.es } : department;
    list.push({
      kind: "department",
      href: "/departments",
      title: value.name,
      summary: value.hours,
      extra: `${department.phone} ${department.email}`,
    });
  }

  // Standalone pages that are not backed by a content collection.
  const standalone: Array<[string, string, string]> = [
    ["/accessibility", strings.accessibility.heading, strings.accessibility.intro],
    ["/privacy", strings.privacy.heading, strings.privacy.intro],
    ["/public-records", strings.publicRecords.heading, strings.publicRecords.intro],
    ["/contact", strings.pages.contactHeading, strings.pages.contactIntro],
    ["/site-map", strings.siteMap.heading, strings.siteMap.intro],
  ];
  for (const [href, title, summary] of standalone) {
    list.push({ kind: "page", href, title, summary });
  }

  for (const section of sections) {
    list.push({
      kind: "page",
      href: section.href,
      title: es ? section.labelEs : section.label,
      summary: "",
    });
  }

  return list;
}

export function search(query: string, language: Language, strings: UIStrings): SearchResult[] {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return candidates(language, strings)
    .map((candidate) => ({
      kind: candidate.kind,
      href: candidate.href,
      title: candidate.title,
      summary: candidate.summary,
      score: scoreEntry(candidate.title, `${candidate.title} ${candidate.summary} ${candidate.extra ?? ""}`, terms),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 50);
}

export function kindLabel(kind: ResultKind, strings: UIStrings): string {
  switch (kind) {
    case "service":
      return strings.search.typeService;
    case "notice":
      return strings.search.typeNotice;
    case "meeting":
      return strings.search.typeMeeting;
    case "form":
      return strings.search.typeForm;
    case "project":
      return strings.search.typeProject;
    case "department":
      return strings.search.typeDepartment;
    default:
      return strings.search.typePage;
  }
}
