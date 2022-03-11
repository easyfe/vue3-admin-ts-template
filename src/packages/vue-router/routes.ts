/* 组合路由并导出
 * @Author: hanxinxin
 * @Date: 2021-04-21 13:00:54
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2022-02-18 15:43:33
 */
import { RouteRecordRaw } from "vue-router";
import baseRouter from "./base";

const modulesFiles = import.meta.globEager("../../config/router/*.ts");
const modules: any = {};
for (const key in modulesFiles) {
    modules[key.replace("../../config/router/", "").replace(".ts", "")] = modulesFiles[key].default;
}

const routers = [];

for (const key in modules) {
    if (key !== "dev") {
        routers.push(...modules[key]);
    }
}
if (modules?.dev && ["development", "test"].includes(String(import.meta.env.VITE_APP_MODE))) {
    routers.push(...modules.dev);
}
routers.push(...baseRouter);

export default routers as RouteRecordRaw[];
