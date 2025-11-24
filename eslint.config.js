import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettier from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    // 全局忽略
    globalIgnores(["dist", "node_modules", ".vite", "src/auto-imports.d.ts", "src/components.d.ts"]),

    // Vue 和 TypeScript 文件配置
    {
        files: ["**/*.{js,ts,vue}"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...vuePlugin.configs["flat/recommended"],
            prettier
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2020
            },
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                sourceType: "module"
            }
        },
        rules: {
            // 禁止使用 eval
            "no-eval": "error",
            // 允许使用 any 类型
            "@typescript-eslint/no-explicit-any": "off",
            // 函数必须添加返回类型
            "@typescript-eslint/explicit-function-return-type": "off",
            // 允许 require 引入
            "@typescript-eslint/no-var-requires": "off",
            // Prettier 错误
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto"
                }
            ],
            // 禁止存在未使用的变量，未使用参数不提示 error
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    varsIgnorePattern: ".*",
                    args: "none"
                }
            ]
        }
    }
]);
