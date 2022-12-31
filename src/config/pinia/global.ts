import { defineStore } from "pinia";

export default defineStore({
    id: "global",
    state: () => ({
        keepaliveList: <string[]>[]
    }),
    actions: {}
});
