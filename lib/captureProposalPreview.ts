"use client";

/** Klon üzerinde web fontlarını kaldırır; canvas tainted / lab uyumu için. */
export function useSystemFontsOnClone(clonedDoc: Document, clonedElement: HTMLElement): void {
  const root =
    (clonedDoc.getElementById("proposal-print-root") as HTMLElement | null) ??
    (clonedElement.id === "proposal-print-root" ? clonedElement : null);
  if (!root) return;
  const stack = "Georgia, 'Times New Roman', 'Noto Serif', 'Liberation Serif', Times, serif";
  root.classList.remove("font-proposal-doc");
  root.style.fontFamily = stack;
  root.querySelectorAll<HTMLElement>("h1,h2,h3,h4,p,li,span,div,section,header,footer,label").forEach((el) => {
    el.style.fontFamily = stack;
  });
}

/**
 * Teklif önizleme kökünü yüksek çözünürlüklü canvas’a çizer (PDF ve PNG kart için ortak).
 */
export async function captureProposalPreviewToCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  const html2canvas = (await import("html2canvas")).default;

  const narrow =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const scale = narrow ? Math.min(1.35, dpr) : Math.min(2, dpr * 1.5);

  element.scrollIntoView({ block: "nearest", behavior: "auto" });
  await new Promise<void>((r) => requestAnimationFrame(() => r()));

  return html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: false,
    logging: false,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
    onclone: useSystemFontsOnClone,
  });
}

export function canvasToPngDataUrl(canvas: HTMLCanvasElement): string {
  try {
    return canvas.toDataURL("image/png", 1.0);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("Tainted") || msg.includes("insecure") || msg.includes("SecurityError")) {
      throw new Error(
        "Görsel güvenlik nedeniyle oluşturulamadı. Sayfayı yenileyip tekrar deneyin veya farklı tarayıcı kullanın."
      );
    }
    throw err;
  }
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("PNG oluşturulamadı."));
        },
        "image/png",
        1.0
      );
    } catch (e) {
      reject(e);
    }
  });
}
