import { generateVersion, AliConfig } from "@easyfe/vite-plugin-upload";

//是否允许上传到CDN
export const enableUpload = false;

//获取oss配置
export function getOssConfig(envMap: Record<string, any>) {
    //上传配置
    const uploadOption: AliConfig = {
        accessKeyId: "",
        accessKeySecret: "",
        bucket: "",
        region: "",
        bucketName: envMap.VITE_APP_MODE === "production" ? "dist" : "test",
        remoteDir: `vue3-admin-ts-template/${generateVersion()}`,
        from: "dist",
        excludesExtra: ["map"]
    };
    //上传路径
    const uploadPath = `${envMap.VITE_APP_CDN_URL}/${uploadOption.bucketName}/${uploadOption.remoteDir}/`;
    return { uploadPath, uploadOption };
}
