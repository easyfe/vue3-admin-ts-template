import { FormInstance } from "@arco-design/web-vue";
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
    validate(value: FormInstance) {
        return new Promise((resolve, reject) => {
            value.validate().then((res) => {
                if (!res) {
                    resolve(true);
                } else {
                    reject(res);
                }
            });
        });
    },
    //段落文案
    section(value: string) {
        return {
            inputType: "section",
            value
        };
    },
    /**
     * 普通文本
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    span(label: string, field: string, extra?: BaseFormInput) {
        extra = {
            ...extra,
            span: extra?.span ?? 12
        };
        return {
            inputType: "span",
            label,
            field,
            ...extra
        };
    },
    /**
     * 普通输入框
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    input(label: string, field: string, extra?: BaseFormInput) {
        extra = {
            ...extra,
            allowClear: extra?.clearable ?? true,
            span: extra?.span ?? 12,
            placeholder: extra?.placeholder ?? "请输入"
        };
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
    date(label: string, field: string, extra?: BaseFormDate) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? "请选择",
            allowClear: extra?.clearable ?? true,
            span: extra?.span ?? 12
        };
        return {
            inputType: "date",
            label,
            field,
            ...extra
        };
    },
    /**
     * 时间输入框
     * @param label
     * @param field
     * @param extra
     */
    time(label: string, field: string, extra?: BaseFormTime) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? "请选择",
            allowClear: extra?.clearable ?? true,
            span: extra?.span ?? 12
        };
        return {
            inputType: "time",
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
    color(label: string, field: string, extra?: BaseFormExtra & BaseFormColor) {
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
    colorRange(label: string, field: string, extra?: BaseFormExtra) {
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
    checkbox(label: string, field: string, options: BaseFormCheckbox[], extra?: BaseFormCheckboxGroup) {
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
    radio(label: string, field: string, options: BaseFormRadio[], extra?: BaseFormRadioGroup) {
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
    select(label: string, field: string, options: BaseFormSelectOptions[], extra?: BaseFormSelect) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? "请选择",
            allowClear: extra?.clearable ?? true,
            span: extra?.span ?? 12
        };
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
    switch(label: string, field: string, extra?: BaseFormSwitch) {
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
    editor(label: string, field: string, extra?: BaseFormExtra) {
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
    slot(field: string, extra?: BaseFormExtra) {
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
    inputNumber(label: string, field: string, extra?: BaseFormInputNumber) {
        extra = {
            ...extra,
            allowClear: extra?.clearable ?? true,
            span: extra?.span ?? 12,
            placeholder: extra?.placeholder ?? "请输入"
        };
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
    uploadPic(label: string, field: string, extra?: BaseFormExtra) {
        return {
            inputType: "uploadPic",
            label,
            field,
            ...extra
        };
    }
};

export default formHelper;
