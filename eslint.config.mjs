import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/* eslint-config-next ships flat config from v16, so the FlatCompat shim
   around the legacy "extends" names no longer loads. */
const config = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "out/**", "node_modules/**"] },
];

export default config;
