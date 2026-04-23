import type { ProposalData } from "@/types/proposal";
import { generateProposalNumber } from "@/lib/proposalNumber";

export function getSampleProposal(): ProposalData {
  const today = new Date().toISOString().slice(0, 10);
  return {
    proposalTitle: "Kurumsal Web Sitesi Yenileme ve Dijital Altyapı",
    customerName: "Örnek Lojistik A.Ş.",
    contactPerson: "Ayşe Yılmaz",
    proposalDate: today,
    proposalNumber: generateProposalNumber(),
    greeting:
      "Değerli iş ortağımız,\n\nDijital görünürlüğünüzü güçlendirmek ve operasyonel süreçlerinizi destekleyecek modern bir web altyapısı için hazırladığımız teklifi sunmaktan memnuniyet duyarız.",
    projectSummary:
      "Mevcut web sitenizin yenilenmesi; hız, erişilebilirlik ve güvenlik odaklı teknik mimari ile birlikte içerik yönetim süreçlerinin sadeleştirilmesi hedeflenmektedir.",
    scopeItems: [
      "Mevcut içerik ve trafik analizi, bilgi mimarisi önerisi",
      "Kurumsal kimliğe uygun arayüz tasarımı ve bileşen kütüphanesi",
      "Next.js tabanlı performanslı ön yüz geliştirme",
      "İçerik yönetim entegrasyonu ve yayın akışlarının tanımı",
    ],
    deliverables: [
      "Kaynak kod ve teknik dokümantasyon",
      "Staging ve production ortamlarına kurulum",
      "Yönetici eğitimi (1 oturum)",
      "30 gün garanti kapsamında hata düzeltmeleri",
    ],
    timeline: "Sözleşme ve içerik onayından sonra tahmini 6–8 hafta",
    price: "185000",
    currency: "TRY",
    vatIncluded: true,
    validityPeriod: "Bu teklif tarihinden itibaren 14 (on dört) gün geçerlidir.",
    notesItems: [
      "Fiyatlandırma, teklif kapsamında tanımlanan iş paketlerine göredir.",
      "Üçüncü parti lisans veya servis ücretleri ayrıca faturalandırılır.",
    ],
    closingMessage:
      "Sorularınız veya kapsam netleştirme toplantısı için bizimle iletişime geçebilirsiniz. Birlikte çalışmayı dört gözle bekliyoruz.",
    companyPhone: "05456597551",
    companyEmail: "mustafa82oner@gmail.com",
    companyWebsite: "https://mustafaoner.net",
    signatureName: "Mustafa Öner",
  };
}
