import type { ProposalData } from "@/types/proposal";
import { generateProposalNumber } from "@/lib/proposalNumber";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDefaultProposal(): ProposalData {
  return {
    proposalTitle: "",
    customerName: "",
    contactPerson: "",
    proposalDate: todayISO(),
    proposalNumber: generateProposalNumber(),
    greeting: "",
    projectSummary: "",
    scopeItems: [""],
    deliverables: [""],
    timeline: "",
    price: "",
    currency: "TRY",
    vatIncluded: true,
    validityPeriod: "",
    notesItems: [""],
    closingMessage: "",
    companyPhone: "05456597551",
    companyEmail: "mustafa82oner@gmail.com",
    companyWebsite: "https://mustafaoner.net",
    signatureName: "Mustafa Öner",
  };
}
