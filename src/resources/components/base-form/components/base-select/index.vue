<template>
    <m-form-item v-bind="$attrs">
        <m-select v-model="model" allow-clear v-bind="$attrs" class="select">
            <m-option
                v-for="(item, index) in props.options"
                :key="index"
                :value="item[props.valueKey]"
                :disabled="item.disabled"
                >{{ item[props.labelKey] }}</m-option
            >
        </m-select>
    </m-form-item>
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
<style lang="scss" scoped></style>
