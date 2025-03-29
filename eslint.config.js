import js from "@eslint/js";
import globals from "globals";
import vue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.{js,ts,vue}"], // Ограничиваем проверку только `src/`
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },
  {
    files: ["src/**/*.js"],
    rules: { ...js.configs.recommended.rules },
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: tseslint.configs.recommended?.rules || {},
  },
  {
    files: ["src/**/*.vue"],
    plugins: { vue },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        extraFileExtensions: [".vue"],
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: vue.configs["vue3-recommended"]?.rules || {},
  },
];
