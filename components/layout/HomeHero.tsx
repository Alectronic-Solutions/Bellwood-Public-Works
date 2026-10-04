"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { withBasePath } from "@/lib/basePath";
import { SiteSearchForm } from "./SiteSearchForm";

/**
 * The home page masthead: the department's name and a search box answering "how can we
 * help", which is how most residents arrive with a task rather than a destination.
 *
 * The photo is a backdrop, so it takes an empty alt. Text never sits on the bare image:
 * on small screens a near-solid navy wash covers it, and on wide screens a gradient keeps
 * the text column on at least 90 percent navy while the right side lets the photo show.
 * The parallax scroll the hero used to have was removed; it added motion with no purpose.
 */
export function HomeHero() {
  const { strings } = useLanguage();

  return (
    <div className="relative isolate overflow-hidden bg-gov-navy">
      <Image
        src={withBasePath("/images/hero/hero-home.jpg")}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white">{strings.home.heroEyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">{strings.home.heading}</h1>
          <p className="mt-3 max-w-xl text-lg text-white">{strings.home.intro}</p>

          <div className="mt-8">
            <SiteSearchForm variant="hero" id="hero-search" />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 text-sm text-white">
            <p id="popular-searches-label" className="font-bold">
              {strings.home.popularSearchesLabel}:
            </p>
            <ul aria-labelledby="popular-searches-label" className="flex flex-wrap gap-x-4">
              {strings.home.popularSearches.map((item) => (
                <li key={item.query}>
                  <Link
                    href={`/search/?q=${encodeURIComponent(item.query)}`}
                    className="inline-flex min-h-[44px] items-center text-white underline underline-offset-2 hover:no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
