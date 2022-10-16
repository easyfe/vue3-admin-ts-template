<template>
    <m-form-item v-bind="$attrs">
        <m-space direction="vertical" size="large">
            <m-checkbox-group v-model="model" class="checkbox">
                <m-checkbox
                    v-for="(item, index) in props.options"
                    :key="index"
                    :value="item[props.valueKey]"
                    :disabled="item.disabled"
                    >{{ item[props.labelKey] }}</m-checkbox
                >
            </m-checkbox-group>
        </m-space>
    </m-form-item>
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
<style lang="scss" scoped></style>
