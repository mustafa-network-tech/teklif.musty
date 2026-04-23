"use client";

import type { QuickFillItem } from "@/lib/quickFill";
import { QUICK_FILL_ITEMS } from "@/lib/quickFill";

interface QuickFillBarProps {
  onPick: (item: QuickFillItem) => void;
}

export function QuickFillBar({ onPick }: QuickFillBarProps) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4 shadow-sm sm:p-5">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-stone-900">Hızlı ifadeler</h3>
        <p className="mt-1 text-xs text-stone-500">Sık kullanılan profesyonel ifadeleri ilgili alana ekleyin.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUICK_FILL_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item)}
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 active:scale-[0.98]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
