import qs from "qs";

/**
 * 获取链接参数
 * @param key
 * @returns
 */
export default function getUrlkey(key: string): string {
    const obj = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (obj === undefined) {
        return "";
    }
    const v = obj[key];
    if (!v) {
        return "";
    }
    if (typeof v === "string") {
        return v;
    }
    return JSON.stringify(v);
}
