"use client";

import Image from "next/image";

import { staff } from "@/content/staff";
import { withBasePath } from "@/lib/basePath";
import { useLanguage, localize } from "@/lib/i18n";

interface StaffDirectoryProps {
  limit?: number;
}

// Extensions reach the main switchboard first, so the dial string pauses before
// sending them. The visible text stays in the readable "ext. 1200" form.
function dialString(mainLine: string, extension: string): string {
  return `${mainLine.replace(/[^0-9+]/g, "")},,${extension}`;
}

export function StaffDirectory({ limit }: StaffDirectoryProps = {}) {
  const { strings, language } = useLanguage();
  const allStaff = staff.map((member) => localize(member, language));
  const localizedStaff = typeof limit === "number" ? allStaff.slice(0, limit) : allStaff;
  const mainLine = strings.footer.phone;

  // A table was the wrong container here: InteriorLayout caps the content column at
  // 70ch (~430px), so five columns plus a portrait could only be reached by scrolling
  // sideways, which buried the email address. Cards carry the same fields at any width.
  return (
    <section aria-labelledby="staff-directory-heading" className="mt-8">
      <h2 className="text-xl font-semibold text-gov-navy" id="staff-directory-heading">
        {strings.pages.staffDirectoryHeading}
      </h2>
      <p className="mt-2 text-gov-slate">{strings.pages.staffDirectoryIntro}</p>

      <ul className="mt-4 flex flex-col gap-3">
        {localizedStaff.map((member) => (
          <li
            key={member.id}
            className="flex gap-4 rounded-lg border border-gov-border p-4 shadow-card"
          >
            {/* Explicit dimensions rather than fill, so the reserved space is correct
                before the image loads. Static export runs with the optimizer off. */}
            <Image
              src={withBasePath(member.photo)}
              alt={member.photoAlt}
              width={800}
              height={1000}
              sizes="72px"
              className="h-[90px] w-[72px] flex-none rounded border border-gov-border object-cover"
            />
            <div className="min-w-0">
              <p className="font-medium text-gov-navy">{member.name}</p>
              <p className="mt-1 text-sm text-gov-slate">{member.title}</p>
              <p className="text-sm text-gov-slate">{member.department}</p>
              <p className="mt-2 text-sm">
                <a
                  href={`tel:${dialString(mainLine, member.extension)}`}
                  className="link-body"
                >
                  {mainLine} ext. {member.extension}
                </a>
              </p>
              <p className="text-sm">
                <a href={`mailto:${member.email}`} className="link-body break-all">
                  {member.email}
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
