import { BaseFormColor, BaseFormExtra, BaseFormInput, BaseFormRadio } from "@/types/base-form";

const formHelper = {
    validate(refValue: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                refValue.validate().then((res: any) => {
                    if (!res) {
                        resolve(true);
                    } else {
                        reject(res);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    },
    /**
     * 普通输入框
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    input(label: string, field: string, extra?: BaseFormExtra & BaseFormInput): any {
        extra = { ...extra, clearable: extra?.clearable ?? true };
        return {
            inputType: "input",
            label,
            field,
            ...extra
        };
    },
    /**
     * 事件输入框
     * @param label
     * @param field
     * @param extra
     */
    date(label: string, field: string, extra?: BaseFormExtra & BaseFormInput): any {
        return {
            inputType: "date",
            label,
            field,
            ...extra
        };
    },
    /**
     * 颜色选择器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    color(label: string, field: string, extra?: BaseFormExtra & BaseFormColor): any {
        return {
            inputType: "color",
            label,
            field,
            ...extra
        };
    },
    /**
     * 渐变颜色选择器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    colorRange(label: string, field: string, extra?: BaseFormExtra): any {
        return {
            inputType: "colorRange",
            label,
            field,
            ...extra
        };
    },
    /**
     * 复选框
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    checkbox(label: string, field: string, options: Record<string, any>[], extra?: BaseFormExtra): any {
        return {
            inputType: "checkbox",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 单选框
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    radio(label: string, field: string, options: Record<string, any>[], extra?: BaseFormExtra & BaseFormRadio): any {
        return {
            inputType: "radio",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 选择器
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    select(label: string, field: string, options: Record<string, any>[], extra?: BaseFormExtra): any {
        return {
            inputType: "select",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 切换器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    switch(label: string, field: string, extra?: BaseFormExtra): any {
        return {
            inputType: "switch",
            label,
            field,
            ...extra
        };
    },
    /**
     * 富文本
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    editor(label: string, field: string, extra?: BaseFormExtra): any {
        return {
            inputType: "editor",
            label,
            field,
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
    slot(field: string, extra?: BaseFormExtra): any {
        return {
            inputType: "slot",
            field,
            ...extra
        };
    },
    /**
     * 数字输入框
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    inputNumber(label: string, field: string, extra?: BaseFormExtra): any {
        return {
            inputType: "inputNumber",
            label,
            field,
            ...extra
        };
    },
    /**
     * 上传图片
     * @param label
     * @param field 绑定值key
     * @param extra
     * @returns
     */
    uploadPic(label: string, field: string, extra?: BaseFormExtra): any {
        return {
            inputType: "uploadPic",
            label,
            field,
            ...extra
        };
    },
    /**
     * 单选checkbox(显示/不显示)
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    showBox(label: string, field: string, extra?: BaseFormExtra & BaseFormInput): any {
        return {
            inputType: "showBox",
            label,
            field,
            ...extra
        };
    },
    /**
     * 单选switch(显示/不显示)
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    showSwitch(label: string, field: string, extra?: BaseFormExtra & BaseFormInput): any {
        return {
            inputType: "showSwitch",
            label,
            field,
            ...extra
        };
    }
};

export default formHelper;
