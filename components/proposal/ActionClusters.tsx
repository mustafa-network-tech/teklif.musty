"use client";

import { IconFilePdf, IconPrinter, IconSparkles, IconTrash } from "@/components/icons";

interface ActionClustersProps {
  onPdf: () => void;
  onPrint: () => void;
  onClear: () => void;
  onSample: () => void;
  pdfBusy: boolean;
}

const primaryBtn =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70";
const secondaryBtn =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-stone-50 active:scale-[0.99] disabled:opacity-60";

export function MobileActionBar({ onPdf, onPrint, onClear, onSample, pdfBusy }: ActionClustersProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200/80 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur print:hidden lg:hidden">
      <div className="mx-auto flex max-w-lg flex-col gap-2">
        <button type="button" className={primaryBtn} onClick={onPdf} disabled={pdfBusy}>
          <IconFilePdf className="h-5 w-5" />
          {pdfBusy ? "PDF hazırlanıyor…" : "PDF Oluştur"}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={secondaryBtn} onClick={onPrint} disabled={pdfBusy}>
            <IconPrinter className="h-4 w-4" />
            Yazdır
          </button>
          <button type="button" className={secondaryBtn} onClick={onClear} disabled={pdfBusy}>
            <IconTrash className="h-4 w-4" />
            Formu Temizle
          </button>
        </div>
        <button type="button" className={secondaryBtn} onClick={onSample} disabled={pdfBusy}>
          <IconSparkles className="h-4 w-4" />
          Örnek Veri Doldur
        </button>
      </div>
    </div>
  );
}

export function DesktopActionPanel({ onPdf, onPrint, onClear, onSample, pdfBusy }: ActionClustersProps) {
  return (
    <div className="mb-4 hidden flex-wrap items-center justify-end gap-2 rounded-2xl border border-stone-200/80 bg-white/90 p-3 shadow-sm print:hidden lg:flex">
      <button type="button" className={primaryBtn + " flex-none"} onClick={onPdf} disabled={pdfBusy}>
        <IconFilePdf className="h-5 w-5" />
        {pdfBusy ? "PDF hazırlanıyor…" : "PDF Oluştur"}
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onPrint} disabled={pdfBusy}>
        <IconPrinter className="h-4 w-4" />
        Yazdır / Print
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onClear} disabled={pdfBusy}>
        <IconTrash className="h-4 w-4" />
        Formu Temizle
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onSample} disabled={pdfBusy}>
        <IconSparkles className="h-4 w-4" />
        Örnek Veri Doldur
      </button>
    </div>
  );
}
