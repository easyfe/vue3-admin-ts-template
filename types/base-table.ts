import { ButtonProps, TableSortable, TableRowSelection, TableExpandable, ScrollbarProps } from "@arco-design/web-vue";
import {
    TableColumnData,
    TableData,
    TableDraggable,
    TableOperationColumn
} from "@arco-design/web-vue/es/table/interface";
import { VirtualListProps } from "@arco-design/web-vue/es/_components/virtual-list-v2/interface";
/** 表格配置定义 */
export type _TableConfig = {
    /** 左上角标签 */
    tabs?: _Tabs;
    /** 右上角按钮 */
    btns?: _Btn[];
    /** 左下角按钮 */
    bats?: _Btn[];
    /** 是否禁用选中行 */
    disableSelectedRow?: boolean;
    tableProps?: {
        bordered?: boolean;
        hoverable?: boolean;
        striped?: boolean;
        size?: "mini" | "small" | "medium" | "large";
        tableLayoutFixed?: boolean;
        loading?: boolean;
        rowSelection?: TableRowSelection;
        expandable?: TableExpandable;
        scroll?: { x?: number | string; y?: number | string; minWidth?: number | string; maxHeight?: number | string };
        pagination?: boolean;
        pagePosition?: "tl" | "top" | "tr" | "bl" | "bottom" | "br";
        indentSize?: number;
        rowKey?: string;
        showHeader?: boolean;
        virtualListProps?: VirtualListProps;
        spanMethod?: (data: {
            record: TableData;
            column: TableColumnData | TableOperationColumn;
            rowIndex: number;
            columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void;
        spanAll?: boolean;
        loadMore?: (record: TableData, done: (children?: TableData[]) => void) => void;
        filterIconAlignLeft?: boolean;
        hideExpandButtonOnEmpty?: boolean;
        rowClass?: string | any[] | Record<string, any> | ((record: TableData, rowIndex: number) => any);
        draggable?: TableDraggable;
        columnResizable?: boolean;
        summary?: boolean | ((params: { columns: TableColumnData[]; data: TableData[] }) => TableData[]);
        summaryText?: string;
        summarySpanMethod?: (data: {
            record: TableData;
            column: TableColumnData | TableOperationColumn;
            rowIndex: number;
            columnIndex: number;
        }) => { rowspan?: number; colspan?: number } | void;
        selectedKeys?: (string | number)[];
        defaultSelectedKeys?: (string | number)[];
        expandedKeys?: (string | number)[];
        defaultExpandAllRows?: boolean;
        stickyHeader?: boolean | number;
        scrollbar?: boolean | ScrollbarProps;
    };
    /** 列表组 */
    columns?: {
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
    handler?: (item: _Btn) => void;
    /** 是否展示，仅false时隐藏 */
    if?: boolean | (() => boolean);
    /** 是否禁用，仅true时禁用 */
    disabled?: boolean | (() => boolean);
    /** 颜色 */
    color?: string;
    /** 加载文案 */
    loadingText?: string;
    /** 图标 */
    icon?: string;
} & ButtonProps;

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
