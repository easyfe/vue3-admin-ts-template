<template>
    <form-item>
        <a-select v-model="model" v-bind="$attrs" class="select"> </a-select>
    </form-item>
</template>
<script lang="ts" setup name="BaseSelect">
const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        modelValue: string | number | number[] | string[];
    }>(),
    {
        labelKey: "label",
        valueKey: "value",
        options: [] as any
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
