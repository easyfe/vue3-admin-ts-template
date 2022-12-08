import { BaseFormColor, BaseFormExtra, BaseFormInput, BaseFormRadio } from "types/base-form";

const formHelper = {
    validate(refValue: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            refValue
                .validate()
                .then(() => {
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });
    },
    /**
     * 普通输入框
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    input(label: string, path: string, extra?: BaseFormExtra & BaseFormInput): any {
        extra = { ...extra, clearable: extra?.clearable ?? true };
        return {
            inputType: "input",
            label,
            path,
            ...extra
        };
    },
    /**
     * 事件输入框
     * @param label
     * @param path
     * @param extra
     */
    date(label: string, path: string, extra?: BaseFormExtra & BaseFormInput): any {
        return {
            inputType: "date",
            label,
            path,
            ...extra
        };
    },
    /**
     * 颜色选择器
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    color(label: string, path: string, extra?: BaseFormExtra & BaseFormColor): any {
        return {
            inputType: "color",
            label,
            path,
            ...extra
        };
    },
    /**
     * 渐变颜色选择器
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    colorRange(label: string, path: string, extra?: BaseFormExtra): any {
        return {
            inputType: "colorRange",
            label,
            path,
            ...extra
        };
    },
    /**
     * 复选框
     * @param label
     * @param path
     * @param options
     * @param extra
     * @returns
     */
    checkbox(label: string, path: string, options: Record<string, any>[], extra?: BaseFormExtra): any {
        return {
            inputType: "checkbox",
            label,
            options,
            path,
            ...extra
        };
    },
    /**
     * 单选框
     * @param label
     * @param path
     * @param options
     * @param extra
     * @returns
     */
    radio(label: string, path: string, options: Record<string, any>[], extra?: BaseFormExtra & BaseFormRadio): any {
        return {
            inputType: "radio",
            label,
            options,
            path,
            ...extra
        };
    },
    /**
     * 选择器
     * @param label
     * @param path
     * @param options
     * @param extra
     * @returns
     */
    select(label: string, path: string, options: Record<string, any>[], extra?: BaseFormExtra): any {
        return {
            inputType: "select",
            label,
            options,
            path,
            ...extra
        };
    },
    /**
     * 切换器
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    switch(label: string, path: string, extra?: BaseFormExtra): any {
        return {
            inputType: "switch",
            label,
            path,
            ...extra
        };
    },
    /**
     * 富文本
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    editor(label: string, path: string, extra?: BaseFormExtra): any {
        return {
            inputType: "editor",
            label,
            path,
            ...extra
        };
    },
    /**
     * 插槽
     * @param label
     * @param prop
     * @param extra
     * @returns
     */
    slot(path: string, extra?: BaseFormExtra): any {
        return {
            inputType: "slot",
            path,
            ...extra
        };
    },
    /**
     * 数字输入框
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    inputNumber(label: string, path: string, extra?: BaseFormExtra): any {
        return {
            inputType: "inputNumber",
            label,
            path,
            ...extra
        };
    },
    /**
     * 上传图片
     * @param label
     * @param path 绑定值key
     * @param extra
     * @returns
     */
    uploadPic(label: string, path: string, extra?: BaseFormExtra): any {
        return {
            inputType: "uploadPic",
            label,
            path,
            ...extra
        };
    },
    /**
     * 单选checkbox(显示/不显示)
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    showBox(label: string, path: string, extra?: BaseFormExtra & BaseFormInput): any {
        return {
            inputType: "showBox",
            label,
            path,
            ...extra
        };
    },
    /**
     * 单选switch(显示/不显示)
     * @param label
     * @param path
     * @param extra
     * @returns
     */
    showSwitch(label: string, path: string, extra?: BaseFormExtra & BaseFormInput): any {
        return {
            inputType: "showSwitch",
            label,
            path,
            ...extra
        };
    }
};

export default formHelper;
