import { nanoid } from "nanoid";
import SyyRequest from "@syyfe/web-request";
import loading from "./loading";

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
            if (config.method?.toLocaleUpperCase() === "GET") {
                config.params = {
                    ...config.params,
                    _t: nanoid()
                };
            }
            return Promise.resolve(config);
        },
        response: (response): Promise<any> => {
            return Promise.resolve(response.data);
        },
        responseError: (errorResponse): Promise<any> => {
            return Promise.reject(errorResponse);
        }
    }
});

const request = service.request;

export function clearRequest(): void {
    service.clearQueue();
}

export default request;
