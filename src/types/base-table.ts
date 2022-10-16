import type { TableSortable, TableRowSelection, TableExpandable } from "@moment-design/web-vue";
/** 表格配置定义 */
export type _TableConfig = {
    /** 表格大小 */
    size?: "mini" | "small" | "medium" | "large";
    /** 左上角标签 */
    tabs?: _Tabs;
    /** 右上角按钮 */
    btns?: _Btn[];
    /** 左下角按钮 */
    bats?: _Btn[];
    /** 序号 */
    index?: boolean;
    /** 展开行 */
    expandable?: TableExpandable;
    /** 是否禁用选中行 */
    disableSelectedRow?: boolean;
    /** 多选 */
    selection?: TableRowSelection;
    /** 可复选的列 */
    selectable?: (row: Record<string, any>, index: number) => boolean;
    /** 是否分页 */
    pageination?: boolean;
    /** 是否边框 */
    bordered?: boolean;
    /** 表格高度 */
    maxHeight?: number;
    /** rowKey字段 */
    rowKey: string;
    /** 列表组 */
    columns: {
        /** 类型，默认default */
        type?: "default" | "slot" | "btns" | "image" | "time" | "dictionary" | "date";
        /** prop */
        prop: string;
        /** 标签 */
        label?: string;
        /** 是否显示 */
        if?: boolean;
        /** 宽度 */
        width?: number;
        /** 按钮组 */
        btns?: _Btn[];
        /** 点击事件 */
        handler?: (row?: any, index?: number) => void;
        align: "left" | "right" | "center";
        fixed: "left" | "right";
        /** 字典自定义key */
        labelKey?: string;
        valueKey?: string;
        /** 是否支持排序 */
        sortable?: TableSortable;
        /** 字典 */
        dictionary?: ({ label?: string; value?: string | number } & Record<string | number, string | number>)[];
        /** 左侧扩展 */
        leftExtra?: string;
        /** 右侧扩展 */
        rightExtra?: string;
        format?: string;
        tooltip?: Record<string, any>;
        color?: string;
        rowKey: "id";
    }[];
};

/** 表格请求事件定义 */
export type _TableReq = {
    fn: (params: any) => Promise<any>;
    params?: Record<string, any>;
};

/** 按钮定义 */
export type _Btn = {
    /** 标签（按钮文字） */
    label: string | ((row: any) => string);
    /** 点击事件 */
    handler: (item: _Btn) => void;
    /** 按钮类型 */
    type?: "primary" | "secondary" | "outline" | "plain" | "dashed" | "text";
    /** 按钮状态 */
    status?: "normal" | "warning" | "success" | "danger";
    /** 是否展示，仅false时隐藏 */
    if?: boolean | (() => boolean);
    /** 是否禁用，仅true时禁用 */
    disabled?: boolean | (() => boolean);
    /** 颜色 */
    color?: string;
    /** 加载状态 */
    loading?: boolean;
    /** 加载文案 */
    loadingText?: string;
    /** 图标 */
    icon?: string;
};

/** 表格tabs定义 */
export type _Tabs = {
    /** 标题 */
    label: string;
    /** 值 */
    value: string | number;
    /** 计数 */
    count?: string | number;
    /** 是否显示 */
    if?: boolean;
}[];
