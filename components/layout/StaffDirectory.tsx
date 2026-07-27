"use client";

import { staff } from "@/content/staff";
import { useLanguage, localize } from "@/lib/i18n";

export function StaffDirectory() {
  const { strings, language } = useLanguage();
  const localizedStaff = staff.map((member) => localize(member, language));

  return (
    <section aria-labelledby="staff-directory-heading" className="mt-8">
      <h2 className="text-xl font-semibold text-gov-navy" id="staff-directory-heading">
        {strings.pages.staffDirectoryHeading}
      </h2>
      <p className="mt-2 text-gov-slate">{strings.pages.staffDirectoryIntro}</p>
      <ul className="mt-4 flex flex-col gap-3 sm:hidden">
        {localizedStaff.map((member) => (
          <li key={member.id} className="border border-gov-border p-4">
            <p className="font-medium text-gov-navy">{member.name}</p>
            <p className="mt-1 text-sm text-gov-slate">{member.title}</p>
            <p className="text-sm text-gov-slate">{member.department}</p>
            <a href={`mailto:${member.email}`} className="mt-2 inline-block link-body break-all">
              {member.email}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
        <table className="w-full min-w-[28rem] border-collapse text-left">
          <caption className="sr-only">{strings.pages.staffDirectoryHeading}</caption>
          <thead>
            <tr>
              <th scope="col" className="px-3 py-2 font-semibold">
                Name
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Title
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Department
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {localizedStaff.map((member) => (
              <tr key={member.id} className="align-top">
                <td className="px-3 py-2 font-medium text-gov-navy">{member.name}</td>
                <td className="px-3 py-2 text-gov-slate">{member.title}</td>
                <td className="px-3 py-2 text-gov-slate">{member.department}</td>
                <td className="px-3 py-2 text-gov-slate">
                  <a href={`mailto:${member.email}`} className="link-body break-all">
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
