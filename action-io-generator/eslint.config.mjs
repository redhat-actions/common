import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    { ignores: ["bin.js", "test/", "dist/", "out/"] },
    {
        files: ["**/*.ts"],
        extends: [js.configs.recommended, tseslint.configs.recommended],
        rules: {
            "no-console": "off",
            "semi": ["error"],
        },
    },
);
