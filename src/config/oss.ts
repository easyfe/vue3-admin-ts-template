import { CosConfig } from "@syyfe/vite-plugin-cos";

export function getOssConfig(envMap: Record<string, any>): { uploadOption: CosConfig; uploadPath: string } {
    function generateVersion(): number | string {
        function addZero(str: string | number): number | string {
            return str < 10 ? `0${str}` : str;
        }
        const _date = new Date();
        // 格式 '2020Y11M02D11H21M16S'
        return [
            _date.getFullYear() + "Y",
            addZero(_date.getMonth() + 1) + "M",
            addZero(_date.getDate()) + "D",
            addZero(_date.getHours()) + "H",
            addZero(_date.getMinutes()) + "M",
            addZero(_date.getSeconds()) + "S"
        ].join("");
    }
    const uploadOption: CosConfig = {
        SecretId: "",
        SecretKey: "",
        Bucket: "",
        Region: "",
        bucketName: envMap.VITE_APP_MODE === "production" ? "dist" : "test",
        remoteDir: `efe-vue3-admin-ts-template/${generateVersion()}`,
        from: "dist",
        excludesExtra: ["map"]
    };
    const uploadPath = `${envMap.VITE_APP_CDN_URL}/${uploadOption.bucketName}/${uploadOption.remoteDir}/`;
    return { uploadPath, uploadOption };
}
