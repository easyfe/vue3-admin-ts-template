<template>
    <a-modal
        :visible="computedVisible"
        :on-before-ok="handleOk"
        top="10vh"
        ok-text="确定"
        v-bind="privateModalConfig"
        @cancel="handleCancel"
    >
        <div class="base-modal-content">
            <base-table
                ref="baseModalTable"
                v-model:filter-data="privateFilterData"
                :default-selection-keys="selectionKeys"
                v-bind="privateTableConfig"
                @selection-change="onSelectionChange"
            ></base-table>
        </div>
    </a-modal>
</template>
<script setup lang="ts" name="BaseModalTable">
import type { Modal } from "@arco-design/web-vue";
import BaseTable from "@/resources/components/base-table/index.vue";
import lodash from "@/utils/tools/lodash";

const props = withDefaults(
    defineProps<{
        visible: boolean;
        modalConfig?: InstanceType<typeof Modal>["$props"];
        tableConfig?: InstanceType<typeof BaseTable>["$props"];
        defaultSelected?: any[];
        //以下用于函数式调用
        destroy?: () => void;
        ok?: (data: any[]) => Promise<void>;
    }>(),
    {
        visible: () => false,
        modalConfig: () => <any>{},
        filterConfig: () => [],
        tableConfig: undefined,
        defaultSelected: () => [],
        destroy: undefined,
        ok: undefined
    }
);

const emits = defineEmits<{
    (e: "update:visible", data: any): void;
    (e: "ok", data: any): void;
}>();

const computedVisible = computed(() => {
    return fnVisible.value && props.visible;
});

const privateModalConfig = computed<any>(() => {
    const defaultConfig = {
        maskClosable: false,
        alignCenter: false,
        titleAlign: "start"
    };
    return { ...defaultConfig, ...props.modalConfig };
});

const privateTableConfig = computed<any>(() => {
    const defaultConfig = {
        tableProps: {
            rowKey: "id"
        }
    };
    const tableConfig = lodash.cloneDeep(props.tableConfig);
    privateFilterData.value = tableConfig?.filterData || {};
    if (tableConfig?.req) {
        tableConfig.req.params = privateFilterData.value;
    }
    delete tableConfig?.filterData;
    return { ...defaultConfig, ...tableConfig };
});

const baseModalTable = ref();

const fnVisible = ref(true);

const selectList = ref<any[]>([]);

const selectionKeys = ref<string[] | number[]>([]);

const privateFilterData = ref({});

watch(
    () => computedVisible.value,
    (newVal) => {
        if (newVal) {
            baseModalTable.value?.refresh();
            selectionKeys.value = props.defaultSelected?.map((item: any) => {
                if (typeof item === "object") {
                    return item[props.tableConfig?.tableConfig.tableProps?.rowKey || "id"];
                } else {
                    return item;
                }
            });
        }
    },
    {
        immediate: true
    }
);

function onSelectionChange(e: any[]) {
    selectList.value = e;
}

async function handleOk() {
    if (props.ok) {
        await props.ok(selectList.value);
    } else {
        emits("ok", selectList.value);
    }
    onClose();
}

function handleCancel() {
    onClose();
}

function onClose() {
    emits("update:visible", false);
    //如果存在destroy方法，说明是函数式调用，需要手动销毁
    if (props.destroy) {
        fnVisible.value = false;
        setTimeout(() => {
            props.destroy?.();
        }, 500);
    }
}
</script>
<style scoped lang="scss">
.base-modal-content {
    max-height: 60vh;
}
</style>
