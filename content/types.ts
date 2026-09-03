export interface Service {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  icon: string;
  whoItAppliesTo: string;
  howToApply: string;
  relatedFormIds: string[];
  photo: string;
  photoAlt: string;
  contactPhone?: string;
  contactEmail?: string;
  es: {
    name: string;
    category: string;
    summary: string;
    description: string;
    whoItAppliesTo: string;
    howToApply: string;
  };
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  date: string;
  department: string;
  urgent: boolean;
  active: boolean;
  es: {
    title: string;
    body: string;
    department: string;
  };
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
  es: {
    title: string;
    body: string;
    location: string;
  };
}

export interface FormDoc {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: "PDF" | "DOC";
  fileSizeLabel: string;
  lastUpdated: string;
  featured?: boolean;
  es: {
    title: string;
    description: string;
    category: string;
  };
}

export interface Department {
  name: string;
  phone: string;
  email: string;
  hours: string;
  es: {
    name: string;
    hours: string;
  };
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  department: string;
  extension: string;
  email: string;
  photo: string;
  photoAlt: string;
  es: {
    title: string;
    department: string;
  };
}

export interface Project {
  id: string;
  name: string;
  status: "Planning" | "Design" | "In Construction" | "Completed";
  division: string;
  budget: string;
  timeline: string;
  description: string;
  es: {
    name: string;
    status: string;
    division: string;
    description: string;
  };
}

export interface UIStrings {
  nav: {
    home: string;
    services: string;
    notices: string;
    meetings: string;
    forms: string;
    contact: string;
  };
  header: {
    searchPlaceholder: string;
    searchLabel: string;
    languageToggleToEs: string;
    languageToggleToEn: string;
    skipLink: string;
    mobileNavOpen: string;
    mobileNavClose: string;
    agencyName: string;
    agencyParent: string;
    homeLink: string;
    seatUnder: string;
    seatOver: string;
    seatReset: string;
    textSizeGroupLabel: string;
    textSizeNormal: string;
    textSizeLarge: string;
    textSizeLargest: string;
    contactLink: string;
    quickActionsHeading: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
    navDropdownOpen: string;
    navDropdownClose: string;
  };
  footer: {
    contactHeading: string;
    officeHoursHeading: string;
    officeHours: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
    tty: string;
    phone2: string;
    email: string;
    accessibilityStatement: string;
    nonDiscrimination: string;
    publicRecords: string;
    privacyPolicy: string;
    siteMap: string;
    departmentsHeading: string;
    servicesHeading: string;
    resourcesHeading: string;
    connectHeading: string;
    copyright: string;
    designedBy: string;
    backToTop: string;
    navLabel: string;
  };
  alert: {
    pauseScrolling: string;
    resumeScrolling: string;
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
    alertsHeading: string;
    noAlertsMessage: string;
    quickLinksHeading: string;
    upcomingMeetingsHeading: string;
    viewAllMeetings: string;
    recentNoticesHeading: string;
    viewAllNotices: string;
    departmentsCta: string;
    contactCta: string;
    servicesShowcaseHeading: string;
    viewAllServices: string;
    projectsHeading: string;
    projectsIntro: string;
    projectStatusLabel: string;
    projectBudgetLabel: string;
    projectTimelineLabel: string;
    popularFormsHeading: string;
    viewAllForms: string;
    viewAllStaff: string;
    contactCtaHeading: string;
    contactCtaIntro: string;
    reportIssueCta: string;
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
    contactHeading: string;
    contactIntro: string;
    contactDirectoryHeading: string;
    contactDirectoryCaption: string;
    contactDirectoryDepartmentColumn: string;
    contactDirectoryPhoneColumn: string;
    contactDirectoryEmailColumn: string;
    staffDirectoryHeading: string;
    staffDirectoryIntro: string;
  };
  serviceDetail: {
    appliesToHeading: string;
    howToApplyHeading: string;
    relatedFormsHeading: string;
    contactHeading: string;
    backLink: string;
  };
  noticeDetail: {
    postedLabel: string;
    departmentLabel: string;
    backLink: string;
  };
  services: {
    categoryFilterLabel: string;
    allCategoriesLabel: string;
    resultsCount: string;
    emptyState: string;
  };
  notices: {
    yearFilterLabel: string;
    allYearsLabel: string;
    resultsCount: string;
    emptyState: string;
  };
  meetings: {
    agendaLabel: string;
    minutesLabel: string;
    upcomingHeading: string;
    pastHeading: string;
    noUpcoming: string;
    noPast: string;
    atTime: string;
    forLabel: string;
    pdfFormat: string;
  };
  forms: {
    searchLabel: string;
    searchPlaceholder: string;
    categoryFilterLabel: string;
    allCategoriesLabel: string;
    resultsCount: string;
    emptyState: string;
    lastUpdatedLabel: string;
    fileSizeLabel: string;
  };
  contactForm: {
    legendYourInfo: string;
    legendYourMessage: string;
    nameLabel: string;
    nameRequiredError: string;
    emailLabel: string;
    emailRequiredError: string;
    emailFormatError: string;
    phoneLabel: string;
    phoneOptional: string;
    departmentLabel: string;
    departmentOptional: string;
    departmentPlaceholder: string;
    messageLabel: string;
    messageRequiredError: string;
    errorSummaryHeading: string;
    submitLabel: string;
    successMessage: string;
    demoNote: string;
    requiredMarker: string;
  };
  accessibility: {
    heading: string;
    intro: string;
    standardsHeading: string;
    standardsBody: string;
    testingHeading: string;
    testingBody: string;
    testingAutomated: string;
    testingManual: string;
    featuresHeading: string;
    features: string[];
    limitationsHeading: string;
    limitationsBody: string;
    limitations: string[];
    formatsHeading: string;
    formatsBody: string;
    feedbackHeading: string;
    feedbackBody: string;
    contactLinkLabel: string;
  };
  privacy: {
    heading: string;
    intro: string;
    demoNote: string;
    collectHeading: string;
    collectBody: string;
    cookiesHeading: string;
    cookiesBody: string;
    thirdPartyHeading: string;
    thirdPartyBody: string;
    retentionHeading: string;
    retentionBody: string;
    rightsHeading: string;
    rightsBody: string;
    changesHeading: string;
    changesBody: string;
    contactHeading: string;
    contactBody: string;
    contactLinkLabel: string;
  };
  siteMap: {
    heading: string;
    intro: string;
    allPagesHeading: string;
  };
  projects: {
    heading: string;
    intro: string;
    statusFilterLabel: string;
    allStatuses: string;
    budgetLabel: string;
    timelineLabel: string;
    divisionLabel: string;
    caption: string;
    empty: string;
    countLabel: string;
  };
  departments: {
    heading: string;
    intro: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    servicesHeading: string;
    staffHeading: string;
    noServices: string;
    noStaff: string;
  };
  tables: {
    service: string;
    category: string;
    summary: string;
    notice: string;
    posted: string;
    status: string;
    meeting: string;
    dateAndLocation: string;
    documents: string;
    form: string;
    name: string;
    title: string;
    department: string;
    email: string;
    project: string;
    division: string;
  };
  publicRecords: {
    heading: string;
    intro: string;
    whoHeading: string;
    whoBody: string;
    howHeading: string;
    howBodyBefore: string;
    howFormsLinkLabel: string;
    howBodyAfter: string;
    exemptHeading: string;
    exemptBody: string;
    feesHeading: string;
    feesBody: string;
    responseHeading: string;
    responseBody: string;
    appealsHeading: string;
    appealsBody: string;
    contactHeading: string;
    contactBody: string;
  };
  search: {
    heading: string;
    intro: string;
    inputLabel: string;
    submitLabel: string;
    resultsOne: string;
    resultsMany: string;
    noResults: string;
    noResultsHint: string;
    emptyQuery: string;
    typeService: string;
    typeNotice: string;
    typeMeeting: string;
    typeForm: string;
    typeProject: string;
    typeDepartment: string;
    typePage: string;
  };
  notFound: {
    heading: string;
    intro: string;
    causesHeading: string;
    causeMistyped: string;
    causeMoved: string;
    causeOutdated: string;
    nextStepsHeading: string;
  };
  breadcrumbs: {
    homeLabel: string;
    navLabel: string;
  };
  sectionNav: {
    heading: string;
    toggleLabel: string;
  };
  lastUpdated: {
    label: string;
  };
  pageHelpful: {
    question: string;
    yes: string;
    no: string;
    thanksYes: string;
    thanksNo: string;
  };
  sidebar: {
    contactHeading: string;
    callLabel: string;
    emailLabel: string;
    hoursLabel: string;
    relatedDocumentsHeading: string;
    relatedLinksHeading: string;
  };
}
