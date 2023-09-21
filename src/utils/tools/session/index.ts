/* 操作sessionStorage
 * @Author: hanxinxin
 * @Date: 2021-04-20 18:18:39
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2021-09-26 17:54:43
 */
import validatorHelper from "@/utils/helper/validator";
const FROM = "ROUTE_FROM";
const sessionUtil = {
    get: (key: string): string => {
        return String(window.sessionStorage.getItem(key));
    },
    set: (key: string, value: any): void => {
        return window.sessionStorage.setItem(key, typeof value !== "string" ? JSON.stringify(value) : value);
    },
    del: (key: string): void => {
        return window.sessionStorage.removeItem(key);
    },
    clear: (): void => {
        return window.sessionStorage.clear();
    }
};

const session = {
    /** 设置临时存储地址 */
    setFromPath: (url: string): void => {
        sessionUtil.set(FROM, url);
    },
    /** 获取临时存储地址 */
    getFormPath: (): string => {
        const res = sessionUtil.get(FROM);
        /** 获取到临时链接后，删除本地保存的，防止刷新之后，重定向到临时页面 */
        sessionUtil.del(FROM);
        if (!validatorHelper.isStrExist(res)) {
            return "";
        } else {
            return res;
        }
    },
    /** 清空session */
    clear: (): void => {
        sessionUtil.clear();
    }
};

export default session;
