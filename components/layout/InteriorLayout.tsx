"use client";

import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionNav } from "@/components/layout/SectionNav";
import { LastUpdated } from "@/components/layout/LastUpdated";
import { WasThisPageHelpful } from "@/components/layout/WasThisPageHelpful";
import type { Section } from "@/content/sections";

interface InteriorLayoutProps {
  section: Section;
  currentHref: string;
  breadcrumbs: Crumb[];
  heading: string;
  intro?: string;
  lastUpdatedIso?: string;
  /** Decorative banner image for the section, from /public/images/headers. */
  headerImage?: string;
  sidebar?: ReactNode;
  /**
   * For pages built around a table or a long listing. The content takes the full width
   * beside the section navigation and the sidebar moves below it, instead of squeezing
   * a data table into the narrow middle column of a three column layout.
   */
  wide?: boolean;
  children: ReactNode;
}

export function InteriorLayout({
  section,
  currentHref,
  breadcrumbs,
  heading,
  intro,
  lastUpdatedIso,
  headerImage,
  sidebar,
  wide = false,
  children,
}: InteriorLayoutProps) {
  // DOM order is main, section nav, sidebar, which is also the reading order on small
  // screens. Grid placement only rearranges the columns from lg up, and the section nav
  // is a separate landmark that keyboard and screen reader users can jump to directly.
  const gridClass = wide
    ? "grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-10"
    : "grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[15rem_minmax(0,1fr)_20rem]";

  const sidebarClass = wide
    ? "grid gap-6 sm:grid-cols-2 lg:col-start-2 lg:row-start-2"
    : "flex flex-col gap-6 lg:col-start-2 lg:row-start-2 xl:sticky xl:top-16 xl:col-start-3 xl:row-start-1 xl:self-start";

  return (
    <div>
      <Breadcrumbs trail={breadcrumbs} />
      {headerImage && <PageHeader imageSrc={headerImage} />}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <div className={gridClass}>
          <main id="main-content" tabIndex={-1} className="min-w-0 lg:col-start-2 lg:row-start-1">
            <h1 className="text-3xl font-bold text-gov-navy sm:text-4xl">{heading}</h1>
            {intro && <p className="mt-3 max-w-[70ch] text-lg text-gov-slate">{intro}</p>}

            <div className={wide ? "mt-6" : "mt-6 max-w-[70ch]"}>{children}</div>

            <div className="max-w-[70ch]">
              {lastUpdatedIso && <LastUpdated isoDate={lastUpdatedIso} />}
              <WasThisPageHelpful />
            </div>
          </main>

          <aside className="lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <SectionNav section={section} currentHref={currentHref} />
          </aside>

          {sidebar && <aside className={sidebarClass}>{sidebar}</aside>}
        </div>
      </div>
    </div>
  );
}
