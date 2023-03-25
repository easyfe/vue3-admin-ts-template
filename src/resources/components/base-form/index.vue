<template>
    <div class="base-form">
        <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            require-mark-placement="left"
            label-placement="left"
            label-width="auto"
            :show-feedback="true"
            size="medium"
            v-bind="$attrs"
        >
            <n-row :gutter="24" :style="getRowStyle">
                <template v-for="(item, index) in props.config" :key="index">
                    <n-col v-if="handleCheckIf(item.if)" class="form-items" :span="getSpan(item)">
                        <div v-if="item.inputType === 'section'" class="section">{{ item.value }}</div>
                        <base-span v-if="item.inputType === 'span'" v-model="model[item.path]" v-bind="item">
                        </base-span>
                        <base-input v-if="item.inputType === 'input'" v-model.trim="model[item.path]" v-bind="item">
                            <template #extra> <form-extra :config="item"></form-extra> </template
                        ></base-input>
                        <base-input-number
                            v-if="item.inputType === 'inputNumber'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-input-number>
                        <base-date
                            v-if="item.inputType === 'date'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-date>
                        <base-time
                            v-if="item.inputType === 'time'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-time>
                        <base-switch
                            v-if="item.inputType === 'switch'"
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
                            v-if="item.inputType === 'checkbox'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-checkbox>
                        <base-radio
                            v-if="item.inputType === 'radio'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-radio>
                        <base-select
                            v-if="item.inputType === 'select'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-select>
                        <base-editor
                            v-if="item.inputType === 'editor'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-editor>
                        <base-upload
                            v-if="item.inputType === 'uploadPic'"
                            v-model="model[item.path]"
                            v-bind="item"
                        ></base-upload>
                        <slot v-if="item.inputType === 'slot'" :name="item.path"></slot>
                    </n-col>
                </template>
            </n-row>
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
    :deep(.n-form-item .n-form-item-label) {
        padding-right: 16px;
    }
    :deep(.n-form-item-blank) {
        flex-wrap: wrap;
    }
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
    }
}
</style>
