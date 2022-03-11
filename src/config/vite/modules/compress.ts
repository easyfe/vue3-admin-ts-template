/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import viteCompression from "vite-plugin-compression";
import { Plugin } from "vite";

export const ConfigCompressPlugin = (): Plugin => {
    return viteCompression({
        ext: ".gz",
        verbose: true,
        deleteOriginFile: false
    });
};
