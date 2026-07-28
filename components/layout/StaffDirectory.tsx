"use client";

import { staff } from "@/content/staff";
import { useLanguage, localize } from "@/lib/i18n";

interface StaffDirectoryProps {
  limit?: number;
}

export function StaffDirectory({ limit }: StaffDirectoryProps = {}) {
  const { strings, language } = useLanguage();
  const allStaff = staff.map((member) => localize(member, language));
  const localizedStaff = typeof limit === "number" ? allStaff.slice(0, limit) : allStaff;

  return (
    <section aria-labelledby="staff-directory-heading" className="mt-8">
      <h2 className="text-xl font-semibold text-gov-navy" id="staff-directory-heading">
        {strings.pages.staffDirectoryHeading}
      </h2>
      <p className="mt-2 text-gov-slate">{strings.pages.staffDirectoryIntro}</p>
      <ul className="mt-4 flex flex-col gap-3 sm:hidden">
        {localizedStaff.map((member) => (
          <li key={member.id} className="rounded-lg border border-gov-border p-4 shadow-card">
            <p className="font-medium text-gov-navy">{member.name}</p>
            <p className="mt-1 text-sm text-gov-slate">{member.title}</p>
            <p className="text-sm text-gov-slate">{member.department}</p>
            <a
              href={`mailto:${member.email}`}
              className="mt-1 inline-flex min-h-[44px] items-center link-body break-all"
            >
              {member.email}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
        <table className="w-full min-w-[24rem] table-fixed border-collapse text-left">
          <caption className="sr-only">{strings.pages.staffDirectoryHeading}</caption>
          <colgroup>
            <col className="w-[22%]" />
            <col className="w-[28%]" />
            <col className="w-[24%]" />
            <col className="w-[26%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                Name
              </th>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                Title
              </th>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                Department
              </th>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {localizedStaff.map((member) => (
              <tr key={member.id} className="align-top">
                <td className="break-words px-3 py-2 font-medium text-gov-navy">{member.name}</td>
                <td className="break-words px-3 py-2 text-gov-slate">{member.title}</td>
                <td className="break-words px-3 py-2 text-gov-slate">{member.department}</td>
                <td className="break-all px-3 py-2 text-gov-slate">
                  <a href={`mailto:${member.email}`} className="link-body">
                    {member.email}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
