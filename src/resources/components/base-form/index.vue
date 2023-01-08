<template>
    <div class="base-form">
        <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            show-require-mark
            require-mark-placement="left"
            label-placement="left"
            label-width="auto"
            v-bind="$attrs"
        >
            <n-row :gutter="24" :style="getRowStyle">
                <n-col v-for="(item, index) in props.config" :key="index" class="form-items" :span="getSpan(item)">
                    <base-input
                        v-if="item.inputType === 'input' && handleCheckIf(item.if)"
                        v-model.trim="model[item.path]"
                        v-bind="item"
                    ></base-input>
                    <base-input-number
                        v-if="item.inputType === 'inputNumber' && handleCheckIf(item.if)"
                        v-model.trim="model[item.path]"
                        v-bind="item"
                    ></base-input-number>
                    <base-date
                        v-if="item.inputType === 'date' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-date>
                    <base-time
                        v-if="item.inputType === 'time' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-time>
                    <base-switch
                        v-if="item.inputType === 'switch' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-switch>
                    <!-- <base-color
                        v-if="item.inputType === 'color' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-color> -->
                    <!-- <base-color-range
                        v-if="item.inputType === 'colorRange' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-color-range> -->
                    <base-checkbox
                        v-if="item.inputType === 'checkbox' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-checkbox>
                    <base-radio
                        v-if="item.inputType === 'radio' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-radio>
                    <base-select
                        v-if="item.inputType === 'select' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-select>
                    <base-editor
                        v-if="item.inputType === 'editor' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-editor>
                    <base-upload
                        v-if="item.inputType === 'uploadPic' && handleCheckIf(item.if)"
                        v-model="model[item.path]"
                        v-bind="item"
                    ></base-upload>
                    <slot v-if="item.inputType === 'slot' && handleCheckIf(item.if)" :name="item.path"></slot>
                </n-col>
            </n-row>
            <n-button>test</n-button>
        </n-form>
    </div>
</template>
<script lang="ts" setup name="BaseForm">
import typeHelper from "@/utils/helper/type";
import lodash from "@/utils/tools/lodash";
import { FormInst, FormRules } from "naive-ui";

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
//表单校验规则
const rules = computed(() => {
    const ruleList: FormRules = {};
    props.config.forEach((item) => {
        if (item.rules) {
            ruleList[item.path] = item.rules;
        }
    });
    return ruleList;
});

const getSpan = computed(() => (item: any): any => {
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

//表格实例
const formRef = ref<FormInst | null>();

/**
 * 校验数据
 */
const validate = (): Promise<void> | undefined => {
    return formRef.value?.validate();
};
/**
 * 重置表单数据
 */
const resetFields = (): void => {
    model.value = restoreValue;
};
/**
 * 清空校验状态
 */
const clearValidate = (): void => {
    return formRef.value?.restoreValidation();
};

//保留重置数据
let restoreValue: any = null;

//暴露事件
defineExpose({
    validate,
    resetFields,
    clearValidate
});

onMounted(() => {
    restoreValue = lodash.cloneDeep(model.value);
});
</script>
<style lang="scss" scoped>
.base-form {
    // padding: 0px 12px;
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
