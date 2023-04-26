<template>
    <frame-view>
        <base-table :table-config="getConfig" :req="getData" page-key="_page" size-key="_size" row-key=""></base-table>
    </frame-view>
</template>
<script lang="ts" setup>
import { testList } from "@/config/apis/common";
import tableHelper from "@/utils/helper/table";

const getData = computed(() => {
    return {
        fn: testList
    };
});

const getConfig = computed(() => {
    return tableHelper.create({
        tableProps: {
            rowKey: "id",
            bordered: false,
            rowSelection: {
                type: "checkbox"
            }
        },
        tabs: [
            {
                label: "全部",
                value: ""
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
            tableHelper.default("用户ID", "id"),
            tableHelper.default("标题", "title"),
            tableHelper.default("内容", "body")
        ]
    });
});
</script>
