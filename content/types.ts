export interface Service {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  icon: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  date: string;
  urgent: boolean;
  active: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  body: string;
  date: string;
  time: string;
  location: string;
  agendaUrl?: string;
  minutesUrl?: string;
}

export interface FormDoc {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: "PDF" | "DOC";
}

export interface UIStrings {
  nav: {
    home: string;
    services: string;
    notices: string;
    meetings: string;
    forms: string;
  };
  banner: {
    demo: string;
  };
  header: {
    searchPlaceholder: string;
    searchLabel: string;
    languageToggleToEs: string;
    languageToggleToEn: string;
    skipLink: string;
    mobileNavOpen: string;
    mobileNavClose: string;
  };
  footer: {
    contactHeading: string;
    officeHoursHeading: string;
    officeHours: string;
    address: string;
    phone: string;
    email: string;
    accessibilityStatement: string;
    nonDiscrimination: string;
    publicRecords: string;
  };
  alert: {
    urgentLabel: string;
    archivedLabel: string;
  };
  home: {
    heading: string;
    intro: string;
    servicesCta: string;
    noticesCta: string;
    meetingsCta: string;
    formsCta: string;
  };
  pages: {
    servicesHeading: string;
    servicesIntro: string;
    noticesHeading: string;
    noticesIntro: string;
    meetingsHeading: string;
    meetingsIntro: string;
    formsHeading: string;
    formsIntro: string;
  };
}
