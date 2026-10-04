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

function addDays(iso: string, days: number): string {
  return toIso(parseIso(iso) + days * MS_PER_DAY);
}

/** The date this build was produced, in local ISO form. Stable across the export and
 *  the client bundle because next.config inlines it at build time. */
export const buildDateIso: string = process.env.NEXT_PUBLIC_BUILD_DATE ?? DATASET_ANCHOR;

const elapsedDays = Math.floor((parseIso(buildDateIso) - parseIso(DATASET_ANCHOR)) / MS_PER_DAY);

/**
 * How far the dataset moves forward, in whole weeks.
 *
 * Whole weeks matter: municipal bodies meet on fixed weekdays, so a Tuesday Council
 * meeting has to stay on a Tuesday. Shifting by an arbitrary number of days would
 * scatter the schedule across the week and read as obviously synthetic. Never negative,
 * so a build from before the anchor date leaves the content exactly as authored.
 */
export const contentShiftDays: number = elapsedDays <= 0 ? 0 : Math.floor(elapsedDays / 7) * 7;

/**
 * How far season-bound content moves forward, in whole 52-week years.
 *
 * The weekly shift is right for meetings and incident notices, but it carries a summer
 * watering schedule into December and a snow emergency into June. Records tied to the
 * calendar (seasonal programs, winter storms, holiday closures) instead move in steps of
 * 364 days, which keeps both the weekday and, within a day or two, the time of year.
 * Because the step is never larger than the time elapsed, a record authored on or before
 * the anchor never lands after the build date.
 */
export const seasonalShiftDays: number = elapsedDays <= 0 ? 0 : Math.floor(elapsedDays / 364) * 364;

/** Moves a stored content date onto the current timeline. */
export function shiftIso(iso: string): string {
  if (contentShiftDays === 0) return iso;
  return addDays(iso, contentShiftDays);
}

/** Moves a season-bound content date forward by whole years. */
export function shiftSeasonalIso(iso: string): string {
  if (seasonalShiftDays === 0) return iso;
  return addDays(iso, seasonalShiftDays);
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

/** "Monday, September 7, 2026", for dates where the weekday matters to the reader. */
export function formatWeekdayDate(iso: string, language: Language): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(dateLocaleTag(language), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMonthYear(iso: string, language: Language): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(dateLocaleTag(language), {
    year: "numeric",
    month: "long",
  });
}

/** Short parts for a calendar date block: "OCT" and "6". */
export function calendarParts(iso: string, language: Language): { month: string; day: string; weekday: string } {
  const date = new Date(`${iso}T00:00:00`);
  const locale = dateLocaleTag(language);
  return {
    month: date.toLocaleDateString(locale, { month: "short" }).replace(".", "").toUpperCase(),
    day: String(date.getDate()),
    weekday: date.toLocaleDateString(locale, { weekday: "long" }),
  };
}

const DATE_TOKEN = /\{(date|seasonal|month|fixed):(\d{4}-\d{2}-\d{2})\}/g;

/**
 * Expands date tokens inside content prose.
 *
 * Some records name a date in their text, such as a bid deadline or a project phase.
 * Those have to move with the record itself, otherwise the sentence contradicts the
 * posted date rendered beside it. Writing them as tokens keeps one source of truth.
 *
 * - `{date:2026-08-21}` shifts weekly, for meetings and incident notices.
 * - `{seasonal:2026-09-30}` shifts by whole years, for season-bound notices.
 * - `{month:2026-05-01}` shifts weekly and renders as "July 2026", for project timelines.
 * - `{fixed:2026-09-07}` never shifts and includes the weekday, for computed dates such
 *   as the observed holiday in the closure notice.
 */
export function expandDateTokens(text: string, language: Language): string {
  return text.replace(DATE_TOKEN, (_match, kind: string, iso: string) => {
    if (kind === "seasonal") return formatLongDate(shiftSeasonalIso(iso), language);
    if (kind === "month") return formatMonthYear(shiftIso(iso), language);
    if (kind === "fixed") return formatWeekdayDate(iso, language);
    return formatLongDate(shiftIso(iso), language);
  });
}

// ---------------------------------------------------------------------------------
// Observed city holidays
// ---------------------------------------------------------------------------------

export interface CityHoliday {
  /** The observed date, moved off a weekend the way most municipal calendars do. */
  date: string;
  name: string;
  nameEs: string;
}

function iso(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function weekday(isoDate: string): number {
  return new Date(parseIso(isoDate)).getUTCDay();
}

/** The nth occurrence of a weekday (0 is Sunday) in a month. */
function nthWeekday(year: number, month: number, day: number, n: number): string {
  const first = iso(year, month, 1);
  const offset = (day - weekday(first) + 7) % 7;
  return addDays(first, offset + (n - 1) * 7);
}

function lastWeekday(year: number, month: number, day: number): string {
  const nextMonthFirst = month === 12 ? iso(year + 1, 1, 1) : iso(year, month + 1, 1);
  const last = addDays(nextMonthFirst, -1);
  const offset = (weekday(last) - day + 7) % 7;
  return addDays(last, -offset);
}

/** Saturday holidays are observed the Friday before, Sunday holidays the Monday after. */
function observed(isoDate: string): string {
  const day = weekday(isoDate);
  if (day === 6) return addDays(isoDate, -1);
  if (day === 0) return addDays(isoDate, 1);
  return isoDate;
}

function holidaysForYear(year: number): CityHoliday[] {
  return [
    { date: observed(iso(year, 1, 1)), name: "New Year's Day", nameEs: "el Día de Año Nuevo" },
    { date: nthWeekday(year, 1, 1, 3), name: "Martin Luther King Jr. Day", nameEs: "el Día de Martin Luther King Jr." },
    { date: nthWeekday(year, 2, 1, 3), name: "Presidents Day", nameEs: "el Día de los Presidentes" },
    { date: lastWeekday(year, 5, 1), name: "Memorial Day", nameEs: "el Día de los Caídos" },
    { date: observed(iso(year, 6, 19)), name: "Juneteenth", nameEs: "Juneteenth" },
    { date: observed(iso(year, 7, 4)), name: "Independence Day", nameEs: "el Día de la Independencia" },
    { date: nthWeekday(year, 9, 1, 1), name: "Labor Day", nameEs: "el Día del Trabajo" },
    { date: observed(iso(year, 11, 11)), name: "Veterans Day", nameEs: "el Día de los Veteranos" },
    { date: nthWeekday(year, 11, 4, 4), name: "Thanksgiving Day", nameEs: "el Día de Acción de Gracias" },
    { date: observed(iso(year, 12, 25)), name: "Christmas Day", nameEs: "el Día de Navidad" },
  ];
}

/** Days before a holiday that the closure notice is posted. */
export const HOLIDAY_NOTICE_LEAD_DAYS = 10;

/**
 * The city holiday a closure notice should describe as of the build date: the next
 * holiday if its notice has already been posted, otherwise the most recent one. This
 * keeps the notice truthful whenever the site is built, where a fixed "closed for Labor
 * Day" record would eventually be dated in October.
 */
export function currentHolidayNotice(): { holiday: CityHoliday; postedIso: string; active: boolean } {
  const year = Number(buildDateIso.slice(0, 4));
  const all = [...holidaysForYear(year - 1), ...holidaysForYear(year), ...holidaysForYear(year + 1)].sort((a, b) =>
    a.date < b.date ? -1 : 1,
  );

  const upcoming = all.find((holiday) => holiday.date >= buildDateIso);
  if (upcoming && addDays(upcoming.date, -HOLIDAY_NOTICE_LEAD_DAYS) <= buildDateIso) {
    return { holiday: upcoming, postedIso: addDays(upcoming.date, -HOLIDAY_NOTICE_LEAD_DAYS), active: true };
  }

  const past = [...all].reverse().find((holiday) => holiday.date < buildDateIso)!;
  return { holiday: past, postedIso: addDays(past.date, -HOLIDAY_NOTICE_LEAD_DAYS), active: false };
}
