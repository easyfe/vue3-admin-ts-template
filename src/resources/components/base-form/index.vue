<template>
    <div class="base-form">
        <m-form ref="formRef" :model="model" label-align="left" size="small" auto-label-width>
            <m-row :gutter="24" :style="getRowStyle">
                <m-col v-for="(item, index) in props.config" :key="index" class="form-items" :span="getSpan(item)">
                    <base-input
                        v-if="item.inputType === 'input' && handleCheckIf(item.if)"
                        v-model.trim="model[item.field]"
                        v-bind="item"
                    ></base-input>
                    <base-date
                        v-if="item.inputType === 'date' && handleCheckIf(item.if)"
                        v-model.trim="model[item.field]"
                        v-bind="item"
                    ></base-date>
                    <base-switch
                        v-if="item.inputType === 'switch' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-switch>
                    <base-color
                        v-if="item.inputType === 'color' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-color>
                    <base-color-range
                        v-if="item.inputType === 'colorRange' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-color-range>
                    <base-checkbox
                        v-if="item.inputType === 'checkbox' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-checkbox>
                    <base-radio
                        v-if="item.inputType === 'radio' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-radio>
                    <base-select
                        v-if="item.inputType === 'select' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-select>
                    <base-editor
                        v-if="item.inputType === 'editor' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-editor>
                    <base-input-number
                        v-if="item.inputType === 'inputNumber' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-input-number>
                    <base-upload
                        v-if="item.inputType === 'uploadPic' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-upload>
                    <base-show-box
                        v-if="item.inputType === 'showBox' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-show-box>
                    <base-show-switch
                        v-if="item.inputType === 'showSwitch' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-show-switch>
                    <slot v-if="item.inputType === 'slot' && handleCheckIf(item.if)" :name="item.field"></slot>
                </m-col>
            </m-row>
        </m-form>
    </div>
</template>
<script lang="ts" setup name="BaseForm">
import typeHelper from "@/utils/helper/type";
import { FormInstance, ValidatedError } from "@moment-design/web-vue/es/form";

const props = withDefaults(
    defineProps<{
        config: Record<string, any>[];
        modelValue: any;
        layout?: "column" | "row";
    }>(),
    {
        layout: "column"
    }
);
const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});

const getSpan = computed(() => (item: any): number => {
    if (!handleCheckIf(item.if)) {
        return 0;
    }
    return item.span || 24;
});

const getRowStyle = computed(() => {
    return {
        flexDirection: props.layout
    };
});

/** 检查是否显示 */
const handleCheckIf = (e: undefined | boolean | (() => boolean)): boolean => {
    if (typeHelper.isFunction(e)) {
        const fn = e as () => boolean;
        return fn();
    }
    if (e === undefined) {
        return true;
    }
    return e as boolean;
};

const formRef = ref<FormInstance | null>();
const validate = (): Promise<Record<string, ValidatedError> | undefined> | undefined => {
    return formRef.value?.validate();
};
const validateField = (field: string | string[]): Promise<Record<string, ValidatedError> | undefined> | undefined => {
    return formRef.value?.validateField(field);
};
const resetFields = (name?: string | string[]): void => {
    return formRef.value?.resetFields(name);
};
const clearValidate = (): void => {
    return formRef.value?.clearValidate();
};
const setFields = (fidlds: Record<string, any>): void => {
    return formRef.value?.setFields(fidlds);
};
defineExpose({
    validateField,
    validate,
    resetFields,
    clearValidate,
    setFields
});
</script>
<style lang="scss" scoped>
.base-form {
    padding: 0px 12px;
    :deep(.mo-collapse-item) {
        margin-top: 16px;
    }
    :deep(.mo-collapse-item-header) {
        width: 336px;
        height: 52px;
        background: #f9f9fa;
        border-radius: 2px;
        border: 0px;
    }
    :deep(.mo-collapse-item-content) {
        background-color: #ffffff;
        padding: 0;
    }
    :deep(.mo-form-item-content) {
        justify-content: flex-end;
        .content {
            width: 100%;
        }
    }
    :deep(.mo-form-item-label) {
        color: #898b8f;
        font-size: 14px;
    }
}
</style>
