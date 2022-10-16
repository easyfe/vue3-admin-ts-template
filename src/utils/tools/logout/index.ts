import router from "@/packages/vue-router";
import global from "@/config/pinia/global";
import env from "@/utils/tools/env";

export default function logout(): void {
    if (env.dev()) {
        router.replace({
            name: "login",
            query: {
                templateId: global().templateId,
                customPageId: global().customPageId
            }
        });
    } else {
        window.location.href = `${location.origin}/login`;
    }
}
