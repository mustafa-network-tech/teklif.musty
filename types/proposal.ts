export type Currency = "TRY" | "USD" | "EUR";

export interface ProposalData {
  proposalTitle: string;
  customerName: string;
  contactPerson: string;
  proposalDate: string;
  proposalNumber: string;
  greeting: string;
  projectSummary: string;
  scopeItems: string[];
  deliverables: string[];
  timeline: string;
  price: string;
  currency: Currency;
  vatIncluded: boolean;
  validityPeriod: string;
  notesItems: string[];
  closingMessage: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;
  signatureName: string;
}

export type ListField = "scopeItems" | "deliverables" | "notesItems";
