/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import { ConfigSvgIconsPlugin } from "./modules/svg";
import { AutoImportDeps } from "./modules/autoImport";
import { AutoRegistryComponents } from "./modules/component";
import { ConfigRestartPlugin } from "./modules/restart";
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import { ConfigVisualizerConfig } from "./modules/visualizer";
import { ConfigCompressPlugin } from "./modules/compress";
import { ConfigOssPlugin } from "./modules/oss";
import { CosConfig } from "@syyfe/vite-plugin-cos";
import VueSetupExtend from "vite-plugin-vue-setup-extend-plus";

/**
 * 创建vite插件
 * @param params compress：是否开启打包压缩，analyzer：是否开启打包分析，envMap：构建传递的环境变量
 * @returns
 */
export function createVitePlugins(params: {
    envMap: Record<string, any>;
    uploadOption?: CosConfig;
}): (Plugin | Plugin[])[] {
    const vitePlugins: (Plugin | Plugin[])[] = [
        // vue支持
        vue(),
        // svg支持
        ConfigSvgIconsPlugin("src/assets/svg"),
        // 自动按需引入依赖
        AutoImportDeps(),
        // 自动按需引入组件
        AutoRegistryComponents(),
        // 监听配置文件改动重启
        ConfigRestartPlugin(),
        // 加速首次构建
        PkgConfig(),
        OptimizationPersist(),
        /**
         * 扩展setup插件，支持在script标签中使用name属性
         * usage: <script setup name="MyComp"></script>
         */
        VueSetupExtend()
    ];
    // 上传oss
    if (params.envMap.VITE_APP_MODE !== "development" && params.uploadOption?.SecretId) {
        vitePlugins.push(ConfigOssPlugin(params.uploadOption));
    }
    // 代码压缩 .gzip之类
    if (params.envMap.VITE_APP_COMPRESS) {
        vitePlugins.push(ConfigCompressPlugin(params.envMap.VITE_APP_COMPRESS));
    }
    // 依赖分析
    if (params.envMap.VITE_APP_MODE !== "development") {
        vitePlugins.push(ConfigVisualizerConfig());
    }
    return vitePlugins;
}
