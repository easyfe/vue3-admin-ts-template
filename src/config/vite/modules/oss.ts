/**
 * oss扩展，自动上传到腾讯云
 */

import { Plugin } from "vite";
import CosPlugin from "@syyfe/vite-plugin-cos";
import { CosConfig } from "@syyfe/vite-plugin-cos";

export const ConfigOssPlugin = (uploadOption: CosConfig): Plugin => {
    return CosPlugin(uploadOption);
};
