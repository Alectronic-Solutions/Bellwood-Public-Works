"use client";

import { FileText } from "lucide-react";
import { forms } from "@/content/forms";
import { useLanguage } from "@/lib/i18n";

export default function FormsPage() {
  const { strings } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">{strings.pages.formsHeading}</h1>
      <p className="mt-4 max-w-2xl text-gov-slate">{strings.pages.formsIntro}</p>

      <ul className="mt-8 flex flex-col gap-3">
        {forms.map((form) => (
          <li key={form.id} className="flex items-start gap-3 rounded border border-gov-border bg-gov-surface p-4">
            <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-gov-blue" aria-hidden="true" />
            <div>
              <a href={form.fileUrl} className="font-medium text-gov-navy hover:underline">
                {form.title}
              </a>
              <p className="text-sm text-gov-slate">{form.description}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gov-slate">
                {form.category} &middot; {form.fileType}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
