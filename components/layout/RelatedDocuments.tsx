"use client";

import { FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface RelatedDocument {
  href: string;
  title: string;
  meta?: string;
}

interface RelatedDocumentsProps {
  documents: RelatedDocument[];
  showHeading?: boolean;
  ariaLabelledBy?: string;
}

export function RelatedDocuments({ documents, showHeading = true, ariaLabelledBy }: RelatedDocumentsProps) {
  const { strings } = useLanguage();

  if (documents.length === 0) return null;

  return (
    <section
      aria-labelledby={showHeading ? "related-documents-heading" : ariaLabelledBy}
      className={showHeading ? "rounded-lg border border-gov-border p-4 shadow-card" : undefined}
    >
      {showHeading && (
        <h2 id="related-documents-heading" className="text-xs font-bold uppercase tracking-wide text-gov-slate">
          {strings.sidebar.relatedDocumentsHeading}
        </h2>
      )}
      <ul className="mt-3 flex flex-col gap-1">
        {documents.map((doc) => (
          <li key={doc.href} className="flex items-start gap-2">
            <FileText className="mt-3 h-4 w-4 flex-shrink-0 text-gov-blue" aria-hidden="true" />
            <div className="flex-1">
              <a
                href={doc.href}
                className="inline-flex min-h-[44px] items-center text-base text-gov-blue underline underline-offset-2 hover:text-gov-navy"
              >
                {doc.title}
              </a>
              {doc.meta && <p className="-mt-1 text-xs text-gov-slate">{doc.meta}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
