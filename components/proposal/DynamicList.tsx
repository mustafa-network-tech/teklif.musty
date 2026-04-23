"use client";

import { IconChevronDown, IconChevronUp, IconPlus, IconTrash } from "@/components/icons";

interface DynamicListProps {
  title: string;
  description?: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addButtonLabel: string;
}

export function DynamicList({
  title,
  description,
  items,
  onChange,
  placeholder = "",
  addButtonLabel,
}: DynamicListProps) {
  const updateAt = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const removeAt = (index: number) => {
    if (items.length <= 1) {
      onChange([""]);
      return;
    }
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...items, ""]);
  };

  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[index], next[j]] = [next[j], next[index]];
    onChange(next);
  };

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-col gap-1">
        <h3 className="text-sm font-semibold tracking-tight text-stone-900">{title}</h3>
        {description ? <p className="text-xs leading-relaxed text-stone-500">{description}</p> : null}
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((value, index) => (
          <li key={index} className="flex gap-2">
            <textarea
              value={value}
              onChange={(e) => updateAt(index, e.target.value)}
              placeholder={placeholder}
              rows={2}
              className="min-h-[44px] flex-1 resize-y rounded-xl border border-stone-200 bg-stone-50/40 px-3 py-2.5 text-sm leading-relaxed text-stone-900 shadow-inner outline-none transition placeholder:text-stone-400 focus:border-stone-300 focus:bg-white focus:ring-2 focus:ring-stone-200/80"
            />
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Yukarı taşı"
              >
                <IconChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 shadow-sm transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Aşağı taşı"
              >
                <IconChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50/60 text-red-700 shadow-sm transition hover:bg-red-50"
                aria-label="Satırı sil"
              >
                <IconTrash className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50/50 py-2.5 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-100"
      >
        <IconPlus className="h-4 w-4" />
        {addButtonLabel}
      </button>
    </div>
  );
}
