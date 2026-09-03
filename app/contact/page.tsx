"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { useLanguage, localize } from "@/lib/i18n";
import { departments } from "@/content/departments";
import { InteriorLayout } from "@/components/layout/InteriorLayout";
import { ContactCard } from "@/components/layout/ContactCard";
import { StaffDirectory } from "@/components/layout/StaffDirectory";
import { sections } from "@/content/sections";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  department: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  department: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { strings, language } = useLanguage();
  const section = sections.find((item) => item.id === "about")!;
  const localizedDepartments = useMemo(
    () => departments.map((department) => localize(department, language)),
    [language],
  );
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  function validate(current: FormValues): Record<string, string> {
    const nextErrors: Record<string, string> = {};
    if (current.name.trim().length === 0) {
      nextErrors.name = strings.contactForm.nameRequiredError;
    }
    if (current.email.trim().length === 0) {
      nextErrors.email = strings.contactForm.emailRequiredError;
    } else if (!EMAIL_PATTERN.test(current.email.trim())) {
      nextErrors.email = strings.contactForm.emailFormatError;
    }
    if (current.message.trim().length === 0) {
      nextErrors.message = strings.contactForm.messageRequiredError;
    }
    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitted(true);
    setValues(initialValues);
  }

  function handleChange<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  const errorEntries = Object.entries(errors);

  return (
    <InteriorLayout
      section={section}
      currentHref="/contact"
      headerImage="/images/headers/contact.jpg"
      breadcrumbs={[{ label: strings.pages.contactHeading }]}
      heading={strings.pages.contactHeading}
      intro={strings.pages.contactIntro}
      lastUpdatedIso="2026-07-01"
      sidebar={
        <ContactCard
          departmentName={strings.footer.contactHeading}
          phone={strings.footer.phone}
          email={strings.footer.email}
          hours={strings.footer.officeHours}
        />
      }
    >
      <h2 className="text-xl font-semibold text-gov-navy">{strings.pages.contactDirectoryHeading}</h2>
      <ul className="mt-4 flex flex-col gap-3 sm:hidden">
        {localizedDepartments.map((department) => (
          <li key={department.name} className="border border-gov-border p-4">
            <p className="font-medium text-gov-navy">{department.name}</p>
            <a href={`tel:${department.phone.replace(/[^0-9+]/g, "")}`} className="mt-1 block text-sm link-body">
              {department.phone}
            </a>
            <a href={`mailto:${department.email}`} className="mt-1 block text-sm link-body break-all">
              {department.email}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-4 hidden overflow-x-auto border border-gov-border sm:block">
        <table className="w-full min-w-[26rem] table-fixed border-collapse text-left">
          <caption className="sr-only">{strings.pages.contactDirectoryCaption}</caption>
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[24%]" />
            <col className="w-[42%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                {strings.pages.contactDirectoryDepartmentColumn}
              </th>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                {strings.pages.contactDirectoryPhoneColumn}
              </th>
              <th scope="col" className="break-words px-3 py-2 font-semibold">
                {strings.pages.contactDirectoryEmailColumn}
              </th>
            </tr>
          </thead>
          <tbody>
            {localizedDepartments.map((department) => (
              <tr key={department.name} className="align-top">
                <td className="break-words px-3 py-2 text-gov-slate">{department.name}</td>
                <td className="break-words px-3 py-2 text-gov-slate">{department.phone}</td>
                <td className="break-all px-3 py-2 text-gov-slate">{department.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StaffDirectory />

      <section className="mt-8" aria-labelledby="contact-form-heading">
        <h2 id="contact-form-heading" className="text-xl font-semibold text-gov-navy">
          {strings.contactForm.legendYourMessage}
        </h2>

        {submitted && (
          <p role="status" className="mt-4 rounded border border-gov-success bg-gov-surface p-4 text-gov-success">
            {strings.contactForm.successMessage}
          </p>
        )}

        {errorEntries.length > 0 && (
          <div
            ref={errorSummaryRef}
            tabIndex={-1}
            role="alert"
            className="mt-4 rounded border border-gov-alert bg-gov-surface p-4"
          >
            <h3 className="font-semibold text-gov-alert">{strings.contactForm.errorSummaryHeading}</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              {errorEntries.map(([field, message]) => (
                <li key={field}>
                  <a href={`#contact-${field}`} className="link-body">
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-4">
          <fieldset className="rounded border border-gov-border p-4">
            <legend className="px-1 text-sm font-bold uppercase tracking-wide text-gov-navy">
              {strings.contactForm.legendYourInfo}
            </legend>

            <div className="mt-2 flex flex-col gap-1">
              <label htmlFor="contact-name" className="text-sm font-medium text-gov-navy">
                {strings.contactForm.nameLabel} <span aria-hidden="true">*</span>
                <span className="sr-only"> ({strings.contactForm.requiredMarker})</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={values.name}
                onChange={(event) => handleChange("name", event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className="rounded border border-gov-control-border px-3 py-2 text-sm text-gov-slate"
              />
              {errors.name && (
                <p id="contact-name-error" className="text-sm text-gov-alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <label htmlFor="contact-email" className="text-sm font-medium text-gov-navy">
                {strings.contactForm.emailLabel} <span aria-hidden="true">*</span>
                <span className="sr-only"> ({strings.contactForm.requiredMarker})</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className="rounded border border-gov-control-border px-3 py-2 text-sm text-gov-slate"
              />
              {errors.email && (
                <p id="contact-email-error" className="text-sm text-gov-alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <label htmlFor="contact-phone" className="text-sm font-medium text-gov-navy">
                {strings.contactForm.phoneLabel}{" "}
                <span className="text-gov-slate">({strings.contactForm.phoneOptional})</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={values.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                className="rounded border border-gov-control-border px-3 py-2 text-sm text-gov-slate"
              />
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <label htmlFor="contact-department" className="text-sm font-medium text-gov-navy">
                {strings.contactForm.departmentLabel}{" "}
                <span className="text-gov-slate">({strings.contactForm.departmentOptional})</span>
              </label>
              <select
                id="contact-department"
                value={values.department}
                onChange={(event) => handleChange("department", event.target.value)}
                className="rounded border border-gov-control-border bg-white px-3 py-2 text-sm text-gov-slate"
              >
                <option value="">{strings.contactForm.departmentPlaceholder}</option>
                {localizedDepartments.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className="mt-6 rounded border border-gov-border p-4">
            <legend className="px-1 text-sm font-bold uppercase tracking-wide text-gov-navy">
              {strings.contactForm.legendYourMessage}
            </legend>

            <div className="mt-2 flex flex-col gap-1">
              <label htmlFor="contact-message" className="text-sm font-medium text-gov-navy">
                {strings.contactForm.messageLabel} <span aria-hidden="true">*</span>
                <span className="sr-only"> ({strings.contactForm.requiredMarker})</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={values.message}
                onChange={(event) => handleChange("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="rounded border border-gov-control-border px-3 py-2 text-sm text-gov-slate"
              />
              {errors.message && (
                <p id="contact-message-error" className="text-sm text-gov-alert">
                  {errors.message}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-6 rounded bg-gov-navy px-5 py-2.5 font-medium text-white hover:bg-gov-blue"
          >
            {strings.contactForm.submitLabel}
          </button>
          <p className="mt-3 text-xs text-gov-slate">{strings.contactForm.demoNote}</p>
        </form>
      </section>
    </InteriorLayout>
  );
}
