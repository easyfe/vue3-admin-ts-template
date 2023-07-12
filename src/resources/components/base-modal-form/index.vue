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
        visible: boolean; //是否显示
        value?: Record<string, any>; //表单数据
        modalConfig?: InstanceType<typeof Modal>["$props"]; //modal配置
        formConfig?: Record<string, any>[]; //表单配置
        //以下用于函数式调用
        destroy?: () => void; //销毁方法
        ok?: (data: Record<string, any>) => Promise<void>; //确定方法
    }>(),
    {
        visible: () => false,
        value: () => ({}),
        modalConfig: () => <any>{},
        formConfig: () => [],
        destroy: undefined,
        ok: undefined
    }
);

const emits = defineEmits<{
    (e: "update:visible", data: any): void;
    (e: "ok", data: any): void;
}>();

const modalForm = ref();

const fnVisible = ref(true);

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
    if (props.ok) {
        await props.ok(computedModel.value);
    } else {
        emits("ok", computedModel.value);
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
