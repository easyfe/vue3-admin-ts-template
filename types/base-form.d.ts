// /** form表单元素基础配置 */
// export type TypeBaseFormExtra = {
//     disabled?: boolean | ((...args: any) => boolean);
//     if?: boolean | ((...args: any) => boolean);
//     icon?: string;
//     placeholder?: string;
//     clearable?: boolean;
//     width?: string | number;
//     tips?: string;
//     rules?: rules;
// };

/** 校验规则 */
type rules = {
    validator?: (rule: unknown, value: any, callback: <T>(data?: T) => T) => void;
    pattern?: RegExp;
    message?: string;
    trigger?: "blur" | "change";
    required?: boolean;
    min?: number;
    max?: number;
    type?: "date" | "array";
};

// /** 文本框 */
// export type TypeBaseFormExtraInput = TypeBaseFormExtra & {
//     maxlength?: number;
//     minlength?: number;
//     inputType?: "text" | "textarea" | "number";
//     rows?: number;
//     autosize?: boolean;
//     append?: string;
//     prepend?: string;
// };

// /** 数字输入框 */
// export type TypeBaseFormExtraNumber = TypeBaseFormExtra & {
//     range?: number[];
// };

// /** 日期选择器 */
// export type TypeBaseFormExtraDate = TypeBaseFormExtra & {
//     range?: number[];
//     valueFormat?: "timestamp" | "yyyy-MM-dd" | "yyyy-MM-dd HH-mm-ss" | string;
//     format?: "yyyy-MM-dd" | "yyyy-MM-dd HH-mm-ss" | string;
//     placeholderRange?: string[];
//     shortcuts?: boolean;
//     disabled?: (date: Date) => boolean;
// };

// /** 下拉选择 */
// export type TypeBaseFormExtraSelect = TypeBaseFormExtra & {
//     labelKey?: string;
//     valueKey?: string;
//     multiple?: boolean;
// };

// /** 上传控件 */
// export type TypeBaseFormUpload = TypeBaseFormExtra & {
//     uploadType?: "image|video";
//     /** 批量上传 */
//     multiple?: boolean;
//     /** 最大数量 */
//     max?: number;
//     /** 后缀，例：jpg、jpeg、png等 */
//     ext?: string[];
//     /** 大小，单位（MB） */
//     size?: number;
//     /** 回调函数，处理图片数据 */
//     callback?: () => string[];
//     /** 格式化数据源 */
//     format?: (data: string[]) => void;
// };

import type {
    CheckboxProps,
    InputProps,
    CheckboxGroupProps,
    RadioProps,
    RadioGroupProps,
    InputNumberProps,
    SelectProps,
    SelectOption,
    SwitchProps,
    DatePickerProps,
    TimePickerProps
} from "naive-ui";

/** form表单元素基础配置 */
export type BaseFormExtra = {
    placeholder?: string;
    clearable?: boolean;
    rules?: rules[];
    // disabled?: boolean | ((...args: any) => boolean);
    if?: boolean | ((...args: any) => boolean);
    span?: number;
    tips?: string;
};
//radio选择器扩展
export type BaseFormRadioGroup = {
    type?: "button" | "radio";
} & RadioGroupProps &
    BaseFormExtra;
export type BaseFormRadio = Partial<RadioProps>;
//颜色选择器扩展
export type BaseFormColor = {
    defaultColor?: string;
};
//文本输入框扩展
export type BaseFormInput = Partial<InputProps> & BaseFormExtra;
//数字输入框扩展
export type BaseFormInputNumber = Partial<InputNumberProps> & BaseFormExtra;
//多选扩展
export type BaseFormCheckboxGroup = Partial<CheckboxGroupProps> &
    BaseFormExtra & { labelKey?: string; valueKey?: string };
export type BaseFormCheckbox = Partial<CheckboxProps>;
//下拉框
export type BaseFormSelect = Partial<SelectProps> & BaseFormExtra;
export type BaseFormSelectOptions = Partial<SelectOption>;
//切换框
export type BaseFormSwitch = Partial<SwitchProps> & BaseFormExtra;
//日期选择框
export type BaseFormDate = Partial<DatePickerProps> & BaseFormExtra;
//时间选择框
export type BaseFormTime = Partial<TimePickerProps> & BaseFormExtra;
