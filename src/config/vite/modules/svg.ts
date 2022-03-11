/**
 * @name SvgIconsPlugin
 * @description 加载SVG文件，自动引入
 */
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import { Plugin } from "vite";

export const ConfigSvgIconsPlugin = (dir: string): Plugin => {
    return createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), dir)],
        // 指定symbolId格式
        symbolId: "svg-[name]"
    });
};
