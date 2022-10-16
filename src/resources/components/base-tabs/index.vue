<template>
    <m-tabs v-model:active-key="model" :default-active-key="model" v-bind="$attrs">
        <m-tab-pane v-for="(item, index) in props.options" :key="index" :title="item.label">
            <slot :name="item.value"></slot>
        </m-tab-pane>
    </m-tabs>
</template>
<script lang="ts" setup name="BaseTabs">
const props = withDefaults(
    defineProps<{
        modelValue?: string | number;
        options: { label: string; value: string | number }[];
    }>(),
    {
        modelValue: 0
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
