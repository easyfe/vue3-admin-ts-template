import request from "@/packages/request";
import storage from "@/utils/tools/storage";

const baseURL = storage.getBaseUrl();

// 获取素材列表
export const getMaterialList = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/business/platform/material/index",
        method: "GET",
        params: data,
        baseURL
    });
};

/**
 * 获取笔记列表
 */
export const getNotesList = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/business/platform/href/getHref",
        method: "GET",
        params: data,
        baseURL
    });
};

/** 获取笔记首页推荐 */
export const getNoteReco = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/business/platform/style/getNoteList",
        method: "GET",
        params: data,
        baseURL
    });
};

/** 获取专栏数据 */
export const getColumnList = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/business/platform/style/columnList",
        method: "GET",
        params: data,
        baseURL
    });
};

/** 获取培训页推荐 */
export const getCourseRecommend = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/business/platform/style/getCourseRecommend",
        method: "GET",
        params: data,
        baseURL
    });
};

/** 获取培训页课程推荐-新 */
export const courseRecommend = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/business/platform/style/courseRecommend",
        method: "GET",
        params: data,
        baseURL
    });
};

/** 是否显示笔记和培训 */
export const getNoteCourseConfig = (): Promise<any> => {
    return request({
        url: "business/app/style/getNoteCourseConfig",
        baseURL
    });
};

/** 素材分类列表 */
export const getMaterialClassifyList = (): Promise<any> => {
    return request({
        url: "business/app/material/classifyList",
        baseURL
    });
};

/** 笔记分类列表 */
export const getNoteManageClassifyList = (): Promise<any> => {
    return request({
        url: "business/app/common/classifyList",
        baseURL
    });
};

/** 课程分类列表 */
export const getColumnClassifyList = (): Promise<any> => {
    return request({
        url: "business/app/course/category",
        baseURL
    });
};
