"use client";

import {
  captureProposalPreviewToCanvas,
  canvasToPngBlob,
  canvasToPngDataUrl,
} from "@/lib/captureProposalPreview";
import { deliverExportFile, type ExportDeliveryOutcome } from "@/lib/deliverExportFile";

export type ProposalCardSaveOutcome = ExportDeliveryOutcome;

async function canvasToPngBlobWithFallback(canvas: HTMLCanvasElement): Promise<Blob> {
  try {
    return await canvasToPngBlob(canvas);
  } catch {
    const url = canvasToPngDataUrl(canvas);
    const res = await fetch(url);
    return res.blob();
  }
}

/**
 * Teklif önizlemesini tek parça PNG kart olarak paylaşır veya indirir (mobil uyumlu).
 */
export async function exportProposalCardPng(
  element: HTMLElement,
  fileName: string
): Promise<ProposalCardSaveOutcome> {
  const canvas = await captureProposalPreviewToCanvas(element);
  const blob = await canvasToPngBlobWithFallback(canvas);
  return deliverExportFile(blob, fileName, {
    mime: "image/png",
    shareTitle: "MK Teklif",
    shareText: "Teklif kartı (görsel)",
  });
}
