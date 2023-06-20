<template>
    <div class="base-table">
        <!-- 顶部筛选器 -->
        <div v-if="props.filterConfig" class="filter">
            <base-form v-model="privateFilterData" :config="props.filterConfig" layout="row"></base-form>
        </div>
        <div class="top">
            <!-- table左上角切换tab -->
            <div class="tabs">
                <a-radio-group v-if="tabsShow" v-model="privateFilterData.tabsData" type="button">
                    <template v-for="(item, index) in privateTableConfig?.tabs">
                        <a-radio v-if="item.if !== false" :key="index" :value="item.value"
                            >{{ item.label }}
                            <template v-if="item.count">
                                （<span class="tabs-count">{{ item.count }}</span
                                >）
                            </template>
                        </a-radio>
                    </template>
                </a-radio-group>
                <!-- 左侧插槽 -->
                <slot name="left-btns"></slot>
            </div>
            <!-- table右上角功能按钮 -->
            <div class="btns">
                <template v-if="btnsShow">
                    <a-space>
                        <template v-for="(item, index) in privateTableConfig?.btns">
                            <a-button
                                v-if="handleCheckBtnIf(item)"
                                :key="index"
                                :type="item.type || 'primary'"
                                :status="item.status || 'normal'"
                                :disabled="handleCheckBtnDidsable(item) || item.loading"
                                :icon="item.icon"
                                :loading="item.loading"
                                @click="handleExtraButtonClick(item)"
                                >{{ item.label }}</a-button
                            >
                        </template>
                    </a-space>
                </template>
                <!-- 右侧插槽 -->
                <slot name="btns-slot"></slot>
            </div>
        </div>
        <!-- 表格主体 -->
        <div class="table">
            <a-table
                ref="baseTable"
                v-model:selectedKeys="selectedKeys"
                :loading="loading"
                :data="privateList"
                :pagination="false"
                :stripe="true"
                v-bind="privateTableConfig.tableProps"
                @row-click="rowClick"
            >
                <template #columns>
                    <template v-for="(item, index) in privateTableConfig?.columns">
                        <!-- 插槽类型 -->
                        <slot v-if="item.type === 'slot'" :name="item.prop"></slot>
                        <!-- 普通列 -->
                        <a-table-column
                            v-if="item.type === 'default'"
                            :key="index"
                            :ellipsis="true"
                            :tooltip="item.tooltip || { position: 'top' }"
                            :align="item.align || 'left'"
                            :title="item.label"
                            :width="item.width"
                            :fixed="item.fixed"
                            :sortable="item.sortable"
                            show-overflow-tooltip
                            :body-cell-style="{ color: item.color }"
                        >
                            <template #cell="{ record }">
                                {{
                                    record[item.prop] !== ""
                                        ? `${item.leftExtra || ""}${record[item.prop]}${item.rightExtra || ""}`
                                        : "-"
                                }}
                            </template>
                        </a-table-column>
                        <!-- 时间列 -->
                        <a-table-column
                            v-if="item.type === 'date'"
                            :key="index"
                            :ellipsis="true"
                            :tooltip="item.tooltip || { position: 'top' }"
                            :align="item.align || 'left'"
                            :title="item.label"
                            :width="item.width"
                            :fixed="item.fixed"
                            :sortable="item.sortable"
                            show-overflow-tooltip
                        >
                            <template #cell="{ record }">
                                {{ dateHelper.formatDate(record[item.prop], item.format) }}
                            </template>
                        </a-table-column>
                        <!-- 字典列 -->
                        <a-table-column
                            v-if="item.type === 'dictionary'"
                            :key="index"
                            :ellipsis="true"
                            :tooltip="item.tooltip || { position: 'top' }"
                            :title="item.label"
                            :width="item.width"
                            :align="item.align || 'left'"
                            :sortable="item.sortable"
                        >
                            <template #cell="{ record }">
                                {{ setDictionaryValue(item.prop, record[item.prop]) }}
                            </template>
                        </a-table-column>
                        <!-- 操作按钮组 -->
                        <a-table-column
                            v-if="item.type === 'btns'"
                            :key="index"
                            :ellipsis="true"
                            :title="item.label"
                            :width="item.width"
                            :fixed="item.fixed"
                            :align="item.align || 'center'"
                        >
                            <template #cell="{ record }">
                                <a-space>
                                    <template v-for="(btn_item, btn_index) in item.btns"
                                        ><a-button
                                            v-if="handleCheckColumnBtnIf(record, index, btn_item)"
                                            :key="btn_index"
                                            class="btn handle-btns"
                                            :disabled="handleCheckColumnBtnDidsable(record, index, btn_item)"
                                            :style="{
                                                color: btn_item.color && !btn_item.disabled ? btn_item.color : ''
                                            }"
                                            :status="btn_item.status || 'normal'"
                                            type="text"
                                            @click.stop="handleClickColumnBtn(record, index, btn_item)"
                                            >{{ handleSetColumnBtnLabel(record, index, btn_item) }}</a-button
                                        ></template
                                    >
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </template>
                <!-- 空状态 -->
                <template #empty>
                    <a-empty description="暂无数据" :image="emptyImage" :image-size="220"></a-empty>
                </template>
            </a-table>
        </div>
        <!-- 表格底部 -->
        <div v-if="privateTableConfig?.tableProps?.pagination !== false || enableSelection" class="footer">
            <div class="bat-wrapper">
                <template v-if="enableSelection">
                    <a-checkbox
                        v-model="footerCheckAllFlag"
                        class="bat-checkbox"
                        :indeterminate="footerIndeterminateFlag"
                        @change="haneleClickChoose"
                    >
                        {{ footerCheckAllFlag ? "取消全选" : "全选" }}
                    </a-checkbox>
                    <span class="bats-slot">
                        已选 {{ selectedKeys?.length
                        }}<template v-if="props.selectLimit">/ {{ props.selectLimit }}</template> 个
                    </span>
                </template>
                <template v-if="batsShow">
                    <a-space>
                        <template v-for="(item, index) in privateTableConfig?.bats">
                            <a-button
                                v-if="handleCheckBtnIf(item)"
                                :key="index"
                                :type="item.type || 'primary'"
                                :status="item.status || 'normal'"
                                :disabled="handleCheckBtnDidsable(item) || item.loading"
                                :icon="item.icon"
                                :loading="item.loading"
                                @click="handleExtraButtonClick(item)"
                                >{{ item.label }}</a-button
                            >
                        </template>
                    </a-space>
                </template>
            </div>
            <a-pagination
                v-if="privateTableConfig?.tableProps?.pagination !== false"
                v-model:current="privatePage"
                v-model:pageSize="privateSize"
                :page-size-options="privateSizeList"
                :total="total"
                show-total
                show-page-size
                @page-size-change="handleSizeChange"
                @change="handleCurrentChange"
            ></a-pagination>
        </div>
    </div>
</template>

<script lang="ts" setup name="BaseTable">
import emptyImage from "@/assets/images/common/no-data.png";
import { _Btn, _TableConfig } from "types/base-table";
import { BaseTableColunmBtn } from "@/utils/helper/table";
import {
    handleCheckBtnIf,
    handleCheckBtnDidsable,
    handleCheckColumnBtnIf,
    handleCheckColumnBtnDidsable,
    handleSetColumnBtnLabel,
    arrIncludes
} from "./util";
import dateHelper from "@/utils/helper/date";
import lodash from "@/utils/tools/lodash";

const props = withDefaults(
    defineProps<{
        //筛选框配置
        filterConfig?: any[];
        //筛选框值
        filterData?: { tabsData?: string | number } & Record<string, any>;
        //复选框默认选中key集合
        defaultSelectionKeys?: number[] | string[];
        //构造请求
        req?: {
            fn: (params: any) => Promise<any>;
            params?: Record<string, any>;
        };
        //表格配置
        tableConfig: _TableConfig;
        //数据存在的key，比如返回数据是{code:200,data:{rows:[],total:100},msg:'xxx'}，则传递rows，如果还在rows下面层级，则传递rows.xxx.xx.xx，依此递归
        rowKey?: string;
        //总数key
        totalKey?: string;
        //焦点key，防止多个列表共存的情况下，重复加载（传入active的时候，必须同时传入key）
        active?: string | number;
        //分页数量
        sizeList?: number[];
        //当前分页
        size?: number;
        //双向绑定,list数据
        list?: any[];
        //分页page变量
        pageKey?: string;
        //分页size变量
        sizeKey?: string;
        //最大选择数量
        selectLimit?: number;
    }>(),
    {
        selectLimit: 0,
        pagination: true,
        defaultSelectionKeys: () => [],
        req: undefined,
        filterConfig: undefined,
        filterData: () => ({}),
        rowKey: "rows",
        totalKey: "total",
        sizeList: () => [10, 20, 30, 40, 50],
        size: 20,
        active: undefined,
        list: () => [],
        pageKey: "page",
        sizeKey: "size"
    }
);

const emits = defineEmits<{
    (e: "update:list", value: any[]): void;
    (e: "export", value: any): void;
    (e: "update:filterData", value: any): void;
    (e: "selectionChange", value: any[]): void;
    (e: "rowClick", value: any): void;
}>();

//内部tableConfig配置文件
const privateTableConfig = computed(() => {
    const cloneTableConfig = lodash.cloneDeep(props.tableConfig);
    return cloneTableConfig;
});
//是否结束
const finished = ref(false);
//列表加载状态
const loading = ref(true);
//是否加载失败
const error = ref(false);
//内部list
const privateList = ref<any[]>([]);
//总数据
const total = ref(0);
//当前页
const privatePage = ref(1);
//分页条数
const privateSize = ref(20);
/** 全选标记 */
const footerCheckAllFlag = ref(false);
/** 底部多选复选框不确定状态 */
const footerIndeterminateFlag = ref(false);
//表格高度
const tableHeight = ref(0);
//表格实例
const baseTable = ref();

const privateSizeList = computed(() => {
    return props.sizeList;
});

//是否开启多选
const enableSelection = computed(() => {
    return !!privateTableConfig.value?.tableProps?.rowSelection;
});

/** 是否显示左下角按钮组 */
const batsShow = computed(() => {
    if (!privateTableConfig.value?.bats) {
        return false;
    }
    return privateTableConfig.value.bats.length > 0;
});

/** 是否显示左上角切卡组 */
const tabsShow = computed(() => {
    if (!privateTableConfig.value?.tabs) {
        return false;
    }
    return privateTableConfig.value.tabs.length > 0;
});

/** 是否显示右上角按钮组 */
const btnsShow = computed(() => {
    if (!privateTableConfig.value?.btns) {
        return false;
    }
    return privateTableConfig.value.btns.length > 0;
});

/** 生成新的字典对象 */
const dictionaryObj = computed(() => {
    const arr = privateTableConfig.value?.columns?.filter((item) => item.type === "dictionary");
    if (!arr) {
        return null;
    }
    let dicMap: Record<string | number, Record<string | number, string | number>> = {};
    for (const item of arr) {
        let tmpMap: Record<string | number, string | number> = {};
        item.dictionary?.forEach((ditem) => {
            let valueKey = "value";
            let labelKey = "label";
            if (item.labelKey) {
                labelKey = item.labelKey;
            }
            if (item.valueKey) {
                valueKey = item.valueKey;
            }
            tmpMap[ditem[valueKey]] = ditem[labelKey];
        });
        dicMap[item.prop] = tmpMap;
    }
    return dicMap;
});
const tableRowKey = computed(() => {
    return privateTableConfig.value?.tableProps?.rowKey || "id";
});
//选中的keys
const selectedKeys = ref<string[] | number[]>([]);

/** 请求参数修改 */
watch(
    () => props.req,
    () => {
        if (loading.value) {
            return;
        }
        debounceListMore();
    }
);

/** 如果做了双向绑定，则更新双向绑定的数据到实际list中 */
watch(
    () => props.list,
    (newVal) => {
        if (newVal) {
            privateList.value = newVal;
        }
    }
);

/** 重新加载之后，检测复选disabled */
watch(loading, (newVal) => {
    if (!newVal) {
        if (props.defaultSelectionKeys.length) {
            selectedKeys.value = Array.from(new Set([...(selectedKeys.value as any[]), ...props.defaultSelectionKeys]));
        }
        checkSelectedDisabled();
    }
});
/** 判断是否需要禁用选中行 */
const checkSelectedDisabled = (): void => {
    if (props.tableConfig.disableSelectedRow) {
        privateList.value.forEach((item) => {
            if ((props.defaultSelectionKeys as any[]).includes(item[tableRowKey.value])) {
                item.disabled = true;
            } else {
                item.disabled = false;
            }
        });
    }
};
/** 定义防抖加载 */
const debounceListMore = lodash.debounce(() => {
    listMore(true);
}, 800);

/** 切换全选状态 */
const haneleClickChoose = (value: boolean | (string | number | boolean)[]): void => {
    baseTable.value.selectAll(value);
};
/** 获取key */
const vnodeKey = computed(() => {
    return getCurrentInstance()?.vnode.key;
});
/** 双向绑定筛选框数据 */
const privateFilterData = computed({
    get: () => {
        return props.filterData;
    },
    set: (e) => {
        emits("update:filterData", e);
    }
});
//加载逻辑判断
const listMore = async (refresh = false): Promise<void> => {
    if (!props.req && !props.list) {
        loading.value = false;
        finished.value = true;
        privatePage.value = 2;
        console.warn("当前base-table未传入req方法，请注意");
        return;
    }
    if (vnodeKey.value && props.active && vnodeKey.value !== props.active) {
        //如果传入了key或者active，则进行匹配校验，非活动状态的base-list组件，拒绝请求
        console.warn(`base-table组件当前未激活，请注意传入的key：${String(vnodeKey.value)}和active：${props.active}`);
        return;
    }
    if (refresh) {
        privatePage.value = 1;
        finished.value = false;
    }
    if (!props.req) {
        loading.value = false;
        return;
    }
    try {
        loading.value = true;
        error.value = false;
        const params = { ...props.req?.params };
        if (props.pageKey) {
            params[props.pageKey] = privatePage.value;
        }
        if (props.sizeKey) {
            params[props.sizeKey] = privateSize.value;
        }
        const res = await props?.req.fn(params);
        // 仅开启分页的情况才去设置总数
        if (enableSelection.value) {
            total.value = res[props.totalKey || "total"] || 0;
        }
        loading.value = false;
        if (refresh) {
            privateList.value = [];
            emits("update:list", []);
        }
        // 传递每次请求的数据到外部,用于数据二次封装和外部循环逻辑
        emits("export", res);
        let _data = res;
        if (props.rowKey) {
            const responseKeyArr = props.rowKey.split(".");
            responseKeyArr.forEach((item) => {
                if (_data[item] === undefined) {
                    throw new Error(`row-key：${props.rowKey}不存在，请检查`);
                }
                _data = _data[item];
            });
        }
        if (!Array.isArray(_data)) {
            throw new Error(`base-table获取数据非数组，请检查返回结果或设置row-key`);
        }
        privateList.value = _data;
        emits("update:list", _data);
        if (_data.length < privateSize.value) {
            finished.value = true;
        }
    } catch (e) {
        console.error(`获取列表数据失败:`, e);
        const str = String(e);
        if (str.indexOf("当前请求已取消") !== -1 || str.indexOf("请求过快，已拦截") !== -1) {
            return;
        }

        finished.value = false;
        loading.value = false;
        error.value = true;
    }
};
/** 加载条数切换 */
const handleSizeChange = (size: number): void => {
    privateSize.value = size;
    listMore();
};
/** 当前页切换 */
const handleCurrentChange = (page: number): void => {
    privatePage.value = page;
    listMore();
};
/** 操作列按钮点击事件 */
const handleClickColumnBtn = (item: Record<string, any>, index: number, btn: BaseTableColunmBtn): void => {
    btn.handler?.(item, index);
};

/** 扩展按钮事件，右上角，左下角 */
const handleExtraButtonClick = (btn: _Btn): void => {
    btn.handler?.(btn);
};

/** 动态设置table的高度 */
const setTableHeight = (): void => {
    nextTick(() => {
        const table = baseTable.value;
        tableHeight.value = window.innerHeight - (table.$el as HTMLElement).offsetTop - 65;
    });
};

/** 设置字典显示 */
const setDictionaryValue = (prop: string, value: string | number): string | number => {
    if (!dictionaryObj.value) {
        return "";
    }
    return dictionaryObj.value[prop][value];
};
/** 单元格点击事件 */
const rowClick = (data: Record<string, any>): void => {
    emits("rowClick", data);
    if (data.disabled) {
        return;
    }
    const clickId = data[tableRowKey.value];
    if (enableSelection.value) {
        const index = selectedKeys.value?.findIndex((item) => item === clickId);
        if (index !== undefined) {
            if (index === -1) {
                (selectedKeys.value as any[])?.push(clickId);
            } else {
                selectedKeys.value?.splice(index, 1);
            }
        }
    }
};

watch(
    selectedKeys,
    () => {
        onSelectionChange();
    },
    { deep: true }
);

/** 复选框变更 */
const onSelectionChange = (): void => {
    const selectionData = privateList.value.filter((item) =>
        (selectedKeys.value as any[]).includes(item[tableRowKey.value])
    );
    emits("selectionChange", selectionData);
    checkSelectedDisabled();
    nextTick(() => {
        const includeLength = arrIncludes(
            selectedKeys.value,
            privateList.value.map((item) => item[tableRowKey.value])
        );
        footerCheckAllFlag.value = includeLength > 0 && includeLength === privateList.value.length;
        //计算部分选中状态的时候，需要过滤已禁用的数据
        footerIndeterminateFlag.value =
            includeLength - props.defaultSelectionKeys.length > 0 && includeLength < privateList.value.length;
    });
};

/**暴露主动刷新事件 */
const refresh = (): void => {
    selectedKeys.value = [];
    listMore(true);
};

defineExpose({
    refresh
});

onMounted(() => {
    if (props.size) {
        privateSize.value = props.size;
    }
    setTableHeight();
    window.onresize = lodash.debounce(setTableHeight, 300);
    if (props.list?.length && props.req) {
        console.warn("存在req请求时候，将过滤双向绑定的初始值，请在请求后进行处理");
    }
    if (props.list?.length && !props.req) {
        privateList.value = props.list;
    }
    selectedKeys.value = [];
    listMore(true);
});
onBeforeUnmount(() => {
    window.onresize = null;
});
</script>
<style lang="scss" scoped>
.base-table {
    display: flex;
    flex-direction: column;
    .filter {
        border-bottom: 1px solid var(--color-neutral-3);
        margin-bottom: 20px;
    }
    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        .tabs {
            user-select: none;
            .tabs-count {
                color: #f56c6c;
            }
        }
    }
    .table {
        flex: 1;
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 0 7px;
        height: 50px;
        background-color: var(--color-bg-4);
        margin-top: 15px;
        .bat-wrapper {
            display: flex;
            align-items: center;
            .bat-checkbox {
                margin-right: 10px;
            }
            .bats-slot {
                margin-right: 10px;
                color: var(--color-text-2);
            }
        }
    }
}
</style>
