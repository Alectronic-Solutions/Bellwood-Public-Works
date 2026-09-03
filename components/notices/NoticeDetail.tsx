"use client";

import type { Notice } from "@/content/types";
import { useLanguage, localize, dateLocale } from "@/lib/i18n";
import { expandDateTokens } from "@/lib/dates";
import type { Language } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";

interface NoticeDetailProps {
  notice: Notice;
}

function formatDate(isoDate: string, language: Language) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString(dateLocale(language), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NoticeDetail({ notice: rawNotice }: NoticeDetailProps) {
  const { strings, language } = useLanguage();
  const notice = localize(rawNotice, language);
  const section = sections.find((item) => item.id === "notices")!;

  return (
    <InteriorLayout
      section={section}
      currentHref="/notices"
      breadcrumbs={[{ href: "/notices", label: strings.pages.noticesHeading }, { label: notice.title }]}
      heading={notice.title}
      lastUpdatedIso={notice.date}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/notices", label: strings.noticeDetail.backLink },
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
          ]}
        />
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        {notice.urgent && notice.active && (
          <span className="rounded bg-gov-alert px-2 py-0.5 text-sm font-semibold text-white">
            {strings.alert.urgentLabel}
          </span>
        )}
        {!notice.active && (
          <span className="rounded border border-gov-border px-2 py-0.5 text-sm font-medium text-gov-slate">
            {strings.alert.archivedLabel}
          </span>
        )}
      </div>

      <dl className="mt-4 flex flex-col gap-1 text-sm text-gov-slate">
        <div className="flex gap-2">
          <dt className="font-medium text-gov-navy">{strings.noticeDetail.postedLabel}:</dt>
          <dd>{formatDate(notice.date, language)}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium text-gov-navy">{strings.noticeDetail.departmentLabel}:</dt>
          <dd>{notice.department}</dd>
        </div>
      </dl>

      <p className="mt-6 text-gov-slate">{expandDateTokens(notice.body, language)}</p>
    </InteriorLayout>
  );
}
