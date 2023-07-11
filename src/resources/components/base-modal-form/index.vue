<template>
    <a-modal
        :visible="computedVisible"
        top="10vh"
        ok-text="确定"
        v-bind="privateModalConfig"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <div class="base-modal-content">
            <base-form ref="modalForm" v-model="computedModel" :config="props.formConfig"></base-form>
        </div>
    </a-modal>
</template>
<script setup lang="ts" name="BaseModalForm">
import formHelper from "@/utils/helper/form";
import lodash from "@/utils/tools/lodash";
import type { Modal } from "@arco-design/web-vue";

const props = withDefaults(
    defineProps<{
        visible: boolean;
        value?: Record<string, any>;
        modalConfig?: InstanceType<typeof Modal>;
        formConfig?: Record<string, any>[];
    }>(),
    {
        visible: () => false,
        value: () => ({}),
        modalConfig: () => <any>{},
        formConfig: () => []
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

const privateModalConfig = computed(() => {
    const defaultConfig = {
        maskClosable: false,
        alignCenter: false,
        titleAlign: "start"
    };
    return { ...defaultConfig, ...props.modalConfig };
});

const computedModel = ref({});

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
    max-height: 60vh;
}
</style>
