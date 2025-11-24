import request from "@/packages/request";
import router from "@/packages/vue-router";
import type { RequestOption } from "@arco-design/web-vue";

export function testList(params: Record<string, any>): Promise<{ title: string }> {
    return request({
        url: "https://jsonplaceholder.typicode.com/posts",
        params
    });
}

/**
 * 获取版本号
 * @returns
 */
export function getVersion(): Promise<{ version: string }> {
    let url = `${location.origin}${router.options.history.base}/version.json`;
    if (__APP_UPLOAD__) {
        url = `${__APP_UPLOAD_PATH__}${__APP_UPLOAD_PATH__.endsWith("/") ? "" : "/"}version.json`;
    }
    return request({
        url,
        notify: false
    });
}

/**
 * 基于arco-request的上传文件方法
 * @param option
 * @returns
 */
export function uploadFile(option: RequestOption): any {
    return new Promise((resolve, reject) => {
        const { onProgress, onError, onSuccess, fileItem, name } = option;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        if (xhr.upload) {
            xhr.upload.onprogress = function (event) {
                let percent = 0;
                if (event.total > 0) {
                    // 0 ~ 1
                    percent = event.loaded / event.total;
                }
                onProgress(percent, event);
            };
        }
        xhr.onerror = function error(e) {
            reject(e);
            onError(e);
        };
        xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
                reject(xhr.responseText);
                return onError(xhr.responseText);
            }
            try {
                const res = JSON.parse(xhr.response);
                fileItem.url = res.data;
                resolve(res);
                onSuccess(res);
            } catch (e) {
                reject(e);
                return onError(e);
            }
        };

        const formData = new FormData();
        formData.append("file", fileItem.file as any);
        formData.append("step", "0");
        formData.append("type", "image/jpeg");
        xhr.open("post", "https://www.uhsea.com/Frontend/upload", true);
        xhr.send(formData);
    });
}

export function uploadFileNew(option: RequestOption): any {
    return new Promise((resolve, reject) => {
        const { onProgress, onError, onSuccess, fileItem } = option;
        const data = new FormData();
        //这里需要注意，后端接文件的name是什么，一般是image、file
        data.append("file", fileItem.file as any);
        request({
            url: "https://www.uhsea.com/Frontend/upload",
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            enableCancel: false,
            timeout: 0,
            data,
            onUploadProgress: (progressEvent) => {
                onProgress(progressEvent.loaded / progressEvent.total, progressEvent);
            }
        })
            .then((res) => {
                fileItem.url = res.data;
                onSuccess(res);
                resolve(res);
            })
            .catch((err) => {
                onError(err);
                reject(err);
            });
    });
}
