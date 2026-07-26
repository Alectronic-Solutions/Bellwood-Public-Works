export default function PublicRecordsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-gov-navy">Public Records Request</h1>
      <p className="mt-4 text-gov-slate">
        Members of the public may request access to non-exempt records maintained by Bellwood
        Public Works under the state open records law. Requests are typically fulfilled within ten
        business days.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-gov-navy">How to submit a request</h2>
      <p className="mt-2 text-gov-slate">
        Complete the Public Records Request Form, available on the{" "}
        <a href="/forms" className="text-gov-blue hover:underline">
          Forms and Applications
        </a>{" "}
        page, and submit it by mail, email, or in person at City Hall.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-gov-navy">Contact</h2>
      <p className="mt-2 text-gov-slate">
        records@bellwoodpublicworks.example or (555) 011-2200. This is a fictional portfolio
        demonstration site and this contact address is not monitored.
      </p>
    </div>
  );
}
