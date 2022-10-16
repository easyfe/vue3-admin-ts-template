import request from "@/packages/request";
import env from "@/utils/tools/env";
import { StringValueToken } from "html2canvas/dist/types/css/syntax/tokenizer";
const baseApiUrl = env.get("VITE_APP_API_URL");
/**
 * 保存配置
 * http://yapi.syy.dongchali.cn/project/703/interface/api/27078
 * @param data
 * my_template_id:我的模板id
 * publish_status:状态 1:草稿 2:草稿(发布中待审核) 3:已发布
 * custom_page_list:当前模板关联的自定义页ID列表
 * data:模板配置的大json
 * @returns
 */
export function saveAllData(data: {
    my_template_id: number | string;
    publish_status: number;
    custom_page_ids: number[];
    data: Record<string, any>;
}): Promise<boolean> {
    return request({
        url: "/center/decoration/visualEditor/save",
        data,
        method: "POST",
        baseURL: baseApiUrl
    });
}
/**
 * 获取模板配置数据
 * http://yapi.syy.dongchali.cn/project/703/interface/api/27076
 * @param my_template_id
 * @returns
 */
export function getTemplateData(my_template_id: string | number): Promise<any> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/visualEditor/get",
        enableCancel: false,
        params: { my_template_id }
    });
}
/**
 * 获取模板市场配置数据
 * @param template_id
 * @returns
 */
export function getMarketTemplateData(template_id: string | number): Promise<any> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/systemTemplate/detail",
        enableCancel: false,
        params: { template_id }
    });
}
/**
 * 重置模板配置
 * http://yapi.syy.dongchali.cn/project/703/interface/api/53127
 * @param my_template_id
 * @returns
 */
export function resetTemplateData(my_template_id: string | number): Promise<any> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/visualEditor/reset",
        enableCancel: false,
        data: { my_template_id },
        method: "POST"
    });
}
/**
 * 重置模板提示
 * http://yapi.syy.dongchali.cn/project/703/interface/api/56103
 * @param my_template_id
 * @returns 1:恢复至发布记录 0:恢复至初始版本
 */
export function resetTemplateTips(my_template_id: string | number): Promise<number> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/visualEditor/resetTips",
        enableCancel: false,
        params: { my_template_id }
    });
}
/**
 * 获取自定义页列表
 * @param params
 * @returns
 */
export function getCustomPageList(params: {
    name?: string;
    desc: string;
    my_template_id: string | number;
}): Promise<any> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/customPage/appList",
        params
    });
}
/**
 * 使用模板ID
 * @param template_id
 * @returns
 */
export function useSystemTemplate(data: { template_id: number; data: any }): Promise<number> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/systemTemplate/use",
        method: "POST",
        data
    });
}
/**
 * 新手指导完成调用
 */
export function setKshIsNew(): Promise<number> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/visualEditor/endKshNew",
        method: "PUT"
    });
}
/**
 * 新手指导完成调用
 */
export function customPage(params: { type: number }): Promise<number> {
    return request({
        baseURL: baseApiUrl,
        url: "/center/decoration/customPage",
        method: "GET",
        params
    });
}
