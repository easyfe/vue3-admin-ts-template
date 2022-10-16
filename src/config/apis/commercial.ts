import request from "@/packages/request";
import storage from "@/utils/tools/storage";
const baseURL = storage.getBaseUrl();

/**
 * 获取笔记分类
 * @param data
 * @returns
 */
export function getNoteManageClassify(data: Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/noteManageClassify/index",
        method: "GET",
        params: data,
        baseURL
    });
}
/**
 * 获取笔记列表
 * @param data
 * @returns
 */
export function getNoteManageList(data: Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/noteManage/index",
        method: "GET",
        params: data,
        baseURL
    });
}
/**
 * 获取素材分类
 * @param data
 * @returns
 */
export function getMaterialClassify(data: Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/materialClassify/index",
        method: "GET",
        params: data,
        baseURL
    });
}
/**
 * 获取素材列表
 * @param data
 * @returns
 */
export function getMaterialList(data: Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/material/index",
        method: "GET",
        params: data,
        baseURL
    });
}
/**
 * 获取培训分类
 * @param data
 * @returns
 */
export function getKcClassify(data: Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/category/cateIndex",
        method: "GET",
        params: data,
        baseURL
    });
}
/**
 * 通过分类获取培训专栏
 * @param data
 * @returns
 */
export function getKcColumn(data: { category_id: string | number } & Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/course/column",
        method: "GET",
        params: data,
        baseURL
    });
}
/**
 * 通过专栏获取培训列表
 * @param data
 * @returns
 */
export function getKcList(data: { id: string | number } & Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/course/columnCourse",
        method: "GET",
        params: data,
        baseURL
    });
}
