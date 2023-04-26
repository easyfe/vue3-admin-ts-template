<template>
    <div class="base-form">
        <a-form ref="formRef" :model="model" size="small" auto-label-width v-bind="$attrs">
            <a-row :gutter="24" :style="getRowStyle">
                <template v-for="(item, index) in props.config" :key="index">
                    <a-col v-if="handleCheckIf(item.if)" class="form-items" :span="getSpan(item)">
                        <div v-if="item.inputType === 'section'" class="section">{{ item.value }}</div>
                        <base-span v-if="item.inputType === 'span'" v-model="model[item.field]" v-bind="item">
                        </base-span>
                        <base-input v-if="item.inputType === 'input'" v-model.trim="model[item.field]" v-bind="item">
                            <template #extra> <form-extra :config="item"></form-extra> </template
                        ></base-input>
                        <base-input-number
                            v-if="item.inputType === 'inputNumber'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-input-number>
                        <base-date
                            v-if="item.inputType === 'date'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-date>
                        <base-time
                            v-if="item.inputType === 'time'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-time>
                        <base-switch
                            v-if="item.inputType === 'switch'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-switch>
                        <base-color
                            v-if="item.inputType === 'color' && handleCheckIf(item.if)"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-color>
                        <!-- <base-color-range
                        v-if="item.inputType === 'colorRange' && handleCheckIf(item.if)"
                        v-model="model[item.field]"
                        v-bind="item"
                    ></base-color-range> -->
                        <base-checkbox
                            v-if="item.inputType === 'checkbox'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-checkbox>
                        <base-radio
                            v-if="item.inputType === 'radio'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-radio>
                        <base-select
                            v-if="item.inputType === 'select'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-select>
                        <base-editor
                            v-if="item.inputType === 'editor'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-editor>
                        <base-upload
                            v-if="item.inputType === 'uploadPic'"
                            v-model="model[item.field]"
                            v-bind="item"
                        ></base-upload>
                        <slot v-if="item.inputType === 'slot'" :name="item.field"></slot>
                    </a-col>
                </template>
            </a-row>
        </a-form>
    </div>
</template>
<script lang="ts" setup name="BaseForm">
import typeHelper from "@/utils/helper/type";
import lodash from "@/utils/tools/lodash";
import { FormInstance, ValidatedError } from "@arco-design/web-vue";

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

//获取宽度
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
const formRef = ref<FormInstance | null>();

/**
 * 校验数据
 */
const validate = (): Promise<Record<string, ValidatedError> | undefined> | undefined => {
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
    return formRef.value?.clearValidate();
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
    .form-items {
        .section {
            height: 42px;
            background-color: #f7f8fa;
            display: flex;
            align-items: center;
            padding-left: 24px;
            margin-bottom: 24px;
            color: rgb(29, 33, 41);
        }
        :deep(.arco-form-item-content > div) {
            width: 100%;
        }
    }
}
</style>
