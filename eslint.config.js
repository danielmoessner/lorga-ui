import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import vueEslint from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
  {
    ignores: ["!.*", "node_modules", ".vscode", "dist", "vite.config.ts"],
  },
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      globals: {
        browser: true,
        node: true,
        console: "readonly",
        window: "readonly",
        document: "readonly",
      },
      parser: vueParser,
      parserOptions: {
        parser: tsEslint.parser,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      vue: vueEslint,
      "@typescript-eslint": tsEslint.plugin,
    },
  },
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  vueEslint.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    rules: {
      "no-unused-vars": "warn",
      "vue/no-unused-components": "warn",
      "vue/no-reserved-component-names": "off",
      "vue/component-name-in-template-casing": [
        "error",
        "PascalCase",
        {
          ignores: [],
        },
      ],
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          singleQuote: false,
          semi: true,
          htmlWhitespaceSensitivity: "ignore",
          endOfLine: "auto",
        },
      ],
    },
  },
]);
