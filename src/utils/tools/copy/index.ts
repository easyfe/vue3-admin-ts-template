/**
 * copy 核心方法
 * 以 Promise 风格 调用：支持
 * @param value 需要复制的文本内容
 */

type _HTMLTextAreaElement = HTMLTextAreaElement & {
    createTextRange?: () => void;
};

const handlerCopy = (value: number | string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const $el = document.body;
        if (!value) reject("复制失败"); // 复制内容为空
        $el.style.position = "relative";
        // 动态创建 textarea 标签
        const textarea: _HTMLTextAreaElement = document.createElement("textarea");
        // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
        textarea.readOnly = true;
        textarea.style.position = "absolute";
        textarea.style.top = "0px";
        textarea.style.left = "-9999px";
        textarea.style.zIndex = "-9999";
        // 将要 copy 的值赋给 textarea 标签的 value 属性
        textarea.value = value.toString();
        // 将 textarea 插入到 $el中
        $el.appendChild(textarea);
        // 兼容IOS 没有 select() 方法
        if (textarea.createTextRange) {
            textarea.select(); // 选中值并复制
        } else {
            textarea.setSelectionRange(0, value.toString().length);
            textarea.focus();
        }
        const $success = document.execCommand("Copy");
        if ($success) {
            $el.removeChild(textarea);
            resolve("复制成功");
        } else {
            reject("复制失败");
        }
    });
};

export default handlerCopy;
