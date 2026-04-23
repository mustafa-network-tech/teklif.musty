import postcssConvertLab from "./postcss-convert-lab.mjs";

const config = {
  plugins: [
    "@tailwindcss/postcss",
    ["postcss-preset-env", { stage: 2, preserve: false }],
    postcssConvertLab(),
  ],
};

export default config;
