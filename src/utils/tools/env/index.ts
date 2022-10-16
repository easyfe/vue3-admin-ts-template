const VITE_APP_MODE = import.meta.env.VITE_APP_MODE;
export default {
    //开发者环境
    dev(): boolean {
        return VITE_APP_MODE === "development";
    },
    //测试环境
    test(): boolean {
        return VITE_APP_MODE === "test";
    },
    //灰度环境
    uat(): boolean {
        return VITE_APP_MODE === "uat";
    },
    //生产环境
    prod(): boolean {
        return VITE_APP_MODE === "production";
    },
    //获取环境变量
    get(key: string): string {
        return import.meta.env[key];
    }
};
