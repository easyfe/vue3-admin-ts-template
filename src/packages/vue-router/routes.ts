/* 组合路由并导出
 * @Author: hanxinxin
 * @Date: 2021-04-21 13:00:54
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2025-11-11 15:23:02
 */
import { RouteRecordRaw } from "vue-router";
import envHelper from "@/utils/helper/env";

const modulesFiles: Record<string, any> = import.meta.glob("/src/config/router/*.ts", { eager: true });
const modules: any = {};
for (const key in modulesFiles) {
    modules[key.replace("/src/config/router/", "").replace(".ts", "")] = modulesFiles[key].default;
}

const routers: any = [];

for (const key in modules) {
    if (key !== "dev") {
        routers.push(...modules[key]);
    }
}

if (modules?.dev && (envHelper.dev() || envHelper.test())) {
    routers.push(...modules.dev);
}

export default routers as RouteRecordRaw[];
