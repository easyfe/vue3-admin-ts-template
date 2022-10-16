/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { Plugin } from "vite";

export const AutoRegistryComponents = (): Plugin => {
    return Components({
        // dirs 指定组件所在位置，默认为 src/components
        dirs: ["src/resources/components", "src/layout", "src/views/components", "src/resources/widgets"],
        // 配置需要将哪些后缀类型的文件进行自动按需引入
        extensions: ["vue"],
        deep: true,
        dts: "src/components.d.ts",
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        // 解析的 UI 组件库
        resolvers: [NaiveUiResolver()]
    });
};
