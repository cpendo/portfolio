import UntanglingMultitenancy from "./UntanglingMultitenancy";
import HrPayrollDataModel from "./HrPayrollDataModel";

// Single source of truth: feeds both the router (CaseStudy.jsx) and the
// home-page "Case Studies" section cards. Add an entry per converted study.
export const caseStudies = [
  {
    slug: "untangling-multitenancy",
    title: "Untangling Multitenancy",
    hook: "Where flexibility actually belongs in a system, the lesson from an ERP that calcified around one customer, and how I build with it in Mailt now.",
    Component: UntanglingMultitenancy,
  },
  {
    slug: "hr-payroll-data-model",
    title: "Two Data Models",
    hook: "The payroll spine and identity layer behind an HR & payroll rebuild — why time gets three tenses, balances are derived not stored, and access is data you grant.",
    Component: HrPayrollDataModel,
  },
  // Next, same pattern:
  //   recurring-billing-system  → "Designing a billing system whose state can't drift"
];

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((cs) => [cs.slug, cs]),
);
