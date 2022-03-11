/**
 * @name ConfigRestartPlugin
 * @description 监听配置文件修改自动重启Vite1
 */
import ViteRestart from "vite-plugin-restart";
import { Plugin } from "vite";

export const ConfigRestartPlugin = (): Plugin => {
    return ViteRestart({
        restart: [".env.*", "src/config/vite/**/*.ts"]
    });
};
