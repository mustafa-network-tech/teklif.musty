"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f4f2ef] px-6 text-center text-stone-800">
      <p className="text-lg font-semibold">Bir hata oluştu</p>
      <p className="max-w-md text-sm text-stone-600">{error.message || "Beklenmeyen bir sorun var."}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 shadow-sm transition hover:bg-stone-50"
      >
        Tekrar dene
      </button>
    </div>
  );
}
