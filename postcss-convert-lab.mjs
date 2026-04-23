import { formatRgb, parse } from "culori";

/**
 * html2canvas eski renk ayrıştırıcısı lab()/oklab color-mix kullanamıyor.
 * Tailwind v4 çıktısındaki lab(...) ve color-mix(in lab|oklab, ...) ifadelerini sRGB uyumlu hale getirir.
 */
export default function postcssConvertLab() {
  return {
    postcssPlugin: "postcss-convert-lab",
    OnceExit(root) {
      root.walkDecls((decl) => {
        let v = decl.value;
        if (!v || (!v.includes("lab(") && !v.includes("oklab") && !v.includes("in lab"))) return;

        v = v.replaceAll("in oklab", "in srgb");
        v = v.replace(/\bin lab\b/gi, "in srgb");

        let prev;
        do {
          prev = v;
          v = v.replace(/lab\(([^)]+)\)/gi, (full) => {
            try {
              const p = parse(full.trim());
              if (!p) return full;
              const out = formatRgb(p);
              return out ?? full;
            } catch {
              return full;
            }
          });
        } while (v !== prev && v.includes("lab("));

        decl.value = v;
      });
    },
  };
}

postcssConvertLab.postcss = true;
