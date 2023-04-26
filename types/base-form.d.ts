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

import type {
    CheckboxOption,
    InputProps,
    RadioProps,
    RadioGroupProps,
    InputNumberProps,
    SelectProps,
    SelectOption,
    SwitchProps,
    DatePickerProps,
    TimePickerProps,
    FieldRule
} from "@arco-design/web-vue";

/** form表单元素基础配置 */
export type BaseFormExtra = {
    placeholder?: string;
    clearable?: boolean;
    rules?: FieldRule | FieldRule[];
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
type CheckboxGroupProps = {
    max?: number;
    options?: Array<string | number | CheckboxOption>;
    direction?: "horizontal" | "vertical";
    disabled?: boolean;
};
type CheckboxProps = CheckboxOption;
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
