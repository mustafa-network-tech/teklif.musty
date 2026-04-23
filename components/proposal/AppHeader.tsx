"use client";

interface AppHeaderProps {
  proposalDate: string;
  onDateChange: (value: string) => void;
}

export function AppHeader({ proposalDate, onDateChange }: AppHeaderProps) {
  return (
    <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-stone-900 text-[10px] font-bold leading-none tracking-tight text-white shadow-sm">
            MK
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">MK Digital Systems</p>
            <h1 className="text-lg font-semibold tracking-tight text-stone-950 sm:text-xl">Profesyonel Teklif Oluşturucu</h1>
            <p className="mt-1 text-xs text-stone-500">MK Teklif — hızlı, mobil uyumlu, müşteriye gönderilebilir çıktı</p>
            <p className="mt-1 text-[11px] text-stone-400">Yetkili: Mustafa Öner</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 self-start rounded-xl border border-stone-200 bg-stone-50/80 px-3 py-2 text-xs text-stone-600 sm:self-auto">
          <label htmlFor="header-date" className="font-medium text-stone-700">
            Tarih
          </label>
          <input
            id="header-date"
            type="date"
            value={proposalDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-2 py-1 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-stone-200"
          />
        </div>
      </div>
    </header>
  );
}
