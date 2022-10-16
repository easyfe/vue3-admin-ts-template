import request from "@/packages/request";
import env from "@/utils/tools/env";
const baseURL = env.get("VITE_CONSOLE_URL");
//文件管理列表页 云端
export const getyunFolderList = (data: Record<string, any>): Promise<any> => {
    return request({
        url: "/file/list",
        method: "GET",
        params: data,
        baseURL
    });
};

//文件上传 云端
export const uploadyunfile = (file: HTMLFormElement, folderId: number): Promise<any> => {
    const data = new FormData();
    //这里需要注意，后端接文件的name是什么，一般是image、file
    data.append("file", file.file);
    data.append("folderId", String(folderId));
    return request({
        url: "/file/upload",
        enableCancel: false,
        method: "POST",
        data,
        baseURL
    });
};

//创建文件夹 云端
export const createyunFolder = (file: { name: string; parentId: number | string }): Promise<any> => {
    const data = new FormData();
    //这里需要注意，后端接文件的name是什么，一般是image、file
    data.append("name", file.name);
    data.append("parentId", String(file.parentId));
    return request({
        url: "/file/createFolder",
        method: "POST",
        data,
        baseURL
    });
};

//文件夹重命名
export const renameyunFolder = (data: { name: string; id: string | number }): Promise<any> => {
    return request({
        url: "/file/rename",
        method: "GET",
        params: data,
        baseURL
    });
};

//文件夹树结构 云端
export const getyundirtree = (data: any): Promise<any> => {
    return request({
        url: "/file/listFolderTree",
        method: "GET",
        params: data,
        baseURL
    });
};

//文件批量删除 云端
export const deleteyunImg = (data: { fileIds: number[] }): Promise<any> => {
    return request({
        url: "/file/deleteList",
        method: "POST",
        data,
        baseURL
    });
};

//文件移动 云端
export const moveyunfolder = (data: { fileIds: number[]; targetId: number }): Promise<any> => {
    return request({
        url: "/file/move",
        method: "POST",
        data,
        baseURL
    });
};

//文件搜索 云端
export const searchyunfolder = (
    data: { fileName: string; pageNum: number; pageSize: number } & Record<string, any>
): Promise<any> => {
    return request({
        url: "/file/search",
        method: "GET",
        params: data,
        baseURL
    });
};
