"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";

export function WasThisPageHelpful() {
  const { strings } = useLanguage();
  const [response, setResponse] = useState<"yes" | "no" | null>(null);

  return (
    <section
      aria-labelledby="page-helpful-heading"
      className="mt-8 rounded border border-gov-border bg-gov-surface p-4"
    >
      <h2 id="page-helpful-heading" className="font-medium text-gov-navy">
        {strings.pageHelpful.question}
      </h2>
      {response ? (
        <p role="status" className="mt-2 text-sm text-gov-slate">
          {response === "yes" ? strings.pageHelpful.thanksYes : strings.pageHelpful.thanksNo}
        </p>
      ) : (
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => setResponse("yes")}
            className="rounded border border-gov-control-border bg-white px-4 py-1.5 text-sm font-medium text-gov-navy hover:border-gov-blue"
          >
            {strings.pageHelpful.yes}
          </button>
          <button
            type="button"
            onClick={() => setResponse("no")}
            className="rounded border border-gov-control-border bg-white px-4 py-1.5 text-sm font-medium text-gov-navy hover:border-gov-blue"
          >
            {strings.pageHelpful.no}
          </button>
        </div>
      )}
    </section>
  );
}
