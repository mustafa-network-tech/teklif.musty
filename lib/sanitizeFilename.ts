/** Dosya adı için güvenli, ASCII-yakın slug üretir. */
export function sanitizeForFilename(value: string, fallback: string): string {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  const ascii = trimmed
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return ascii.slice(0, 48) || fallback;
}
