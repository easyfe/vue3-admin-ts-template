/** 表单配置定义 */
export type _FormConfig = {
    title?: string;
    columns: _FormConfigColumn[];
};

export type _FormConfigColumn = {
    type:
        | "slot"
        | "input"
        | "input-range"
        | "number"
        | "date"
        | "date-range"
        | "select"
        | "cascader"
        | "upload"
        | "radio"
        | "checkbox";
    prop: string;
    label: string | number;
    placeholder: string | number;
    rules?: rules;
    if?: boolean | ((...args: any) => boolean);
};

/** form表单元素基础配置 */
export type TypeBaseFormExtra = {
    disabled?: boolean | ((...args: any) => boolean);
    if?: boolean | ((...args: any) => boolean);
    icon?: string;
    placeholder?: string;
    clearable?: boolean;
    width?: string | number;
    tips?: string;
    rules?: rules;
};

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
}[];

/** 文本框 */
export type TypeBaseFormExtraInput = TypeBaseFormExtra & {
    maxlength?: number;
    minlength?: number;
    inputType?: "text" | "textarea" | "number";
    rows?: number;
    autosize?: boolean;
    append?: string;
    prepend?: string;
};

/** 数字输入框 */
export type TypeBaseFormExtraNumber = TypeBaseFormExtra & {
    range?: number[];
};

/** 日期选择器 */
export type TypeBaseFormExtraDate = TypeBaseFormExtra & {
    range?: number[];
    valueFormat?: "timestamp" | "yyyy-MM-dd" | "yyyy-MM-dd HH-mm-ss" | string;
    format?: "yyyy-MM-dd" | "yyyy-MM-dd HH-mm-ss" | string;
    placeholderRange?: string[];
    shortcuts?: boolean;
    disabled?: (date: Date) => boolean;
};

/** 下拉选择 */
export type TypeBaseFormExtraSelect = TypeBaseFormExtra & {
    labelKey?: string;
    valueKey?: string;
    multiple?: boolean;
};

/** 上传控件 */
export type TypeBaseFormUpload = TypeBaseFormExtra & {
    uploadType?: "image|video";
    /** 批量上传 */
    multiple?: boolean;
    /** 最大数量 */
    max?: number;
    /** 后缀，例：jpg、jpeg、png等 */
    ext?: string[];
    /** 大小，单位（MB） */
    size?: number;
    /** 回调函数，处理图片数据 */
    callback?: () => string[];
    /** 格式化数据源 */
    format?: (data: string[]) => void;
};

/** form表单元素基础配置 */
export type BaseFormExtra = {
    placeholder?: string;
    clearable?: boolean;
    rules?: rules[];
    // disabled?: boolean | ((...args: any) => boolean);
    if?: boolean | ((...args: any) => boolean);
    span?: number;
} & Record<string, any>;

/** radio选择器扩展 */
export type BaseFormRadio = {
    type?: "button" | "radio";
};

/** 颜色选择器扩展 */
export type BaseFormColor = {
    defaultColor?: string;
};

/** input扩展 */
export type BaseFormInput = {
    maxLength?: number;
    showWordLimit?: boolean;
};
