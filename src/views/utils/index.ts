import storage from "@/utils/tools/storage";
import { Modal } from "@arco-design/web-vue";
import router from "@/packages/vue-router";
import global from "@/config/pinia/global";

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

/**
 * 全局初始化
 * @returns
 */
export function initGlobal() {
    return new Promise(async (resolve, reject) => {
        // if (!storage.getToken()) {
        //     logout();
        //     return;
        // }
        //TODO:获取用户权限信息，填充到permissions里面
        // console.log("初始化全局数据", hasPermission("system:menu:edit"));
        global().initSuccess = true;
        resolve(true);
    });
}
