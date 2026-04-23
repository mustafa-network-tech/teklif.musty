export function formatDateTr(isoDate: string): string {
  if (!isoDate) return "—";
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
