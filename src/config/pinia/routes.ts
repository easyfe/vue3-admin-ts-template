import { RouteConfig } from "types";
import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";

export default defineStore({
    id: "routes",
    state: () => ({
        //路由列表
        routes: <RouteConfig[]>[],
        // 导航栏标签
        navTags: <RouteConfig[]>[],
        // 缓存的tags
        cachedTags: <string[]>["LayoutMain"]
    }),
    actions: {
        SET_ROUTES(res: RouteConfig[]) {
            this.routes = res;
        },
        //清空导航栏标签
        CLEAR_NAVTAGS() {
            this.cachedTags = ["LayoutMain"];
            this.navTags = [];
        },
        // 添加导航栏标签
        CREATE_NAVTAG(res: RouteLocationNormalized): void {
            if (!res.name) {
                console.warn("路由未设置name属性，无法添加导航标签");
                return;
            }
            const inTag = this.navTags.findIndex((item: RouteConfig) => item.path === res.path) > -1;
            const inCache =
                this.cachedTags.findIndex((item: string) => item === (res.meta?.keepAliveName || res.name)) > -1;
            if (inTag && inCache) {
                return;
            }
            const { name, meta, path, hash, query, params, fullPath } = res;
            if (!inTag) {
                this.navTags.push({ name, meta, path, hash, query, params, fullPath });
            }

            /** 同步添加缓存标签 */
            if (!inCache && res.meta?.cache !== false && res.meta?.keepAliveName !== undefined) {
                this.cachedTags.push(<string>res.meta?.keepAliveName || <string>name);
            }
        },
        // 根据index删除导航标签
        DELETE_NAVTAG(index: number) {
            this.navTags.splice(index, 1);
            /** 同步删除缓存标签 */
            const tag = this.navTags[index];
            const tagIndex = this.cachedTags.findIndex((item) => item === tag.name);
            if (index !== -1) {
                this.cachedTags.splice(tagIndex, 1);
            }
        }
    }
});
