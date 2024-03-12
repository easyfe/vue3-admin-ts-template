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

/**
 * 树状结构查询
 * @param fn
 * @param sourceData
 * @param childrenKey
 * @returns
 */
export function recuTree(fn: (v: any) => boolean, sourceData: any[], childrenKey = "children") {
    const loop = (data: any[]) => {
        const result: any[] = [];
        data.forEach((item) => {
            if (fn(item)) {
                result.push({ ...item });
            } else if (item[childrenKey]) {
                const filterData = loop(item[childrenKey]);
                if (filterData.length) {
                    const tmp = {
                        ...item
                    };
                    tmp[childrenKey] = filterData;
                    result.push(tmp);
                }
            }
        });
        return result;
    };
    return loop(sourceData);
}

/**
 * 树状结构单条查询
 * @param fn
 * @param sourceData
 * @param childrenKey
 * @returns
 */
export function recuFind(fn: (v: any) => boolean, sourceData: any[], childrenKey = "children") {
    const loop = (data: any[]) => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (fn(item)) {
                return item;
            } else {
                if (item[childrenKey]) {
                    const tmp: any = loop(item[childrenKey]);
                    if (tmp) {
                        return tmp;
                    }
                }
            }
        }
    };
    return loop(sourceData);
}
