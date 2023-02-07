import {
    BaseFormCheckbox,
    BaseFormCheckboxGroup,
    BaseFormColor,
    BaseFormDate,
    BaseFormExtra,
    BaseFormInput,
    BaseFormInputNumber,
    BaseFormRadio,
    BaseFormRadioGroup,
    BaseFormSelect,
    BaseFormSelectOptions,
    BaseFormSwitch,
    BaseFormTime
} from "types/base-form";

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
    input(label: string, path: string, extra?: BaseFormInput) {
        extra = {
            ...extra,
            clearable: extra?.clearable ?? true,
            span: extra?.span ?? 8,
            placeholder: extra?.placeholder ?? "请输入"
        };
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
    date(label: string, path: string, extra?: BaseFormDate) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? "请选择",
            clearable: extra?.clearable ?? true,
            span: extra?.span ?? 8
        };
        return {
            inputType: "date",
            label,
            path,
            ...extra
        };
    },
    /**
     * 时间输入框
     * @param label
     * @param path
     * @param extra
     */
    time(label: string, path: string, extra?: BaseFormTime) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? "请选择",
            clearable: extra?.clearable ?? true,
            span: extra?.span ?? 8
        };
        return {
            inputType: "time",
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
    color(label: string, path: string, extra?: BaseFormExtra & BaseFormColor) {
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
    colorRange(label: string, path: string, extra?: BaseFormExtra) {
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
    checkbox(label: string, path: string, options: BaseFormCheckbox[], extra?: BaseFormCheckboxGroup) {
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
    radio(label: string, path: string, options: BaseFormRadio[], extra?: BaseFormRadioGroup) {
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
    select(label: string, path: string, options: BaseFormSelectOptions[], extra?: BaseFormSelect) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? "请选择",
            clearable: extra?.clearable ?? true,
            span: extra?.span ?? 8
        };
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
    switch(label: string, path: string, extra?: BaseFormSwitch) {
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
    editor(label: string, path: string, extra?: BaseFormExtra) {
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
    slot(path: string, extra?: BaseFormExtra) {
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
    inputNumber(label: string, path: string, extra?: BaseFormInputNumber) {
        extra = { ...extra, clearable: extra?.clearable ?? true, span: extra?.span ?? 8 };
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
    uploadPic(label: string, path: string, extra?: BaseFormExtra) {
        return {
            inputType: "uploadPic",
            label,
            path,
            ...extra
        };
    }
};

export default formHelper;
