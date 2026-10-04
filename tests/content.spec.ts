import { test, expect } from "@playwright/test";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// Content checks that axe cannot make: dates that contradict the calendar and copy that
// breaks the house style. Each one guards a defect the site has actually shipped.

const outDir = join(process.cwd(), "out");

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

// The content modules read the build date from the environment when they load, so it is
// set before they are imported. Using today mirrors what a real build does.
const today = new Date().toISOString().slice(0, 10);

async function loadContent() {
  process.env.NEXT_PUBLIC_BUILD_DATE = today;
  const { notices } = await import("../content/notices");
  const { meetings, meetingBodies } = await import("../content/meetings");
  return { notices, meetings, meetingBodies };
}

test("no notice is posted after the build date", async () => {
  // A shifted "City offices closed for Labor Day" notice was once dated in October,
  // after the day the site was built.
  const { notices } = await loadContent();
  const future = notices.filter((notice) => notice.date > today).map((n) => `${n.id} (${n.date})`);
  expect(future, "notices dated in the future").toEqual([]);
});

test("the holiday closure notice names a real observed holiday", async () => {
  const { notices } = await loadContent();
  const closure = notices.find((notice) => notice.id === "city-hall-closure-holiday");
  expect(closure).toBeDefined();
  const holidayDate = closure!.body.match(/\{fixed:(\d{4}-\d{2}-\d{2})\}/)?.[1];
  expect(holidayDate, "closure notice should carry the holiday date").toBeTruthy();

  const weekday = new Date(`${holidayDate}T00:00:00Z`).getUTCDay();
  expect([0, 6], "an observed holiday never falls on a weekend").not.toContain(weekday);
  expect(closure!.date <= today).toBe(true);
  expect(closure!.active, "only an upcoming holiday is active").toBe(holidayDate! >= today);
});

test("season-bound notices stay in their season", async () => {
  // Weekly shifting once carried a summer watering schedule into December and a winter
  // storm into spring. Seasonal records move by whole years, so the month barely moves.
  const { notices } = await loadContent();
  const seasonal = notices.filter((notice) => notice.seasonal);
  expect(seasonal.length).toBeGreaterThan(3);

  const authored: Record<string, string> = {
    "snow-emergency-declared-jan-2026": "01",
    "winter-storm-advisory-archive": "01",
    "seasonal-water-restrictions-summer": "06",
    "spring-flushing-program-archive": "04",
  };
  for (const [id, month] of Object.entries(authored)) {
    const notice = seasonal.find((item) => item.id === id);
    expect(notice, id).toBeDefined();
    const shifted = Number(notice!.date.slice(5, 7));
    const distance = Math.min(Math.abs(shifted - Number(month)), 12 - Math.abs(shifted - Number(month)));
    expect(distance, `${id} moved out of its season (${notice!.date})`).toBeLessThanOrEqual(1);
  }
});

test("every meeting belongs to a body and keeps that body's weekday", async () => {
  const { meetings, meetingBodies } = await loadContent();
  const weekdays = new Map<string, Set<number>>();
  for (const meeting of meetings) {
    expect(meeting.bodyId, `${meeting.id} has no meeting body`).toBeTruthy();
    expect(meetingBodies.some((body) => body.id === meeting.bodyId)).toBe(true);
    if (meeting.title.includes("Workshop")) continue;
    const day = new Date(`${meeting.date}T00:00:00Z`).getUTCDay();
    weekdays.set(meeting.bodyId!, (weekdays.get(meeting.bodyId!) ?? new Set()).add(day));
  }
  for (const [body, days] of weekdays) {
    expect(days.size, `${body} meets on more than one weekday`).toBe(1);
  }
});

test("upcoming meetings never link minutes", async () => {
  // Minutes cannot exist before a meeting is held. One upcoming council meeting used to
  // carry the previous meeting's minutes, labelled as its own.
  const { meetings } = await loadContent();
  const premature = meetings.filter((meeting) => meeting.date >= today && meeting.minutesUrl).map((m) => m.id);
  expect(premature).toEqual([]);
});

test("the export contains no em dashes", async () => {
  const offenders: string[] = [];
  for await (const file of walk(outDir)) {
    if (!file.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    if (html.includes("—")) offenders.push(file.replace(outDir, "out"));
  }
  expect(offenders, "house style forbids em dashes in copy").toEqual([]);
});
