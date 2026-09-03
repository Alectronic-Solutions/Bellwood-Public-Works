"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface SiteSearchFormProps {
  /** "utility" is the compact box on the navy bar, "mobile" the full width one. */
  variant: "utility" | "mobile";
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

  const isUtility = variant === "utility";

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={isUtility ? "hidden items-center sm:flex" : "flex items-center justify-between gap-3"}
    >
      <label htmlFor={id} className="sr-only">
        {strings.header.searchLabel}
      </label>
      <div
        className={
          isUtility
            ? "flex items-center rounded border border-white/60 bg-white/10 px-2"
            : "flex min-h-[44px] flex-1 items-center rounded border border-gov-control-border px-2"
        }
      >
        <Search
          className={isUtility ? "h-3.5 w-3.5 text-white" : "h-4 w-4 text-gov-slate"}
          aria-hidden="true"
        />
        <input
          id={id}
          name="q"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={strings.header.searchPlaceholder}
          className={
            isUtility
              ? "w-36 border-0 bg-transparent px-2 py-1 text-xs text-white placeholder:text-white/70"
              : "w-full border-0 bg-transparent px-2 py-2.5 text-base text-gov-slate"
          }
        />
      </div>
      <button type="submit" className="sr-only">
        {strings.search.submitLabel}
      </button>
    </form>
  );
}
