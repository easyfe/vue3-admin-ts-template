import request from "@/packages/request";
import env from "@/utils/tools/env";
const baseURL = env.get("VITE_APP_API_URL");

/**
 * 获取自定义页面详情
 * @param custom_id
 * @returns
 */
export function getCustomPage(custom_id: string | number): Promise<any> {
    return request({
        baseURL,
        method: "GET",
        url: "/center/decoration/customPage/get",
        params: { custom_id }
    });
}

/**
 * 编辑自定义页面详情
 * @param data
 * @returns
 */
export function editCustomPage(data: {
    id: string | number;
    content?: any[];
    description?: string;
    name?: string;
    img?: string;
    page_config?: object;
}): Promise<any> {
    return request({
        baseURL,
        method: "POST",
        url: "/center/decoration/customPage/editCustom",
        data
    });
}

/**
 * 添加自定义页面详情
 * @param data
 * @returns
 */
export function addCustomPage(data: {
    content?: any[];
    description?: string;
    name?: string;
    img?: string;
    page_config?: object;
    type: 1 | 2 | 3;
}): Promise<any> {
    return request({
        baseURL,
        method: "POST",
        url: "/center/decoration/customPage/add",
        data
    });
}
