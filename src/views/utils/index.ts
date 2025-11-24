import storage from "@/utils/tools/storage";
import { Message, Modal } from "@arco-design/web-vue";
import router, { initRoute } from "@/packages/vue-router";
import global from "@/config/pinia/global";
import CryptoJS from "crypto-js";
import { getVersion } from "@/config/apis/common";
import envHelper from "@/utils/helper/env";

export const TablePageConfig = {
    pageKey: "current",
    sizeKey: "size",
    rowKey: "records",
    totalKey: "total"
};

export function clearLoingInfo() {
    storage.setToken("");
    global().userInfo = null;
    global().userMenu = [];
    global().initSuccess = false;
}

let authModal = false;
export function errorLogout() {
    clearLoingInfo();
    global().initSuccess = false;
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
        //     reject();
        //     errorLogout();
        //     return;
        // }
        try {
            //  global().userInfo = await getUserInfo();
            //  global().userMenu = await getUserMenu();
            initRoute();
            global().initSuccess = true;
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * 树状结构查询
 * @param fn
 * @param sourceData
 * @param childrenKey
 * @returns
 */
export function recuTree<T>(fn: (v: T) => boolean, sourceData: T[], childrenKey: keyof T = "children" as keyof T): T[] {
    if (!sourceData) return [];
    const loop = (data: T[]): T[] => {
        const result: T[] = [];
        data.forEach((item) => {
            if (fn(item)) {
                result.push({ ...item });
            } else if (item[childrenKey] && Array.isArray(item[childrenKey])) {
                const filterData = loop(item[childrenKey] as unknown as T[]);
                if (filterData.length) {
                    const tmp = {
                        ...item,
                        [childrenKey]: filterData
                    };
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
export function recuFind<T>(
    fn: (v: T) => boolean,
    sourceData: T[],
    childrenKey: keyof T = "children" as keyof T
): T | undefined {
    if (!sourceData) return undefined;
    const loop = (data: T[]): T | undefined => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (fn(item)) {
                return item;
            } else if (item[childrenKey] && Array.isArray(item[childrenKey])) {
                const tmp = loop(item[childrenKey] as unknown as T[]);
                if (tmp) {
                    return tmp;
                }
            }
        }
        return undefined;
    };
    return loop(sourceData);
}

/**
 * 加密
 * @param pword
 * @param pkeyStr
 * @returns
 */
export function encrypt(pword: string, pkeyStr?: string) {
    const keyStr = pkeyStr || "abcdefgabcdefg12";
    const key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    const srcs = CryptoJS.enc.Utf8.parse(pword);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}

/**
 * 解密
 * @param pword
 * @param pkeyStr
 * @returns
 */
export function decrypt(pword: string, pkeyStr?: string) {
    const keyStr = pkeyStr || "abcdefgabcdefg12";
    const key = CryptoJS.enc.Utf8.parse(keyStr); // Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    const decrypt = CryptoJS.AES.decrypt(pword, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 * 权限判断
 * @param permission
 * @returns
 */
export function hasPermission(permission: string) {
    const permissions = global().userInfo?.permissions;
    return permissions?.includes(permission);
}

/**
 * 菜单判断
 * @param menu
 * @returns
 */
export function hasMenu(menu: string) {
    const menus = global().userMenu;
    const v = recuFind((item) => item.path === menu, menus);
    return v || false;
}

/**
 * 树状结构转数组
 * @param tree - 树状结构的数组
 * @param childrenKey - children 的键名
 * @returns 数组
 */
export function treeToArray<T>(tree: T[], childrenKey: keyof T): Omit<T, keyof T>[] {
    return tree.reduce(
        (res, item) => {
            const { [childrenKey]: children, ...i } = item;
            return res.concat(
                i,
                children && (children as unknown as T[]).length
                    ? treeToArray(children as unknown as T[], childrenKey)
                    : []
            );
        },
        [] as Omit<T, keyof T>[]
    );
}

/**
 * 数组转树状结构
 * @param items - 数组
 * @param idKey - id 的键名
 * @param parentIdKey - parentId 的键名
 * @param childrenKey - children 的键名
 * @returns 树状结构的数组
 */
export function arrayToTree<T>(
    items: T[],
    idKey: keyof T,
    parentIdKey: keyof T,
    childrenKey: string
): (T & { [key: string]: any[] })[] {
    const res: (T & { [key: string]: any[] })[] = []; // 存放结果集
    const map: { [key: string]: T & { [key: string]: any[] } } = {};

    // 判断对象是否有某个属性
    const getHasOwnProperty = (obj: any, property: any) => Object.prototype.hasOwnProperty.call(obj, property);

    // 边做map存储，边找对应关系
    for (const item of items) {
        const id = item[idKey] as unknown as string;
        const pid = item[parentIdKey] as unknown as string;

        map[id] = {
            ...item,
            [childrenKey]: getHasOwnProperty(map, id) ? map[id][childrenKey] : []
        };

        const newItem = map[id];

        if (pid === "0") {
            res.push(newItem);
        } else {
            if (!getHasOwnProperty(map, pid)) {
                map[pid] = {
                    [childrenKey]: []
                } as T & { [key: string]: any[] };
            }
            map[pid][childrenKey].push(newItem);
        }
    }
    return res;
}

type Data = {
    id: string;
    parentId: string;
    weight: number;
    name: string;
    path: string;
    meta: Record<string, any>;
    sortOrder: number;
    menuType: string;
    permission: string;
    children?: Data[];
};

/**
 * 拆分选择
 * @param data
 * @param selectedIds
 * @returns
 */
export function splitSelection(
    data: Data[],
    selectedIds: string[]
): { fullySelected: string[]; partiallySelected: string[] } {
    const fullySelected: string[] = [];
    const partiallySelected: string[] = [];

    function traverse(node: Data): { isFullySelected: boolean; isPartiallySelected: boolean } {
        let isFullySelected = selectedIds.includes(node.id);
        let isPartiallySelected = false;

        if (node.children) {
            let childFullySelectedCount = 0;
            let childPartiallySelectedCount = 0;

            for (const child of node.children) {
                const { isFullySelected: childFully, isPartiallySelected: childPartial } = traverse(child);
                if (childFully) childFullySelectedCount++;
                if (childPartial) childPartiallySelectedCount++;
            }

            if (childFullySelectedCount === node.children.length && childFullySelectedCount > 0) {
                isFullySelected = true;
            } else if (childFullySelectedCount > 0 || childPartiallySelectedCount > 0) {
                isPartiallySelected = true;
                isFullySelected = false; // 防止节点被错误地标记为完全选中
            }
        }

        if (isFullySelected) {
            fullySelected.push(node.id);
        } else if (isPartiallySelected || selectedIds.includes(node.id)) {
            partiallySelected.push(node.id);
        }

        return { isFullySelected, isPartiallySelected };
    }

    for (const item of data) {
        traverse(item);
    }

    return { fullySelected, partiallySelected };
}

// 版本监控
export const versionCheck = async () => {
    if (envHelper.dev()) {
        return;
    }
    const response = await getVersion();
    if (String(__APP_VERSION__) < String(response.version)) {
        console.log("APP_VERSION", String(__APP_VERSION__), "====", String(response.version));
        Message.info({
            content: "发现新内容，自动更新中...",
            duration: 1500,
            onClose: () => {
                window.location.reload();
            }
        });
    }
};
