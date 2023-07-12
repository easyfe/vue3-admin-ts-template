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
import { _TableConfig } from "types/base-table";
import type { Modal } from "@arco-design/web-vue";

const props = withDefaults(
    defineProps<{
        visible: boolean;
        value?: Record<string, any>;
        modalConfig?: InstanceType<typeof Modal>["$props"];
        filterConfig?: Record<string, any>[];
        tableConfig?: Partial<_TableConfig>;
        defaultSelected?: any[];
        //以下用于函数式调用
        destroy?: () => void;
        ok?: (data: any[]) => Promise<void>;
    }>(),
    {
        visible: () => false,
        value: () => ({}),
        modalConfig: () => <any>{},
        filterConfig: () => [],
        tableConfig: () => ({}),
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

const baseModalTable = ref();

const computedModel = ref({});

const fnVisible = ref(true);

const selectList = ref<any[]>([]);

const selectionKeys = ref<string[] | number[]>([]);

watch(
    () => props.value,
    (newVal) => {
        if (newVal) {
            computedModel.value = lodash.cloneDeep(newVal);
        }
    },
    {
        immediate: true
    }
);

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
