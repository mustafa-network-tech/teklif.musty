"use client";

import type { Currency, ProposalData } from "@/types/proposal";
import { DynamicList } from "@/components/proposal/DynamicList";
import { QuickFillBar } from "@/components/proposal/QuickFillBar";
import type { QuickFillItem } from "@/lib/quickFill";

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:ring-2 focus:ring-stone-200/80";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-600";

interface ProposalFormProps {
  data: ProposalData;
  onChange: (patch: Partial<ProposalData>) => void;
  onListChange: <K extends keyof Pick<ProposalData, "scopeItems" | "deliverables" | "notesItems">>(
    key: K,
    value: ProposalData[K]
  ) => void;
  onQuickFill: (item: QuickFillItem) => void;
}

export function ProposalForm({ data, onChange, onListChange, onQuickFill }: ProposalFormProps) {
  return (
    <div className="flex flex-col gap-5 pb-28 lg:pb-8">
      <QuickFillBar onPick={onQuickFill} />

      <section className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-semibold tracking-tight text-stone-900">Teklif bilgileri</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="proposalTitle">
              Teklif başlığı
            </label>
            <input
              id="proposalTitle"
              value={data.proposalTitle}
              onChange={(e) => onChange({ proposalTitle: e.target.value })}
              className={inputClass}
              placeholder="Örn. Kurumsal web sitesi geliştirme teklifi"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="customerName">
              Müşteri / firma adı
            </label>
            <input
              id="customerName"
              value={data.customerName}
              onChange={(e) => onChange({ customerName: e.target.value })}
              className={inputClass}
              placeholder="Firma unvanı"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="contactPerson">
              Yetkili kişi
            </label>
            <input
              id="contactPerson"
              value={data.contactPerson}
              onChange={(e) => onChange({ contactPerson: e.target.value })}
              className={inputClass}
              placeholder="Ad soyad"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="proposalDate">
              Teklif tarihi
            </label>
            <input
              id="proposalDate"
              type="date"
              value={data.proposalDate}
              onChange={(e) => onChange({ proposalDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="proposalNumber">
              Teklif numarası
            </label>
            <input
              id="proposalNumber"
              value={data.proposalNumber}
              onChange={(e) => onChange({ proposalNumber: e.target.value })}
              className={inputClass}
              placeholder="Otomatik üretilir; düzenleyebilirsiniz"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-semibold tracking-tight text-stone-900">İçerik</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="greeting">
              Hitap / giriş paragrafı
            </label>
            <textarea
              id="greeting"
              rows={4}
              value={data.greeting}
              onChange={(e) => onChange({ greeting: e.target.value })}
              className={`${inputClass} min-h-[120px] resize-y leading-relaxed`}
              placeholder="Profesyonel bir giriş metni yazın…"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="projectSummary">
              Proje özeti
            </label>
            <textarea
              id="projectSummary"
              rows={4}
              value={data.projectSummary}
              onChange={(e) => onChange({ projectSummary: e.target.value })}
              className={`${inputClass} min-h-[100px] resize-y leading-relaxed`}
              placeholder="Kısa ve net bir özet…"
            />
          </div>
        </div>
      </section>

      <DynamicList
        title="İş kapsamı maddeleri"
        description="Teklif kapsamındaki başlıca işleri madde madde listeleyin."
        items={data.scopeItems}
        onChange={(next) => onListChange("scopeItems", next)}
        placeholder="Kapsam maddesi…"
        addButtonLabel="Kapsam maddesi ekle"
      />

      <DynamicList
        title="Teslimatlar"
        description="Müşteriye teslim edilecek çıktıları netleştirin."
        items={data.deliverables}
        onChange={(next) => onListChange("deliverables", next)}
        placeholder="Teslimat kalemi…"
        addButtonLabel="Teslimat ekle"
      />

      <section className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-semibold tracking-tight text-stone-900">Süre ve fiyatlandırma</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="timeline">
              Zaman çizelgesi / teslim süresi
            </label>
            <textarea
              id="timeline"
              rows={3}
              value={data.timeline}
              onChange={(e) => onChange({ timeline: e.target.value })}
              className={`${inputClass} resize-y leading-relaxed`}
              placeholder="Planlanan fazlar veya toplam süre…"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="price">
              Fiyat
            </label>
            <input
              id="price"
              inputMode="decimal"
              value={data.price}
              onChange={(e) => onChange({ price: e.target.value })}
              className={inputClass}
              placeholder="Örn. 125000"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="currency">
              Para birimi
            </label>
            <select
              id="currency"
              value={data.currency}
              onChange={(e) => onChange({ currency: e.target.value as Currency })}
              className={inputClass}
            >
              <option value="TRY">TRY — Türk Lirası</option>
              <option value="USD">USD — ABD Doları</option>
              <option value="EUR">EUR — Euro</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <span className={labelClass}>KDV durumu</span>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-stone-900">KDV dahil mi?</p>
                <p className="text-xs text-stone-500">Önizlemede fiyat etiketi buna göre gösterilir.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={data.vatIncluded}
                onClick={() => onChange({ vatIncluded: !data.vatIncluded })}
                className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border transition ${
                  data.vatIncluded
                    ? "border-stone-800 bg-stone-900"
                    : "border-stone-300 bg-white"
                }`}
              >
                <span
                  className={`ml-1 inline-block h-6 w-6 rounded-full bg-white shadow transition ${
                    data.vatIncluded ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Durum: <span className="font-medium text-stone-700">{data.vatIncluded ? "KDV dahil" : "KDV hariç"}</span>
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="validityPeriod">
              Geçerlilik süresi
            </label>
            <textarea
              id="validityPeriod"
              rows={2}
              value={data.validityPeriod}
              onChange={(e) => onChange({ validityPeriod: e.target.value })}
              className={`${inputClass} resize-y leading-relaxed`}
              placeholder="Örn. Bu teklif tarihinden itibaren 10 gün geçerlidir."
            />
          </div>
        </div>
      </section>

      <DynamicList
        title="Notlar / ek şartlar"
        description="Ödeme, fikri mülkiyet veya sınırlar gibi maddeleri ekleyin."
        items={data.notesItems}
        onChange={(next) => onListChange("notesItems", next)}
        placeholder="Şart veya not…"
        addButtonLabel="Not ekle"
      />

      <section className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-semibold tracking-tight text-stone-900">Kapanış ve iletişim</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass} htmlFor="closingMessage">
              Kapanış mesajı
            </label>
            <textarea
              id="closingMessage"
              rows={3}
              value={data.closingMessage}
              onChange={(e) => onChange({ closingMessage: e.target.value })}
              className={`${inputClass} resize-y leading-relaxed`}
              placeholder="Profesyonel bir kapanış…"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="companyPhone">
                Şirket telefonu
              </label>
              <input
                id="companyPhone"
                value={data.companyPhone}
                onChange={(e) => onChange({ companyPhone: e.target.value })}
                className={inputClass}
                placeholder="+90 …"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="companyEmail">
                Şirket e-postası
              </label>
              <input
                id="companyEmail"
                type="email"
                value={data.companyEmail}
                onChange={(e) => onChange({ companyEmail: e.target.value })}
                className={inputClass}
                placeholder="info@…"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="companyWebsite">
                Web sitesi
              </label>
              <input
                id="companyWebsite"
                value={data.companyWebsite}
                onChange={(e) => onChange({ companyWebsite: e.target.value })}
                className={inputClass}
                placeholder="https://"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="signatureName">
                İmza adı (isteğe bağlı)
              </label>
              <input
                id="signatureName"
                value={data.signatureName}
                onChange={(e) => onChange({ signatureName: e.target.value })}
                className={inputClass}
                placeholder="Örn. Mustafa Öner"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
