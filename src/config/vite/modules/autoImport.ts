/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 * https://github.com/antfu/unplugin-auto-import#configuration
 */
import AutoImport from "unplugin-auto-import/vite";
import type { Plugin } from "vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export const AutoImportDeps = (): Plugin => {
    return AutoImport({
        dts: "src/auto-imports.d.ts",
        imports: ["vue", "pinia", "vue-router"],
        resolvers: [ArcoResolver({ exclude: ["AMap"] })],
        // 自动导入的目录-自定义全局函数
        dirs: ["src/globals"],
        // 解决eslint报错问题
        eslintrc: {
            // 这里先设置成true然后npm run dev 运行之后会生成 .eslintrc-auto-import.json 文件之后，在改为false
            enabled: true,
            filepath: "src/.eslintrc-auto-import.json", // 生成的文件路径
            globalsPropValue: true
        }
    }) as Plugin;
};
