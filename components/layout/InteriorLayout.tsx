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
  children,
}: InteriorLayoutProps) {
  return (
    <div>
      <Breadcrumbs trail={breadcrumbs} />
      {headerImage && <PageHeader imageSrc={headerImage} />}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* DOM order is main, section nav, sidebar, which is also the reading order on
            small screens. The order utilities only rearrange columns at xl and above,
            so tab order never diverges from what is on screen. */}
        <div className="grid gap-8 xl:grid-cols-[16rem_minmax(0,1fr)_22rem]">
          <main id="main-content" tabIndex={-1} className="xl:order-2">
            <h1 className="text-4xl font-bold text-gov-navy">{heading}</h1>
            {intro && <p className="mt-3 max-w-[70ch] text-gov-slate">{intro}</p>}

            <div className="mt-6 max-w-[70ch]">{children}</div>

            {lastUpdatedIso && <LastUpdated isoDate={lastUpdatedIso} />}
            <WasThisPageHelpful />
          </main>

          <aside className="xl:order-1">
            <SectionNav section={section} currentHref={currentHref} />
          </aside>

          {sidebar && (
            <aside className="flex flex-col gap-6 xl:order-3 xl:sticky xl:top-4 xl:self-start">{sidebar}</aside>
          )}
        </div>
      </div>
    </div>
  );
}
