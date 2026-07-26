export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">Accessibility Statement</h1>
      <p className="mt-4 text-gov-slate">
        Bellwood Public Works is committed to ensuring digital accessibility for people of all
        abilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level
        AA and Section 508 of the Rehabilitation Act.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-gov-navy">Measures we take</h2>
      <p className="mt-2 text-gov-slate">
        This site is built with semantic landmarks, keyboard-accessible navigation, visible focus
        indicators, sufficient color contrast, and support for reduced motion preferences. Content
        is reviewed for correct heading structure and descriptive link text.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-gov-navy">Feedback</h2>
      <p className="mt-2 text-gov-slate">
        If you encounter an accessibility barrier on this site, please contact us at
        accessibility@bellwoodpublicworks.example or (555) 011-2200. This is a fictional portfolio
        demonstration site and this contact address is not monitored.
      </p>
    </div>
  );
}
