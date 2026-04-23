import type { Currency } from "@/types/proposal";

const currencyLocale: Record<Currency, string> = {
  TRY: "tr-TR",
  USD: "en-US",
  EUR: "de-DE",
};

const currencySymbol: Record<Currency, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
};

export function formatPriceDisplay(
  raw: string,
  currency: Currency,
  vatIncluded: boolean
): string {
  const normalized = raw.replace(/\s/g, "").replace(",", ".");
  const num = Number.parseFloat(normalized);
  if (!Number.isFinite(num) || normalized === "") {
    return "Tutar belirtilmedi";
  }
  const locale = currencyLocale[currency];
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
  const sym = currencySymbol[currency];
  const vat = vatIncluded ? "KDV dahil" : "KDV hariç";
  return `${sym} ${formatted} (${vat})`;
}
