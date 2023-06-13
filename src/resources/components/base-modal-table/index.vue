<template>
    <a-modal
        :visible="computedVisible"
        :mask-closable="false"
        :align-center="false"
        top="10vh"
        ok-text="确定"
        title-align="start"
        v-bind="props.modalConfig"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <div class="base-modal-content">
            <slot v-if="$slots.content" name="content"></slot>
            <base-table
                v-else
                ref="baseModalTable"
                v-model="computedModel"
                :filter-config="props.filterConfig"
                :table-config="props.tableConfig"
                :default-selection-keys="props.defaultSelected"
                v-bind="$attrs"
                @selection-change="onSelectionChange"
            ></base-table>
        </div>
    </a-modal>
</template>
<script setup lang="ts" name="BaseModalTable">
import lodash from "@/utils/tools/lodash";
import { ModalConfig } from "@arco-design/web-vue";
import { _TableConfig } from "types/base-table";

const props = withDefaults(
    defineProps<{
        visible: boolean;
        value?: Record<string, any>;
        modalConfig?: Partial<ModalConfig>;
        filterConfig?: Record<string, any>[];
        tableConfig?: Partial<_TableConfig>;
        defaultSelected?: any[];
    }>(),
    {
        visible: () => false,
        value: () => ({}),
        modalConfig: () => ({}),
        filterConfig: () => [],
        tableConfig: () => ({}),
        defaultSelected: () => []
    }
);

const emits = defineEmits<{
    (e: "update:visible", data: any): void;
    (e: "ok", data: any): void;
}>();

const computedVisible = computed({
    get: () => props.visible,
    set: (newVal: boolean) => emits("update:visible", newVal)
});

const baseModalTable = ref();

const computedModel = ref(lodash.cloneDeep(props.value));

const selectList = ref<any[]>([]);

const selectionKeys = ref<string[] | number[]>([]);

watch(
    () => computedVisible.value,
    (newVal) => {
        if (newVal) {
            baseModalTable.value.refresh();
            selectionKeys.value = props.defaultSelected?.map(
                (item: any) => item[props.tableConfig.tableProps?.rowKey || "id"]
            );
        }
    }
);

function onSelectionChange(e: any[]) {
    selectList.value = e;
}

async function handleOk() {
    computedVisible.value = false;
    emits("ok", selectList.value);
}

function handleCancel() {
    computedVisible.value = false;
}
</script>
<style scoped lang="scss">
.base-modal-content {
    max-height: 60vh;
}
</style>
