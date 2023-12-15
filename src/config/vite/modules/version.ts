// versionUpdatePlugin.js
import fs from "fs";
import path from "path";
import { Plugin } from "vite";

const writeVersion = (versionFile: string, content: string) => {
    // 写入文件
    fs.writeFile(versionFile, content, (err) => {
        if (err) throw err;
    });
};

export default (options: { version: string }): Plugin => {
    let config: any;

    return {
        name: "version-update",

        configResolved(resolvedConfig) {
            // 存储最终解析的配置
            config = resolvedConfig;
        },

        buildStart() {
            // 生成版本信息文件路径
            const file = config.publicDir + path.sep + "version.json"; // 这里使用编译时间作为版本信息
            const content = JSON.stringify({ version: options.version });

            if (fs.existsSync(config.publicDir)) {
                writeVersion(file, content);
            } else {
                fs.mkdir(config.publicDir, (err) => {
                    if (err) throw err;
                    writeVersion(file, content);
                });
            }
        }
    };
};
