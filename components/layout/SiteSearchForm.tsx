"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface SiteSearchFormProps {
  /**
   * "header" is the desktop box in the masthead, "mobile" the full width row shown
   * below the masthead on small screens, and "hero" the large search on the home page.
   */
  variant: "header" | "mobile" | "hero";
  id: string;
}

export function SiteSearchForm({ variant, id }: SiteSearchFormProps) {
  const { strings } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search/?q=${encodeURIComponent(trimmed)}`);
  }

  if (variant === "hero") {
    const labelId = `${id}-label`;
    return (
      <form role="search" aria-labelledby={labelId} onSubmit={handleSubmit}>
        <label id={labelId} htmlFor={id} className="block text-xl font-bold text-white sm:text-2xl">
          {strings.home.heroSearchLabel}
        </label>
        <div className="mt-3 flex">
          <input
            id={id}
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={strings.home.heroSearchPlaceholder}
            className="min-h-[52px] w-full min-w-0 flex-1 rounded-l border-2 border-r-0 border-white bg-white px-4 text-base text-gov-navy placeholder:text-gov-slate sm:text-lg"
          />
          <button
            type="submit"
            className="inline-flex min-h-[52px] shrink-0 items-center gap-2 rounded-r border-2 border-white bg-gov-blue px-4 font-bold text-white hover:bg-gov-navy sm:px-6"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">{strings.header.searchButton}</span>
          </button>
        </div>
      </form>
    );
  }

  const isHeader = variant === "header";

  return (
    <form role="search" onSubmit={handleSubmit} className="flex w-full items-stretch">
      <label htmlFor={id} className="sr-only">
        {strings.header.searchLabel}
      </label>
      <input
        id={id}
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={strings.header.searchPlaceholder}
        className={`min-h-[44px] min-w-0 flex-1 rounded-l border border-r-0 border-gov-control-border bg-white px-3 text-base text-gov-navy placeholder:text-gov-slate ${
          isHeader ? "w-64 xl:w-72" : "w-full"
        }`}
      />
      <button
        type="submit"
        className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-r bg-gov-navy px-3 font-bold text-white hover:bg-gov-blue"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className={isHeader ? "" : "sr-only"}>{strings.header.searchButton}</span>
      </button>
    </form>
  );
}
