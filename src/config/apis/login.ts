import request from "@/packages/request";
import env from "@/utils/tools/env";
export interface ILoginP {
    username: string;
    password: string;
}

export interface IAutoLoginP {
    token: string;
    isFalse: number;
}

export interface IAutoLoginR {
    access_token: string;
    expires_in: number;
    user_info: any;
}

export const login = (params: ILoginP): Promise<any> => {
    const baseURL = env.get("VITE_CONSOLE_URL");
    const url = `${baseURL}/api/app/tcloud-sso/account/loginCheck?loginName=${params.username}&password=${params.password}`;
    return request({
        method: "post",
        url
    });
};

export const autoLogin = (params: IAutoLoginP): Promise<any> => {
    const baseURL = env.get("VITE_APP_API_URL");
    return request({
        method: "post",
        url: `${baseURL}/platform/auth/login`,
        data: params
    });
};
