import { defineStore } from "pinia";

export default defineStore({
    id: "global",
    state: () => ({
        //是否收起菜单
        collapsed: false,
        initSuccess: false
    }),
    actions: {}
});
