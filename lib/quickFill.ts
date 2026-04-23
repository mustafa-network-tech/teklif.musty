import type { ListField, ProposalData } from "@/types/proposal";

export type QuickFillTarget =
  | { kind: "appendList"; field: ListField; text: string }
  | { kind: "field"; field: keyof ProposalData; text: string };

export interface QuickFillItem {
  id: string;
  label: string;
  target: QuickFillTarget;
}

export const QUICK_FILL_ITEMS: QuickFillItem[] = [
  {
    id: "scope-web",
    label: "Web tasarım ve geliştirme",
    target: { kind: "appendList", field: "scopeItems", text: "Web tasarım ve geliştirme" },
  },
  {
    id: "scope-mobile",
    label: "Mobil uyumlu arayüz",
    target: { kind: "appendList", field: "scopeItems", text: "Mobil uyumlu (responsive) kullanıcı arayüzü" },
  },
  {
    id: "deliver-admin",
    label: "Admin panel entegrasyonu",
    target: { kind: "appendList", field: "deliverables", text: "Yönetim paneli entegrasyonu ve rol bazlı erişim" },
  },
  {
    id: "deliver-seo",
    label: "SEO uyumlu yapı",
    target: { kind: "appendList", field: "deliverables", text: "SEO uyumlu sayfa yapısı ve performans odaklı teslim" },
  },
  {
    id: "validity-7",
    label: "Teklif 7 gün geçerlidir",
    target: { kind: "field", field: "validityPeriod", text: "Bu teklif tarihinden itibaren 7 (yedi) gün geçerlidir." },
  },
  {
    id: "timeline-flex",
    label: "Teslim süresi projeye göre netleştirilecektir",
    target: {
      kind: "field",
      field: "timeline",
      text: "Teslim süresi proje kapsamına ve onaylı iş paketlerine göre netleştirilecektir.",
    },
  },
];
