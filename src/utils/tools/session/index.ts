/* 操作sessionStorage
 * @Author: hanxinxin
 * @Date: 2021-04-20 18:18:39
 * @Last Modified by: hanxinxin
 * @Last Modified time: 2021-09-26 17:54:43
 */
import validatorHelper from "@/utils/helper/validator";
import { GeoLocationType } from "types";
const FROM = "SYY_AGENT_FROM";
const WX_SDK_URL_KEY = "SYY_AGENT_WXSDKURL";
const WX_CODE = "SYY_WX_CODE";
const GEO_LOCATION = "SYY_GEO_LOCATION";
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
    /**
     * 设置定位信息
     * @param data
     */
    setGeoLocation(data: GeoLocationType): void {
        sessionUtil.set(GEO_LOCATION, data);
    },
    /**
     * 获取定位信息
     * @returns
     */
    getGeoLocation(): GeoLocationType | null {
        const infoStr = sessionUtil.get(GEO_LOCATION);
        if (!validatorHelper.isStrExist(infoStr)) {
            return null;
        }
        const info = JSON.parse(infoStr);
        return info;
    },
    /** 设置微信sdk注册地址 */
    setWxSdkUrl: (url: string): void => {
        sessionUtil.set(WX_SDK_URL_KEY, url);
    },
    /** 获取微信sdk注册地址 */
    getWxSdkUrl: (): string => {
        const url = sessionUtil.get(WX_SDK_URL_KEY);
        if (!validatorHelper.isStrExist(url)) {
            return "";
        } else {
            return url;
        }
    },
    /** 设置临时存储地址 */
    setFromPath: (url: string): void => {
        /** 如果是通过邀请码进入的，需要屏蔽设置，否则会导致微信重复授权，最终失败 */
        if (
            url.includes("invite_code") ||
            window.location.pathname.includes("business/error") ||
            window.location.pathname.includes("/login") ||
            window.location.pathname.includes("/dls/index")
        ) {
            return;
        }
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
    /** 设置微信code和请求次数 */
    setWxCode: (data: { code: string; count: number }): void => {
        sessionUtil.set(WX_CODE, data);
    },
    /** 获取微信code和请求次数 */
    getWxCode: (): { code: string; count: number } | null => {
        const str = sessionUtil.get(WX_CODE);
        if (!validatorHelper.isStrExist(str)) {
            return null;
        }
        return JSON.parse(str);
    },
    /** 清空session */
    clear: (): void => {
        sessionUtil.clear();
    }
};

export default session;
