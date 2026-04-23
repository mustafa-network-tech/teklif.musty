"use client";

import { IconCard, IconFilePdf, IconPrinter, IconSparkles, IconTrash } from "@/components/icons";

interface ActionClustersProps {
  onCard: () => void;
  onPdf: () => void;
  onPrint: () => void;
  onClear: () => void;
  onSample: () => void;
  exportBusy: boolean;
}

const primaryBtn =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70";
const secondaryBtn =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-stone-50 active:scale-[0.99] disabled:opacity-60";

export function MobileActionBar({
  onCard,
  onPdf,
  onPrint,
  onClear,
  onSample,
  exportBusy,
}: ActionClustersProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200/80 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur print:hidden lg:hidden">
      <div className="mx-auto flex max-w-lg flex-col gap-2">
        <button type="button" className={primaryBtn} onClick={onCard} disabled={exportBusy}>
          <IconCard className="h-5 w-5" />
          {exportBusy ? "Kart hazırlanıyor…" : "Kart kaydet (PNG)"}
        </button>
        <p className="px-1 text-center text-[10px] leading-snug text-stone-500">
          Tek görsel — WhatsApp, Galeri veya Paylaş menüsü için uygundur.
        </p>
        <button type="button" className={secondaryBtn} onClick={onPdf} disabled={exportBusy}>
          <IconFilePdf className="h-4 w-4" />
          PDF oluştur (A4)
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={secondaryBtn} onClick={onPrint} disabled={exportBusy}>
            <IconPrinter className="h-4 w-4" />
            Yazdır
          </button>
          <button type="button" className={secondaryBtn} onClick={onClear} disabled={exportBusy}>
            <IconTrash className="h-4 w-4" />
            Formu Temizle
          </button>
        </div>
        <button type="button" className={secondaryBtn} onClick={onSample} disabled={exportBusy}>
          <IconSparkles className="h-4 w-4" />
          Örnek Veri Doldur
        </button>
      </div>
    </div>
  );
}

export function DesktopActionPanel({
  onCard,
  onPdf,
  onPrint,
  onClear,
  onSample,
  exportBusy,
}: ActionClustersProps) {
  return (
    <div className="mb-4 hidden flex-wrap items-center justify-end gap-2 rounded-2xl border border-stone-200/80 bg-white/90 p-3 shadow-sm print:hidden lg:flex">
      <button type="button" className={primaryBtn + " flex-none"} onClick={onCard} disabled={exportBusy}>
        <IconCard className="h-5 w-5" />
        {exportBusy ? "Kart hazırlanıyor…" : "Kart kaydet (PNG)"}
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onPdf} disabled={exportBusy}>
        <IconFilePdf className="h-4 w-4" />
        PDF (A4)
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onPrint} disabled={exportBusy}>
        <IconPrinter className="h-4 w-4" />
        Yazdır / Print
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onClear} disabled={exportBusy}>
        <IconTrash className="h-4 w-4" />
        Formu Temizle
      </button>
      <button type="button" className={secondaryBtn + " flex-none"} onClick={onSample} disabled={exportBusy}>
        <IconSparkles className="h-4 w-4" />
        Örnek Veri Doldur
      </button>
    </div>
  );
}
