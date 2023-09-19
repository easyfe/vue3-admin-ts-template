import { generateVersion, AliConfig } from "@easyfe/vite-plugin-upload";

export function getOssConfig(envMap: Record<string, any>): {
    uploadOption: Record<string, any>;
    uploadPath: string;
    enableUpload: boolean;
} {
    //上传配置
    const uploadOption: AliConfig = {
        accessKeyId: "",
        accessKeySecret: "",
        bucket: "",
        region: "",
        bucketName: envMap.VITE_APP_MODE === "production" ? "dist" : "test",
        remoteDir: `efe-vue3-admin-ts-template/${generateVersion()}`,
        from: "dist",
        excludesExtra: ["map"]
    };
    //上传路径
    const uploadPath = `${envMap.VITE_APP_CDN_URL}/${uploadOption.bucketName}/${uploadOption.remoteDir}/`;
    //是否允许上传
    const enableUpload = false;
    return { uploadPath, uploadOption, enableUpload };
}
