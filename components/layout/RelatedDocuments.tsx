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
}

export function RelatedDocuments({ documents }: RelatedDocumentsProps) {
  const { strings } = useLanguage();

  if (documents.length === 0) return null;

  return (
    <section aria-labelledby="related-documents-heading" className="rounded border border-gov-border p-4">
      <h2 id="related-documents-heading" className="text-xs font-bold uppercase tracking-wide text-gov-slate">
        {strings.sidebar.relatedDocumentsHeading}
      </h2>
      <ul className="mt-3 flex flex-col gap-3">
        {documents.map((doc) => (
          <li key={doc.href} className="flex items-start gap-2">
            <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gov-blue" aria-hidden="true" />
            <div>
              <a href={doc.href} className="text-sm text-gov-blue underline underline-offset-2 hover:text-gov-navy">
                {doc.title}
              </a>
              {doc.meta && <p className="text-xs text-gov-slate">{doc.meta}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
