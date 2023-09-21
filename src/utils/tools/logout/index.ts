import router from "@/packages/vue-router";
import envHelper from "@/utils/helper/env";

export default function logout(): void {
    if (envHelper.dev()) {
        router.replace({
            name: "login",
            query: {}
        });
    } else {
        window.location.href = `${location.origin}/login`;
    }
}
