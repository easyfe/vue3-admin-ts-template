import { RouteConfig } from "types";
import { defineStore } from "pinia";

export default defineStore({
    id: "routes",
    state: () => ({
        routes: <RouteConfig[]>[]
    }),
    actions: {
        SET_ROUTES(res: RouteConfig[]): void {
            this.routes = res;
        }
    }
});
