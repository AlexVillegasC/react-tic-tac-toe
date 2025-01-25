import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1) Patrón de archivos a los que se aplica la configuración
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  // 2) Configuración de 'globals' para que ESLint sepa que existen variables
  //    globales de browser (como window, document, etc.)
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  // 3) Reglas recomendadas para JavaScript moderno
  pluginJs.configs.recommended,
  // 4) Reglas planas recomendadas de React
  pluginReact.configs.flat.recommended,
];
