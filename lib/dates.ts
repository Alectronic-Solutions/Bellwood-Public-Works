import type { Language } from "./i18n";

// The "today" the notice and meeting content was written against. Every date in
// /content is stored relative to this, and the whole timeline slides forward at build
// time so the site never shows an empty "Upcoming Meetings" list or an active notice
// for an event that has already happened.
const DATASET_ANCHOR = "2026-07-27";

const MS_PER_DAY = 86_400_000;

function parseIso(iso: string): number {
  return Date.parse(`${iso}T00:00:00Z`);
}

function toIso(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** The date this build was produced, in local ISO form. Stable across the export and
 *  the client bundle because next.config inlines it at build time. */
export const buildDateIso: string = process.env.NEXT_PUBLIC_BUILD_DATE ?? DATASET_ANCHOR;

/**
 * How far the dataset moves forward, in whole weeks.
 *
 * Whole weeks matter: municipal bodies meet on fixed weekdays, so a Tuesday Council
 * meeting has to stay on a Tuesday. Shifting by an arbitrary number of days would
 * scatter the schedule across the week and read as obviously synthetic. Never negative,
 * so a build from before the anchor date leaves the content exactly as authored.
 */
export const contentShiftDays: number = (() => {
  const elapsed = Math.floor((parseIso(buildDateIso) - parseIso(DATASET_ANCHOR)) / MS_PER_DAY);
  if (elapsed <= 0) return 0;
  return Math.floor(elapsed / 7) * 7;
})();

/** Moves a stored content date onto the current timeline. */
export function shiftIso(iso: string): string {
  if (contentShiftDays === 0) return iso;
  return toIso(parseIso(iso) + contentShiftDays * MS_PER_DAY);
}

/** Today, for comparisons like "is this meeting still upcoming". */
export const todayIso: string = buildDateIso;

/** Shifts a date embedded in a document filename, so agenda and minutes URLs keep
 *  matching the meeting they belong to. */
export function shiftUrlDate(url: string): string {
  return url.replace(/\d{4}-\d{2}-\d{2}/g, (iso) => shiftIso(iso));
}

export function dateLocaleTag(language: Language): string {
  return language === "es" ? "es-ES" : "en-US";
}

/** Formats an already shifted ISO date the way the site presents dates. */
export function formatLongDate(iso: string, language: Language): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(dateLocaleTag(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const DATE_TOKEN = /\{date:(\d{4}-\d{2}-\d{2})\}/g;

/**
 * Expands `{date:2026-08-21}` tokens inside content prose.
 *
 * Some notices name a date in their body, such as a bid deadline or a hearing date.
 * Those have to move with the notice itself, otherwise the sentence contradicts the
 * posted date rendered beside it. Writing them as tokens keeps one source of truth.
 */
export function expandDateTokens(text: string, language: Language): string {
  return text.replace(DATE_TOKEN, (_match, iso: string) => formatLongDate(shiftIso(iso), language));
}
