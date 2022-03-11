import { UserConfig, ConfigEnv, loadEnv } from "vite";
import path from "path";
import { createVitePlugins } from "./src/config/vite";
// function resovePath(paths: string): string {
//     return path.resolve(__dirname, paths);
// }

// https://vitejs.cn/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
    console.log(command, mode);
    // 环境文件对象
    const envMap = loadEnv(mode, process.cwd());
    return {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        // 插件加载
        plugins: createVitePlugins(),

        // 全局样式引用
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: `@import "@/styles/index.scss";`
                }
            }
        },

        // 开发环境
        server: {
            hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
            // 服务配置
            port: 11000, // 类型： number 指定服务器端口;
            open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
            cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
            host: "0.0.0.0", // IP配置，支持从IP启动
            proxy: {
                "/proxy_url": {
                    target: process.env.VITE_APP_PROXY_URL,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                    rewrite: (path): string => path.replace(/^\/proxy_url/, "")
                }
            }
        },

        // 生产构建
        build: {
            sourcemap: false,
            outDir: envMap.VITE_APP_OUTPUT_DIR,
            target: "es2015",
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: true
                }
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: []
                // https://rollupjs.org/guide/en/#big-list-of-options
            },
            // 文件变化时重新构建，会保留构建进程
            // watch: {
            //     // https://rollupjs.org/guide/en/#watch-options
            // },
            // Turning off brotliSize display can slightly reduce packaging time
            brotliSize: false,
            chunkSizeWarningLimit: 2000
        }
    };
};
