<template>
    <div class="base-check-box">
        <n-form-item v-bind="$attrs">
            <n-space direction="vertical" size="large">
                <n-checkbox-group v-model="model" class="checkbox">
                    <n-checkbox
                        v-for="(item, index) in props.options"
                        :key="index"
                        :value="item[props.valueKey]"
                        :disabled="item.disabled"
                        >{{ item[props.labelKey] }}</n-checkbox
                    >
                </n-checkbox-group>
            </n-space>
        </n-form-item>
    </div>
</template>
<script lang="ts" setup name="BaseCheckbox">
const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        modelValue: number[] | string[];
        options: Record<string, any>[];
    }>(),
    {
        labelKey: "label",
        valueKey: "value",
        modelValue: [] as any
    }
);
const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
</script>
<style lang="scss" scoped>
.base-check-box {
    -webkit-appearance: none !important;
    :deep(.mo-row) {
        -webkit-appearance: none !important;
    }
    :deep(.mo-checkbox) {
        margin-right: 0;
        margin-left: 10px;
    }
}
.mo-form-item {
    margin-bottom: 12px !important;
}
:deep(.mo-form-item-label) {
    color: #898b8f !important;
}
:deep(.mo-checkbox-icon) {
    width: 16px;
    height: 16px;
    .mo-checkbox-icon-check {
        width: 10px;
    }
}
</style>
