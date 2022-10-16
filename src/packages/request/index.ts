import { nanoid } from "nanoid";
import SyyRequest from "@syyfe/request";
import loading from "./loading";
import cookie from "@/utils/tools/cookie";
import storage from "@/utils/tools/storage";
import logout from "@/utils/tools/logout";

const service = new SyyRequest({
    base: {
        timeout: 60 * 1000,
        baseURL: "",
        prefix: "",
        enableCancel: false
    },
    loading,
    interceptors: {
        request: (config): Promise<any> => {
            const token = storage.getToken();
            const xToken = cookie.get("X-Token");
            if (config.method?.toLocaleUpperCase() === "GET") {
                config.params = {
                    ...config.params,
                    _t: nanoid()
                };
            }
            if (
                config.url?.includes("preapiconsole.71360.com") ||
                config.baseURL?.includes("preapiconsole.71360.com")
            ) {
                config.params = {
                    ...config.params,
                    "X-Token": xToken || ""
                };
            }
            config.headers = {
                "access-token": token || "",
                ...config.headers
            };
            return Promise.resolve(config);
        },
        response: (response): Promise<any> => {
            response.data.message = response.data.message || response.data.msg;
            if ([401, 4001].includes(response.data.code)) {
                logout();
                return Promise.reject("登录失效");
            }
            if (response.data.code !== 200) {
                return Promise.reject(response);
            }
            if (response.data.message.includes("无法删除")) {
                return Promise.reject(response);
            }
            return Promise.resolve(response);
        },
        responseError: (errorResponse): Promise<any> => {
            errorResponse.data.message = errorResponse.data.message || errorResponse.data.msg;
            return Promise.reject(errorResponse);
        }
    }
});

const request = service.request;

export function clearRequest(): void {
    service.clearQueue();
}

export default request;
