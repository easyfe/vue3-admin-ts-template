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
                ref="modalForm"
                v-model="computedModel"
                :filter-config="props.filterConfig"
                :table-config="props.tableConfig"
                v-bind="$attrs"
            ></base-table>
        </div>
    </a-modal>
</template>
<script setup lang="ts" name="BaseModalTable">
import formHelper from "@/utils/helper/form";
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
    }>(),
    {
        visible: () => false,
        value: () => ({}),
        modalConfig: () => ({}),
        filterConfig: () => [],
        tableConfig: () => ({})
    }
);

const emits = defineEmits<{
    (e: "update:visible", data: any): void;
    (e: "ok", data: any): void;
}>();

const modalForm = ref();

const computedVisible = computed({
    get: () => props.visible,
    set: (newVal: boolean) => emits("update:visible", newVal)
});

const computedModel = ref(lodash.cloneDeep(props.value));

async function handleOk() {
    if (modalForm) {
        await formHelper.validate(modalForm.value);
    }
    emits("ok", computedModel.value);
}

function handleCancel() {
    computedVisible.value = false;
}
</script>
<style scoped lang="scss">
.base-modal-content {
    max-height: 70vh;
}
</style>
