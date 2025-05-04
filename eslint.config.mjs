import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            // Disable the `@typescript-eslint/no-explicit-any` rule
            "@typescript-eslint/no-explicit-any": "off",

            // Disable the `@typescript-eslint/no-unused-vars` rule
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
];

export default eslintConfig;
