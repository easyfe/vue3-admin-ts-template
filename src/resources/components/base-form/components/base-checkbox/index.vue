<template>
    <n-form-item v-bind="$attrs">
        <n-space direction="vertical" size="large">
            <n-checkbox-group v-model:value="model" class="checkbox" v-bind="$attrs">
                <n-checkbox v-for="(item, index) in props.options" :key="index" v-bind="item">{{
                    item[props.labelKey]
                }}</n-checkbox>
            </n-checkbox-group>
        </n-space>
    </n-form-item>
</template>
<script lang="ts" setup name="BaseCheckbox">
const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        modelValue: number[] | string[];
        options?: any[];
    }>(),
    {
        labelKey: "label",
        valueKey: "value",
        modelValue: () => [],
        options: () => []
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
<style lang="scss" scoped></style>
