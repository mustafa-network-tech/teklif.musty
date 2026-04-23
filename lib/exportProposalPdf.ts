"use client";

import jsPDF from "jspdf";

export type ProposalPdfSaveOutcome =
  | "shared"
  | "downloaded"
  | "opened_in_browser"
  | "cancelled";

function isLikelyIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  const nav = navigator as Navigator & { maxTouchPoints?: number };
  return nav.platform === "MacIntel" && (nav.maxTouchPoints ?? 0) > 1;
}

/**
 * Önizleme DOM'unu A4 PDF blob'una çevirir; uzun içerikte sayfa böler.
 */
async function captureElementToPdfBlob(element: HTMLElement): Promise<Blob> {
  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(element, {
    scale: Math.min(2, (window.devicePixelRatio || 1) * 1.5),
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  /** A4 içinde simetrik boşluk — tam genişlik yerine dar içerik alanı (PDF’de sol/sağ dengeli). */
  const marginX = 16;
  const marginY = 14;
  const innerW = pageWidth - marginX * 2;
  const innerH = pageHeight - marginY * 2;

  const imgWidth = innerW;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let positionY = marginY;
  pdf.addImage(imgData, "PNG", marginX, positionY, imgWidth, imgHeight);

  let heightLeft = imgHeight - innerH;
  while (heightLeft > 0) {
    positionY = marginY - (imgHeight - heightLeft);
    pdf.addPage();
    pdf.addImage(imgData, "PNG", marginX, positionY, imgWidth, imgHeight);
    heightLeft -= innerH;
  }

  const raw = pdf.output("blob");
  return raw instanceof Blob ? new Blob([raw], { type: "application/pdf" }) : new Blob([], { type: "application/pdf" });
}

function triggerAnchorDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function openBlobInNewTab(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const w = window.open(url, "_blank", "noopener,noreferrer");
  if (!w) {
    window.location.assign(url);
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
}

/**
 * 1) Mümkünse Web Share API ile dosya paylaş (Dosyalar, Drive, WhatsApp…).
 * 2) iOS: çoğu durumda PDF’yi sekmede aç; Safari’de Paylaş → Dosyalar’a Kaydet.
 * 3) Diğer: blob indirme; olmazsa sekmede aç.
 */
async function deliverPdfToDevice(blob: Blob, fileName: string): Promise<ProposalPdfSaveOutcome> {
  const file = new File([blob], fileName, { type: "application/pdf" });

  if (typeof navigator.share === "function" && typeof navigator.canShare === "function") {
    const payload: ShareData = { files: [file], title: "MK Teklif", text: "Teklif PDF dosyası" };
    if (navigator.canShare(payload)) {
      try {
        await navigator.share(payload);
        return "shared";
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return "cancelled";
        }
        /* devam — indirme veya sekme */
      }
    }
  }

  if (isLikelyIOS()) {
    openBlobInNewTab(blob);
    return "opened_in_browser";
  }

  try {
    triggerAnchorDownload(blob, fileName);
    return "downloaded";
  } catch {
    openBlobInNewTab(blob);
    return "opened_in_browser";
  }
}

/**
 * Önizleme DOM'unu PDF yapar ve telefona / cihaza kaydetmeyi dener.
 */
export async function exportProposalPdf(
  element: HTMLElement,
  fileName: string
): Promise<ProposalPdfSaveOutcome> {
  const blob = await captureElementToPdfBlob(element);
  return deliverPdfToDevice(blob, fileName);
}
