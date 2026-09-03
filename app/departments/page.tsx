"use client";

import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";
import { useLanguage, localize } from "@/lib/i18n";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { RelatedLinks } from "@/components/layout/RelatedLinks";
import { sections } from "@/content/sections";
import { departments } from "@/content/departments";
import { staff } from "@/content/staff";
import { footerDepartmentLinks } from "@/content/nav";

/** Stable anchor id so other pages can deep link to a single division. */
function departmentSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function DepartmentsPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;

  const entries = departments.map((department) => {
    const localized = localize(department, language);
    // Staff records carry the department name, so they join on that.
    const members = staff
      .filter((member) => member.department === department.name)
      .map((member) => localize(member, language));
    const serviceLink = footerDepartmentLinks.find((link) => link.label === department.name);

    return { department, localized, members, serviceLink, slug: departmentSlug(department.name) };
  });

  return (
    <InteriorLayout
      section={section}
      currentHref="/departments"
      breadcrumbs={[{ label: strings.departments.heading }]}
      heading={strings.departments.heading}
      intro={strings.departments.intro}
      sidebar={
        <RelatedLinks
          links={[
            { href: "/contact", label: strings.pages.contactDirectoryHeading },
            { href: "/services", label: strings.pages.servicesHeading },
            { href: "/projects", label: strings.projects.heading },
          ]}
        />
      }
    >
      <div className="flex flex-col gap-8">
        {entries.map(({ localized, members, serviceLink, slug }) => (
          <section key={slug} id={slug} aria-labelledby={`${slug}-heading`} className="scroll-mt-4">
            <h2 id={`${slug}-heading`} className="text-xl font-semibold text-gov-navy">
              {localized.name}
            </h2>

            <dl className="mt-3 flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="font-medium text-gov-navy">{strings.departments.phoneLabel}:</dt>
                <dd className="text-gov-slate">
                  <a
                    href={`tel:${localized.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                  >
                    {localized.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="font-medium text-gov-navy">{strings.departments.emailLabel}:</dt>
                <dd className="text-gov-slate">
                  <a
                    href={`mailto:${localized.email}`}
                    className="break-all text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                  >
                    {localized.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gov-blue" aria-hidden="true" />
                <dt className="font-medium text-gov-navy">{strings.departments.hoursLabel}:</dt>
                <dd className="text-gov-slate">{localized.hours}</dd>
              </div>
            </dl>

            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-gov-slate">
              {strings.departments.servicesHeading}
            </h3>
            {serviceLink ? (
              <p className="mt-1">
                <Link
                  href={serviceLink.href}
                  className="text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                >
                  {language === "es" ? serviceLink.labelEs : serviceLink.label}
                </Link>
              </p>
            ) : (
              <p className="mt-1 text-sm text-gov-slate">{strings.departments.noServices}</p>
            )}

            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-gov-slate">
              {strings.departments.staffHeading}
            </h3>
            {members.length > 0 ? (
              <ul className="mt-1 flex flex-col gap-1 text-sm text-gov-slate">
                {members.map((member) => (
                  <li key={member.id}>
                    <span className="font-medium text-gov-navy">{member.name}</span>, {member.title}{" "}
                    <a
                      href={`mailto:${member.email}`}
                      className="break-all text-gov-blue underline underline-offset-2 hover:text-gov-navy"
                    >
                      {member.email}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-gov-slate">{strings.departments.noStaff}</p>
            )}
          </section>
        ))}
      </div>
    </InteriorLayout>
  );
}
