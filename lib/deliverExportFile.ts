"use client";

export type ExportDeliveryOutcome = "shared" | "downloaded" | "opened_in_browser" | "cancelled";

function isLikelyIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  const nav = navigator as Navigator & { maxTouchPoints?: number };
  return nav.platform === "MacIntel" && (nav.maxTouchPoints ?? 0) > 1;
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
 * PDF veya PNG dosyasını paylaş / indir / sekmede aç (mobil uyumlu).
 */
export async function deliverExportFile(
  blob: Blob,
  fileName: string,
  options: { mime: string; shareTitle: string; shareText: string }
): Promise<ExportDeliveryOutcome> {
  const file = new File([blob], fileName, { type: options.mime });

  if (typeof navigator.share === "function" && typeof navigator.canShare === "function") {
    const payload: ShareData = { files: [file], title: options.shareTitle, text: options.shareText };
    if (navigator.canShare(payload)) {
      try {
        await navigator.share(payload);
        return "shared";
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return "cancelled";
        }
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
