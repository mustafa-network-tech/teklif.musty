"use client";

/**
 * Kök layout dışında oluşan hatalar için (Next.js dokümantasyonu).
 * next/document kullanılmaz; yalnızca düz html/body.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#f4f2ef] font-sans text-stone-900 antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-semibold">Bir hata oluştu</p>
          <p className="max-w-md text-sm text-stone-600">{error.message || "Beklenmeyen bir sorun var."}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium shadow-sm transition hover:bg-stone-50"
          >
            Tekrar dene
          </button>
        </div>
      </body>
    </html>
  );
}
