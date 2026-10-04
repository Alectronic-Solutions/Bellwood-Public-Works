import { services } from "@/content/services";
import { notices } from "@/content/notices";
import { meetings } from "@/content/meetings";
import { forms } from "@/content/forms";
import { projects } from "@/content/projects";
import { departments } from "@/content/departments";
import { sections } from "@/content/sections";
import { searchSynonyms } from "@/content/searchSynonyms";
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

/** A query term plus the words that mean the same thing to a resident. */
function alternatives(term: string): string[] {
  const group = searchSynonyms.find((words) => words.includes(term));
  return group ? [term, ...group.filter((word) => word !== term)] : [term];
}

function scoreEntry(title: string, haystack: string, terms: string[][]): number {
  const foldedTitle = fold(title);
  const foldedHaystack = fold(haystack);

  let score = 0;
  for (const options of terms) {
    // The word as typed outranks a synonym, so an exact match still sorts first.
    const [typed] = options;
    const inTitle = options.find((word) => foldedTitle.includes(word));
    const inHaystack = options.some((word) => foldedHaystack.includes(word));
    if (!inTitle && !inHaystack) return 0; // every term must appear somewhere
    if (foldedTitle.startsWith(typed)) score += 8;
    else if (foldedTitle.includes(typed)) score += 5;
    else if (inTitle) score += 4;
    if (inHaystack) score += 1;
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
      extra: `${value.status} ${value.division} ${project.budget} ${expandDateTokens(value.timeline, language)}`,
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
  const terms = fold(query).split(/\s+/).filter(Boolean).map(alternatives);
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
    // On a city site the service page is usually the answer, ahead of a notice or a form
    // that happens to share the word, so equal matches favor services.
    .map((result) => (result.kind === "service" ? { ...result, score: result.score + 2 } : result))
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
