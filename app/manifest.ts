import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MK Teklif — MK Digital Systems",
    short_name: "MK Teklif",
    description: "Profesyonel müşteri teklifi oluşturma ve PDF dışa aktarma",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2ef",
    theme_color: "#f4f2ef",
    lang: "tr",
    orientation: "portrait-primary",
  };
}
