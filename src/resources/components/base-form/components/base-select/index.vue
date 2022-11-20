<template>
    <n-form-item v-bind="$attrs">
        <n-select v-model="model" allow-clear v-bind="$attrs" class="select" :options="props.options">
            <!-- <n-option
                v-for="(item, index) in props.options"
                :key="index"
                :value="item[props.valueKey]"
                :disabled="item.disabled"
                >{{ item[props.labelKey] }}</n-option
            > -->
        </n-select>
    </n-form-item>
</template>
<script lang="ts" setup name="BaseSelect">
const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        show?: boolean;
        modelValue: string | number | number[] | string[];
        options: Record<string, any>[];
    }>(),
    {
        labelKey: "label",
        valueKey: "value",
        show: true
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
:deep(.mo-form-item-label) {
    color: #898b8f !important;
}
</style>
