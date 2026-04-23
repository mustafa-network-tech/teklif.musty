"use client";

import jsPDF from "jspdf";
import { captureProposalPreviewToCanvas, canvasToPngDataUrl } from "@/lib/captureProposalPreview";
import { deliverExportFile, type ExportDeliveryOutcome } from "@/lib/deliverExportFile";

export type ProposalPdfSaveOutcome = ExportDeliveryOutcome;

async function captureElementToPdfBlob(element: HTMLElement): Promise<Blob> {
  const canvas = await captureProposalPreviewToCanvas(element);
  const imgData = canvasToPngDataUrl(canvas);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
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

/**
 * Önizleme DOM'unu PDF yapar ve telefona / cihaza kaydetmeyi dener.
 */
export async function exportProposalPdf(
  element: HTMLElement,
  fileName: string
): Promise<ProposalPdfSaveOutcome> {
  const blob = await captureElementToPdfBlob(element);
  return deliverExportFile(blob, fileName, {
    mime: "application/pdf",
    shareTitle: "MK Teklif",
    shareText: "Teklif PDF dosyası",
  });
}
