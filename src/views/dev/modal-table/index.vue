<template>
    <frame-view>
        <a-space>
            <a-button @click="onOpen(1)">组件打开表格</a-button>
            <a-button @click="onOpen(2)">默认选中</a-button>
            <a-button @click="onOpen(3)">函数打开表格</a-button>
        </a-space>
        <a-row>
            {{ tableData }}
        </a-row>
        <base-modal-table
            v-model:visible="visible"
            :modal-config="modalConfig"
            :default-selected="selectionKeys"
            :table-config="{
                tableConfig: getConfig,
                filterData: filterData,
                filterConfig: filterConfig,
                req: getData,
                pageKey: '_page',
                sizeKey: '_size',
                rowKey: ''
            }"
            @ok="handleOk"
        ></base-modal-table>
    </frame-view>
</template>
<script lang="ts" setup>
import { testList } from "@/config/apis/common";
import formHelper from "@/utils/helper/form";
import tableHelper from "@/utils/helper/table";
import modalTable from "@/resources/components/base-modal-table";
import sleep from "@/utils/tools/sleep";
const visible = ref(false);
const tableData = ref();
const selectionKeys = ref<string[] | number[]>([]);

const filterData = ref({
    test: "草草草草",
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

const modalConfig = computed(() => {
    return {
        title: "测试",
        width: "70%"
    };
});

async function handleOk(e: any[]) {
    await sleep(1000);
    tableData.value = e;
}

function onOpen(type: number) {
    if (type === 1) {
        visible.value = true;
        selectionKeys.value = [];
    }
    if (type === 2) {
        visible.value = true;
        selectionKeys.value = tableData.value.map((item: any) => item.id);
    }
    if (type === 3) {
        modalTable({
            modalConfig: modalConfig.value,
            defaultSelected: tableData.value?.map((item: any) => item.id),
            tableConfig: {
                tableConfig: getConfig.value,
                filterConfig: filterConfig.value,
                filterData: filterData.value,
                req: getData.value,
                pageKey: "_page",
                sizeKey: "_size",
                rowKey: ""
            },
            ok: handleOk
        });
    }
}
</script>
