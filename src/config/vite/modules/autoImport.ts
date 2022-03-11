/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 * https://github.com/antfu/unplugin-auto-import#configuration
 */
import AutoImport from "unplugin-auto-import/vite";
import { Plugin } from "vite";

export const AutoImportDeps = (): Plugin => {
    return AutoImport({
        dts: "src/auto-imports.d.ts",
        imports: ["vue", "pinia", "vue-router", "@vueuse/core"]
    });
};
