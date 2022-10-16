// import { RouteConfig } from "@/types";
import { defineStore } from "pinia";

// type TypeVlidateMap = Record<
//     string,
//     {
//         route: RouteConfig;
//         title: string;
//         validate: boolean;
//         message: string;
//     }
// >;

export default defineStore({
    id: "global",
    state: () => ({
        //模板类型，1：美妆护肤，2：服饰箱包，3：母婴用品，4：鲜花绿植，5：手机数码，6：家用电器，7：酒水，8：零食饮料，9：日用百货，10：保健品，11：会员
        templateType: 0,
        //保存类型，草稿
        publishStatus: 0,
        //初始化结果
        initSuccess: false,
        //模板ID
        templateId: 0,
        //模板市场ID
        marketTemplateId: 0,
        //自定义页ID
        customPageId: 0,
        kshIsNew: true,
        //新增页面类型，1：小程序，2：新人专区 3：H5
        type: 1,
        //首页预览截图文件
        homePageFile: { file: <null | any>null } as any,
        //用户权益
        equitys: {
            is_business_college: 0,
            is_zgz: 0
        },
        //模板是否绑定小程序
        isBind: 0
    }),
    actions: {
        SET_BIND(value: number): void {
            this.isBind = value;
        },
        SET_EQU(value: any): void {
            this.equitys = value;
        },
        SET_MARKET_TEMPLATE_ID(value: number): void {
            this.marketTemplateId = value;
        },
        SET_TEMPLATE_TYPE(value: number): void {
            this.templateType = value;
        },
        SET_PUBLISH_STATUS(status: number): void {
            this.publishStatus = status;
        },
        SET_HOME_PAGE_FILE(data: { file: any }): void {
            this.homePageFile = data;
        },
        SET_TEMPLATE_ID(id: number): void {
            this.templateId = id;
        },
        SET_INIT_SUCCESS(value: boolean): void {
            this.initSuccess = value;
        },
        SET_CUSTOM_PAGE_ID(id: number): void {
            this.customPageId = id;
        },
        SET_TYPE(type: number): void {
            this.type = type;
        },
        SET_KSH_IS_NEW(flag: boolean): void {
            this.kshIsNew = flag;
        }
    }
});
