import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f4f2ef] px-6 text-center text-stone-800">
      <p className="text-lg font-semibold tracking-tight">Sayfa bulunamadı</p>
      <Link
        href="/"
        className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 shadow-sm transition hover:bg-stone-50"
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
