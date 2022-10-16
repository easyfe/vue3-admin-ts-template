/**
 * @name ConfigCompressPlugin
 * @description 开启.gz压缩
 */
import viteCompression from "vite-plugin-compression";
import { Plugin } from "vite";

export const ConfigCompressPlugin = (algorithm: "gzip" | "brotliCompress" | "deflate" | "deflateRaw"): Plugin => {
    return viteCompression({
        algorithm,
        verbose: true,
        deleteOriginFile: false
    });
};
