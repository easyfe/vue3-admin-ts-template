/** 校验规则 */
// type rules = {
//     validator?: (rule: unknown, value: any, callback: <T>(data?: T) => T) => void;
//     pattern?: RegExp;
//     message?: string;
//     trigger?: "blur" | "change";
//     required?: boolean;
//     min?: number;
//     max?: number;
//     type?: "date" | "array";
// };

import type {
    CheckboxOption,
    SelectProps,
    SelectOption,
    FieldRule,
    Input,
    Switch,
    InputNumber,
    Radio,
    RadioGroup,
    DatePicker,
    TimePicker,
    RangePicker,
    MonthPicker,
    YearPicker,
    QuarterPicker,
    WeekPicker
} from "@arco-design/web-vue";

/** form表单元素基础配置 */
export type BaseFormExtra = {
    placeholder?: string;
    clearable?: boolean;
    rules?: FieldRule | FieldRule[];
    if?: boolean | ((...args: any) => boolean);
    span?: number;
    labelTips?: string;
    InputTIps?: string;
};
//radio选择器扩展
export type BaseFormRadioGroup = {
    type?: "button" | "radio";
} & InstanceType<typeof RadioGroup>["$props"] &
    BaseFormExtra;
export type BaseFormRadio = InstanceType<typeof Radio>["$props"];
//颜色选择器扩展
export type BaseFormColor = {
    defaultColor?: string;
};
//文本输入框扩展
export type BaseFormInput = InstanceType<typeof Input>["$props"] & BaseFormExtra;
//数字输入框扩展
export type BaseFormInputNumber = InstanceType<typeof InputNumber>["$props"] & BaseFormExtra;
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
export type BaseFormSwitch = InstanceType<typeof Switch>["$props"] & BaseFormExtra;
//日期选择框
export type DateType = "date" | "month" | "year" | "quarter" | "week" | "range";
export type BaseFormDate = InstanceType<typeof DatePicker>["$props"] &
    BaseFormExtra & {
        allowClear?: boolean;
        type: DateType;
    };
export type BaseFormDatePicker = BaseFormDate & InstanceType<typeof DatePicker>["$props"];
export type BaseFormMonthPicker = BaseFormDate & InstanceType<typeof MonthPicker>["$props"];
export type BaseFormYearPicker = BaseFormDate & InstanceType<typeof YearPicker>["$props"];
export type BaseFormQuarterPicker = BaseFormDate & InstanceType<typeof QuarterPicker>["$props"];
export type BaseFormWeekPicker = BaseFormDate & InstanceType<typeof WeekPicker>["$props"];
export type BaseFormRangePicker = BaseFormDate & InstanceType<typeof RangePicker>["$props"];
//时间选择框
export type BaseFormTime = InstanceType<typeof TimePicker>["$props"] & BaseFormExtra;
