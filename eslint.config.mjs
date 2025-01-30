import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow the use of "any" (you could also set this to "warn" instead of "off")
      "@typescript-eslint/no-explicit-any": "warn",

      // Allow use of the <img> tag instead of Next.js <Image>
      "@next/next/no-img-element": "warn",

      "jsx-a11y/alt-text": "warn",

      "react-hooks/exhaustive-deps": "warn",

      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
