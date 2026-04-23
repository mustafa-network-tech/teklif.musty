"use client";

import { forwardRef, useMemo } from "react";
import type { ProposalData } from "@/types/proposal";
import { formatPriceDisplay } from "@/lib/formatPrice";
import { formatDateTr } from "@/lib/formatDate";

function nonEmptyLines(items: string[]): string[] {
  return items.map((s) => s.trim()).filter(Boolean);
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="proposal-section mt-8 break-inside-avoid">
      <h3 className="border-b border-stone-200 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
        {title}
      </h3>
      <div className="mt-3 text-[13px] leading-[1.65] text-stone-800">{children}</div>
    </section>
  );
}

export interface ProposalPreviewProps {
  data: ProposalData;
}

export const ProposalPreview = forwardRef<HTMLDivElement, ProposalPreviewProps>(function ProposalPreview(
  { data },
  ref
) {
  const scope = useMemo(() => nonEmptyLines(data.scopeItems), [data.scopeItems]);
  const deliverables = useMemo(() => nonEmptyLines(data.deliverables), [data.deliverables]);
  const notes = useMemo(() => nonEmptyLines(data.notesItems), [data.notesItems]);

  const priceLine = formatPriceDisplay(data.price, data.currency, data.vatIncluded);

  return (
    <div className="proposal-preview-shell rounded-2xl border border-stone-200/80 bg-stone-100/80 p-3 shadow-inner sm:p-4 lg:sticky lg:top-6">
      <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-widest text-stone-400 print:hidden">
        Canlı önizleme — A4 çıktıya uyarlanmıştır
      </p>
      <div
        ref={ref}
        id="proposal-print-root"
        className="proposal-a4 proposal-print-root font-proposal-doc relative mx-auto min-h-[297mm] overflow-hidden rounded-sm border border-stone-200 bg-transparent text-stone-900 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.25)] print:shadow-none print:border-none"
      >
        {/* PDF + baskı: teklif kutusunun tamamında; uzun belgede tüm sayfa yüksekliğini kaplar (canvas’ta bölünür). */}
        <div
          className="proposal-print-bg pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.26]"
          aria-hidden
          style={{ backgroundImage: "url(/logo/logo.png)" }}
        />
        <div className="proposal-a4-inner relative z-10 mx-auto min-h-full w-full bg-white/76 px-8 py-9 sm:px-10 sm:py-10 print:bg-white/82">
          <header className="flex items-start justify-between gap-4 border-b border-stone-900/10 pb-6 sm:gap-6">
            <div className="min-w-0 flex-1 pr-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500 sm:tracking-[0.22em]">
                MK Digital Systems
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-[26px]">İş Teklifi</h1>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-600">
                {data.proposalTitle || "Teklif başlığı"}
              </p>
            </div>
            <div className="shrink-0 text-right text-xs leading-relaxed text-stone-600">
              <p className="font-semibold text-stone-900">Teklif No</p>
              <p>{data.proposalNumber || "—"}</p>
              <p className="mt-3 font-semibold text-stone-900">Tarih</p>
              <p>{formatDateTr(data.proposalDate)}</p>
            </div>
          </header>

          <section className="mt-8 grid gap-6 break-inside-avoid sm:grid-cols-2">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Müşteri</h3>
              <p className="mt-2 text-base font-semibold text-stone-950">{data.customerName || "—"}</p>
              {data.contactPerson ? (
                <p className="mt-1 text-sm text-stone-600">
                  Yetkili: <span className="text-stone-800">{data.contactPerson}</span>
                </p>
              ) : null}
            </div>
            <div className="rounded-lg border border-stone-100 bg-stone-50/80 px-4 py-3 text-xs leading-relaxed text-stone-600">
              <p className="font-semibold text-stone-800">Geçerlilik</p>
              <p className="mt-1 whitespace-pre-line">{data.validityPeriod || "Belirtilmedi."}</p>
            </div>
          </section>

          {data.greeting ? (
            <Block title="Hitap">
              <p className="whitespace-pre-line">{data.greeting}</p>
            </Block>
          ) : null}

          {data.projectSummary ? (
            <Block title="Proje özeti">
              <p className="whitespace-pre-line">{data.projectSummary}</p>
            </Block>
          ) : null}

          <Block title="İş kapsamı">
            {scope.length ? (
              <ul className="list-disc space-y-2 pl-5 marker:text-stone-400">
                {scope.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-stone-500">Kapsam maddeleri eklendiğinde burada listelenecektir.</p>
            )}
          </Block>

          <Block title="Teslimatlar">
            {deliverables.length ? (
              <ul className="list-disc space-y-2 pl-5 marker:text-stone-400">
                {deliverables.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-stone-500">Teslimat kalemleri eklendiğinde burada görünecektir.</p>
            )}
          </Block>

          {data.timeline ? (
            <Block title="Zaman çizelgesi">
              <p className="whitespace-pre-line">{data.timeline}</p>
            </Block>
          ) : null}

          <Block title="Fiyatlandırma">
            <div className="rounded-lg border border-stone-200 bg-stone-50/90 px-4 py-4">
              <p className="text-lg font-semibold tracking-tight text-stone-950">{priceLine}</p>
              <p className="mt-2 text-xs text-stone-500">
                Tutarlar teklif kapsamındaki tanımlı işlere göredir; ek talepler ayrıca değerlendirilir.
              </p>
            </div>
          </Block>

          {notes.length ? (
            <Block title="Notlar ve şartlar">
              <ul className="list-disc space-y-2 pl-5 marker:text-stone-400">
                {notes.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </Block>
          ) : null}

          {data.closingMessage ? (
            <Block title="Kapanış">
              <p className="whitespace-pre-line">{data.closingMessage}</p>
            </Block>
          ) : null}

          <footer className="mt-12 border-t border-stone-200 pt-6 text-xs leading-relaxed text-stone-600 break-inside-avoid">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">İletişim</p>
            <div className="mt-3 grid gap-1 sm:grid-cols-2">
              <p>{data.companyPhone || "Telefon —"}</p>
              <p>{data.companyEmail || "E-posta —"}</p>
              <p className="sm:col-span-2">{data.companyWebsite || "Web —"}</p>
            </div>
            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-stone-900">MK Digital Systems</p>
                <p className="text-xs text-stone-500">Dijital sistemler ve yazılım çözümleri</p>
              </div>
              <div className="max-w-xs text-right">
                <div className="h-px w-40 bg-stone-300 sm:ml-auto" />
                <p className="mt-2 text-xs text-stone-600">{data.signatureName || "Yetkili"}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
});
