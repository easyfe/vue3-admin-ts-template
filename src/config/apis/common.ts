import request from "@/packages/request";
import storage from "@/utils/tools/storage";
const baseURL = storage.getBaseUrl();

/**
 * 上传图片
 * @param file
 * @returns
 */
export function uploadImage(file: HTMLFormElement): Promise<{
    path_name: string;
}> {
    const data = new FormData();
    //这里需要注意，后端接文件的name是什么，一般是image、file
    data.append("image", file.file);
    data.append("type", "folder");
    return request({
        url: "/baseapi/platform/file/uploadImage",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        enableCancel: false,
        timeout: 0,
        baseURL,
        data
    });
}

/**
 * 获取省市区地址
 * @returns
 */
export function getArea(): Promise<_RegArea[]> {
    return request({
        // url: "/config/areaData",
        url: "https://syycdn.dongchali.net/file/agent-config/prod/agent_region.json",
        method: "GET",
        enableCancel: false
    });
}

export interface _RegArea {
    area_id: number;
    value: number;
    label: string;
    children: _RegArea;
}

/**
 * 根据经纬度获取地理信息
 * @param lat
 * @param lng
 * @returns
 */
export function getLocalByLatitude(lat: number, lng: number): Promise<LocationByLatitude> {
    return request({
        url: `https://syytshopmax.v2.syy.nbseo.cn/baseapi/app/address/getLocalByLatitude?lat=${lat}&lng=${lng}`,
        notify: false
    });
}

export interface LocationByLatitude {
    //国家
    nation: string;
    //省
    province: string;
    //市
    city: string;
    //区
    district: string;
    //街道
    street: string;
    //号牌
    street_number: string;
    //纬度
    lat: string;
    //经度
    lng: string;
    regions: Regions;
}

export interface Regions {
    //区
    region: string;
    //区ID
    region_id: number;
    //市
    city: string;
    //市ID
    city_id: number;
    //省
    province: string;
    //省ID
    province_id: number;
}

/**
 * 获取商品选择列表
 * @param params
 * @returns
 */
export function getGoodsList(params: Record<string, any>): Promise<any> {
    return request({
        url: "/baseapi/platform/goods/index",
        params,
        enableCancel: false,
        baseURL
    });
}

/**
 * 获取热搜词
 * @param params
 * @returns
 */
export function getHotsearchList(params: Record<string, any>): Promise<any> {
    return request({
        url: "/baseapi/platform/hotsearch/index",
        params,
        enableCancel: false,
        baseURL
    });
}

/**
 * 获取商品分类列表
 * @returns
 */
export function getGoodsCategory(): Promise<any> {
    return request({
        url: "/baseapi/platform/category/index",
        enableCancel: false,
        baseURL
    });
}
/**
 * 获取商品公众号页面列表
 * @returns
 */
export function getAccountPage(params: any): Promise<any> {
    return request({
        url: "/baseapi/platform/accountPage/getList",
        params,
        enableCancel: false,
        baseURL
    });
}
/**
 *
 * @param params
 * @returns
 */
export function getNotesList(params: Record<string, any>): Promise<any> {
    return request({
        url: "/business/platform/href/getHref",
        params,
        baseURL
    });
}
/**
 * 获取优惠券列表
 * http://yapi.syy.dongchali.cn/project/27/interface/api/8969
 * @param params
 * @returns
 */
export function getVisualCouponList(params: {
    page: number;
    size: number;
    name: string; //优惠券名称
    user_type: number; //可使用人范围 1所有人 2新用户 3老用户
    send_way: number; //发送方式1用户领取2平台发放
    ids: string; //优惠券id  逗号隔开
}): Promise<any> {
    return request({
        url: "/baseapi/platform/coupon/getVisualCouponList",
        params,
        baseURL
    });
}
/**
 * 获取热搜词
 * @returns
 */
export function getHotSearch(): Promise<any> {
    return request({
        url: "/baseapi/platform/hotsearch/getVisualList",
        baseURL
    });
}
/**
 * 兑换列表:获取一级商品分类
 * @returns
 */
export function getParentCategory(): Promise<any> {
    return request({
        url: "/baseapi/platform/category/getParent",
        baseURL
    });
}
/**
 * 兑换列表:获取积分商品分类
 * @param params
 * @returns
 */
export const getOneLevelCategory = (params: Record<string, any>): Promise<any> => {
    return request({
        url: "/baseapi/app/category/getOneLevelCategory",
        params,
        baseURL
    });
};
/**
 * 兑换列表:获取积分商品列表
 * @param params
 * @returns
 */
export const getExchangeList = (params: Record<string, any>): Promise<any> => {
    return request({
        url: "/baseapi/app/integralShop/getGoodsList",
        params,
        baseURL
    });
};
/**
 * 兑换列表:获取积分商品选择列表
 * @param params
 * @returns
 */
export function getIntegralGoodsList(params: Record<string, any>): Promise<any> {
    return request({
        url: "/baseapi/platform/integralShop/index",
        params,
        baseURL
    });
}

/**
 * 获取C端商城商品列表
 */
export interface getGoodsListParams {
    page: number;
    size: number;
    type?: string;
    remove_coupon_goods?: number;
    [key: string]: any;
}

export function getAppGoodsList(params: getGoodsListParams): Promise<any> {
    return request({
        method: "GET",
        url: "/baseapi/app/goods/getList",
        params,
        baseURL
    });
}

/**
 *获取新人专享商品接口
 * @returns
 */
export function getNewData(params: {
    page?: number | string;
    size?: number | string;
    type?: number | string;
}): Promise<any> {
    return request({
        url: "/baseapi/app/newPeople/getNewData",
        params,
        baseURL
    });
}
/**
 *获取限时抢购商品接口
 * @returns
 */
export function getVisualList(params: {
    page?: number | string;
    size?: number | string;
    type?: number | string;
}): Promise<any> {
    return request({
        url: "/baseapi/app/activity/getVisualList",
        params,
        baseURL
    });
}
/**
 *获取多人拼团商品接口
 * @returns
 */
export function getVisualGroupList(params: {
    page?: number | string;
    size?: number | string;
    type?: number | string;
}): Promise<any> {
    return request({
        url: "/baseapi/app/activityGroup/getVisualList",
        params,
        baseURL
    });
}
/**
 *获取超级拼团商品接口
 * @returns
 */
export function getVisualSuperGroupList(params: {
    page?: number | string;
    size?: number | string;
    type?: number | string;
}): Promise<any> {
    return request({
        url: "/baseapi/app/activitySuperGroup/getVisualList",
        params,
        baseURL
    });
}
/**
 *获取专区接口
 * @returns
 */
export function getVisualSpecialList(): Promise<any> {
    return request({
        url: "/baseapi/platform/special/getVisualList",
        baseURL
    });
}
/**
 *获取专区商品接口
 * @returns
 */
export function getActivityList(params: { page: number | string; size: number | string; id?: number }): Promise<any> {
    return request({
        url: "/baseapi/app/specialActivity/getActivity",
        notify: false,
        params,
        baseURL
    });
}
/**
 *获取砍价商品接口
 * @returns
 */
export function getIndexBargainList(params: {
    page?: number | string;
    size?: number | string;
    type?: number | string;
}): Promise<any> {
    return request({
        url: "/baseapi/platform/bargainActivity/getIndexBargainList",
        params,
        baseURL
    });
}
/**
 *获取直播间
 * @returns
 */
export function getVisualLiveRooms(params: {
    page: number | string;
    size: number | string;
    type?: number | string;
}): Promise<any> {
    return request({
        url: "/baseapi/platform/liveRoom/getVisualLiveRooms",
        params,
        baseURL
    });
}

/**
 * 获取等级列表
 * @param params
 * @returns
 */
export function getLevelList(params?: { name?: string; desc: string; my_template_id: string | number }): Promise<any> {
    return request({
        url: "/baseapi/platform/member/levelList",
        params,
        baseURL
    });
}

/**
 * 获取小程序配置
 * @param params
 * @returns
 */
export function getXcxInfo(): Promise<any> {
    return request({
        url: "/baseapi/platform/wechatXcx/getXcxInfo",
        baseURL
    });
}
/**
 * 获取专区页面列表
 * @returns
 */
export function getSpecialList(params: any): Promise<any> {
    return request({
        url: "/baseapi/platform/special/getList",
        params,
        baseURL
    });
}
/**
 * 获取组合链接列表
 * @returns
 */
export function getActivitySingleReduction(params: any): Promise<any> {
    return request({
        url: "/baseapi/platform/activitySingleReduction/getList",
        params,
        baseURL
    });
}
/**
 * 用户权益判断
 * @returns
 */
export function getEquitys(): Promise<{ is_business_college: number; is_zgz: number }> {
    return request({
        url: "/baseapi/platform/common/equitys",
        baseURL,
        notify: false
    });
}
