<template>
    <frame-view>
        <arco-table
            v-model:filter-data="filterData"
            :filter-config="filterConfig"
            :table-config="getConfig"
            :req="getData"
            page-key="_page"
            size-key="_size"
            row-key=""
        ></arco-table>
    </frame-view>
</template>
<script lang="ts" setup>
import { testList } from "@/config/apis/common";
import { ArcoTable, formHelper, tableHelper } from "@easyfe/admin-component";

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
        formHelper.datePicker("日期", "key10", {
            type: "date",
            span: 8
        })
    ];
});

const getConfig = computed(() => {
    return tableHelper.create({
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
</script>
