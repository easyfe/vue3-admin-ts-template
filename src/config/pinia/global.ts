import { defineStore } from "pinia";

export default defineStore({
    id: "global",
    state: () => ({
        //项目配置
        app: {
            layout: "left" as "left" | "top" | "mix"
        },
        // 滚动条位置
        scrollTop: {} as Record<string, number>,
        userInfo: null as Record<string, any> | null,
        userMenu: [] as { path: string }[],
        //是否收起菜单
        collapsed: false,
        initSuccess: false
    }),
    actions: {
        SET_SCROLL(res: { name: string; value: number }): void {
            this.scrollTop[res.name] = res.value;
        }
    }
});
