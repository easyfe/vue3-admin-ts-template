import request from "@/packages/request";
import storage from "@/utils/tools/storage";
const baseURL = storage.getBaseUrl();

// 根据规则获取商品列表
export const getGoodsListByRule = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/baseapi/platform/visual/getGoodsList",
        method: "GET",
        params: data,
        baseURL
    });
};

// 获取商品分类一级分类
export const getParentCategory = (): Promise<any> => {
    return request({
        url: "/baseapi/platform/category/getParent",
        method: "GET",
        baseURL
    });
};

// 获取品牌列表
export const getGoodsBrand = (): Promise<any> => {
    return request({
        url: "/baseapi/platform/goodsbrand/index",
        method: "GET",
        baseURL
    });
};
