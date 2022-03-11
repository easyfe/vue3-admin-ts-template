/* eslint-disable @typescript-eslint/explicit-function-return-type */
function addZero(str) {
    return str < 10 ? `0${str}` : str;
}
function generateVersion() {
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
const uploadOption = {
    SecretId: "", //密钥ID
    SecretKey: "", //密钥Key
    Bucket: "", //存储桶名称
    Region: "", //所属地域
    bucketName: process.env.VUE_APP_MODE === "production" ? "dist" : "test", //一级目录
    remoteDir: `empty-admin/${generateVersion()}` //二级目录
};
const uploadPath = `${process.env.VUE_APP_CDN_URL}/${uploadOption.bucketName}/${uploadOption.remoteDir}/`;
module.exports = {
    uploadOption,
    uploadPath,
    upload: false //是否开启oss上传
};
