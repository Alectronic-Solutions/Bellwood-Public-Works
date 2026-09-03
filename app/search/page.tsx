"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { search, kindLabel } from "@/lib/search";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

function SearchResults() {
  const { strings, language } = useLanguage();
  const params = useSearchParams();
  const router = useRouter();

  const query = params.get("q") ?? "";
  const [draft, setDraft] = useState(query);

  useEffect(() => {
    setDraft(query);
  }, [query]);

  const results = useMemo(() => search(query, language, strings), [query, language, strings]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = draft.trim();
    router.push(next ? `/search/?q=${encodeURIComponent(next)}` : "/search/");
  }

  return (
    <>
      <form role="search" onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="site-search" className="text-sm font-medium text-gov-navy">
            {strings.search.inputLabel}
          </label>
          <div className="flex items-center rounded border border-gov-control-border bg-white px-2">
            <SearchIcon className="h-4 w-4 text-gov-slate" aria-hidden="true" />
            <input
              id="site-search"
              name="q"
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="w-full border-0 bg-transparent px-2 py-2 text-base text-gov-slate"
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex min-h-[44px] items-center justify-center rounded bg-gov-navy px-5 py-2 font-medium text-white hover:bg-gov-blue"
        >
          {strings.search.submitLabel}
        </button>
      </form>

      {/* Announces the outcome to screen reader users, who otherwise get no signal that
          the page content changed after a search. */}
      <p aria-live="polite" className="mt-6 font-medium text-gov-navy">
        {query === ""
          ? strings.search.emptyQuery
          : results.length === 0
            ? `${strings.search.noResults} "${query}"`
            : results.length === 1
              ? `${strings.search.resultsOne} "${query}"`
              : `${results.length} ${strings.search.resultsMany} "${query}"`}
      </p>

      {query !== "" && results.length === 0 && (
        <p className="mt-2 text-gov-slate">{strings.search.noResultsHint}</p>
      )}

      {results.length > 0 && (
        <ul className="mt-4 flex flex-col gap-4">
          {results.map((result) => (
            <li key={`${result.kind}-${result.href}-${result.title}`} className="border-b border-gov-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gov-slate">
                {kindLabel(result.kind, strings)}
              </p>
              <Link
                href={result.href}
                className="mt-1 block font-medium text-gov-blue underline underline-offset-2 hover:text-gov-navy"
              >
                {result.title}
              </Link>
              {result.summary && <p className="mt-1 text-sm text-gov-slate">{result.summary}</p>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function SearchPage() {
  const { strings } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  return (
    <InteriorLayout
      section={section}
      currentHref="/search"
      breadcrumbs={[{ label: strings.search.heading }]}
      heading={strings.search.heading}
      intro={strings.search.intro}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/site-map", label: strings.siteMap.heading },
            { href: "/contact", label: strings.header.contactLink },
          ]}
        />
      }
    >
      {/* useSearchParams needs a Suspense boundary under static export. */}
      <Suspense fallback={<p className="text-gov-slate">{strings.search.emptyQuery}</p>}>
        <SearchResults />
      </Suspense>
    </InteriorLayout>
  );
}
