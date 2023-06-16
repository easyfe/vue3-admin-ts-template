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
// import { Override } from "types";

/** form表单元素基础配置 */
export type BaseFormExtra = {
    clearable?: boolean;
    rules?: FieldRule | FieldRule[];
    if?: boolean | ((...args: any) => boolean);
    span?: number;
    labelTips?: string;
    inputTips?: string;
    width?: string | number;
};
//radio选择器扩展
export type BaseFormRadioGroup = BaseFormExtra & {
    type?: "button" | "radio";
} & InstanceType<typeof RadioGroup>["$props"];
export type BaseFormRadio = InstanceType<typeof Radio>["$props"] & { label: string };
//颜色选择器扩展
export type BaseFormColor = {
    defaultColor?: string;
};
//文本输入框扩展
export type BaseFormInput = BaseFormExtra & InstanceType<typeof Input>["$props"];
//数字输入框扩展
export type BaseFormInputNumber = BaseFormExtra & InstanceType<typeof InputNumber>["$props"];
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
export type BaseFormSelect = BaseFormExtra & Partial<SelectProps>;
export type BaseFormSelectOptions = Partial<SelectOption>;
//切换框
export type BaseFormSwitch = BaseFormExtra & InstanceType<typeof Switch>["$props"];
//日期选择框
export type DateType = "date" | "month" | "year" | "quarter" | "week" | "range";
export type BaseFormDate = BaseFormExtra &
    InstanceType<typeof DatePicker>["$props"] & {
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
export type BaseFormTime = BaseFormExtra & InstanceType<typeof TimePicker>["$props"];

export type BaseFormUpload = BaseFormExtra & {
    remove?: boolean;
    independent?: boolean;
    limit?: number;
    disabled?: boolean;
};
