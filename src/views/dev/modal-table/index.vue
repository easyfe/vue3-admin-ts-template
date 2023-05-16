<template>
    <frame-view>
        <a-space>
            <a-button @click="onOpen(1)">打开表格</a-button>
            <a-button @click="onOpen(2)">默认选中</a-button>
        </a-space>
        <a-row>
            {{ tableData }}
        </a-row>
        <base-modal-table
            v-model:visible="visible"
            v-model:filter-data="filterData"
            :modal-config="{ title: '测试', width: '70%' }"
            :filter-config="filterConfig"
            :table-config="getConfig"
            :req="getData"
            :default-selection-keys="selectionKeys"
            page-key="_page"
            size-key="_size"
            row-key=""
            @ok="handleOk"
        ></base-modal-table>
    </frame-view>
</template>
<script lang="ts" setup>
import { testList } from "@/config/apis/common";
import formHelper from "@/utils/helper/form";
import tableHelper from "@/utils/helper/table";
const visible = ref(false);
const tableData = ref();
const selectionKeys = ref<string[] | number[]>([]);

const filterData = ref({
    tabsData: "1"
});

const getData = computed(() => {
    return {
        fn: testList,
        params: {
            ...filterData.value
        }
    };
});

const filterConfig = computed(() => {
    return [
        formHelper.input("测试", "test", {
            span: 8
        }),
        formHelper.input("测试2", "test2", {
            span: 8
        }),
        formHelper.date("日期", "key10", {
            type: "daterange",
            span: 8
        })
    ];
});

const getConfig = computed(() => {
    return tableHelper.create({
        disableSelectedRow: true,
        tableProps: {
            rowKey: "id",
            bordered: false,
            rowSelection: {
                type: "checkbox",
                showCheckedAll: true
            }
        },
        bats: [
            {
                label: "编辑",
                type: "primary"
            },
            {
                label: "删除",
                status: "danger"
            }
        ],
        tabs: [
            {
                label: "全部",
                value: "0"
            },
            {
                label: "已发布",
                value: "1"
            },
            {
                label: "草稿箱",
                value: "2"
            }
        ],
        btns: [
            {
                label: "新增",
                type: "primary"
            },
            {
                label: "删除",
                status: "danger"
            }
        ],
        columns: [
            tableHelper.default("用户ID", "id", {
                width: 100
            }),
            tableHelper.default("标题", "title"),
            tableHelper.default("内容", "body"),
            tableHelper.btns(
                "操作",
                [
                    {
                        label: "编辑"
                    },
                    {
                        label: "删除",
                        status: "danger"
                    }
                ],
                {
                    width: 150
                }
            )
        ]
    });
});

function handleOk(e: any[]) {
    tableData.value = e;
}

function onOpen(type: number) {
    visible.value = true;
    if (type === 1) {
        selectionKeys.value = [];
    }
    if (type === 2) {
        selectionKeys.value = tableData.value.map((item: any) => item.id);
    }
}
</script>
