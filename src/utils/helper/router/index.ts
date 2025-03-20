import router from "@/packages/vue-router";
import { RouteConfig } from "types";
const routerHelper = {
    back() {
        router.back();
    },
    jumpNew(data: string | Partial<RouteConfig>) {
        let path = "";
        if (typeof data === "string") {
            path = data;
        } else {
            path = router.resolve(data as any)?.href;
        }
        window.open(path, "_blank");
    },
    push(data: string | Partial<RouteConfig>) {
        let path = "";
        if (typeof data === "string") {
            path = data;
        } else {
            path = router.resolve(data as any)?.fullPath;
        }
        router.push(path);
    },
    replace(data: string | Partial<RouteConfig>) {
        let path = "";
        if (typeof data === "string") {
            path = data;
        } else {
            path = router.resolve(data as any)?.fullPath;
        }
        router.replace(path);
    }
};

export default routerHelper;
