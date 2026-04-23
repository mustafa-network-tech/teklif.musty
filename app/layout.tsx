import type { Metadata, Viewport } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** Sunucu bileşeninde yükle; istemci kökünde `next/font` kullanımından kaynaklı 500 riskini önler. */
const proposalSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-proposal-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MK Teklif | MK Digital Systems",
  description:
    "MK Digital Systems için mobil uyumlu, profesyonel müşteri teklifi oluşturma ve PDF dışa aktarma aracı.",
  applicationName: "MK Teklif",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MK Teklif",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ef",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${proposalSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
