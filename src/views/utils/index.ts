import storage from "@/utils/tools/storage";
import { Modal } from "@arco-design/web-vue";
import router from "@/packages/vue-router";

let authModal = false;
export function logout() {
    storage.setToken("");
    if (!authModal) {
        authModal = true;
        Modal.confirm({
            title: "登录失效",
            content: "登录失效，请重新登录",
            escToClose: false,
            maskClosable: false,
            onOk: () => {
                authModal = false;
                router.replace({
                    path: "/login",
                    query: {
                        redirect: router.currentRoute.value.fullPath
                    }
                });
            },
            onCancel: () => {
                authModal = false;
            }
        });
    }
}
