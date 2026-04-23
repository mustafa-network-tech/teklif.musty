"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { ProposalData } from "@/types/proposal";
import { getDefaultProposal } from "@/lib/defaultProposal";
import { getSampleProposal } from "@/lib/sampleProposal";
import { generateProposalNumber } from "@/lib/proposalNumber";
import { exportProposalPdf } from "@/lib/exportProposalPdf";
import { sanitizeForFilename } from "@/lib/sanitizeFilename";
import type { QuickFillItem } from "@/lib/quickFill";
import { ProposalForm } from "@/components/proposal/ProposalForm";
import { ProposalPreview } from "@/components/proposal/ProposalPreview";
import { AppHeader } from "@/components/proposal/AppHeader";
import { DesktopActionPanel, MobileActionBar } from "@/components/proposal/ActionClusters";

export function ProposalApp() {
  const [data, setData] = useState<ProposalData>(() => getDefaultProposal());
  const [pdfBusy, setPdfBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const patch = useCallback((partial: Partial<ProposalData>) => {
    setData((d) => ({ ...d, ...partial }));
  }, []);

  const handleListChange = useCallback(
    <K extends keyof Pick<ProposalData, "scopeItems" | "deliverables" | "notesItems">>(key: K, value: ProposalData[K]) => {
      setData((d) => ({ ...d, [key]: value }));
    },
    []
  );

  const applyQuickFill = useCallback((item: QuickFillItem) => {
    const { target } = item;
    setData((d) => {
      if (target.kind === "appendList") {
        const current = d[target.field] as string[];
        const cleaned = current.filter((x) => x.trim() !== "");
        const next = cleaned.length ? [...cleaned, target.text] : [target.text];
        return { ...d, [target.field]: next };
      }
      return { ...d, [target.field]: target.text };
    });
  }, []);

  const handleClear = useCallback(() => {
    setData(getDefaultProposal());
  }, []);

  const handleSample = useCallback(() => {
    setData(getSampleProposal());
  }, []);

  const handlePdf = useCallback(async () => {
    const el = previewRef.current;
    if (!el) return;

    try {
      setPdfBusy(true);

      let proposalNumber = data.proposalNumber.trim();
      if (!proposalNumber) {
        proposalNumber = generateProposalNumber();
        flushSync(() => {
          setData((d) => ({ ...d, proposalNumber }));
        });
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }

      const customerSlug = sanitizeForFilename(data.customerName, "musteri");
      const numberSlug = sanitizeForFilename(proposalNumber, "nosayili");
      const fileName = `mk-digital-systems-teklif-${customerSlug}-${numberSlug}.pdf`;

      const outcome = await exportProposalPdf(el, fileName);
      if (outcome === "opened_in_browser") {
        alert(
          "PDF yeni sekmede açıldı. Safari’de alttaki «Paylaş» simgesinden «Dosyalar’a Kaydet» veya «İndir» ile telefonunuza alabilirsiniz."
        );
      }
    } catch (e) {
      console.error(e);
      alert("PDF oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.");
    } finally {
      setPdfBusy(false);
    }
  }, [data.customerName, data.proposalNumber]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-stone-900">
      <div className="relative z-[1] min-h-screen">
        <AppHeader proposalDate={data.proposalDate} onDateChange={(v) => patch({ proposalDate: v })} />

        <main className="mx-auto max-w-6xl px-4 py-6 pb-36 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:px-6 lg:py-10 lg:pb-12">
          <div className="print:hidden">
            <ProposalForm data={data} onChange={patch} onListChange={handleListChange} onQuickFill={applyQuickFill} />
          </div>

          <div>
            <DesktopActionPanel
              onPdf={handlePdf}
              onPrint={handlePrint}
              onClear={handleClear}
              onSample={handleSample}
              pdfBusy={pdfBusy}
            />
            <ProposalPreview ref={previewRef} data={data} />
          </div>
        </main>

        <MobileActionBar
          onPdf={handlePdf}
          onPrint={handlePrint}
          onClear={handleClear}
          onSample={handleSample}
          pdfBusy={pdfBusy}
        />

        {pdfBusy ? (
          <div
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-stone-900/15 backdrop-blur-[1px] print:hidden"
            aria-live="polite"
          >
            <div className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm font-medium text-stone-800 shadow-lg">
              PDF hazırlanıyor…
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
