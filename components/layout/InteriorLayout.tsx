"use client";

import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
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
  sidebar,
  children,
}: InteriorLayoutProps) {
  return (
    <div>
      <Breadcrumbs trail={breadcrumbs} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)_18rem]">
          <aside>
            <SectionNav section={section} currentHref={currentHref} />
          </aside>

          <main>
            <h1 className="text-4xl font-bold text-gov-navy">{heading}</h1>
            {intro && <p className="mt-3 max-w-[70ch] text-gov-slate">{intro}</p>}

            <div className="mt-6 max-w-[70ch]">{children}</div>

            {lastUpdatedIso && <LastUpdated isoDate={lastUpdatedIso} />}
            <WasThisPageHelpful />
          </main>

          {sidebar && <aside className="flex flex-col gap-6 lg:sticky lg:top-4 lg:self-start">{sidebar}</aside>}
        </div>
      </div>
    </div>
  );
}
