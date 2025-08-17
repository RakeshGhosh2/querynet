// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];


// eslint.config.mjs
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  js.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-useless-escape": "error",
      "react/no-unescaped-entities": "warn",
    }
  },
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
    ]
  }
];